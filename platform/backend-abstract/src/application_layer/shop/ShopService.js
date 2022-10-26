"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPublishData = exports.getAllPublishProtocolConfigData = exports.getAllPublishProtocolData = void 0;
const most_1 = require("most");
const semver_1 = require("semver");
let getAllPublishProtocolData = ([getShopProtocolCollectionFunc, getDataFromShopProtocolCollectionFunc], collectionName) => {
    return (0, most_1.fromPromise)(getShopProtocolCollectionFunc(collectionName)).map((res) => {
        let resData = getDataFromShopProtocolCollectionFunc(res);
        return resData.map(({ name, version, account, iconBase64 }) => {
            return { name, version, account, iconBase64 };
        });
    });
};
exports.getAllPublishProtocolData = getAllPublishProtocolData;
let getAllPublishProtocolConfigData = ([getShopProtocolCollectionFunc, getDataFromShopProtocolCollectionFunc], collectionName) => {
    return (0, most_1.fromPromise)(getShopProtocolCollectionFunc(collectionName)).map((res) => {
        let resData = getDataFromShopProtocolCollectionFunc(res);
        return resData.map(({ name, version, account, configStr }) => {
            return { name, version, account, configStr };
        });
    });
};
exports.getAllPublishProtocolConfigData = getAllPublishProtocolConfigData;
let getAllPublishData = ([getShopImplementCollectionFunc, mapShopImplementCollectionFunc, getAccountFromShopImplementCollectionDataFunc, getFileDataFromShopImplementCollectionDataFunc, downloadFileFunc], collectionName, protocolName, protocolVersion) => {
    return (0, most_1.fromPromise)(getShopImplementCollectionFunc(collectionName)).flatMap((res) => {
        return (0, most_1.fromPromise)((0, most_1.mergeArray)(mapShopImplementCollectionFunc(res, (shopImplementCollectionData) => {
            let account = getAccountFromShopImplementCollectionDataFunc(shopImplementCollectionData);
            let fileData = getFileDataFromShopImplementCollectionDataFunc(shopImplementCollectionData);
            let result = fileData.filter(data => {
                return data.protocolName === protocolName &&
                    (0, semver_1.satisfies)(protocolVersion, data.protocolVersion);
            });
            if (result.length === 0) {
                return (0, most_1.empty)();
            }
            return (0, most_1.from)(result.map(({ fileID, version }) => {
                return [fileID, version];
            })).flatMap(([fileID, version]) => {
                return downloadFileFunc(fileID).map(arrayBuffer => {
                    return { id: fileID, file: arrayBuffer, version, account: account };
                });
            });
        })).reduce((result, data) => {
            result.push(data);
            return result;
        }, []));
    });
};
exports.getAllPublishData = getAllPublishData;
