"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPublishNewestData = exports.getAllPublishData = exports.getAllPublishProtocolConfigData = exports.getAllPublishProtocolData = void 0;
const most_1 = require("most");
const semver_1 = require("semver");
let getAllPublishProtocolData = (getCollectionFunc, collectionName) => {
    return (0, most_1.fromPromise)(getCollectionFunc(collectionName)).map((res) => {
        return res.data.map(({ name, version, username, iconBase64 }) => {
            return { name, version, username, iconBase64 };
        });
    });
};
exports.getAllPublishProtocolData = getAllPublishProtocolData;
let getAllPublishProtocolConfigData = (getCollectionFunc, collectionName) => {
    return (0, most_1.fromPromise)(getCollectionFunc(collectionName)).map((res) => {
        return res.data.map(({ name, version, username, configStr }) => {
            return { name, version, username, configStr };
        });
    });
};
exports.getAllPublishProtocolConfigData = getAllPublishProtocolConfigData;
let getAllPublishData = ([getCollectionFunc, getFileFunc], collectionName, protocolName, protocolVersion) => {
    return (0, most_1.fromPromise)(getCollectionFunc(collectionName)).flatMap((res) => {
        return (0, most_1.fromPromise)((0, most_1.mergeArray)(res.data.map(({ fileData, username }) => {
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
                return getFileFunc(fileID).map(arrayBuffer => {
                    return { id: fileID, file: arrayBuffer, version, username };
                });
            });
        })).reduce((result, data) => {
            result.push(data);
            return result;
        }, []));
    });
};
exports.getAllPublishData = getAllPublishData;
let getAllPublishNewestData = ([getCollectionFunc, getFileFunc], collectionName, protocolName) => {
    return (0, most_1.fromPromise)(getCollectionFunc(collectionName)).flatMap((res) => {
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
