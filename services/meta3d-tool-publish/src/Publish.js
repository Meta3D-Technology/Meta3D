"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publish = void 0;
const most_1 = require("most");
const PublishUtils_1 = require("meta3d-tool-utils/src/publish/PublishUtils");
let _throwError = (msg) => {
    throw new Error(msg);
};
let _isEmpty = (value) => {
    return value === undefined || value === null;
};
let _searchProtocolVersion = (name, dependencies) => {
    let value = dependencies[name];
    if (_isEmpty(value)) {
        console.log(dependencies);
        _throwError("empty name: " + name);
    }
    return value;
};
let _isProtocol = (protocolName) => {
    return /-protocol$/.test(protocolName);
};
let _convertToExtensionOrContributePackageData = ({ name, version, protocol, displayName, repoLink, description, dependencies }, account) => {
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
            .filter(([protocolName, protocolVersion]) => _isProtocol(protocolName) && protocolName != protocol.name))
    };
};
function _defineWindow() {
    global.window = {};
}
let _getFileDirname = (fileType) => {
    switch (fileType) {
        case "extension":
            return "extensions";
        case "contribute":
            return "contributes";
    }
};
let _getPublishedCollectionName = (fileType) => {
    switch (fileType) {
        case "extension":
            return "publishedextensions";
        case "contribute":
            return "publishedcontributes";
    }
};
let publish = ([readFileSyncFunc, logFunc, errorFunc, readJsonFunc, generateFunc, initFunc, hasAccountFunc, uploadFileFunc, getMarketImplementAccountDataFunc, updateMarketImplementDataFunc, getDataFromMarketImplementAccountDataFunc, isContainFunc, buildMarketImplementAccountDataFunc, addMarketImplementDataToDataFromMarketImplementCollectionDataFunc, getFileIDFunc, parseMarketCollectionDataBodyFunc], packageFilePath, distFilePath, fileType) => {
    return readJsonFunc(packageFilePath)
        .flatMap(packageJson => {
        return initFunc().map(backendInstance => [backendInstance, packageJson]);
    }).flatMap(([backendInstance, packageJson]) => {
        let account = packageJson.publisher;
        return (0, PublishUtils_1.isPublisherRegistered)(hasAccountFunc, backendInstance, account).flatMap(isPublisherRegistered => {
            if (!isPublisherRegistered) {
                _throwError("找不到publishser，请在平台上注册该用户");
            }
            _defineWindow();
            let filePath = _getFileDirname(fileType) + "/" + packageJson.name + "_" + packageJson.version + ".arrayBuffer";
            // TODO perf: only invoke getMarketImplementAccountDataFunc once
            return (0, most_1.fromPromise)(getMarketImplementAccountDataFunc(backendInstance, parseMarketCollectionDataBodyFunc, _getPublishedCollectionName(fileType), account).then(([marketImplementAccountData, _]) => {
                let resData = getDataFromMarketImplementAccountDataFunc(marketImplementAccountData);
                return isContainFunc(({ protocolName, protocolVersion, name, version }) => {
                    return protocolName === packageJson.protocol.name
                        && name === packageJson.name
                        && version === packageJson.version;
                }, resData);
            }).then((isContain) => {
                if (isContain) {
                    _throwError("version: " + packageJson.version + " already exist, please update version");
                }
            })).flatMap(_ => uploadFileFunc(backendInstance, filePath, generateFunc(_convertToExtensionOrContributePackageData(packageJson, account), readFileSyncFunc(distFilePath, "utf-8"))).flatMap((uploadData) => {
                let fileID = getFileIDFunc(uploadData, filePath);
                return (0, most_1.fromPromise)(getMarketImplementAccountDataFunc(backendInstance, parseMarketCollectionDataBodyFunc, _getPublishedCollectionName(fileType), account).then(([marketImplementAccountData, marketImplementAllCollectionData]) => {
                    let resData = getDataFromMarketImplementAccountDataFunc(marketImplementAccountData);
                    let packageData = _convertToExtensionOrContributePackageData(packageJson, account);
                    let data = {
                        protocolName: packageData.protocol.name,
                        protocolVersion: packageData.protocol.version,
                        name: packageJson.name,
                        version: packageJson.version,
                        displayName: packageData.displayName,
                        repoLink: packageData.repoLink,
                        description: packageData.description,
                        fileID
                    };
                    return addMarketImplementDataToDataFromMarketImplementCollectionDataFunc(resData, data).then(resData => {
                        return updateMarketImplementDataFunc(backendInstance, _getPublishedCollectionName(fileType), account, buildMarketImplementAccountDataFunc(resData, account), marketImplementAllCollectionData);
                    });
                }));
            }));
        });
    }).drain()
        .then(_ => {
        logFunc("publish success");
    })
        .catch(e => {
        errorFunc("error message: ", e);
    });
};
exports.publish = publish;
//# sourceMappingURL=Publish.js.map