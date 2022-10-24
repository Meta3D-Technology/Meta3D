"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElementAssembleData = exports.getAllPublishNewestData = void 0;
const most_1 = require("most");
const semver_1 = require("semver");
let getAllPublishNewestData = ([getShopCollectionFunc, getFileFunc], collectionName, protocolName) => {
    return (0, most_1.fromPromise)(getShopCollectionFunc(collectionName)).flatMap((res) => {
        return (0, most_1.fromPromise)((0, most_1.mergeArray)(res.data.map(({ fileData, username }) => {
            let result = fileData.filter(data => {
                return data.protocolName === protocolName;
            });
            if (result.length === 0) {
                return (0, most_1.empty)();
            }
            return (0, most_1.from)(result.map(({ fileID, version, protocolVersion }) => {
                return [fileID, version, protocolVersion];
            })).flatMap(([fileID, version, protocolVersion]) => {
                return getFileFunc(fileID).map(arrayBuffer => {
                    return {
                        id: fileID, file: arrayBuffer, version, username,
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
            }, []).map(({ id, file, version, username }) => {
                return { id, file, version, username };
            });
        }));
    });
};
exports.getAllPublishNewestData = getAllPublishNewestData;
let getElementAssembleData = (getShopDataFunc, username, elementName, elementVersion) => {
    return (0, most_1.fromPromise)(getShopDataFunc("publishedelementassembledata", {
        username: username
    })).flatMap((res) => {
        let { fileData } = res.data[0];
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
