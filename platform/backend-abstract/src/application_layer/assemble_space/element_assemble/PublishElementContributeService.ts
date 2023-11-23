import { handleKeyToLowercase } from "meta3d-backend-cloudbase";
import { nullable } from "meta3d-commonlib-ts/src/nullable";
import { Stream, fromPromise, just } from "most";

let _getFileDirname = (fileType: "extension" | "contribute") => {
    switch (fileType) {
        case "extension":
            return "extensions"
        case "contribute":
            return "contributes"
    }
}

let _getPublishedCollectionName = (fileType: "extension" | "contribute") => {
    switch (fileType) {
        case "extension":
            return "publishedextensions"
        case "contribute":
            return "publishedcontributes"
    }
}

function _publish([logFunc, errorFunc, uploadFileFunc, getMarketImplementAccountDataFunc,
    addMarketImplementData, getFileIDFunc]: [any, any, any, any, any, any],
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
            account,
            name,
            version
        ).then((marketImplementAccountData) => {
            if (marketImplementAccountData.length > 0) {
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

        let data = {
            protocolName: protocolName,
            protocolVersion: protocolVersion,
            name: name,
            version: version,
            displayName,
            repoLink,
            description,
            fileID,
            key: handleKeyToLowercase(account)
        }

        return fromPromise(
            addMarketImplementData(_getPublishedCollectionName(fileType),
                data
            )
        )
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

export function publishElementAssembleData([errorFunc, getMarketImplementAccountDataFunc,
    addMarketImplementData]: [any, any, any],
    account: string,
    elementName: string,
    elementVersion: string,
    inspectorData: any
) {
    return fromPromise(
        getMarketImplementAccountDataFunc(
            "publishedelementassembledata",
            account,
            elementName,
            elementVersion
        ).then((marketImplementAccountData) => {
            if (marketImplementAccountData.length > 0) {
                errorFunc("version: " + elementVersion + " already exist, please update version")
            }

            let data = {
                account,
                elementName,
                elementVersion,
                inspectorData,
                key: handleKeyToLowercase(account)
            }

            return fromPromise(
                addMarketImplementData("publishedelementassembledata",
                    data
                )
            )
        })
    )
}

// export let findPublishNewestElementVersion = (getDataWithWhereData: any, account: string, elementName: string): Stream<nullable<string>> => {
//     return fromPromise(getDataWithWhereData("publishedelementassembledata", { account, elementName })).flatMap((data: any) => {
//         if (data.length === 0) {
//             return just(null)
//         }

//         return just(data[0].elementVersion)
//     })
// }
