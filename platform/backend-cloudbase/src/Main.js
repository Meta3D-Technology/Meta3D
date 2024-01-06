"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findNewestPublishContribute = exports.findNewestPublishExtension = exports.findNewestPublishPackage = exports.findPublishPackage = exports.getAllPublishPackageInfos = exports.getAllPublishPackageEntryExtensionProtocols = exports.publishPackage = exports.findAllRecommendPublishFinalApps = exports.findAllPublishFinalApps = exports.findAllPublishFinalAppsByAccount = exports.findPublishFinalApp = exports.publishFinalApp = exports.findAllRecommendPublishApps = exports.findAllPublishApps = exports.findAllPublishAppsByAccount = exports.findPublishApp = exports.publishApp = exports.findPublishContribute = exports.findPublishExtension = exports.getAllPublishContributeInfos = exports.getAllPublishExtensionInfos = exports.batchFindPublishContributeProtocolConfigs = exports.batchFindPublishExtensionProtocolConfigs = exports.getAllPublishContributeProtocolConfigs = exports.getAllPublishExtensionProtocolConfigs = exports.batchFindPublishContributeProtocols = exports.batchFindPublishExtensionProtocols = exports.getAllPublishContributeProtocols = exports.getAllPublishExtensionProtocols = exports.getAllPublishExtensionProtocolsCount = exports.isLoginSuccess = exports.registerUser = exports.handleLoginForWeb3 = exports.checkUserName = exports.init = void 0;
const Abstract = require("backend-abstract");
const Curry_1 = require("meta3d-fp/src/Curry");
const BackendService_1 = require("./application_layer/BackendService");
const FindNewestService_1 = require("./application_layer/FindNewestService");
const meta3d_backend_cloudbase_1 = require("meta3d-backend-cloudbase");
// export let error = ErrorService.error
let init = (env) => Abstract.init(BackendService_1.init, env);
exports.init = init;
let checkUserName = (account) => Abstract.checkUserName(BackendService_1.checkUserName, account);
exports.checkUserName = checkUserName;
let handleLoginForWeb3 = (account) => Abstract.handleLoginForWeb3(BackendService_1.handleLoginForWeb3, account);
exports.handleLoginForWeb3 = handleLoginForWeb3;
let registerUser = (account) => Abstract.registerUser(BackendService_1.registerUser, account);
exports.registerUser = registerUser;
let isLoginSuccess = (account) => Abstract.isLoginSuccess(BackendService_1.hasData, account);
exports.isLoginSuccess = isLoginSuccess;
let getAllPublishExtensionProtocolsCount = () => Abstract.getAllPublishProtocolDataCount(BackendService_1.getMarketProtocolCollectionCount, "publishedextensionprotocols");
exports.getAllPublishExtensionProtocolsCount = getAllPublishExtensionProtocolsCount;
let getAllPublishExtensionProtocols = (limitCount, skipCount) => Abstract.getAllPublishProtocolData([BackendService_1.getMarketProtocolCollection, BackendService_1.getDataFromMarketProtocolCollection], "publishedextensionprotocols", limitCount, skipCount);
exports.getAllPublishExtensionProtocols = getAllPublishExtensionProtocols;
let getAllPublishContributeProtocols = (limitCount, skipCount) => Abstract.getAllPublishProtocolData([BackendService_1.getMarketProtocolCollection, BackendService_1.getDataFromMarketProtocolCollection], "publishedcontributeprotocols", limitCount, skipCount);
exports.getAllPublishContributeProtocols = getAllPublishContributeProtocols;
let batchFindPublishExtensionProtocols = (protocolName) => Abstract.batchFindPublishProtocolData([BackendService_1.batchFindMarketProtocolCollection, BackendService_1.getDataFromMarketProtocolCollection], "publishedextensionprotocols", protocolName);
exports.batchFindPublishExtensionProtocols = batchFindPublishExtensionProtocols;
let batchFindPublishContributeProtocols = (protocolName) => Abstract.batchFindPublishProtocolData([BackendService_1.batchFindMarketProtocolCollection, BackendService_1.getDataFromMarketProtocolCollection], "publishedcontributeprotocols", protocolName);
exports.batchFindPublishContributeProtocols = batchFindPublishContributeProtocols;
let getAllPublishExtensionProtocolConfigs = (limitCount, skipCount) => Abstract.getAllPublishProtocolConfigData([BackendService_1.getMarketProtocolCollection, BackendService_1.getDataFromMarketProtocolCollection], "publishedextensionprotocolconfigs", limitCount, skipCount);
exports.getAllPublishExtensionProtocolConfigs = getAllPublishExtensionProtocolConfigs;
let getAllPublishContributeProtocolConfigs = (limitCount, skipCount) => Abstract.getAllPublishProtocolConfigData([BackendService_1.getMarketProtocolCollection, BackendService_1.getDataFromMarketProtocolCollection], "publishedcontributeprotocolconfigs", limitCount, skipCount);
exports.getAllPublishContributeProtocolConfigs = getAllPublishContributeProtocolConfigs;
let batchFindPublishExtensionProtocolConfigs = (protocolName) => Abstract.batchFindPublishProtocolConfigData([BackendService_1.batchFindMarketProtocolCollection, BackendService_1.getDataFromMarketProtocolCollection], "publishedextensionprotocolconfigs", protocolName);
exports.batchFindPublishExtensionProtocolConfigs = batchFindPublishExtensionProtocolConfigs;
let batchFindPublishContributeProtocolConfigs = (protocolName) => Abstract.batchFindPublishProtocolConfigData([BackendService_1.batchFindMarketProtocolCollection, BackendService_1.getDataFromMarketProtocolCollection], "publishedcontributeprotocolconfigs", protocolName);
exports.batchFindPublishContributeProtocolConfigs = batchFindPublishContributeProtocolConfigs;
let _onDownloadProgressFuncForSingleExtensionOrContribute = console.log;
let getAllPublishExtensionInfos = (limitCount, skipCount, protocolName, protocolVersion) => Abstract.getAllPublishImplementInfo([
    BackendService_1.getMarketImplementCollection,
    BackendService_1.mapMarketImplementCollection,
    meta3d_backend_cloudbase_1.filterMarketImplementCollection,
    BackendService_1.getAccountFromMarketImplementCollectionData,
], "publishedextensions", limitCount, skipCount, protocolName, protocolVersion);
exports.getAllPublishExtensionInfos = getAllPublishExtensionInfos;
let getAllPublishContributeInfos = (limitCount, skipCount, protocolName, protocolVersion) => Abstract.getAllPublishImplementInfo([
    BackendService_1.getMarketImplementCollection,
    BackendService_1.mapMarketImplementCollection,
    meta3d_backend_cloudbase_1.filterMarketImplementCollection,
    BackendService_1.getAccountFromMarketImplementCollectionData,
], "publishedcontributes", limitCount, skipCount, protocolName, protocolVersion);
exports.getAllPublishContributeInfos = getAllPublishContributeInfos;
let findPublishExtension = (onDownloadProgressFunc, limitCount, skipCount, account, name, version) => Abstract.findPublishImplement([
    BackendService_1.getMarketImplement,
    (0, Curry_1.curry3_1)(BackendService_1.downloadFile)(onDownloadProgressFunc)
], "publishedextensions", limitCount, skipCount, account, name, version);
exports.findPublishExtension = findPublishExtension;
let findPublishContribute = (onDownloadProgressFunc, limitCount, skipCount, account, name, version) => Abstract.findPublishImplement([
    BackendService_1.getMarketImplement,
    (0, Curry_1.curry3_1)(BackendService_1.downloadFile)(onDownloadProgressFunc)
], "publishedcontributes", limitCount, skipCount, account, name, version);
exports.findPublishContribute = findPublishContribute;
let publishApp = (onUploadProgressFunc, appBinaryFile, appName, account, description, previewBase64, isRecommend) => Abstract.publishApp([
    onUploadProgressFunc,
    BackendService_1.uploadFile,
    BackendService_1.deleteFile,
    BackendService_1.getDataByKey,
    BackendService_1.addData,
    BackendService_1.updateData,
    BackendService_1.getFileID,
], appBinaryFile, appName, account, description, previewBase64, isRecommend);
exports.publishApp = publishApp;
let findPublishApp = (onDownloadProgressFunc, account, appName, notUseCacheForFindApp) => Abstract.findPublishApp([
    BackendService_1.getDataByKey,
    (0, Curry_1.curry3_1)(BackendService_1.downloadFile)(onDownloadProgressFunc)
], account, appName, notUseCacheForFindApp);
exports.findPublishApp = findPublishApp;
let findAllPublishAppsByAccount = (account) => Abstract.findAllPublishAppsByAccount(BackendService_1.getDataWithWhereData, account);
exports.findAllPublishAppsByAccount = findAllPublishAppsByAccount;
let findAllPublishApps = (limitCount, skipCount) => Abstract.findAllPublishApps(BackendService_1.getData, limitCount, skipCount);
exports.findAllPublishApps = findAllPublishApps;
let findAllRecommendPublishApps = () => Abstract.findAllRecommendPublishApps(BackendService_1.getDataWithWhereData);
exports.findAllRecommendPublishApps = findAllRecommendPublishApps;
let publishFinalApp = (onUploadProgressFunc, contentBinaryFile, singleEventBinaryFile, appName, account, description, previewBase64, isRecommend) => Abstract.publishFinalApp([
    onUploadProgressFunc,
    BackendService_1.uploadFile,
    BackendService_1.deleteFile,
    BackendService_1.getDataByKey,
    BackendService_1.addData,
    BackendService_1.updateData,
    BackendService_1.getFileID,
], contentBinaryFile, singleEventBinaryFile, appName, account, description, previewBase64, isRecommend);
exports.publishFinalApp = publishFinalApp;
let findPublishFinalApp = (onDownloadProgressFunc, account, appName, fileType, notUseCacheForFindFinalApp) => Abstract.findPublishFinalApp([
    BackendService_1.getDataByKey,
    (0, Curry_1.curry3_1)(BackendService_1.downloadFile)(onDownloadProgressFunc)
], account, appName, fileType, notUseCacheForFindFinalApp);
exports.findPublishFinalApp = findPublishFinalApp;
let findAllPublishFinalAppsByAccount = (account) => Abstract.findAllPublishFinalAppsByAccount(BackendService_1.getDataWithWhereData, account);
exports.findAllPublishFinalAppsByAccount = findAllPublishFinalAppsByAccount;
let findAllPublishFinalApps = (limitCount, skipCount) => Abstract.findAllPublishFinalApps(BackendService_1.getData, limitCount, skipCount);
exports.findAllPublishFinalApps = findAllPublishFinalApps;
let findAllRecommendPublishFinalApps = () => Abstract.findAllRecommendPublishFinalApps(BackendService_1.getDataWithWhereData);
exports.findAllRecommendPublishFinalApps = findAllRecommendPublishFinalApps;
// let _throwError = (msg: string): never => {
//     throw new Error(msg)
// }
// export let publishElementContribute = (
//     onUploadProgressFunc,
//     account,
//     packageData,
//     contributeBinaryFile,
// ) => Abstract.publishElementContribute([
//     onUploadProgressFunc,
//     _throwError, uploadFile, getMarketImplementAccountData,
//     addMarketImplementData,
//     // updateMarketImplementData,
//     // getDataFromMarketImplementAccountData,
//     // buildMarketImplementAccountData, addMarketImplementDataToDataFromMarketImplementCollectionData,
//     getFileID
// ],
//     account,
//     packageData,
//     contributeBinaryFile,
// )
// export let publishElementAssembleData = (
//     account,
//     elementName,
//     elementVersion,
//     inspectorData,
//     customInputs,
//     customActions,
// ) => Abstract.publishElementAssembleData([
//     _throwError,
//     getMarketImplementAccountData,
//     addMarketImplementData,
//     // updateMarketImplementData, getDataFromMarketImplementAccountData, isContain, buildMarketImplementAccountData, 
//     // addMarketImplementDataToDataFromMarketImplementCollectionData,
// ],
//     account,
//     elementName,
//     elementVersion,
//     inspectorData,
//     customInputs,
//     customActions,
// )
// export let getAllPublishNewestExtensions = (limitCount, skipCount, protocolName) => Abstract.getAllPublishNewestData([
//     getMarketImplementCollection,
//     mapMarketImplementCollection,
//     getAccountFromMarketImplementCollectionData,
//     curry3_1(downloadFile)(_onDownloadProgressFuncForSingleExtensionOrContribute)
// ],
//     "publishedextensions",
//     limitCount,
//     skipCount,
//     protocolName
// )
// export let getElementAssembleData = (
//     account,
//     elementName,
//     elementVersion,
// ) => Abstract.getElementAssembleData(
//     getMarketImplementAccountDataWithWhereData,
//     account,
//     elementName,
//     elementVersion,
// )
// export let findAllElementAssembleData = (
//     limitCount,
//     skipCount,
// ) => Abstract.findAllElementAssembleData(
//     getData,
//     limitCount,
//     skipCount,
// )
let publishPackage = (onUploadProgressFunc, packageBinaryFile, entryExtensionData, packageData, account) => Abstract.publishPackage([
    onUploadProgressFunc,
    BackendService_1.uploadFile,
    BackendService_1.hasData,
    BackendService_1.addData,
    BackendService_1.updateData,
    BackendService_1.getFileID,
], packageBinaryFile, entryExtensionData, packageData, account);
exports.publishPackage = publishPackage;
let getAllPublishPackageEntryExtensionProtocols = (limitCount, skipCount) => Abstract.getAllPublishPackageEntryExtensionProtocols(
// [
//     getPackageMarketEntryExtensionProtocolCollection,
//     getDataFromPackageMarketEntryExtensionProtocolCollection
// ]
BackendService_1.getData, limitCount, skipCount);
exports.getAllPublishPackageEntryExtensionProtocols = getAllPublishPackageEntryExtensionProtocols;
let getAllPublishPackageInfos = (limitCount, skipCount, entryExtensionProtocolName, entryExtensionProtocolVersion) => Abstract.getAllPublishPackageInfos(BackendService_1.getDataByKeyContain, limitCount, skipCount, entryExtensionProtocolName, entryExtensionProtocolVersion);
exports.getAllPublishPackageInfos = getAllPublishPackageInfos;
let findPublishPackage = (onDownloadProgressFunc, limitCount, skipCount, account, packageName, packageVersion) => Abstract.findPublishPackage([
    BackendService_1.getDataByKeyContain,
    (0, Curry_1.curry3_1)(BackendService_1.downloadFile)(onDownloadProgressFunc)
], limitCount, skipCount, account, packageName, packageVersion);
exports.findPublishPackage = findPublishPackage;
let findNewestPublishPackage = (onDownloadProgressFunc, entryExtensionProtocolName, packageName) => Abstract.findNewestPublishPackage([
    FindNewestService_1.findNewestPublishPackage,
    (0, Curry_1.curry3_1)(BackendService_1.downloadFile)(onDownloadProgressFunc)
], entryExtensionProtocolName, packageName);
exports.findNewestPublishPackage = findNewestPublishPackage;
let findNewestPublishExtension = (onDownloadProgressFunc, extensionName, extensionProtocolName) => {
    return (0, FindNewestService_1.findNewestPublishExtension)((0, Curry_1.curry3_1)(BackendService_1.downloadFile)(onDownloadProgressFunc), extensionName, extensionProtocolName);
};
exports.findNewestPublishExtension = findNewestPublishExtension;
let findNewestPublishContribute = (onDownloadProgressFunc, contributeName, contributeProtocolName) => {
    return (0, FindNewestService_1.findNewestPublishContribute)((0, Curry_1.curry3_1)(BackendService_1.downloadFile)(onDownloadProgressFunc), contributeName, contributeProtocolName);
};
exports.findNewestPublishContribute = findNewestPublishContribute;
// export let findNewestPublishElementAssembleData = findNewestPublishElementAssembleDataFind
