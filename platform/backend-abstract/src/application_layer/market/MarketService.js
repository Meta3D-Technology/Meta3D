"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPublishImplement = exports.getAllPublishImplementInfo = exports.batchFindPublishProtocolConfigData = exports.getAllPublishProtocolConfigData = exports.getAllPublishProtocolDataCount = exports.batchFindPublishProtocolData = exports.getAllPublishProtocolData = void 0;
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
let _batchFindPublishProtocolData = ([batchFindMarketProtocolCollection, getDataFromMarketProtocolCollectionFunc, mapFunc], collectionName, protocolNames) => {
    return (0, most_1.fromPromise)(batchFindMarketProtocolCollection(collectionName, protocolNames)).map((res) => {
        let resData = getDataFromMarketProtocolCollectionFunc(res);
        return resData.map(mapFunc);
    });
};
let batchFindPublishProtocolData = ([batchFindMarketProtocolCollection, getDataFromMarketProtocolCollectionFunc], collectionName, protocolNames) => {
    return _batchFindPublishProtocolData([batchFindMarketProtocolCollection, getDataFromMarketProtocolCollectionFunc,
        ({ name, version, account, iconBase64, displayName, repoLink, description }) => {
            return { name, version, account, iconBase64, displayName, repoLink, description };
        }
    ], collectionName, protocolNames);
};
exports.batchFindPublishProtocolData = batchFindPublishProtocolData;
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
let batchFindPublishProtocolConfigData = ([batchFindMarketProtocolCollection, getDataFromMarketProtocolCollectionFunc], collectionName, protocolNames) => {
    return _batchFindPublishProtocolData([batchFindMarketProtocolCollection, getDataFromMarketProtocolCollectionFunc,
        ({ name, version, account, configStr }) => {
            return { name, version, account, configStr };
        }
    ], collectionName, protocolNames);
};
exports.batchFindPublishProtocolConfigData = batchFindPublishProtocolConfigData;
let getAllPublishImplementInfo = ([getMarketImplementCollectionFunc, mapMarketImplementCollectionFunc, filterMarketImplementCollection, getAccountFromMarketImplementCollectionDataFunc,], collectionName, limitCount, skipCount, protocolName, protocolVersion) => {
    return (0, most_1.fromPromise)(getMarketImplementCollectionFunc(collectionName, limitCount, skipCount, {
        protocolName: protocolName
    })).flatMap((res) => {
        return (0, most_1.fromPromise)((0, most_1.mergeArray)(mapMarketImplementCollectionFunc(filterMarketImplementCollection(res, (marketImplementCollectionData => {
            return (0, semver_1.satisfies)(protocolVersion, marketImplementCollectionData.protocolVersion);
        })), (marketImplementCollectionData) => {
            let account = getAccountFromMarketImplementCollectionDataFunc(marketImplementCollectionData);
            let { fileID, name, version, displayName, repoLink, description } = marketImplementCollectionData;
            return (0, most_1.just)({
                id: fileID, name, version, account,
                displayName, repoLink, description
            });
        })).reduce((result, data) => {
            result.push(data);
            return result;
        }, []));
    });
};
exports.getAllPublishImplementInfo = getAllPublishImplementInfo;
let findPublishImplement = ([getMarketImplementFunc, downloadFileFunc], collectionName, limitCount, skipCount, account, name, version) => {
    return (0, most_1.fromPromise)(getMarketImplementFunc(collectionName, limitCount, skipCount, account, name, version)).flatMap((data) => {
        if ((0, NullableUtils_1.isNullable)(data)) {
            return (0, most_1.just)(null);
        }
        return downloadFileFunc((0, NullableUtils_1.getExn)(data).fileID);
    });
};
exports.findPublishImplement = findPublishImplement;
//# sourceMappingURL=MarketService.js.map