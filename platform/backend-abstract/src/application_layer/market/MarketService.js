"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPublishImplement = exports.getAllPublishImplementInfo = exports.getAllPublishProtocolConfigData = exports.getAllPublishProtocolDataCount = exports.getAllPublishProtocolData = void 0;
const most_1 = require("most");
const semver_1 = require("semver");
const NullableUtils_1 = require("../../utils/NullableUtils");
let getAllPublishProtocolData = ([getMarketProtocolCollectionFunc, getDataFromMarketProtocolCollectionFunc], collectionName, limitCount, skipCount) => {
    return (0, most_1.fromPromise)(getMarketProtocolCollectionFunc(collectionName, limitCount, skipCount)).map((res) => {
        let resData = getDataFromMarketProtocolCollectionFunc(res);
        return resData.map(({ name, version, account, iconBase64, displayName, repoLink, description }) => {
            return { name, version, account, iconBase64, displayName, repoLink, description };
        });
    });
};
exports.getAllPublishProtocolData = getAllPublishProtocolData;
let getAllPublishProtocolDataCount = (getMarketProtocolCollectionCount, collectionName) => {
    return (0, most_1.fromPromise)(getMarketProtocolCollectionCount(collectionName));
};
exports.getAllPublishProtocolDataCount = getAllPublishProtocolDataCount;
let getAllPublishProtocolConfigData = ([getMarketProtocolCollectionFunc, getDataFromMarketProtocolCollectionFunc], collectionName, limitCount, skipCount) => {
    return (0, most_1.fromPromise)(getMarketProtocolCollectionFunc(collectionName, limitCount, skipCount)).map((res) => {
        let resData = getDataFromMarketProtocolCollectionFunc(res);
        return resData.map(({ name, version, account, configStr }) => {
            return { name, version, account, configStr };
        });
    });
};
exports.getAllPublishProtocolConfigData = getAllPublishProtocolConfigData;
let getAllPublishImplementInfo = ([getMarketImplementCollectionFunc, mapMarketImplementCollectionFunc, getAccountFromMarketImplementCollectionDataFunc, getFileDataFromMarketImplementCollectionDataFunc,], collectionName, limitCount, skipCount, protocolName, protocolVersion) => {
    return (0, most_1.fromPromise)(getMarketImplementCollectionFunc(collectionName, limitCount, skipCount)).flatMap((res) => {
        // console.log(JSON.stringify( res.data))
        return (0, most_1.fromPromise)((0, most_1.mergeArray)(mapMarketImplementCollectionFunc(res, (marketImplementCollectionData) => {
            let account = getAccountFromMarketImplementCollectionDataFunc(marketImplementCollectionData);
            let fileData = getFileDataFromMarketImplementCollectionDataFunc(marketImplementCollectionData);
            let result = fileData.filter(data => {
                return data.protocolName === protocolName &&
                    (0, semver_1.satisfies)(protocolVersion, data.protocolVersion);
            });
            if (result.length === 0) {
                return (0, most_1.empty)();
            }
            return (0, most_1.from)(result.map(({ fileID, name, version, displayName, repoLink, description }) => {
                return {
                    id: fileID, name, version, account,
                    displayName, repoLink, description
                };
            }));
        })).reduce((result, data) => {
            result.push(data);
            return result;
        }, []));
    });
};
exports.getAllPublishImplementInfo = getAllPublishImplementInfo;
let findPublishImplement = ([getMarketImplementFunc, downloadFileFunc], collectionName, account, name, version) => {
    return (0, most_1.fromPromise)(getMarketImplementFunc(collectionName, account, name, version)).flatMap((data) => {
        if ((0, NullableUtils_1.isNullable)(data)) {
            return (0, most_1.just)(null);
        }
        return downloadFileFunc((0, NullableUtils_1.getExn)(data).fileID);
    });
};
exports.findPublishImplement = findPublishImplement;
