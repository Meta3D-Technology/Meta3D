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
function _publish([logFunc, errorFunc, uploadFileFunc, getMarketImplementAccountDataFunc, updateMarketImplementDataFunc, getDataFromMarketImplementAccountDataFunc, isContainFunc, buildMarketImplementAccountDataFunc, addMarketImplementDataToDataFromMarketImplementCollectionDataFunc, getFileIDFunc], account, [name, version, protocolName, protocolVersion], binaryFile, fileType) {
    let filePath = _getFileDirname(fileType) + "/" + name + "_" + version + ".arrayBuffer";
    let fileName = name;
    return (0, most_1.fromPromise)(getMarketImplementAccountDataFunc(_getPublishedCollectionName(fileType), account).then(([marketImplementAccountData, _]) => {
        let resData = getDataFromMarketImplementAccountDataFunc(marketImplementAccountData);
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
        return (0, most_1.fromPromise)(getMarketImplementAccountDataFunc(_getPublishedCollectionName(fileType), account).then(([marketImplementAccountData, marketImplementAllCollectionData]) => {
            let resData = getDataFromMarketImplementAccountDataFunc(marketImplementAccountData);
            let data = {
                protocolName: protocolName,
                protocolVersion: protocolVersion,
                name: name,
                version: version,
                fileID
            };
            return addMarketImplementDataToDataFromMarketImplementCollectionDataFunc(resData, data).then(resData => {
                return updateMarketImplementDataFunc(_getPublishedCollectionName(fileType), account, buildMarketImplementAccountDataFunc(resData, account), marketImplementAllCollectionData);
            });
        }));
    }));
}
function publishElementContribute(funcArr, account, packageData, contributeBinaryFile) {
    return _publish(funcArr, account, packageData, contributeBinaryFile, "contribute");
}
exports.publishElementContribute = publishElementContribute;
function publishElementAssembleData([errorFunc, getMarketImplementAccountDataFunc, updateMarketImplementDataFunc, getDataFromMarketImplementAccountDataFunc, isContainFunc, buildMarketImplementAccountDataFunc, addMarketImplementDataToDataFromMarketImplementCollectionDataFunc], account, elementName, elementVersion, inspectorData) {
    return (0, most_1.fromPromise)(getMarketImplementAccountDataFunc("publishedelementassembledata", account).then(([marketImplementAccountData, marketImplementAllCollectionData]) => {
        let resData = getDataFromMarketImplementAccountDataFunc(marketImplementAccountData);
        return isContainFunc((fileData) => {
            return fileData.elementName === elementName
                && fileData.elementVersion === elementVersion;
        }, resData).then((isContain) => {
            if (isContain) {
                errorFunc("version: " + elementVersion + " already exist, please update version");
            }
        }).then(_ => {
            let resData = getDataFromMarketImplementAccountDataFunc(marketImplementAccountData);
            let data = {
                elementName,
                elementVersion,
                inspectorData
            };
            return addMarketImplementDataToDataFromMarketImplementCollectionDataFunc(resData, data).then(resData => {
                return updateMarketImplementDataFunc("publishedelementassembledata", account, buildMarketImplementAccountDataFunc(resData, account), marketImplementAllCollectionData);
            });
        });
    }));
}
exports.publishElementAssembleData = publishElementAssembleData;
