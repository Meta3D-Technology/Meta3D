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
            return "publishedextensions";
        case "contribute":
            return "publishedcontributes";
    }
}
function _publish([logFunc, errorFunc, uploadFileFunc, getShopImplementAccountDataFunc, updateShopImplementDataFunc, getDataFromShopImplementAccountDataFunc, isContainFunc, buildShopImplementAccountDataFunc, addShopImplementDataToDataFromShopImplementCollectionDataFunc, getFileIDFunc, parseShopCollectionDataBodyFunc], account, [name, version, protocolName, protocolVersion], binaryFile, fileType) {
    let filePath = _getFileDirname(fileType) + "/" + name + "_" + version + ".arrayBuffer";
    let fileName = name;
    return (0, most_1.fromPromise)(getShopImplementAccountDataFunc(parseShopCollectionDataBodyFunc, _getPublishedCollectionName(fileType), account).then(([shopImplementAccountData, _]) => {
        let resData = getDataFromShopImplementAccountDataFunc(shopImplementAccountData);
        return isContainFunc((data) => {
            return data.name === name
                && data.version === version;
        }, resData);
    }).then((isContain) => {
        if (isContain) {
            errorFunc("version: " + version + " already exist, please update version");
        }
    })).flatMap(_ => uploadFileFunc(logFunc, filePath, binaryFile, fileName).flatMap((uploadData) => {
        let fileID = getFileIDFunc(uploadData, filePath);
        return (0, most_1.fromPromise)(getShopImplementAccountDataFunc(parseShopCollectionDataBodyFunc, _getPublishedCollectionName(fileType), account).then(([shopImplementAccountData, shopImplementAllCollectionData]) => {
            let resData = getDataFromShopImplementAccountDataFunc(shopImplementAccountData);
            let data = {
                protocolName: protocolName,
                protocolVersion: protocolVersion,
                name: name,
                version: version,
                fileID
            };
            return addShopImplementDataToDataFromShopImplementCollectionDataFunc(resData, data).then(resData => {
                return updateShopImplementDataFunc(_getPublishedCollectionName(fileType), account, buildShopImplementAccountDataFunc(resData, account), shopImplementAllCollectionData);
            });
        }));
    }));
}
function publishElementContribute(funcArr, account, packageData, contributeBinaryFile) {
    return _publish(funcArr, account, packageData, contributeBinaryFile, "contribute");
}
exports.publishElementContribute = publishElementContribute;
function publishElementAssembleData([errorFunc, getShopImplementAccountDataFunc, updateShopImplementDataFunc, getDataFromShopImplementAccountDataFunc, isContainFunc, buildShopImplementAccountDataFunc, addShopImplementDataToDataFromShopImplementCollectionDataFunc, parseShopCollectionDataBodyFunc], account, elementName, elementVersion, inspectorData) {
    return (0, most_1.fromPromise)(getShopImplementAccountDataFunc(parseShopCollectionDataBodyFunc, "publishedelementassembledata", account).then(([shopImplementAccountData, shopImplementAllCollectionData]) => {
        let resData = getDataFromShopImplementAccountDataFunc(shopImplementAccountData);
        return isContainFunc((fileData) => {
            return fileData.elementName === elementName
                && fileData.elementVersion === elementVersion;
        }, resData).then((isContain) => {
            if (isContain) {
                errorFunc("version: " + elementVersion + " already exist, please update version");
            }
        }).then(_ => {
            let resData = getDataFromShopImplementAccountDataFunc(shopImplementAccountData);
            let data = {
                elementName,
                elementVersion,
                inspectorData
            };
            return addShopImplementDataToDataFromShopImplementCollectionDataFunc(resData, data).then(resData => {
                return updateShopImplementDataFunc("publishedelementassembledata", account, buildShopImplementAccountDataFunc(resData, account), shopImplementAllCollectionData);
            });
        });
    }));
}
exports.publishElementAssembleData = publishElementAssembleData;
