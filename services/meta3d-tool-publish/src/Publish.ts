import { fromPromise } from "most";
import { isPublisherRegistered } from "meta3d-tool-utils/src/publish/PublishUtils"

function _arrayBufferToBuffer(arrayBuffer: ArrayBuffer): Buffer {
    return Buffer.from(arrayBuffer)
}


function _throwError(msg: string): never {
    throw new Error(msg)
}

function _checkNotEmpty(value: any) {
    return value === undefined || value === null ?
        _throwError("empty") : value
}

function _searchProtocolVersion(name: string, dependencies: any) {
    return _checkNotEmpty(dependencies[name])
}

function _convertToExtensionOrContributePackageData({ name, protocol, publisher, dependentExtensionNameMap, dependentContributeNameMap, dependencies }: any): any {
    return {
        name,
        publisher,
        protocol: {
            name: protocol.name,
            version: _searchProtocolVersion(protocol.name, dependencies)
        },
        dependentExtensionNameMap: Object.fromEntries(Object
            .entries(dependentExtensionNameMap)
            .map(([key, { protocolName }]: [string, any]) => [key, { protocolName, protocolVersion: _searchProtocolVersion(protocolName, dependencies) }])
        ),
        dependentContributeNameMap: Object.fromEntries(Object
            .entries(dependentContributeNameMap)
            .map(([key, { protocolName }]: [string, any]) => [key, { protocolName, protocolVersion: _searchProtocolVersion(protocolName, dependencies) }])
        )
    }
}

function _defineWindow() {
    (global as any).window = {}
}

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

export function publish([readFileSyncFunc, logFunc, errorFunc, readJsonFunc, generateFunc, initFunc, hasDataFunc, uploadFileFunc, getDataFunc, updateDataFunc]: [any, any, any, any, any, any, any, any, any, any], packageFilePath: string, distFilePath: string, fileType: "extension" | "contribute") {
    return readJsonFunc(packageFilePath)
        .flatMap(packageJson => {
            return initFunc().map(app => [app, packageJson])
        }).flatMap(([app, packageJson]) => {
            return isPublisherRegistered(hasDataFunc, app, packageJson.publisher).flatMap(isPublisherRegistered => {
                if (!isPublisherRegistered) {
                    _throwError("publishser没有注册")
                }

                _defineWindow()

                let packageData = _convertToExtensionOrContributePackageData(packageJson)

                return uploadFileFunc(
                    app,
                    _getFileDirname(fileType) + "/" + packageJson.name + "_" + packageJson.version + ".arrayBuffer",
                    _arrayBufferToBuffer(generateFunc(
                        packageData,
                        readFileSyncFunc(distFilePath, "utf-8")
                    ))
                ).flatMap(({ fileID }) => {
                    return fromPromise(
                        getDataFunc(
                            app,
                            _getPublishedCollectionName(fileType),
                            { username: packageJson.publisher }
                        ).then(res => {
                            let { fileData } = res.data[0]

                            let index = fileData.findIndex(({ protocolName, protocolVersion, version }) => {
                                return protocolName === packageJson.protocol.name
                                    // && protocolVersion === packageJson.protocol.version
                                    && version === packageJson.version
                            })

                            let newFileData = []
                            let data = {
                                protocolName: packageData.protocol.name,
                                protocolVersion: packageData.protocol.version,
                                version: packageJson.version,
                                fileID
                            }

                            if (index === -1) {
                                newFileData = fileData.concat([data])
                            }
                            else {
                                newFileData = fileData.slice()
                                newFileData[index] = data
                            }

                            return updateDataFunc(
                                app,
                                _getPublishedCollectionName(fileType),
                                { username: packageJson.publisher },
                                {
                                    fileData: newFileData
                                }
                            )
                        }))
                })
            })
        }).drain()
        .then(_ => {
            logFunc("publish success")
        })
        .catch(e => {
            errorFunc("error message: ", e)
        })
}

