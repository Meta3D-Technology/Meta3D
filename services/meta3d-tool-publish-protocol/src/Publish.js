"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishContributeConfig = exports.publish = void 0;
const most_1 = require("most");
const PublishUtils_1 = require("meta3d-tool-utils/src/publish/PublishUtils");
function _throwError(msg) {
    throw new Error(msg);
}
function _getPublishedCollectionName(fileType) {
    switch (fileType) {
        case "extension":
            return "publishedExtensionProtocols";
        case "contribute":
            return "publishedContributeProtocols";
    }
}
function _isPNG(iconPath) {
    return iconPath.match(/\.png$/) !== null;
}
function publish([readFileSyncFunc, logFunc, errorFunc, readJsonFunc, initFunc, hasDataFunc, getCollectionFunc, addDataFunc], packageFilePath, iconPath, fileType) {
    return readJsonFunc(packageFilePath).flatMap(packageJson => {
        return initFunc().map(app => [app, packageJson]);
    }).flatMap(([app, packageJson]) => {
        return (0, PublishUtils_1.isPublisherRegistered)(hasDataFunc, app, packageJson.publisher).flatMap(isPublisherRegistered => {
            if (!isPublisherRegistered) {
                _throwError("publishser没有注册");
            }
            if (!_isPNG(iconPath)) {
                _throwError("icon's format should be png");
            }
            return (0, most_1.fromPromise)(getCollectionFunc(app, _getPublishedCollectionName(fileType)).then(res => {
                let index = res.data.findIndex(({ name, version }) => {
                    return name === packageJson.name && version === packageJson.version;
                });
                if (index !== -1) {
                    _throwError("version: " + packageJson.version + " already exist, please update version");
                }
                return addDataFunc(app, _getPublishedCollectionName(fileType), {
                    name: packageJson.name,
                    version: packageJson.version,
                    username: packageJson.publisher,
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
function publishContributeConfig([readFileSyncFunc, logFunc, errorFunc, readJsonFunc, initFunc, hasDataFunc, getCollectionFunc, addDataFunc], packageFilePath, distFilePath) {
    return readJsonFunc(packageFilePath).flatMap(packageJson => {
        return initFunc().map(app => [app, packageJson]);
    }).flatMap(([app, packageJson]) => {
        return (0, PublishUtils_1.isPublisherRegistered)(hasDataFunc, app, packageJson.publisher).flatMap(isPublisherRegistered => {
            if (!isPublisherRegistered) {
                _throwError("publishser没有注册");
            }
            let collectioName = "publishedContributeProtocolConfigs";
            return (0, most_1.fromPromise)(getCollectionFunc(app, collectioName).then(res => {
                let index = res.data.findIndex(({ name, version }) => {
                    return name === packageJson.name && version === packageJson.version;
                });
                if (index !== -1) {
                    _throwError("version: " + packageJson.version + " already exist, please update version");
                }
                return addDataFunc(app, collectioName, {
                    name: packageJson.name,
                    version: packageJson.version,
                    username: packageJson.publisher,
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
exports.publishContributeConfig = publishContributeConfig;
//# sourceMappingURL=Publish.js.map