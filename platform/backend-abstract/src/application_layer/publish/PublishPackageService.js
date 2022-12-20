"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publish = exports.buildPartialKeyByPackageData = exports.buildPartialKeyByEntryProcoltolData = exports._buildKey = void 0;
const most_1 = require("most");
let _buildKey = (entryProtocolName, entryProtocolVersion, packageName, packageVersion, account) => account + "_" +
    entryProtocolName + "_" +
    entryProtocolVersion + "_" +
    packageName + "_" + packageVersion;
exports._buildKey = _buildKey;
let _buildFileName = (packageName, packageVersion, account) => account + "_" +
    packageName + "_" + packageVersion;
let buildPartialKeyByEntryProcoltolData = (entryProtocolName, entryProtocolVersion) => entryProtocolName + "_" + entryProtocolVersion;
exports.buildPartialKeyByEntryProcoltolData = buildPartialKeyByEntryProcoltolData;
exports.buildPartialKeyByPackageData = _buildFileName;
let publish = ([onUploadProgressFunc, uploadFileFunc, hasDataFunc, addDataFunc, updateDataFunc, getFileIDFunc], packageBinaryFile, [entryProtocolName, entryProtocolVersion, entryProtocolVersionRange, entryProtocolIconBase64, entryExtensionName], [packageName, packageVersion], account) => {
    let key = (0, exports._buildKey)(entryProtocolName, entryProtocolVersion, packageName, packageVersion, account);
    return hasDataFunc("publishedpackages", key).concatMap((isExist) => {
        let fileName = _buildFileName(packageName, packageVersion, account);
        let filePath = "packages/" + fileName + ".arrayBuffer";
        return uploadFileFunc(onUploadProgressFunc, filePath, packageBinaryFile, fileName).concatMap((uploadData) => {
            let fileID = getFileIDFunc(uploadData, filePath);
            if (isExist) {
                return (0, most_1.fromPromise)(updateDataFunc("publishedpackages", key, {
                    account,
                    entryProtocolName,
                    entryProtocolVersion,
                    entryProtocolVersionRange,
                    entryProtocolIconBase64,
                    entryExtensionName,
                    packageName,
                    packageVersion,
                    fileID
                }));
            }
            return (0, most_1.fromPromise)(addDataFunc("publishedpackages", key, {
                account,
                entryProtocolName,
                entryProtocolVersion,
                entryProtocolVersionRange,
                entryProtocolIconBase64,
                entryExtensionName,
                packageName,
                packageVersion,
                fileID
            }));
        });
    });
};
exports.publish = publish;
