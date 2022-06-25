"use strict";
// TODO refactor: duplicate with tool-publish
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishedContributeProtocols = exports.publishExtensionProtocol = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const read_package_json_1 = __importDefault(require("read-package-json"));
const CloundbaseService_1 = require("./CloundbaseService");
const most_1 = require("most");
function _throwError(msg) {
    throw new Error(msg);
}
function _isPublisherRegistered(app, publisher) {
    return (0, CloundbaseService_1.hasData)(app, "user", { username: publisher });
}
function _getPublishedCollectionName(fileType) {
    switch (fileType) {
        case "extension":
            return "publishedExtensionProtocols";
        case "contribute":
            return "publishedContributeProtocols";
    }
}
function _publish(packageFilePath, iconPath, fileType) {
    return (0, most_1.fromPromise)(new Promise((resolve, reject) => {
        (0, read_package_json_1.default)(packageFilePath, null, false, (err, packageJson) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(packageJson);
        });
    })).flatMap(packageJson => {
        return (0, CloundbaseService_1.init)().map(app => [app, packageJson]);
    }).flatMap(([app, packageJson]) => {
        return _isPublisherRegistered(app, packageJson.publisher).flatMap(isPublisherRegistered => {
            if (!isPublisherRegistered) {
                _throwError("publishser没有注册");
            }
            return (0, most_1.fromPromise)((0, CloundbaseService_1.getDatabase)(app).collection(_getPublishedCollectionName(fileType))
                .where({ username: packageJson.publisher })
                .get()
                .then(res => {
                var _a, _b;
                let { protocols } = res.data[0];
                return (0, CloundbaseService_1.getDatabase)(app).collection(_getPublishedCollectionName(fileType))
                    .where({ username: packageJson.publisher })
                    .update({
                    protocols: protocols.find(({ name, version }) => {
                        name === packageJson.name && version === packageJson.version;
                    }) ? protocols : protocols.concat([(_b = (_a = {
                            name: packageJson.name,
                            version: packageJson.version, iconBase64: 
                            // TODO check file size should be small(< 10kb)
                            TODO, fix: base64, is, error
                        }) !== null && _a !== void 0 ? _a : ) !== null && _b !== void 0 ? _b : fs_1.default.readFileSync(iconPath, "base64")])
                });
            }));
        });
    });
}
drain()
    .then(_ => {
    console.log("publish success");
})
    .catch(e => {
    console.error("error message: ", e);
});
function publishExtensionProtocol(packageFilePath, iconPath) {
    return _publish(packageFilePath, iconPath, "extension");
}
exports.publishExtensionProtocol = publishExtensionProtocol;
function publishedContributeProtocols(packageFilePath, iconPath) {
    return _publish(packageFilePath, iconPath, "contribute");
}
exports.publishedContributeProtocols = publishedContributeProtocols;
publishExtensionProtocol(path_1.default.join(__dirname, "../../../protocols/extension_protocols/meta3d-editor-protocol/", "package.json"), path_1.default.join(__dirname, "../../../protocols/extension_protocols/meta3d-editor-protocol/", "icon.jpeg"));
//# sourceMappingURL=Main.js.map