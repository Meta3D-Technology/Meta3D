"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findNewestPublishPackage = void 0;
const semver_1 = require("semver");
const most_1 = require("most");
const NullableUtils_1 = require("../../utils/NullableUtils");
let findNewestPublishPackage = ([findNewestPublishPackage, downloadFileFunc], entryExtensionProtocolName, packageName) => {
    return findNewestPublishPackage("publishedpackages", {
        entryExtensionProtocolName: entryExtensionProtocolName,
        packageName: packageName
    }, ["entryExtensionProtocolVersion", semver_1.gt], ["packageVersion", semver_1.gt]).flatMap((data) => {
        if ((0, NullableUtils_1.isNullable)(data)) {
            return (0, most_1.just)(null);
        }
        return downloadFileFunc(data.fileID).map(file => {
            return [file, data.entryExtensionProtocolVersion, data.packageVersion, data.entryExtensionProtocolIconBase64, data.entryExtensionProtocolConfigStr];
        });
    });
};
exports.findNewestPublishPackage = findNewestPublishPackage;
//# sourceMappingURL=DependencyService.js.map