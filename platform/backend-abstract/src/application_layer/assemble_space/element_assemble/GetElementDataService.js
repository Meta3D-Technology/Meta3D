"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllElementAssembleData = exports.getElementAssembleData = exports.getAllPublishNewestData = void 0;
const meta3d_backend_cloudbase_1 = require("meta3d-backend-cloudbase");
const most_1 = require("most");
const semver_1 = require("semver");
let getAllPublishNewestData = ([getMarketImplementCollectionFunc, mapMarketImplementCollectionFunc, getAccountFromMarketImplementCollectionDataFunc, downloadFileFunc], collectionName, limitCount, skipCount, protocolName) => {
    return (0, most_1.fromPromise)(getMarketImplementCollectionFunc(collectionName, limitCount, skipCount, {
        protocolName: protocolName
    })).flatMap((res) => {
        return (0, most_1.fromPromise)((0, most_1.mergeArray)(mapMarketImplementCollectionFunc(res, (marketImplementCollectionData) => {
            let account = getAccountFromMarketImplementCollectionDataFunc(marketImplementCollectionData);
            let { fileID, version, protocolVersion } = marketImplementCollectionData;
            return downloadFileFunc(fileID).map(arrayBuffer => {
                return {
                    id: fileID, file: arrayBuffer, version, account,
                    protocolVersion: (0, semver_1.minVersion)(protocolVersion),
                };
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
let getElementAssembleData = (getMarketImplementAccountDataWithWhereDataFunc, account, elementName, elementVersion) => {
    return (0, most_1.fromPromise)(getMarketImplementAccountDataWithWhereDataFunc("publishedelementassembledata", {
        key: (0, meta3d_backend_cloudbase_1.handleKeyToLowercase)(account),
        elementName,
        elementVersion
    }))
        .flatMap((marketImplementAccountData) => {
        if (marketImplementAccountData.length === 0) {
            return (0, most_1.just)(null);
        }
        return (0, most_1.just)(marketImplementAccountData[0]);
    });
};
exports.getElementAssembleData = getElementAssembleData;
let findAllElementAssembleData = (getDataFunc, limitCount, skipCount) => {
    return (0, most_1.fromPromise)(getDataFunc("publishedelementassembledata", limitCount, skipCount)).flatMap((data) => {
        return (0, most_1.just)(data.map(({ account, elementName, elementVersion, inspectorData, customInputs, customActions, }) => {
            return {
                account,
                elementName,
                elementVersion,
                inspectorData,
                customInputs,
                customActions,
            };
        }));
    });
};
exports.findAllElementAssembleData = findAllElementAssembleData;
//# sourceMappingURL=GetElementDataService.js.map