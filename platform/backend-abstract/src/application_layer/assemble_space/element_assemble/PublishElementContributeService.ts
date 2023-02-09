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

function _publish([logFunc, errorFunc, uploadFileFunc, getMarketImplementAccountDataFunc,
    updateMarketImplementDataFunc, getDataFromMarketImplementAccountDataFunc, isContainFunc, buildMarketImplementAccountDataFunc, addMarketImplementDataToDataFromMarketImplementCollectionDataFunc, getFileIDFunc]: [any, any, any, any, any, any, any, any, any, any],
    account: string,
    [
        name,
        version,
        protocolName,
        protocolVersion,
        displayName,
        repoLink,
        description
    ]: [
            string,
            string,
            string,
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
        getMarketImplementAccountDataFunc(
            _getPublishedCollectionName(fileType),
            account
        ).then(([marketImplementAccountData, _]) => {
            let resData = getDataFromMarketImplementAccountDataFunc(marketImplementAccountData)

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
            getMarketImplementAccountDataFunc(
                _getPublishedCollectionName(fileType),
                account
            ).then(([marketImplementAccountData, marketImplementAllCollectionData]) => {
                let resData = getDataFromMarketImplementAccountDataFunc(marketImplementAccountData)

                let data = {
                    protocolName: protocolName,
                    protocolVersion: protocolVersion,
                    name: name,
                    version: version,
                    displayName,
                    repoLink,
                    description,
                    fileID
                }

                return addMarketImplementDataToDataFromMarketImplementCollectionDataFunc(resData, data).then(resData => {
                    return updateMarketImplementDataFunc(
                        _getPublishedCollectionName(fileType),
                        account,
                        buildMarketImplementAccountDataFunc(resData, account),
                        marketImplementAllCollectionData
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

export function publishElementAssembleData([errorFunc, getMarketImplementAccountDataFunc, updateMarketImplementDataFunc, getDataFromMarketImplementAccountDataFunc, isContainFunc, buildMarketImplementAccountDataFunc, addMarketImplementDataToDataFromMarketImplementCollectionDataFunc]: [any, any, any, any, any, any, any],
    account: string,
    elementName: string,
    elementVersion: string,
    inspectorData: any
) {
    return fromPromise(
        getMarketImplementAccountDataFunc(
            "publishedelementassembledata",
            account
        ).then(([marketImplementAccountData, marketImplementAllCollectionData]) => {
            let resData = getDataFromMarketImplementAccountDataFunc(marketImplementAccountData)

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
                    let resData = getDataFromMarketImplementAccountDataFunc(marketImplementAccountData)

                    let data = {
                        elementName,
                        elementVersion,
                        inspectorData
                    }

                    return addMarketImplementDataToDataFromMarketImplementCollectionDataFunc(resData, data).then(resData => {
                        return updateMarketImplementDataFunc(
                            "publishedelementassembledata",
                            account,
                            buildMarketImplementAccountDataFunc(resData, account),
                            marketImplementAllCollectionData
                        )
                    })
                })
        })
    )
}