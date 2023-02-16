"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPublishPackage = exports.getAllPublishPackageInfos = exports.getAllPublishPackageEntryExtensionProtocols = exports.publishPackage = exports.getElementAssembleData = exports.getAllPublishNewestExtensions = exports.publishElementAssembleData = exports.publishElementContribute = exports.findAllPublishApps = exports.findAllPublishAppsByAccount = exports.findPublishApp = exports.publishApp = exports.findPublishContribute = exports.findPublishExtension = exports.getAllPublishContributeInfos = exports.getAllPublishExtensionInfos = exports.getAllPublishContributeProtocolConfigs = exports.getAllPublishExtensionProtocolConfigs = exports.getAllPublishContributeProtocols = exports.getAllPublishExtensionProtocols = exports.getAllPublishExtensionProtocolsCount = exports.isLoginSuccess = exports.registerUser = exports.handleLoginForWeb3 = exports.checkUserName = exports.init = void 0;
const Abstract = require("backend-abstract");
const Curry_1 = require("../../../defaults/meta3d-fp/src/Curry");
const BackendService_1 = require("./application_layer/BackendService");
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
let getAllPublishExtensionProtocolConfigs = (limitCount, skipCount) => Abstract.getAllPublishProtocolConfigData([BackendService_1.getMarketProtocolCollection, BackendService_1.getDataFromMarketProtocolCollection], "publishedextensionprotocolconfigs", limitCount, skipCount);
exports.getAllPublishExtensionProtocolConfigs = getAllPublishExtensionProtocolConfigs;
let getAllPublishContributeProtocolConfigs = (limitCount, skipCount) => Abstract.getAllPublishProtocolConfigData([BackendService_1.getMarketProtocolCollection, BackendService_1.getDataFromMarketProtocolCollection], "publishedcontributeprotocolconfigs", limitCount, skipCount);
exports.getAllPublishContributeProtocolConfigs = getAllPublishContributeProtocolConfigs;
let _onDownloadProgressFuncForSingleExtensionOrContribute = console.log;
let getAllPublishExtensionInfos = (limitCount, skipCount, protocolName, protocolVersion) => Abstract.getAllPublishImplementInfo([
    BackendService_1.getMarketImplementCollection,
    BackendService_1.mapMarketImplementCollection,
    BackendService_1.getAccountFromMarketImplementCollectionData,
    BackendService_1.getFileDataFromMarketImplementCollectionData,
], "publishedextensions", limitCount, skipCount, protocolName, protocolVersion);
exports.getAllPublishExtensionInfos = getAllPublishExtensionInfos;
let getAllPublishContributeInfos = (limitCount, skipCount, protocolName, protocolVersion) => Abstract.getAllPublishImplementInfo([
    BackendService_1.getMarketImplementCollection,
    BackendService_1.mapMarketImplementCollection,
    BackendService_1.getAccountFromMarketImplementCollectionData,
    BackendService_1.getFileDataFromMarketImplementCollectionData,
], "publishedcontributes", limitCount, skipCount, protocolName, protocolVersion);
exports.getAllPublishContributeInfos = getAllPublishContributeInfos;
let findPublishExtension = (onDownloadProgressFunc, account, name, version) => Abstract.findPublishImplement([
    BackendService_1.getMarketImplement,
    (0, Curry_1.curry2)(BackendService_1.downloadFile)(onDownloadProgressFunc)
], "publishedextensions", account, name, version);
exports.findPublishExtension = findPublishExtension;
let findPublishContribute = (onDownloadProgressFunc, account, name, version) => Abstract.findPublishImplement([
    BackendService_1.getMarketImplement,
    (0, Curry_1.curry2)(BackendService_1.downloadFile)(onDownloadProgressFunc)
], "publishedcontributes", account, name, version);
exports.findPublishContribute = findPublishContribute;
let publishApp = (onUploadProgressFunc, appBinaryFile, appName, account, description) => Abstract.publishApp([
    onUploadProgressFunc,
    BackendService_1.uploadFile,
    BackendService_1.hasData,
    BackendService_1.addData,
    BackendService_1.updateData,
    BackendService_1.getFileID,
], appBinaryFile, appName, account, description);
exports.publishApp = publishApp;
let findPublishApp = (onDownloadProgressFunc, account, appName) => Abstract.findPublishApp([
    BackendService_1.getDataByKey,
    (0, Curry_1.curry2)(BackendService_1.downloadFile)(onDownloadProgressFunc)
], account, appName);
exports.findPublishApp = findPublishApp;
let findAllPublishAppsByAccount = (account) => Abstract.findAllPublishAppsByAccount(BackendService_1.getDataByKeyContain, account);
exports.findAllPublishAppsByAccount = findAllPublishAppsByAccount;
let findAllPublishApps = () => Abstract.findAllPublishApps(BackendService_1.getData);
exports.findAllPublishApps = findAllPublishApps;
function _throwError(msg) {
    throw new Error(msg);
}
let publishElementContribute = (onUploadProgressFunc, account, packageData, contributeBinaryFile) => Abstract.publishElementContribute([
    onUploadProgressFunc,
    _throwError, BackendService_1.uploadFile, BackendService_1.getMarketImplementAccountData, BackendService_1.updateMarketImplementData,
    BackendService_1.getDataFromMarketImplementAccountData, BackendService_1.isContain, BackendService_1.buildMarketImplementAccountData, BackendService_1.addMarketImplementDataToDataFromMarketImplementCollectionData,
    BackendService_1.getFileID
], account, packageData, contributeBinaryFile);
exports.publishElementContribute = publishElementContribute;
let publishElementAssembleData = (account, elementName, elementVersion, inspectorData) => Abstract.publishElementAssembleData([
    _throwError,
    BackendService_1.getMarketImplementAccountData, BackendService_1.updateMarketImplementData, BackendService_1.getDataFromMarketImplementAccountData, BackendService_1.isContain, BackendService_1.buildMarketImplementAccountData, BackendService_1.addMarketImplementDataToDataFromMarketImplementCollectionData,
], account, elementName, elementVersion, inspectorData);
exports.publishElementAssembleData = publishElementAssembleData;
let getAllPublishNewestExtensions = (protocolName) => Abstract.getAllPublishNewestData([
    BackendService_1.getMarketImplementCollection,
    BackendService_1.mapMarketImplementCollection,
    BackendService_1.getAccountFromMarketImplementCollectionData,
    BackendService_1.getFileDataFromMarketImplementCollectionData,
    (0, Curry_1.curry2)(BackendService_1.downloadFile)(_onDownloadProgressFuncForSingleExtensionOrContribute)
], "publishedextensions", protocolName);
exports.getAllPublishNewestExtensions = getAllPublishNewestExtensions;
let getElementAssembleData = (account, elementName, elementVersion) => Abstract.getElementAssembleData([BackendService_1.getMarketImplementAccountData, BackendService_1.getDataFromMarketImplementAccountData], account, elementName, elementVersion);
exports.getElementAssembleData = getElementAssembleData;
let publishPackage = (onUploadProgressFunc, packageBinaryFile, entryExtensionData, packageData, account) => Abstract.publishPackage([
    onUploadProgressFunc,
    BackendService_1.uploadFile,
    BackendService_1.hasData,
    BackendService_1.addData,
    BackendService_1.updateData,
    BackendService_1.getFileID,
], packageBinaryFile, entryExtensionData, packageData, account);
exports.publishPackage = publishPackage;
let getAllPublishPackageEntryExtensionProtocols = () => Abstract.getAllPublishPackageEntryExtensionProtocols(
// [
//     getPackageMarketEntryExtensionProtocolCollection,
//     getDataFromPackageMarketEntryExtensionProtocolCollection
// ]
BackendService_1.getData);
exports.getAllPublishPackageEntryExtensionProtocols = getAllPublishPackageEntryExtensionProtocols;
let getAllPublishPackageInfos = (entryExtensionProtocolName, entryExtensionProtocolVersion) => Abstract.getAllPublishPackageInfos(BackendService_1.getDataByKeyContain, entryExtensionProtocolName, entryExtensionProtocolVersion);
exports.getAllPublishPackageInfos = getAllPublishPackageInfos;
let findPublishPackage = (onDownloadProgressFunc, account, packageName, packageVersion) => Abstract.findPublishPackage([
    BackendService_1.getDataByKeyContain,
    (0, Curry_1.curry2)(BackendService_1.downloadFile)(onDownloadProgressFunc)
], account, packageName, packageVersion);
exports.findPublishPackage = findPublishPackage;
