"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPublishData = exports.getAllPublishProtocolData = void 0;
const most_1 = require("most");
const semver_1 = require("semver");
let getAllPublishProtocolData = (getDataFunc, collectionName) => {
    return (0, most_1.fromPromise)(getDataFunc(collectionName)).map((res) => {
        return res.data.reduce((result, { protocols }) => {
            return result.concat(protocols.map(({ name, version, iconBase64 }) => {
                return { name, version, iconBase64 };
            }, []));
        }, []);
    });
};
exports.getAllPublishProtocolData = getAllPublishProtocolData;
let getAllPublishData = ([getDataFunc, getFileFunc], collectionName, protocolName, protocolVersion) => {
    return (0, most_1.fromPromise)(getDataFunc(collectionName)).flatMap((res) => {
        return (0, most_1.fromPromise)((0, most_1.mergeArray)(res.data.map(({ fileData }) => {
            let result = fileData.filter(data => {
                return data.protocolName === protocolName &&
                    (0, semver_1.satisfies)(protocolVersion, data.protocolVersion);
            });
            if (result.length === 0) {
                return (0, most_1.empty)();
            }
            else if (result.length > 1) {
                throw new Error("length should == 1");
            }
            let { fileID } = result[0];
            return getFileFunc(fileID).map(arrayBuffer => {
                return { id: fileID, file: arrayBuffer };
            });
        })).reduce((result, data) => {
            result.push(data);
            return result;
        }, []));
    });
};
exports.getAllPublishData = getAllPublishData;
