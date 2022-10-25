import { fromPromise } from "most";

function _getFileDirname(fileType: "extension" | "contribute") {
    switch (fileType) {
        case "extension":
            return "extensions"
        case "contribute":
            return "contributes"
    }
}

function _getPublishedCollectionName(fileType: "extension" | "contribute") {
    switch (fileType) {
        case "extension":
            return "publishedextensions"
        case "contribute":
            return "publishedcontributes"
    }
}

function _publish([logFunc, errorFunc, uploadFileFunc, getShopImplementAccountDataFunc,
    updateShopImplementDataFunc, getDataFromShopImplementAccountDataFunc, isContainFunc, buildShopImplementAccountDataFunc, addShopImplementDataToDataFromShopImplementCollectionDataFunc, getFileIDFunc]: [any, any, any, any, any, any, any, any, any, any],
    account: string,
    [
        name,
        version,
        protocolName,
        protocolVersion
    ]: [
            string,
            string,
            string,
            string,
        ],
    binaryFile: ArrayBuffer,
    fileType: "extension" | "contribute"
) {
    let filePath =
        _getFileDirname(fileType) + "/" + name + "_" + version + ".arrayBuffer"
    let fileName = name

    return fromPromise(
        getShopImplementAccountDataFunc(
            _getPublishedCollectionName(fileType),
            account
        ).then(([shopImplementAccountData, _]) => {
            let resData = getDataFromShopImplementAccountDataFunc(shopImplementAccountData)

            return isContainFunc(
                (data) => {
                    return data.name === name
                        && data.version === version
                },
                resData)
        }).then((isContain) => {
            if (isContain) {
                errorFunc("version: " + version + " already exist, please update version")
            }
        })
    ).flatMap(_ => uploadFileFunc(
        logFunc,
        filePath,
        binaryFile,
        fileName
    ).flatMap((uploadData) => {
        let fileID = getFileIDFunc(uploadData, filePath)

        return fromPromise(
            getShopImplementAccountDataFunc(
                _getPublishedCollectionName(fileType),
                account
            ).then(([shopImplementAccountData, shopImplementAllCollectionData]) => {
                let resData = getDataFromShopImplementAccountDataFunc(shopImplementAccountData)

                let data = {
                    protocolName: protocolName,
                    protocolVersion: protocolVersion,
                    name: name,
                    version: version,
                    fileID
                }

                return addShopImplementDataToDataFromShopImplementCollectionDataFunc(resData, data).then(resData => {
                    return updateShopImplementDataFunc(
                        _getPublishedCollectionName(fileType),
                        account,
                        buildShopImplementAccountDataFunc(resData, account),
                        shopImplementAllCollectionData
                    )
                })
            }))
    })
    )
}

export function publishElementContribute(
    funcArr,
    account: string,
    packageData: any,
    contributeBinaryFile: ArrayBuffer
) {
    return _publish(funcArr,
        account,
        packageData,
        contributeBinaryFile,
        "contribute"
    )
}

export function publishElementAssembleData([errorFunc, getShopImplementAccountDataFunc, updateShopImplementDataFunc, getDataFromShopImplementAccountDataFunc, isContainFunc, buildShopImplementAccountDataFunc, addShopImplementDataToDataFromShopImplementCollectionDataFunc]: [any, any, any, any, any, any, any],
    account: string,
    elementName: string,
    elementVersion: string,
    inspectorData: any
) {
    return fromPromise(
        getShopImplementAccountDataFunc(
            "publishedelementassembledata",
            account
        ).then(([shopImplementAccountData, shopImplementAllCollectionData]) => {
            let resData = getDataFromShopImplementAccountDataFunc(shopImplementAccountData)

            return isContainFunc(
                (fileData) => {
                    return fileData.elementName === elementName
                        && fileData.elementVersion === elementVersion

                },
                resData).then((isContain) => {
                    if (isContain) {
                        errorFunc("version: " + elementVersion + " already exist, please update version")
                    }
                }).then(_ => {
                    let resData = getDataFromShopImplementAccountDataFunc(shopImplementAccountData)

                    let data = {
                        elementName,
                        elementVersion,
                        inspectorData
                    }

                    return addShopImplementDataToDataFromShopImplementCollectionDataFunc(resData, data).then(resData => {
                        return updateShopImplementDataFunc(
                            "publishedelementassembledata",
                            account,
                            buildShopImplementAccountDataFunc(resData, account),
                            shopImplementAllCollectionData
                        )
                    })
                })
        })
    )
}