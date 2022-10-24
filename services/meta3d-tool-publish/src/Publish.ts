import { fromPromise } from "most";
import { isPublisherRegistered } from "meta3d-tool-utils/src/publish/PublishUtils"


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
            return "publishedextensions"
        case "contribute":
            return "publishedcontributes"
    }
}

export function publish([readFileSyncFunc, logFunc, errorFunc, readJsonFunc, generateFunc, initFunc, hasAccountFunc, uploadFileFunc, getShopImplementAccountDataFunc, updateShopImplementDataFunc, getDataFromShopImplementAccountDataFunc, isContainFunc, buildShopImplementAccountDataFunc, addShopImplementDataToDataFromShopImplementCollectionDataFunc, getFileIDFunc, parseShopCollectionDataBodyFunc]: [any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any], packageFilePath: string, distFilePath: string, fileType: "extension" | "contribute") {
    return readJsonFunc(packageFilePath)
        .flatMap(packageJson => {
            return initFunc().map(backendInstance => [backendInstance, packageJson])
        }).flatMap(([backendInstance, packageJson]) => {
            let account = packageJson.publisher

            return isPublisherRegistered(hasAccountFunc, backendInstance, account).flatMap(isPublisherRegistered => {
                if (!isPublisherRegistered) {
                    _throwError("找不到publishser，请至少登录过一次")
                }

                _defineWindow()

                let packageData = _convertToExtensionOrContributePackageData(packageJson)

                let filePath =
                    _getFileDirname(fileType) + "/" + packageJson.name + "_" + packageJson.version + ".arrayBuffer"

                // TODO perf: only invoke getShopImplementAccountDataFunc once

                return fromPromise(
                    getShopImplementAccountDataFunc(
                        backendInstance,
                        parseShopCollectionDataBodyFunc,
                        _getPublishedCollectionName(fileType),
                        account
                    ).then(([shopImplementAccountData, _]) => {
                        let resData = getDataFromShopImplementAccountDataFunc(shopImplementAccountData)

                        return isContainFunc(
                            ({ protocolName, protocolVersion, name, version }) => {
                                return protocolName === packageJson.protocol.name
                                    && name === packageJson.name
                                    && version === packageJson.version
                            },
                            resData)
                    }).then((isContain) => {
                        if (isContain) {
                            _throwError("version: " + packageJson.version + " already exist, please update version")
                        }
                    })
                ).flatMap(_ => uploadFileFunc(
                    backendInstance,
                    filePath,
                    generateFunc(
                        packageData,
                        readFileSyncFunc(distFilePath, "utf-8")
                    )
                ).flatMap((uploadData) => {
                    let fileID = getFileIDFunc(uploadData, filePath)

                    return fromPromise(
                        getShopImplementAccountDataFunc(
                            backendInstance,
                            parseShopCollectionDataBodyFunc,
                            _getPublishedCollectionName(fileType),
                            account
                        ).then(([shopImplementAccountData, shopImplementAllCollectionData]) => {
                            let resData = getDataFromShopImplementAccountDataFunc(shopImplementAccountData)

                            let data = {
                                protocolName: packageData.protocol.name,
                                protocolVersion: packageData.protocol.version,
                                name: packageJson.name,
                                version: packageJson.version,
                                fileID
                            }

                            return addShopImplementDataToDataFromShopImplementCollectionDataFunc(resData, data).then(resData => {
                                return updateShopImplementDataFunc(
                                    backendInstance,
                                    _getPublishedCollectionName(fileType),
                                    account,
                                    buildShopImplementAccountDataFunc(resData, account),
                                    shopImplementAllCollectionData
                                )
                            })
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

