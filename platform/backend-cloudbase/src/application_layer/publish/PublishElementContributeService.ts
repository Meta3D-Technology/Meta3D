import { fromPromise } from "most";

function _throwError(msg: string): never {
    throw new Error(msg)
}

function _isPublisherRegistered(hasDataFunc, publisher: string) {
    return hasDataFunc("user", { username: publisher })
}

// function _defineWindow() {
//     (global as any).window = {}
// }

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



function _publish([logFunc, errorFunc, hasDataFunc, uploadFileFunc, getDataFunc, updateDataFunc]: [any, any, any, any, any, any],
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
    return _isPublisherRegistered(hasDataFunc, username).flatMap(_isPublisherRegistered => {
        if (!_isPublisherRegistered) {
            _throwError("publishser没有注册")
        }

        // _defineWindow()

        return fromPromise(
            getDataFunc(
                _getPublishedCollectionName(fileType),
                { username: username }
            ).then(res => {
                let { fileData } = res.data[0]

                let index = fileData.findIndex(({ protocolName, protocolVersion, version }) => {
                    return protocolName === protocolName
                        && version === version
                })

                if (index !== -1) {
                    _throwError("version: " + version + " already exist, please update version")
                }
            })
        ).concat(uploadFileFunc(
            logFunc,
            _getFileDirname(fileType) + "/" + name + "_" + version + ".arrayBuffer",
            binaryFile
        ).flatMap(({ fileID }) => {
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
    }).drain()
        .then(_ => {
            logFunc("publish success")
        })
        .catch(e => {
            errorFunc("error message: ", e)
        })
}

export function publishElementContribute([logFunc, errorFunc, hasDataFunc, uploadFileFunc, getDataFunc, updateDataFunc]: [any, any, any, any, any, any],
    username: string,
    packageData: any,
    contributeBinaryFile: ArrayBuffer
) {
    return _publish([logFunc, errorFunc, hasDataFunc, uploadFileFunc, getDataFunc, updateDataFunc],
        username,
        packageData,
        contributeBinaryFile,
        "contribute"
    )
}

export function publishElementAssembleData([logFunc, errorFunc, hasDataFunc, getDataFunc, updateDataFunc]: [any, any, any, any, any],
    username: string,
    elementName: string,
    elementVersion: string,
    inspectorData: {
        element: {
            elementState: any,
            reducer: any
        },
        uiControls: Array<{
            name: string,
            rect: any,
            event: any
        }>
    }
) {
    return _isPublisherRegistered(hasDataFunc, username).flatMap(isPublisherRegistered => {
        if (!isPublisherRegistered) {
            _throwError("publishser没有注册")
        }

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
                    _throwError("version: " + elementVersion + " already exist, please update version")
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
    }).drain()
        .then(_ => {
            logFunc("publish success")
        })
        .catch(e => {
            errorFunc("error message: ", e)
        })
}