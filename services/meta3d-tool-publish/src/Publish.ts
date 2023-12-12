import { fromPromise } from "most";
import { isPublisherRegistered } from "meta3d-tool-utils/src/publish/PublishUtils"
import { handleKeyToLowercase } from "meta3d-backend-cloudbase";


let _throwError = (msg: string): never => {
    throw new Error(msg)
}

let _isEmpty = (value: any) => {
    return value === undefined || value === null
}

let _searchProtocolVersion = (name: string, dependencies: any) => {
    let value = dependencies[name]

    if (_isEmpty(value)) {
        //console.log(dependencies);
        _throwError("empty name: " + name)
    }

    return value
}

let _isProtocol = (protocolName: string) => {
    return /-protocol$/.test(protocolName)
}


let _convertToExtensionOrContributePackageData = ({ name, version, protocol, displayName, repoLink, description, dependencies, packageDependencies }: any, account): any => {
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
        dependentPackageStoredInAppProtocolNameMap:
            _isEmpty(packageDependencies) ? {} :
                Object.fromEntries(Object
                    .entries(packageDependencies)
                    .filter(([protocolName, protocolVersion]: [string, string]) => _isProtocol(protocolName)
                    )
                ),
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

export let publish = ([readFileSyncFunc, logFunc, errorFunc, readJsonFunc, generateFunc, initFunc, hasAccountFunc, uploadFileFunc, getMarketImplementAccountDataFunc, addMarketImplementDataFunc, getFileIDFunc, parseMarketCollectionDataBodyFunc]: [any, any, any, any, any, any, any, any, any, any, any, any,], packageFilePath: string, distFilePath: string, fileType: "extension" | "contribute") => {
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

                return fromPromise(
                    getMarketImplementAccountDataFunc(
                        backendInstance,
                        parseMarketCollectionDataBodyFunc,
                        _getPublishedCollectionName(fileType),
                        account,
                        packageJson.name,
                        packageJson.version,
                        packageJson.protocol.name
                    ).then((marketImplementAccountData) => {
                        if (marketImplementAccountData.length > 0) {
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

                    let packageData = _convertToExtensionOrContributePackageData(packageJson, account)

                    let data = {
                        protocolName: packageData.protocol.name,
                        protocolVersion: packageData.protocol.version,
                        name: packageJson.name,
                        version: packageJson.version,
                        displayName: packageData.displayName,
                        repoLink: packageData.repoLink,
                        description: packageData.description,
                        fileID,
                        key: handleKeyToLowercase(account)
                    }

                    return fromPromise(
                        addMarketImplementDataFunc(
                            backendInstance,
                            _getPublishedCollectionName(fileType),
                            data
                        )
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

// export let publishBundled = ([logFunc, errorFunc, readJsonFunc, generateFunc, initFunc, hasAccountFunc, uploadFileFunc, getMarketImplementAccountDataFunc, addMarketImplementDataFunc, getFileIDFunc, parseMarketCollectionDataBodyFunc]: [any, any, any, any, any, any, any, any, any, any, any,], packageFilePath: string, fileSource: string) => {
//     return publish(
//         [
//             (fileSource) => fileSource,
//             logFunc, errorFunc, readJsonFunc, generateFunc, initFunc, hasAccountFunc, uploadFileFunc, getMarketImplementAccountDataFunc, addMarketImplementDataFunc, getFileIDFunc, parseMarketCollectionDataBodyFunc
//         ], packageFilePath, fileSource, "contribute"
//     )
// }