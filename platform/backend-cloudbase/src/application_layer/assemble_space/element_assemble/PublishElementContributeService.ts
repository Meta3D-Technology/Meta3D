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
            return "publishedExtensions"
        case "contribute":
            return "publishedContributes"
    }
}



function _publish([logFunc, errorFunc, uploadFileFunc, getDataFunc, updateDataFunc]: [any, any, any, any, any],
    username: string,
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
    return fromPromise(
        getDataFunc(
            _getPublishedCollectionName(fileType),
            { username: username }
        ).then(res => {
            let { fileData } = res.data[0]

            let index = fileData.findIndex((data) => {
                return data.name === name
                    && data.version === version
            })

            if (index !== -1) {
                errorFunc("version: " + version + " already exist, please update version")
            }
        })
    ).flatMap(_ => uploadFileFunc(
        logFunc,
        _getFileDirname(fileType) + "/" + name + "_" + version + ".arrayBuffer",
        binaryFile
    ).flatMap((fileID) => {
        return fromPromise(
            getDataFunc(
                _getPublishedCollectionName(fileType),
                { username: username }
            ).then(res => {
                let { fileData } = res.data[0]

                let newFileData = []
                let data = {
                    protocolName: protocolName,
                    protocolVersion: protocolVersion,
                    name: name,
                    version: version,
                    fileID
                }

                newFileData = fileData.concat([data])

                return updateDataFunc(
                    _getPublishedCollectionName(fileType),
                    { username: username },
                    {
                        fileData: newFileData
                    }
                )
            }))
    })
    )
    // .drain()
    // .then(_ => {
    //     logFunc("publish success")
    // })
    // .catch(e => {
    //     errorFunc("error message: ", e)
    // })
}

export function publishElementContribute([logFunc, errorFunc, uploadFileFunc, getDataFunc, updateDataFunc]: [any, any, any, any, any],
    username: string,
    packageData: any,
    contributeBinaryFile: ArrayBuffer
) {
    return _publish([logFunc, errorFunc, uploadFileFunc, getDataFunc, updateDataFunc],
        username,
        packageData,
        contributeBinaryFile,
        "contribute"
    )
}

export function publishElementAssembleData([errorFunc, getDataFunc, updateDataFunc]: [any, any, any],
    username: string,
    elementName: string,
    elementVersion: string,
    inspectorData: any
) {
    return fromPromise(
        getDataFunc(
            "publishedElementAssembleData",
            {
                username: username
            },
        ).then(res => {
            let { fileData } = res.data[0]

            let index = fileData.findIndex((fileData) => {
                return fileData.elementName === elementName
                    && fileData.elementVersion === elementVersion
            })

            if (index !== -1) {
                errorFunc("version: " + elementVersion + " already exist, please update version")
            }

            let newFileData = []
            let data = {
                elementName,
                elementVersion,
                inspectorData
            }

            newFileData = fileData.concat([data])

            return updateDataFunc(
                "publishedElementAssembleData",
                { username: username },
                {
                    fileData: newFileData
                }
            )
        })
    )
    // .drain()
    //     .then(_ => {
    //         logFunc("publish success")
    //     })
    //     .catch(e => {
    //         errorFunc("error message: ", e)
    //     })
}