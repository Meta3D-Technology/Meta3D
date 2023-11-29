"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishElementAssembleData = exports.publishElementContribute = void 0;
const meta3d_backend_cloudbase_1 = require("meta3d-backend-cloudbase");
const most_1 = require("most");
let _getFileDirname = (fileType) => {
    switch (fileType) {
        case "extension":
            return "extensions";
        case "contribute":
            return "contributes";
    }
};
let _getPublishedCollectionName = (fileType) => {
    switch (fileType) {
        case "extension":
            return "publishedextensions";
        case "contribute":
            return "publishedcontributes";
    }
};
function _publish([logFunc, errorFunc, uploadFileFunc, getMarketImplementAccountDataFunc, addMarketImplementData, getFileIDFunc], account, [name, version, protocolName, protocolVersion, displayName, repoLink, description], binaryFile, fileType) {
    let filePath = _getFileDirname(fileType) + "/" + name + "_" + version + ".arrayBuffer";
    let fileName = name;
    return (0, most_1.fromPromise)(getMarketImplementAccountDataFunc(_getPublishedCollectionName(fileType), account, name, version).then((marketImplementAccountData) => {
        if (marketImplementAccountData.length > 0) {
            errorFunc("version: " + version + " already exist, please update version");
        }
    })).flatMap(_ => uploadFileFunc(logFunc, filePath, binaryFile, fileName).flatMap((uploadData) => {
        let fileID = getFileIDFunc(uploadData, filePath);
        let data = {
            protocolName: protocolName,
            protocolVersion: protocolVersion,
            name: name,
            version: version,
            displayName,
            repoLink,
            description,
            fileID,
            key: (0, meta3d_backend_cloudbase_1.handleKeyToLowercase)(account)
        };
        return (0, most_1.fromPromise)(addMarketImplementData(_getPublishedCollectionName(fileType), data));
    }));
}
function publishElementContribute(funcArr, account, packageData, contributeBinaryFile) {
    return _publish(funcArr, account, packageData, contributeBinaryFile, "contribute");
}
exports.publishElementContribute = publishElementContribute;
function publishElementAssembleData([errorFunc, getMarketImplementAccountDataFunc, addMarketImplementData], account, elementName, elementVersion, inspectorData) {
    return (0, most_1.fromPromise)(getMarketImplementAccountDataFunc("publishedelementassembledata", account, elementName, elementVersion).then((marketImplementAccountData) => {
        if (marketImplementAccountData.length > 0) {
            errorFunc("version: " + elementVersion + " already exist, please update version");
        }
        let data = {
            account,
            elementName,
            elementVersion,
            inspectorData,
            key: (0, meta3d_backend_cloudbase_1.handleKeyToLowercase)(account)
        };
        return (0, most_1.fromPromise)(addMarketImplementData("publishedelementassembledata", data));
    }));
}
exports.publishElementAssembleData = publishElementAssembleData;
// export let findPublishNewestElementVersion = (getDataWithWhereData: any, account: string, elementName: string): Stream<nullable<string>> => {
//     return fromPromise(getDataWithWhereData("publishedelementassembledata", { account, elementName })).flatMap((data: any) => {
//         if (data.length === 0) {
//             return just(null)
//         }
//         return just(data[0].elementVersion)
//     })
// }
//# sourceMappingURL=PublishElementContributeService.js.map