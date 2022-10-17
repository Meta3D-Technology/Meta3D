"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishElementAssembleData = exports.publishElementContribute = void 0;
const most_1 = require("most");
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
function _publish([logFunc, errorFunc, uploadFileFunc, getDataFunc, updateDataFunc], username, [name, version, protocolName, protocolVersion], binaryFile, fileType) {
    return (0, most_1.fromPromise)(getDataFunc(_getPublishedCollectionName(fileType), { username: username }).then(res => {
        let { fileData } = res.data[0];
        let index = fileData.findIndex((data) => {
            return data.name === name
                && data.version === version;
        });
        if (index !== -1) {
            errorFunc("version: " + version + " already exist, please update version");
        }
    })).flatMap(_ => uploadFileFunc(logFunc, _getFileDirname(fileType) + "/" + name + "_" + version + ".arrayBuffer", binaryFile).flatMap((fileID) => {
        return (0, most_1.fromPromise)(getDataFunc(_getPublishedCollectionName(fileType), { username: username }).then(res => {
            let { fileData } = res.data[0];
            let newFileData = [];
            let data = {
                protocolName: protocolName,
                protocolVersion: protocolVersion,
                name: name,
                version: version,
                fileID
            };
            newFileData = fileData.concat([data]);
            return updateDataFunc(_getPublishedCollectionName(fileType), { username: username }, {
                fileData: newFileData
            });
        }));
    }));
    // .drain()
    // .then(_ => {
    //     logFunc("publish success")
    // })
    // .catch(e => {
    //     errorFunc("error message: ", e)
    // })
}
function publishElementContribute([logFunc, errorFunc, uploadFileFunc, getDataFunc, updateDataFunc], username, packageData, contributeBinaryFile) {
    return _publish([logFunc, errorFunc, uploadFileFunc, getDataFunc, updateDataFunc], username, packageData, contributeBinaryFile, "contribute");
}
exports.publishElementContribute = publishElementContribute;
function publishElementAssembleData([errorFunc, getDataFunc, updateDataFunc], username, elementName, elementVersion, inspectorData) {
    return (0, most_1.fromPromise)(getDataFunc("publishedElementAssembleData", {
        username: username
    }).then(res => {
        let { fileData } = res.data[0];
        let index = fileData.findIndex((fileData) => {
            return fileData.elementName === elementName
                && fileData.elementVersion === elementVersion;
        });
        if (index !== -1) {
            errorFunc("version: " + elementVersion + " already exist, please update version");
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
    // .drain()
    //     .then(_ => {
    //         logFunc("publish success")
    //     })
    //     .catch(e => {
    //         errorFunc("error message: ", e)
    //     })
}
exports.publishElementAssembleData = publishElementAssembleData;
