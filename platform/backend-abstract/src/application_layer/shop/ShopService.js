"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPublishImplement = exports.getAllPublishImplementInfo = exports.getAllPublishProtocolConfigData = exports.getAllPublishProtocolData = void 0;
const most_1 = require("most");
const semver_1 = require("semver");
const NullableUtils_1 = require("../../utils/NullableUtils");
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
let getAllPublishImplementInfo = ([getShopImplementCollectionFunc, mapShopImplementCollectionFunc, getAccountFromShopImplementCollectionDataFunc, getFileDataFromShopImplementCollectionDataFunc,], collectionName, protocolName, protocolVersion) => {
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
            return (0, most_1.from)(result.map(({ fileID, name, version }) => {
                return { id: fileID, name, version, account: account };
            }));
        })).reduce((result, data) => {
            result.push(data);
            return result;
        }, []));
    });
};
exports.getAllPublishImplementInfo = getAllPublishImplementInfo;
let findPublishImplement = ([getShopImplementFunc, downloadFileFunc], collectionName, account, name, version) => {
    return (0, most_1.fromPromise)(getShopImplementFunc(collectionName, account, name, version)).flatMap((data) => {
        if ((0, NullableUtils_1.isNullable)(data)) {
            return (0, most_1.just)(null);
        }
        return downloadFileFunc((0, NullableUtils_1.getExn)(data).fileID);
    });
};
exports.findPublishImplement = findPublishImplement;
