"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPublishData = exports.getAllPublishProtocolData = void 0;
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
