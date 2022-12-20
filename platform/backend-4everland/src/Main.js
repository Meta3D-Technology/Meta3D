"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findPublishPackage = exports.getAllPublishPackageInfos = exports.getAllPublishPackageEntryExtensionProtocols = exports.publishPackage = exports.getElementAssembleData = exports.getAllPublishNewestExtensions = exports.publishElementAssembleData = exports.publishElementContribute = exports.findAllPublishApps = exports.findPublishApp = exports.publishApp = exports.findPublishContribute = exports.findPublishExtension = exports.getAllPublishContributeInfos = exports.getAllPublishExtensionInfos = exports.getAllPublishContributeProtocolConfigs = exports.getAllPublishExtensionProtocolConfigs = exports.getAllPublishContributeProtocols = exports.getAllPublishExtensionProtocols = exports.handleLogin = exports.init = void 0;
const Abstract = require("backend-abstract");
const Curry_1 = require("../../../defaults/meta3d-fp/src/Curry");
const BackendService_1 = require("./application_layer/BackendService");
let init = (_env) => Abstract.init(BackendService_1.init, null);
exports.init = init;
let handleLogin = (account) => Abstract.handleLogin(BackendService_1.handleLogin, account);
exports.handleLogin = handleLogin;
let getAllPublishExtensionProtocols = () => Abstract.getAllPublishProtocolData([BackendService_1.getShopProtocolCollection, BackendService_1.getDataFromShopProtocolCollection], "publishedextensionprotocols");
exports.getAllPublishExtensionProtocols = getAllPublishExtensionProtocols;
let getAllPublishContributeProtocols = () => Abstract.getAllPublishProtocolData([BackendService_1.getShopProtocolCollection, BackendService_1.getDataFromShopProtocolCollection], "publishedcontributeprotocols");
exports.getAllPublishContributeProtocols = getAllPublishContributeProtocols;
let getAllPublishExtensionProtocolConfigs = () => Abstract.getAllPublishProtocolConfigData([BackendService_1.getShopProtocolCollection, BackendService_1.getDataFromShopProtocolCollection], "publishedextensionprotocolconfigs");
exports.getAllPublishExtensionProtocolConfigs = getAllPublishExtensionProtocolConfigs;
let getAllPublishContributeProtocolConfigs = () => Abstract.getAllPublishProtocolConfigData([BackendService_1.getShopProtocolCollection, BackendService_1.getDataFromShopProtocolCollection], "publishedcontributeprotocolconfigs");
exports.getAllPublishContributeProtocolConfigs = getAllPublishContributeProtocolConfigs;
let getAllPublishExtensionInfos = (protocolName, protocolVersion) => Abstract.getAllPublishImplementInfo([
    BackendService_1.getShopImplementCollection,
    BackendService_1.mapShopImplementCollection,
    BackendService_1.getAccountFromShopImplementCollectionData,
    BackendService_1.getFileDataFromShopImplementCollectionData,
], "publishedextensions", protocolName, protocolVersion);
exports.getAllPublishExtensionInfos = getAllPublishExtensionInfos;
let getAllPublishContributeInfos = (protocolName, protocolVersion) => Abstract.getAllPublishImplementInfo([
    BackendService_1.getShopImplementCollection,
    BackendService_1.mapShopImplementCollection,
    BackendService_1.getAccountFromShopImplementCollectionData,
    BackendService_1.getFileDataFromShopImplementCollectionData,
], "publishedcontributes", protocolName, protocolVersion);
exports.getAllPublishContributeInfos = getAllPublishContributeInfos;
let findPublishExtension = (onDownloadProgressFunc, account, name, version) => Abstract.findPublishImplement([
    BackendService_1.getShopImplement,
    (0, Curry_1.curry2)(BackendService_1.downloadFile)(onDownloadProgressFunc)
], "publishedextensions", account, name, version);
exports.findPublishExtension = findPublishExtension;
let findPublishContribute = (onDownloadProgressFunc, account, name, version) => Abstract.findPublishImplement([
    BackendService_1.getShopImplement,
    (0, Curry_1.curry2)(BackendService_1.downloadFile)(onDownloadProgressFunc)
], "publishedcontributes", account, name, version);
exports.findPublishContribute = findPublishContribute;
let publishApp = (onUploadProgressFunc, appBinaryFile, appName, account) => Abstract.publishApp([
    onUploadProgressFunc,
    BackendService_1.uploadFile,
    BackendService_1.hasData,
    BackendService_1.addData,
    BackendService_1.updateData,
    BackendService_1.getFileID,
], appBinaryFile, appName, account);
exports.publishApp = publishApp;
let findPublishApp = (onDownloadProgressFunc, account, appName) => Abstract.findPublishApp([
    BackendService_1.getDataByKey,
    (0, Curry_1.curry2)(BackendService_1.downloadFile)(onDownloadProgressFunc)
], account, appName);
exports.findPublishApp = findPublishApp;
let findAllPublishApps = (account) => Abstract.findAllPublishApps(BackendService_1.getDataByKeyContain, account);
exports.findAllPublishApps = findAllPublishApps;
function _throwError(msg) {
    throw new Error(msg);
}
let publishElementContribute = (onUploadProgressFunc, account, packageData, contributeBinaryFile) => Abstract.publishElementContribute([
    onUploadProgressFunc,
    _throwError, BackendService_1.uploadFile, BackendService_1.getShopImplementAccountData, BackendService_1.updateShopImplementData,
    BackendService_1.getDataFromShopImplementAccountData, BackendService_1.isContain, BackendService_1.buildShopImplementAccountData, BackendService_1.addShopImplementDataToDataFromShopImplementCollectionData,
    BackendService_1.getFileID
], account, packageData, contributeBinaryFile);
exports.publishElementContribute = publishElementContribute;
let publishElementAssembleData = (account, elementName, elementVersion, inspectorData) => Abstract.publishElementAssembleData([
    _throwError,
    BackendService_1.getShopImplementAccountData, BackendService_1.updateShopImplementData, BackendService_1.getDataFromShopImplementAccountData, BackendService_1.isContain, BackendService_1.buildShopImplementAccountData, BackendService_1.addShopImplementDataToDataFromShopImplementCollectionData,
], account, elementName, elementVersion, inspectorData);
exports.publishElementAssembleData = publishElementAssembleData;
let _onDownloadProgressFuncForSingleExtensionOrContribute = console.log;
let getAllPublishNewestExtensions = (protocolName) => Abstract.getAllPublishNewestData([
    BackendService_1.getShopImplementCollection,
    BackendService_1.mapShopImplementCollection,
    BackendService_1.getAccountFromShopImplementCollectionData,
    BackendService_1.getFileDataFromShopImplementCollectionData,
    (0, Curry_1.curry2)(BackendService_1.downloadFile)(_onDownloadProgressFuncForSingleExtensionOrContribute)
], "publishedextensions", protocolName);
exports.getAllPublishNewestExtensions = getAllPublishNewestExtensions;
let getElementAssembleData = (account, elementName, elementVersion) => Abstract.getElementAssembleData([BackendService_1.getShopImplementAccountData, BackendService_1.getDataFromShopImplementAccountData], account, elementName, elementVersion);
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
let getAllPublishPackageEntryExtensionProtocols = () => Abstract.getAllPublishPackageEntryExtensionProtocols(BackendService_1.getData);
exports.getAllPublishPackageEntryExtensionProtocols = getAllPublishPackageEntryExtensionProtocols;
let getAllPublishPackageInfos = (entryProtocolName, entryProtocolVersion) => Abstract.getAllPublishPackageInfos(BackendService_1.getDataByKeyContain, entryProtocolName, entryProtocolVersion);
exports.getAllPublishPackageInfos = getAllPublishPackageInfos;
let findPublishPackage = (onDownloadProgressFunc, account, packageName, packageVersion) => Abstract.findPublishPackage([
    BackendService_1.getDataByKeyContain,
    (0, Curry_1.curry2)(BackendService_1.downloadFile)(onDownloadProgressFunc)
], account, packageName, packageVersion);
exports.findPublishPackage = findPublishPackage;
