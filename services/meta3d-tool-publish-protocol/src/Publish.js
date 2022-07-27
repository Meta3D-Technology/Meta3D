"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publish = void 0;
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
function publish([readFileSyncFunc, logFunc, errorFunc, readJsonFunc, initFunc, hasDataFunc, getDataFunc, updateDataFunc], packageFilePath, iconPath, fileType) {
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
            return (0, most_1.fromPromise)(getDataFunc(app, _getPublishedCollectionName(fileType), { username: packageJson.publisher }).then(res => {
                let { protocols } = res.data[0];
                let index = protocols.findIndex(({ name, version }) => {
                    return name === packageJson.name && version === packageJson.version;
                });
                let newProtocols = [];
                let protocol = {
                    name: packageJson.name,
                    version: packageJson.version, iconBase64: 
                    // TODO check file size should be small(< 10kb)
                    // TODO icon can be any format include png
                    "data:image/png;base64, " + readFileSyncFunc(iconPath, "base64")
                };
                if (index === -1) {
                    newProtocols = protocols.concat([protocol]);
                }
                else {
                    newProtocols = protocols.slice();
                    newProtocols[index] = protocol;
                }
                return updateDataFunc(app, _getPublishedCollectionName(fileType), { username: packageJson.publisher }, {
                    protocols: newProtocols
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
//# sourceMappingURL=Publish.js.map