"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishContributeProtocol = exports.publishExtensionProtocol = exports._publish = void 0;
const fs_1 = __importDefault(require("fs"));
// import path from "path"
const CloundbaseService_1 = require("meta3d-tool-utils/src/publish/CloudbaseService");
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
function _publish([readFileSyncFunc, logFunc, errorFunc, readJsonFunc, initFunc, hasDataFunc, getDataFunc, updateDataFunc], packageFilePath, iconPath, fileType) {
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
exports._publish = _publish;
function publishExtensionProtocol(packageFilePath, iconPath) {
    return _publish([
        fs_1.default.readFileSync,
        console.log,
        console.error,
        (0, PublishUtils_1.buildReadJsonFunc)(packageFilePath),
        CloundbaseService_1.init, CloundbaseService_1.hasData, CloundbaseService_1.getData, CloundbaseService_1.updateData
    ], packageFilePath, iconPath, "extension");
}
exports.publishExtensionProtocol = publishExtensionProtocol;
function publishContributeProtocol(packageFilePath, iconPath) {
    return _publish([
        fs_1.default.readFileSync,
        console.log,
        console.error,
        (0, PublishUtils_1.buildReadJsonFunc)(packageFilePath),
        CloundbaseService_1.init, CloundbaseService_1.hasData, CloundbaseService_1.getData, CloundbaseService_1.updateData
    ], packageFilePath, iconPath, "contribute");
}
exports.publishContributeProtocol = publishContributeProtocol;
// publishExtensionProtocol(path.join(__dirname, "../../../protocols/extension_protocols/meta3d-editor-protocol/", "package.json"), path.join(__dirname, "../../../protocols/extension_protocols/meta3d-editor-protocol/", "icon.png"))
//# sourceMappingURL=Main.js.map