import { fromPromise } from "most";
import { isPublisherRegistered } from "meta3d-tool-utils/src/publish/PublishUtils"

function _throwError(msg: string): never {
    throw new Error(msg)
}

function _getPublishedCollectionName(fileType: "extension" | "contribute") {
    switch (fileType) {
        case "extension":
            return "publishedExtensionProtocols"
        case "contribute":
            return "publishedContributeProtocols"
    }
}

function _isPNG(iconPath: string) {
    return iconPath.match(/\.png$/) !== null
}

export function publish([readFileSyncFunc, logFunc, errorFunc, readJsonFunc, initFunc, hasDataFunc, getCollectionFunc, addDataFunc]: [any, any, any, any, any, any, any, any], packageFilePath: string, iconPath: string, fileType: "extension" | "contribute") {
    return readJsonFunc(packageFilePath).flatMap(packageJson => {
        return initFunc().map(app => [app, packageJson])
    }).flatMap(([app, packageJson]) => {
        return isPublisherRegistered(hasDataFunc, app, packageJson.publisher).flatMap(isPublisherRegistered => {
            if (!isPublisherRegistered) {
                _throwError("publishser没有注册")
            }

            if (!_isPNG(iconPath)) {
                _throwError("icon's format should be png")
            }

            return fromPromise(
                getCollectionFunc(
                    app,
                    _getPublishedCollectionName(fileType),
                ).then(res => {
                    let index = res.data.findIndex(({ name, version }) => {
                        return name === packageJson.name && version === packageJson.version
                    })

                    if (index !== -1) {
                        _throwError("version: " + packageJson.version + " already exist, please update version")
                    }

                    return addDataFunc(app,
                        _getPublishedCollectionName(fileType),
                        {
                            name: packageJson.name,
                            version: packageJson.version,
                            username: packageJson.publisher,
                            iconBase64:
                                // TODO check file size should be small(< 10kb)

                                // TODO icon can be any format include png

                                "data:image/png;base64, " + readFileSyncFunc(iconPath, "base64")
                        }
                    )
                }))
        })
    }).drain()
        .then(_ => {
            logFunc("publish success")
        })
        .catch(e => {
            errorFunc("error message: ", e)
        })
}

function _getPublishedConfigCollectionName(fileType: "extension" | "contribute") {
    switch (fileType) {
        case "extension":
            return "publishedExtensionProtocolConfigs"
        case "contribute":
            return "publishedContributeProtocolConfigs"
    }
}

export function publishConfig([readFileSyncFunc, logFunc, errorFunc, readJsonFunc, initFunc, hasDataFunc, getCollectionFunc, addDataFunc]: [any, any, any, any, any, any, any, any], packageFilePath: string, distFilePath: string, fileType: "extension" | "contribute") {
    return readJsonFunc(packageFilePath).flatMap(packageJson => {
        return initFunc().map(app => [app, packageJson])
    }).flatMap(([app, packageJson]) => {
        return isPublisherRegistered(hasDataFunc, app, packageJson.publisher).flatMap(isPublisherRegistered => {
            if (!isPublisherRegistered) {
                _throwError("publishser没有注册")
            }

            let collectioName = _getPublishedConfigCollectionName(fileType)

            return fromPromise(
                getCollectionFunc(
                    app,
                    collectioName
                ).then(res => {
                    let index = res.data.findIndex(({ name, version }) => {
                        return name === packageJson.name && version === packageJson.version
                    })

                    if (index !== -1) {
                        _throwError("version: " + packageJson.version + " already exist, please update version")
                    }

                    return addDataFunc(app,
                        collectioName,
                        {
                            name: packageJson.name,
                            version: packageJson.version,
                            username: packageJson.publisher,
                            configStr:
                                // TODO check file size should be small(< 10kb)

                                readFileSyncFunc(distFilePath, "utf8")
                        }
                    )
                }))
        })
    }).drain()
        .then(_ => {
            logFunc("publish config success")
        })
        .catch(e => {
            errorFunc("error message: ", e)
        })
}