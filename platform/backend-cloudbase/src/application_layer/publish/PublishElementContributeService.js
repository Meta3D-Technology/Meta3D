"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishElementAssembleData = exports.publishElementContribute = void 0;
const most_1 = require("most");
function _throwError(msg) {
    throw new Error(msg);
}
function _isPublisherRegistered(hasDataFunc, publisher) {
    return hasDataFunc("user", { username: publisher });
}
// function _defineWindow() {
//     (global as any).window = {}
// }
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
function _publish([logFunc, errorFunc, hasDataFunc, uploadFileFunc, getDataFunc, updateDataFunc], username, [name, version, protocolName, protocolVersion], binaryFile, fileType) {
    return _isPublisherRegistered(hasDataFunc, username).flatMap(_isPublisherRegistered => {
        if (!_isPublisherRegistered) {
            _throwError("publishser没有注册");
        }
        // _defineWindow()
        return (0, most_1.fromPromise)(getDataFunc(_getPublishedCollectionName(fileType), { username: username }).then(res => {
            let { fileData } = res.data[0];
            let index = fileData.findIndex(({ protocolName, protocolVersion, version }) => {
                return protocolName === protocolName
                    && version === version;
            });
            if (index !== -1) {
                _throwError("version: " + version + " already exist, please update version");
            }
        })).concat(uploadFileFunc(logFunc, _getFileDirname(fileType) + "/" + name + "_" + version + ".arrayBuffer", binaryFile).flatMap(({ fileID }) => {
            return (0, most_1.fromPromise)(getDataFunc(_getPublishedCollectionName(fileType), { username: username }).then(res => {
                let { fileData } = res.data[0];
                let newFileData = [];
                let data = {
                    protocolName: protocolName,
                    protocolVersion: protocolVersion,
                    version: version,
                    fileID
                };
                newFileData = fileData.concat([data]);
                return updateDataFunc(_getPublishedCollectionName(fileType), { username: username }, {
                    fileData: newFileData
                });
            }));
        }));
    }).drain()
        .then(_ => {
        logFunc("publish success");
    })
        .catch(e => {
        errorFunc("error message: ", e);
    });
}
function publishElementContribute([logFunc, errorFunc, hasDataFunc, uploadFileFunc, getDataFunc, updateDataFunc], username, packageData, contributeBinaryFile) {
    return _publish([logFunc, errorFunc, hasDataFunc, uploadFileFunc, getDataFunc, updateDataFunc], username, packageData, contributeBinaryFile, "contribute");
}
exports.publishElementContribute = publishElementContribute;
function publishElementAssembleData([logFunc, errorFunc, hasDataFunc, getDataFunc, updateDataFunc], username, elementName, elementVersion, inspectorData) {
    return _isPublisherRegistered(hasDataFunc, username).flatMap(isPublisherRegistered => {
        if (!isPublisherRegistered) {
            _throwError("publishser没有注册");
        }
        return (0, most_1.fromPromise)(getDataFunc("publishedElementAssembleData", {
            username: username
        }).then(res => {
            let { fileData } = res.data[0];
            let index = fileData.findIndex((fileData) => {
                return fileData.elementName === elementName
                    && fileData.elementVersion === elementVersion;
            });
            if (index !== -1) {
                _throwError("version: " + elementVersion + " already exist, please update version");
            }
            let newFileData = [];
            let data = {
                elementName,
                elementVersion,
                inspectorData
            };
            newFileData = fileData.concat([data]);
            return updateDataFunc("publishedElementAssembleData", { username: username }, {
                fileData: newFileData
            });
        }));
    }).drain()
        .then(_ => {
        logFunc("publish success");
    })
        .catch(e => {
        errorFunc("error message: ", e);
    });
}
exports.publishElementAssembleData = publishElementAssembleData;
