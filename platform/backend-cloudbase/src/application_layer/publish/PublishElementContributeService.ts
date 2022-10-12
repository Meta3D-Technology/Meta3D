import { fromPromise } from "most";

function _arrayBufferToBuffer(arrayBuffer: ArrayBuffer): Buffer {
    return Buffer.from(arrayBuffer)
}


function _throwError(msg: string): never {
    throw new Error(msg)
}

function _isPublisherRegistered(hasDataFunc, app, publisher: string) {
    return hasDataFunc(app, "user", { username: publisher })
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



function _publish([logFunc, errorFunc, initFunc, hasDataFunc, uploadFileFunc, getDataFunc, updateDataFunc]: [any, any, any, any, any, any, any],
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
    return initFunc().flatMap((app) => {
        return _isPublisherRegistered(hasDataFunc, app, username).flatMap(_isPublisherRegistered => {
            if (!_isPublisherRegistered) {
                _throwError("publishser没有注册")
            }

            // _defineWindow()

            return fromPromise(
                getDataFunc(
                    app,
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
                app,
                _getFileDirname(fileType) + "/" + name + "_" + version + ".arrayBuffer",
                _arrayBufferToBuffer(
                    binaryFile
                )
            ).flatMap(({ fileID }) => {
                return fromPromise(
                    getDataFunc(
                        app,
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
                            app,
                            _getPublishedCollectionName(fileType),
                            { username: username },
                            {
                                fileData: newFileData
                            }
                        )
                    }))
            })
            )
        })
    }).drain()
        .then(_ => {
            logFunc("publish success")
        })
        .catch(e => {
            errorFunc("error message: ", e)
        })
}

export function publishElementContribute([logFunc, errorFunc, initFunc, hasDataFunc, uploadFileFunc, getDataFunc, updateDataFunc]: [any, any, any, any, any, any, any],
    username: string,
    packageData: any,
    contributeBinaryFile: ArrayBuffer
) {
    return _publish([logFunc, errorFunc, initFunc, hasDataFunc, uploadFileFunc, getDataFunc, updateDataFunc],
        username,
        packageData,
        contributeBinaryFile,
        "contribute"
    )
}

export function publishElementAssembleData([logFunc, errorFunc, initFunc, hasDataFunc, getDataFunc, updateDataFunc]: [any, any, any, any, any, any],
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
    return initFunc()
        .flatMap((app) => {
            return _isPublisherRegistered(hasDataFunc, app, username).flatMap(isPublisherRegistered => {
                if (!isPublisherRegistered) {
                    _throwError("publishser没有注册")
                }

                return fromPromise(
                    getDataFunc(
                        app,
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
                            app,
                            "publishedElementAssembleData",
                            { username: username },
                            {
                                fileData: newFileData
                            }
                        )
                    })
                )
            })
        }).drain()
        .then(_ => {
            logFunc("publish success")
        })
        .catch(e => {
            errorFunc("error message: ", e)
        })
}