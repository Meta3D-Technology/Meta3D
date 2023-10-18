"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPublishPackage = exports.getAllPublishPackageInfos = exports.getAllPublishPackageEntryExtensionProtocols = void 0;
const most_1 = require("most");
const ArrayUtils_1 = require("meta3d-structure-utils/src/ArrayUtils");
let getAllPublishPackageEntryExtensionProtocols = (
// [getPackageMarketEntryExtensionProtocolCollectionFunc, getDataFromPackageMarketEntryExtensionProtocolCollection]: [any, any]
getDataFunc, limitCount, skipCount) => {
    // return fromPromise(getPackageMarketEntryExtensionProtocolCollectionFunc()).map((res: any) => {
    //     let resData = getDataFromPackageMarketEntryExtensionProtocolCollection(res)
    //     return resData.map(({
    //         account,
    //         entryExtensionProtocolName,
    //         entryExtensionProtocolVersion,
    //         entryExtensionProtocolIconBase64,
    //     }) => {
    //         return { name: entryExtensionProtocolName, version: entryExtensionProtocolVersion, account, iconBase64: entryExtensionProtocolIconBase64 }
    //     })
    // })
    return (0, most_1.fromPromise)(getDataFunc("publishedpackages", limitCount, skipCount)).map((data) => {
        // let resData = getDataFromPackageMarketEntryExtensionProtocolCollection(res)
        return (0, ArrayUtils_1.removeDuplicateItemsWithBuildKeyFunc)(data.map(({ account, entryExtensionProtocolName, entryExtensionProtocolVersion, entryExtensionProtocolIconBase64, entryExtensionProtocolDisplayName, entryExtensionProtocolRepoLink, entryExtensionProtocolDescription, }) => {
            return {
                name: entryExtensionProtocolName, version: entryExtensionProtocolVersion, account, iconBase64: entryExtensionProtocolIconBase64,
                displayName: entryExtensionProtocolDisplayName,
                repoLink: entryExtensionProtocolRepoLink,
                description: entryExtensionProtocolDescription,
            };
        }), 
        // (({
        //     name, version, account
        // }) => {
        //     return name + "_" + version + "_" + account
        // })
        (({ name, version }) => {
            return name + "_" + version;
        }));
    });
};
exports.getAllPublishPackageEntryExtensionProtocols = getAllPublishPackageEntryExtensionProtocols;
// export let getAllPublishPackageEntryExtensionProtocols = (
//     [getPackageMarketEntryExtensionProtocolCollectionFunc, getDataFromPackageMarketEntryExtensionProtocolCollection]: [any, any]
// ): Stream<protocols> => {
//     return getAllPublishProtocolData([getPackageMarketEntryExtensionProtocolCollectionFunc, getDataFromPackageMarketEntryExtensionProtocolCollection],
//         "publishedpackages"
//     )
// }
let getAllPublishPackageInfos = (getDataByKeyContainFunc, limitCount, skipCount, entryExtensionProtocolName, entryExtensionProtocolVersion) => {
    return getDataByKeyContainFunc("publishedpackages", 
    // buildPartialKeyByEntryProcoltolData(entryExtensionProtocolName, entryExtensionProtocolVersion)
    limitCount, skipCount, [
        entryExtensionProtocolName, entryExtensionProtocolVersion
    ]).map((data) => {
        return data.map(({ account, entryExtensionProtocolName, entryExtensionProtocolVersion, entryExtensionProtocolVersionRange, entryExtensionProtocolIconBase64, entryExtensionName, packageName, packageVersion, description, fileID }) => {
            return {
                id: fileID,
                account,
                entryExtensionProtocolName,
                entryExtensionProtocolVersion,
                entryExtensionProtocolVersionRange,
                entryExtensionProtocolIconBase64,
                entryExtensionName,
                name: packageName,
                version: packageVersion,
                description
            };
        });
    });
};
exports.getAllPublishPackageInfos = getAllPublishPackageInfos;
let findPublishPackage = ([getDataByKeyContainFunc, downloadFileFunc], limitCount, skipCount, account, packageName, packageVersion) => {
    return getDataByKeyContainFunc("publishedpackages", limitCount, skipCount, 
    // buildPartialKeyByPackageData(
    //     packageName,
    //     packageVersion,
    //     account
    // )
    [
        packageName,
        packageVersion,
        account
    ]).flatMap((data) => {
        if (data.length === 0) {
            return (0, most_1.just)(null);
        }
        return downloadFileFunc(data[0].fileID);
    });
};
exports.findPublishPackage = findPublishPackage;
//# sourceMappingURL=PackageMarketService.js.map