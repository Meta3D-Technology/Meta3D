"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishConfig = exports.publish = void 0;
const most_1 = require("most");
const PublishUtils_1 = require("meta3d-tool-utils/src/publish/PublishUtils");
function _throwError(msg) {
    throw new Error(msg);
}
function _getPublishedCollectionName(fileType) {
    switch (fileType) {
        case "extension":
            return "publishedextensionprotocols";
        case "contribute":
            return "publishedcontributeprotocols";
    }
}
function _isPNG(iconPath) {
    return iconPath.match(/\.png$/) !== null;
}
function publish([readFileSyncFunc, logFunc, errorFunc, readJsonFunc, initFunc, hasAccountFunc, getShopProtocolCollectionFunc, isContainFunc, addDataToShopProtocolCollectionFunc, addShopProtocolDataToDataFromShopProtocolCollectionDataFunc, getDataFromShopProtocolCollectionFunc, parseShopCollectionDataBodyFunc], packageFilePath, iconPath, fileType) {
    return readJsonFunc(packageFilePath).flatMap(packageJson => {
        return initFunc().map(backendInstance => [backendInstance, packageJson]);
    }).flatMap(([backendInstance, packageJson]) => {
        let account = packageJson.publisher;
        return (0, PublishUtils_1.isPublisherRegistered)(hasAccountFunc, backendInstance, account).flatMap(isPublisherRegistered => {
            if (!isPublisherRegistered) {
                _throwError("找不到publishser，请至少登录过一次");
            }
            if (!_isPNG(iconPath)) {
                _throwError("icon's format should be png");
            }
            return (0, most_1.fromPromise)(getShopProtocolCollectionFunc(backendInstance, parseShopCollectionDataBodyFunc, _getPublishedCollectionName(fileType)).then(res => {
                let resData = getDataFromShopProtocolCollectionFunc(res);
                return isContainFunc(({ name, version }) => {
                    return name === packageJson.name && version === packageJson.version;
                }, resData).then(isContain => [isContain, resData]);
            }).then(([isContain, resData]) => {
                if (isContain) {
                    _throwError("version: " + packageJson.version + " already exist, please update version");
                }
                return addDataToShopProtocolCollectionFunc(backendInstance, addShopProtocolDataToDataFromShopProtocolCollectionDataFunc, _getPublishedCollectionName(fileType), _getPublishedCollectionName(fileType), resData, {
                    name: packageJson.name,
                    version: packageJson.version,
                    account: account,
                    iconBase64: 
                    // TODO check file size should be small(< 10kb)
                    // TODO icon can be any format include png
                    "data:image/png;base64, " + readFileSyncFunc(iconPath, "base64")
                });
            }));
        });
    }).drain()
        .then(_ => {
        logFunc("publish success");
    })
        .catch(e => {
        errorFunc("error message: ", e);
    });
}
exports.publish = publish;
function _getPublishedConfigCollectionName(fileType) {
    switch (fileType) {
        case "extension":
            return "publishedextensionprotocolconfigs";
        case "contribute":
            return "publishedcontributeprotocolconfigs";
    }
}
function publishConfig([readFileSyncFunc, logFunc, errorFunc, readJsonFunc, initFunc, hasAccountFunc, getShopProtocolCollectionFunc, isContainFunc, addDataToShopProtocolCollectionFunc, addShopProtocolDataToDataFromShopProtocolCollectionDataFunc, getDataFromShopProtocolCollectionFunc, parseShopCollectionDataBodyFunc], packageFilePath, distFilePath, fileType) {
    return readJsonFunc(packageFilePath).flatMap(packageJson => {
        return initFunc().map(backendInstance => [backendInstance, packageJson]);
    }).flatMap(([backendInstance, packageJson]) => {
        let account = packageJson.publisher;
        return (0, PublishUtils_1.isPublisherRegistered)(hasAccountFunc, backendInstance, account).flatMap(isPublisherRegistered => {
            if (!isPublisherRegistered) {
                _throwError("找不到publishser，请至少登录过一次");
            }
            let collectioName = _getPublishedConfigCollectionName(fileType);
            return (0, most_1.fromPromise)(getShopProtocolCollectionFunc(backendInstance, parseShopCollectionDataBodyFunc, collectioName).then(res => {
                let resData = getDataFromShopProtocolCollectionFunc(res);
                return isContainFunc(({ name, version }) => {
                    return name === packageJson.name && version === packageJson.version;
                }, resData).then(isContain => [isContain, resData]);
            }).then(([isContain, resData]) => {
                if (isContain) {
                    _throwError("version: " + packageJson.version + " already exist, please update version");
                }
                return addDataToShopProtocolCollectionFunc(backendInstance, addShopProtocolDataToDataFromShopProtocolCollectionDataFunc, collectioName, collectioName, resData, {
                    name: packageJson.name,
                    version: packageJson.version,
                    account: packageJson.publisher,
                    configStr: 
                    // TODO check file size should be small(< 10kb)
                    readFileSyncFunc(distFilePath, "utf8")
                });
            }));
        });
    }).drain()
        .then(_ => {
        logFunc("publish config success");
    })
        .catch(e => {
        errorFunc("error message: ", e);
    });
}
exports.publishConfig = publishConfig;
//# sourceMappingURL=Publish.js.map