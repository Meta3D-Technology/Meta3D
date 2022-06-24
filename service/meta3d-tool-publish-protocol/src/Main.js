"use strict";
// TODO refactor: duplicate with tool-publish
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishContribute = exports.publishExtensionProtocol = void 0;
const fs_1 = __importDefault(require("fs"));
// import path from "path"
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
function _publish(packageFilePath, fileType) {
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
                let { protocols } = res.data[0];
                return (0, CloundbaseService_1.getDatabase)(app).collection(_getPublishedCollectionName(fileType))
                    .where({ username: packageJson.publisher })
                    .update({
                    protocols: protocols.find(({ name, version }) => {
                        name === packageJson.name && version === packageJson.version;
                    }) ? protocols : protocols.concat([{
                            name: packageJson.name,
                            version: packageJson.version, iconBase64: 
                            // TODO check file size should be small(< 10kb)
                            fs_1.default.readFileSync(packageJson.icon, "base64")
                        }])
                });
            }));
        });
    }).drain()
        .then(_ => {
        console.log("publish success");
    })
        .catch(e => {
        console.error("error message: ", e);
    });
}
function publishExtensionProtocol(packageFilePath) {
    return _publish(packageFilePath, "extension");
}
exports.publishExtensionProtocol = publishExtensionProtocol;
function publishContribute(packageFilePath) {
    return _publish(packageFilePath, "contribute");
}
exports.publishContribute = publishContribute;
// publishExtension(path.join(__dirname, "../mine/test_data/", "package.json"), path.join(__dirname, "../mine/test_data/", "main.js"))
// publishExtension(path.join(__dirname, "../mine/t/", "package.json"), path.join(__dirname, "../mine/t/", "main.js"))
//# sourceMappingURL=Main.js.map