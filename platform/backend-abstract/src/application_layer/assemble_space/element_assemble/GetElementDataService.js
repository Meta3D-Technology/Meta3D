"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElementAssembleData = exports.getAllPublishNewestData = void 0;
const most_1 = require("most");
const semver_1 = require("semver");
let getAllPublishNewestData = ([getMarketImplementCollectionFunc, mapMarketImplementCollectionFunc, getAccountFromMarketImplementCollectionDataFunc, getFileDataFromMarketImplementCollectionDataFunc, downloadFileFunc], collectionName, protocolName) => {
    return (0, most_1.fromPromise)(getMarketImplementCollectionFunc(collectionName)).flatMap((res) => {
        return (0, most_1.fromPromise)((0, most_1.mergeArray)(mapMarketImplementCollectionFunc(res, (marketImplementCollectionData) => {
            let account = getAccountFromMarketImplementCollectionDataFunc(marketImplementCollectionData);
            let fileData = getFileDataFromMarketImplementCollectionDataFunc(marketImplementCollectionData);
            let result = fileData.filter(data => {
                return data.protocolName === protocolName;
            });
            if (result.length === 0) {
                return (0, most_1.empty)();
            }
            return (0, most_1.from)(result.map(({ fileID, version, protocolVersion }) => {
                return [fileID, version, protocolVersion];
            })).flatMap(([fileID, version, protocolVersion]) => {
                return downloadFileFunc(fileID).map(arrayBuffer => {
                    return {
                        id: fileID, file: arrayBuffer, version, account,
                        protocolVersion: (0, semver_1.minVersion)(protocolVersion),
                    };
                });
            });
        })).reduce((result, data) => {
            result.push(data);
            return result;
        }, []).then((result) => {
            result.sort((a, b) => {
                if ((0, semver_1.gt)(a.protocolVersion, b.protocolVersion)) {
                    return -1;
                }
                return 1;
            });
            return result.reduce((r, data) => {
                if (r.length > 0 && (0, semver_1.neq)(data.protocolVersion, r[0].protocolVersion)) {
                    return r;
                }
                r.push(data);
                return r;
            }, []).map(({ id, file, version, account }) => {
                return { id, file, version, account };
            });
        }));
    });
};
exports.getAllPublishNewestData = getAllPublishNewestData;
let getElementAssembleData = ([getMarketImplementAccountDataFunc, getDataFromMarketImplementAccountDataFunc], account, elementName, elementVersion) => {
    return (0, most_1.fromPromise)(getMarketImplementAccountDataFunc("publishedelementassembledata", account)).flatMap(([marketImplementAccountData, marketImplementAllCollectionData]) => {
        let fileData = getDataFromMarketImplementAccountDataFunc(marketImplementAccountData);
        let result = fileData.filter(data => {
            return data.elementName === elementName && data.elementVersion === elementVersion;
        });
        if (result.length === 0) {
            return (0, most_1.empty)();
        }
        return (0, most_1.just)(result[0]);
    });
};
exports.getElementAssembleData = getElementAssembleData;
