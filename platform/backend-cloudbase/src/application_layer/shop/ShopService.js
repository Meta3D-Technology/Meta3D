"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPublishContributes = exports.getAllPublishExtensions = exports._getAllPublishData = exports.getAllPublishContributeProtocols = exports.getAllPublishExtensionProtocols = exports._getAllPublishProtocolData = void 0;
const CloundbaseService_1 = require("../cloudbase/CloundbaseService");
const most_1 = require("most");
const semver_1 = require("semver");
exports._getAllPublishProtocolData = (getDataFunc, collectionName) => {
    return most_1.fromPromise(getDataFunc(collectionName)).map((res) => {
        return res.data.reduce((result, { protocols }) => {
            return result.concat(protocols.map(({ name, version, iconBase64 }) => {
                return { name, version, iconBase64 };
            }, []));
        }, []);
    });
};
exports.getAllPublishExtensionProtocols = () => {
    return exports._getAllPublishProtocolData(CloundbaseService_1.getData, "publishedExtensionProtocols");
};
exports.getAllPublishContributeProtocols = () => {
    return exports._getAllPublishProtocolData(CloundbaseService_1.getData, "publishedContributeProtocols");
};
exports._getAllPublishData = ([getDataFunc, getFileFunc], collectionName, protocolName, protocolVersion) => {
    return most_1.fromPromise(getDataFunc(collectionName)).flatMap((res) => {
        return most_1.fromPromise(most_1.mergeArray(res.data.map(({ fileData }) => {
            let result = fileData.filter(data => {
                return data.protocolName === protocolName &&
                    semver_1.satisfies(protocolVersion, data.protocolVersion);
            });
            if (result.length === 0) {
                return most_1.empty();
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
exports.getAllPublishExtensions = (protocolName, protocolVersion) => {
    return exports._getAllPublishData([CloundbaseService_1.getData, CloundbaseService_1.getFile], "publishedExtensions", protocolName, protocolVersion);
};
exports.getAllPublishContributes = (protocolName, protocolVersion) => {
    return exports._getAllPublishData([CloundbaseService_1.getData, CloundbaseService_1.getFile], "publishedContributes", protocolName, protocolVersion);
};
