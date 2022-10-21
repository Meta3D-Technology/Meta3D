"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publish = void 0;
const most_1 = require("most");
const PublishUtils_1 = require("meta3d-tool-utils/src/publish/PublishUtils");
function _arrayBufferToBuffer(arrayBuffer) {
    return Buffer.from(arrayBuffer);
}
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
            return "publishedextensions";
        case "contribute":
            return "publishedcontributes";
    }
}
function publish([readFileSyncFunc, logFunc, errorFunc, readJsonFunc, generateFunc, initFunc, hasDataFunc, uploadFileFunc, getDataFunc, updateDataFunc], packageFilePath, distFilePath, fileType) {
    return readJsonFunc(packageFilePath)
        .flatMap(packageJson => {
        return initFunc().map(app => [app, packageJson]);
    }).flatMap(([app, packageJson]) => {
        return (0, PublishUtils_1.isPublisherRegistered)(hasDataFunc, app, packageJson.publisher).flatMap(isPublisherRegistered => {
            if (!isPublisherRegistered) {
                _throwError("publishser没有注册");
            }
            _defineWindow();
            let packageData = _convertToExtensionOrContributePackageData(packageJson);
            return (0, most_1.fromPromise)(getDataFunc(app, _getPublishedCollectionName(fileType), { username: packageJson.publisher }).then(res => {
                let { fileData } = res.data[0];
                let index = fileData.findIndex(({ protocolName, protocolVersion, name, version }) => {
                    return protocolName === packageJson.protocol.name
                        && name === packageJson.name
                        && version === packageJson.version;
                });
                if (index !== -1) {
                    _throwError("version: " + packageJson.version + " already exist, please update version");
                }
            })).flatMap(_ => uploadFileFunc(app, _getFileDirname(fileType) + "/" + packageJson.name + "_" + packageJson.version + ".arrayBuffer", _arrayBufferToBuffer(generateFunc(packageData, readFileSyncFunc(distFilePath, "utf-8")))).flatMap(({ fileID }) => {
                return (0, most_1.fromPromise)(getDataFunc(app, _getPublishedCollectionName(fileType), { username: packageJson.publisher }).then(res => {
                    let { fileData } = res.data[0];
                    let newFileData = [];
                    let data = {
                        protocolName: packageData.protocol.name,
                        protocolVersion: packageData.protocol.version,
                        name: packageJson.name,
                        version: packageJson.version,
                        fileID
                    };
                    newFileData = fileData.concat([data]);
                    return updateDataFunc(app, _getPublishedCollectionName(fileType), { username: packageJson.publisher }, {
                        fileData: newFileData
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
}
exports.publish = publish;
//# sourceMappingURL=Publish.js.map