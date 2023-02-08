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
    let value = dependencies[name]

    if (value === undefined || value === null) {
        console.log(dependencies);
        _throwError("empty name: " + name)
    }

    return value
}

function _convertToExtensionOrContributePackageData({ name, protocol, publisher, dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap, dependencies }: any): any {
    return {
        name,
        publisher,
        protocol: {
            name: protocol.name,
            version: _searchProtocolVersion(protocol.name, dependencies)
        },
        dependentExtensionProtocolNameMap: Object.fromEntries(Object
            .entries(dependentExtensionProtocolNameMap)
            .map(([key, { protocolName }]: [string, any]) => [key, { protocolName, protocolVersion: _searchProtocolVersion(protocolName, dependencies) }])
        ),
        dependentContributeProtocolNameMap: Object.fromEntries(Object
            .entries(dependentContributeProtocolNameMap)
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

export function publish([readFileSyncFunc, logFunc, errorFunc, readJsonFunc, generateFunc, initFunc, hasAccountFunc, uploadFileFunc, getMarketImplementAccountDataFunc, updateMarketImplementDataFunc, getDataFromMarketImplementAccountDataFunc, isContainFunc, buildMarketImplementAccountDataFunc, addMarketImplementDataToDataFromMarketImplementCollectionDataFunc, getFileIDFunc, parseMarketCollectionDataBodyFunc]: [any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any], packageFilePath: string, distFilePath: string, fileType: "extension" | "contribute") {
    return readJsonFunc(packageFilePath)
        .flatMap(packageJson => {
            return initFunc().map(backendInstance => [backendInstance, packageJson])
        }).flatMap(([backendInstance, packageJson]) => {
            let account = packageJson.publisher

            return isPublisherRegistered(hasAccountFunc, backendInstance, account).flatMap(isPublisherRegistered => {
                if (!isPublisherRegistered) {
                    _throwError("找不到publishser，请在平台上注册该用户")
                }

                _defineWindow()

                let packageData = _convertToExtensionOrContributePackageData(packageJson)

                let filePath =
                    _getFileDirname(fileType) + "/" + packageJson.name + "_" + packageJson.version + ".arrayBuffer"

                // TODO perf: only invoke getMarketImplementAccountDataFunc once

                return fromPromise(
                    getMarketImplementAccountDataFunc(
                        backendInstance,
                        parseMarketCollectionDataBodyFunc,
                        _getPublishedCollectionName(fileType),
                        account
                    ).then(([marketImplementAccountData, _]) => {
                        let resData = getDataFromMarketImplementAccountDataFunc(marketImplementAccountData)

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
                        getMarketImplementAccountDataFunc(
                            backendInstance,
                            parseMarketCollectionDataBodyFunc,
                            _getPublishedCollectionName(fileType),
                            account
                        ).then(([marketImplementAccountData, marketImplementAllCollectionData]) => {
                            let resData = getDataFromMarketImplementAccountDataFunc(marketImplementAccountData)

                            let data = {
                                protocolName: packageData.protocol.name,
                                protocolVersion: packageData.protocol.version,
                                name: packageJson.name,
                                version: packageJson.version,
                                fileID
                            }

                            return addMarketImplementDataToDataFromMarketImplementCollectionDataFunc(resData, data).then(resData => {
                                return updateMarketImplementDataFunc(
                                    backendInstance,
                                    _getPublishedCollectionName(fileType),
                                    account,
                                    buildMarketImplementAccountDataFunc(resData, account),
                                    marketImplementAllCollectionData
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

