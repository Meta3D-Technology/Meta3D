"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishContribute = exports.publishExtension = exports._publish = void 0;
const fs_1 = __importDefault(require("fs"));
const read_package_json_1 = __importDefault(require("read-package-json"));
const meta3d_1 = require("meta3d");
const CloundbaseService_1 = require("./CloundbaseService");
const most_1 = require("most");
function _throwError(msg) {
    throw new Error(msg);
}
function _checkNotEmpty(value) {
    return value === undefined || value === null ?
        _throwError("empty") : value;
}
function _searchProtocolVersion(name, dependencies) {
    return _checkNotEmpty(dependencies[name]);
}
function _convertToExtensionOrContributePackageData({ name, protocol, publisher, dependentExtensionNameMap, dependentContributeNameMap, dependencies }) {
    return {
        name,
        publisher,
        protocol: {
            name: protocol.name,
            version: _searchProtocolVersion(protocol.name, dependencies)
        },
        dependentExtensionNameMap: Object.fromEntries(Object
            .entries(dependentExtensionNameMap)
            .map(([key, { protocolName }]) => [key, { protocolName, protocolVersion: _searchProtocolVersion(protocolName, dependencies) }])),
        dependentContributeNameMap: Object.fromEntries(Object
            .entries(dependentContributeNameMap)
            .map(([key, { protocolName }]) => [key, { protocolName, protocolVersion: _searchProtocolVersion(protocolName, dependencies) }]))
    };
}
function _defineWindow() {
    global.window = {};
}
function _isPublisherRegistered(hasDataFunc, app, publisher) {
    return hasDataFunc(app, "user", { username: publisher });
}
function _getFileDirname(fileType) {
    switch (fileType) {
        case "extension":
            return "extensions";
        case "contribute":
            return "contributes";
    }
}
function _getPublishedCollectionName(fileType) {
    switch (fileType) {
        case "extension":
            return "publishedExtensions";
        case "contribute":
            return "publishedContributes";
    }
}
function _publish([readFileSyncFunc, logFunc, errorFunc, readJsonFunc, generateFunc, initFunc, hasDataFunc, uploadFileFunc, getDataFunc, updateDataFunc], packageFilePath, distFilePath, fileType) {
    return readJsonFunc(packageFilePath)
        .flatMap(packageJson => {
        return initFunc().map(app => [app, packageJson]);
    }).flatMap(([app, packageJson]) => {
        return _isPublisherRegistered(hasDataFunc, app, packageJson.publisher).flatMap(isPublisherRegistered => {
            if (!isPublisherRegistered) {
                _throwError("publishser没有注册");
            }
            _defineWindow();
            let packageData = _convertToExtensionOrContributePackageData(packageJson);
            return uploadFileFunc(_getFileDirname(fileType) + "/" + packageJson.name + "_" + packageJson.version + ".arrayBuffer", (0, CloundbaseService_1.arrayBufferToBuffer)(generateFunc(packageData, readFileSyncFunc(distFilePath, "utf-8")))).flatMap(({ fileID }) => {
                return (0, most_1.fromPromise)(getDataFunc(app, _getPublishedCollectionName(fileType), { username: packageJson.publisher }).then(res => {
                    let { fileData } = res.data[0];
                    let index = fileData.findIndex(({ protocolName, protocolVersion, version }) => {
                        return protocolName === packageJson.protocol.name
                            // && protocolVersion === packageJson.protocol.version
                            && version === packageJson.version;
                    });
                    let newFileData = [];
                    let data = {
                        protocolName: packageData.protocol.name,
                        protocolVersion: packageData.protocol.version,
                        version: packageJson.version,
                        fileID
                    };
                    if (index === -1) {
                        newFileData = fileData.concat([data]);
                    }
                    else {
                        newFileData = fileData.slice();
                        newFileData[index] = data;
                    }
                    return updateDataFunc(app, _getPublishedCollectionName(fileType), { username: packageJson.publisher }, {
                        fileData: newFileData
                    });
                }));
            });
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
function _buildReadJsonFunc(packageFilePath) {
    return (0, most_1.fromPromise)(new Promise((resolve, reject) => {
        (0, read_package_json_1.default)(packageFilePath, null, false, (err, packageJson) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(packageJson);
        });
    }));
}
function publishExtension(packageFilePath, distFilePath) {
    return _publish([
        fs_1.default.readFileSync,
        console.log,
        console.error,
        _buildReadJsonFunc(packageFilePath),
        meta3d_1.generateExtension, CloundbaseService_1.init, CloundbaseService_1.hasData, CloundbaseService_1.uploadFile, CloundbaseService_1.getData, CloundbaseService_1.updateData
    ], packageFilePath, distFilePath, "extension");
}
exports.publishExtension = publishExtension;
function publishContribute(packageFilePath, distFilePath) {
    return _publish([
        fs_1.default.readFileSync,
        console.log,
        console.error,
        _buildReadJsonFunc(packageFilePath),
        meta3d_1.generateContribute, CloundbaseService_1.init, CloundbaseService_1.hasData, CloundbaseService_1.uploadFile, CloundbaseService_1.getData, CloundbaseService_1.updateData
    ], packageFilePath, distFilePath, "contribute");
}
exports.publishContribute = publishContribute;
// publishExtension(path.join(__dirname, "../mine/test_data/", "package.json"), path.join(__dirname, "../mine/test_data/", "main.js"))
// publishExtension(path.join(__dirname, "../mine/t/", "package.json"), path.join(__dirname, "../mine/t/", "main.js"))
//# sourceMappingURL=Main.js.map