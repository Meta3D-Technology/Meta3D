"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPublishPackage = exports.getAllPublishPackageInfos = exports.getAllPublishPackageEntryExtensionProtocols = void 0;
const most_1 = require("most");
const ArrayUtils_1 = require("../../utils/ArrayUtils");
const PublishPackageService_1 = require("../publish/PublishPackageService");
let getAllPublishPackageEntryExtensionProtocols = (
// [getPackageShopEntryExtensionProtocolCollectionFunc, getDataFromPackageShopEntryExtensionProtocolCollection]: [any, any]
getDataFunc) => {
    // return fromPromise(getPackageShopEntryExtensionProtocolCollectionFunc()).map((res: any) => {
    //     let resData = getDataFromPackageShopEntryExtensionProtocolCollection(res)
    //     return resData.map(({
    //         account,
    //         entryProtocolName,
    //         entryProtocolVersion,
    //         entryProtocolIconBase64,
    //     }) => {
    //         return { name: entryProtocolName, version: entryProtocolVersion, account, iconBase64: entryProtocolIconBase64 }
    //     })
    // })
    return (0, most_1.fromPromise)(getDataFunc("publishedpackages")).map((data) => {
        // let resData = getDataFromPackageShopEntryExtensionProtocolCollection(res)
        return (0, ArrayUtils_1.removeDuplicateItemsWithBuildKeyFunc)(data.map(({ account, entryProtocolName, entryProtocolVersion, entryProtocolIconBase64, }) => {
            return { name: entryProtocolName, version: entryProtocolVersion, account, iconBase64: entryProtocolIconBase64 };
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
//     [getPackageShopEntryExtensionProtocolCollectionFunc, getDataFromPackageShopEntryExtensionProtocolCollection]: [any, any]
// ): Stream<protocols> => {
//     return getAllPublishProtocolData([getPackageShopEntryExtensionProtocolCollectionFunc, getDataFromPackageShopEntryExtensionProtocolCollection],
//         "publishedpackages"
//     )
// }
let getAllPublishPackageInfos = (getDataByKeyContainFunc, entryProtocolName, entryProtocolVersion) => {
    return (0, most_1.fromPromise)(getDataByKeyContainFunc("publishedpackages", (0, PublishPackageService_1.buildPartialKeyByEntryProcoltolData)(entryProtocolName, entryProtocolVersion))).map((data) => {
        return data.map(({ account, entryProtocolName, entryProtocolVersion, entryProtocolIconBase64, entryExtensionName, packageName, packageVersion, fileID }) => {
            return {
                id: fileID,
                account,
                entryProtocolName,
                entryProtocolVersion,
                entryProtocolIconBase64,
                entryExtensionName,
                name: packageName,
                version: packageVersion,
            };
        });
    });
};
exports.getAllPublishPackageInfos = getAllPublishPackageInfos;
let findPublishPackage = ([getDataByKeyContainFunc, downloadFileFunc], account, packageName, packageVersion) => {
    return (0, most_1.fromPromise)(getDataByKeyContainFunc("publishedpackages", (0, PublishPackageService_1.buildPartialKeyByPackageData)(packageName, packageVersion, account))).flatMap((data) => {
        if (data.length === 0) {
            return (0, most_1.just)(null);
        }
        return downloadFileFunc(data[0].fileID);
    });
};
exports.findPublishPackage = findPublishPackage;
