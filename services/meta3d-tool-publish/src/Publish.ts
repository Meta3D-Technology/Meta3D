import { fromPromise } from "most";
import { isPublisherRegistered } from "meta3d-tool-utils/src/publish/PublishUtils"


function _throwError(msg: string): never {
    throw new Error(msg)
}

function _isEmpty(value: any) {
    return value === undefined || value === null
}

function _searchProtocolVersion(name: string, dependencies: any) {
    let value = dependencies[name]

    if (_isEmpty(value)) {
        console.log(dependencies);
        _throwError("empty name: " + name)
    }

    return value
}

function _isProtocol(protocolName: string) {
    return /-protocol$/.test(protocolName)
}


function _convertToExtensionOrContributePackageData({ name, version, protocol, displayName, repoLink, description, dependencies }: any, account): any {
    return {
        name,
        version,
        account,
        displayName: _isEmpty(displayName) ? name : displayName,
        repoLink: _isEmpty(repoLink) ? "" : repoLink,
        description: _isEmpty(description) ? "" : description,
        protocol: {
            name: protocol.name,
            version: _searchProtocolVersion(protocol.name, dependencies)
        },
        dependentBlockProtocolNameMap: Object.fromEntries(Object
            .entries(dependencies)
            .filter(([protocolName, protocolVersion]: [string, string]) => _isProtocol(protocolName) && protocolName != protocol.name
            )
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
                        _convertToExtensionOrContributePackageData(packageJson, account),
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

                            let packageData = _convertToExtensionOrContributePackageData(packageJson, account)

                            let data = {
                                protocolName: packageData.protocol.name,
                                protocolVersion: packageData.protocol.version,
                                name: packageJson.name,
                                version: packageJson.version,
                                displayName: packageData.displayName,
                                repoLink: packageData.repoLink,
                                description: packageData.description,
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

