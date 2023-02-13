"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publish = exports.buildPartialKeyByPackageData = exports.buildPartialKeyByEntryProcoltolData = exports._buildKey = void 0;
const most_1 = require("most");
let _buildKey = (entryExtensionProtocolName, entryExtensionProtocolVersion, packageName, packageVersion, account) => account + "_" +
    entryExtensionProtocolName + "_" +
    entryExtensionProtocolVersion + "_" +
    packageName + "_" + packageVersion;
exports._buildKey = _buildKey;
let _buildFileName = (packageName, packageVersion, account) => account + "_" +
    packageName + "_" + packageVersion;
let buildPartialKeyByEntryProcoltolData = (entryExtensionProtocolName, entryExtensionProtocolVersion) => entryExtensionProtocolName + "_" + entryExtensionProtocolVersion;
exports.buildPartialKeyByEntryProcoltolData = buildPartialKeyByEntryProcoltolData;
exports.buildPartialKeyByPackageData = _buildFileName;
let publish = ([onUploadProgressFunc, uploadFileFunc, hasDataFunc, addDataFunc, updateDataFunc, getFileIDFunc], packageBinaryFile, [entryExtensionProtocolName, entryExtensionProtocolVersion, entryExtensionProtocolVersionRange, entryExtensionProtocolIconBase64, entryExtensionProtocolDisplayName, entryExtensionProtocolRepoLink, entryExtensionProtocolDescription, entryExtensionName], [packageName, packageVersion, description], account) => {
    let key = (0, exports._buildKey)(entryExtensionProtocolName, entryExtensionProtocolVersion, packageName, packageVersion, account);
    return hasDataFunc("publishedpackages", key).concatMap((isExist) => {
        let fileName = _buildFileName(packageName, packageVersion, account);
        let filePath = "packages/" + fileName + ".arrayBuffer";
        return uploadFileFunc(onUploadProgressFunc, filePath, packageBinaryFile, fileName).concatMap((uploadData) => {
            let fileID = getFileIDFunc(uploadData, filePath);
            if (isExist) {
                return (0, most_1.fromPromise)(updateDataFunc("publishedpackages", key, {
                    account,
                    entryExtensionProtocolName,
                    entryExtensionProtocolVersion,
                    entryExtensionProtocolVersionRange,
                    entryExtensionProtocolIconBase64,
                    entryExtensionProtocolDisplayName,
                    entryExtensionProtocolRepoLink,
                    entryExtensionProtocolDescription,
                    entryExtensionName,
                    packageName,
                    packageVersion,
                    description,
                    fileID
                }));
            }
            return (0, most_1.fromPromise)(addDataFunc("publishedpackages", key, {
                account,
                entryExtensionProtocolName,
                entryExtensionProtocolVersion,
                entryExtensionProtocolVersionRange,
                entryExtensionProtocolIconBase64,
                entryExtensionProtocolDisplayName,
                entryExtensionProtocolRepoLink,
                entryExtensionProtocolDescription,
                entryExtensionName,
                packageName,
                packageVersion,
                description,
                fileID
            }));
        });
    });
};
exports.publish = publish;
