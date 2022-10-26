"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElementAssembleData = exports.getAllPublishNewestExtensions = exports.publishElementAssembleData = exports.publishElementContribute = exports.findAllPublishApps = exports.findPublishApp = exports.publishApp = exports.getAllPublishContributes = exports.getAllPublishExtensions = exports.getAllPublishContributeProtocolConfigs = exports.getAllPublishExtensionProtocolConfigs = exports.getAllPublishContributeProtocols = exports.getAllPublishExtensionProtocols = exports.handleLogin = exports.init = void 0;
const Abtstract = require("backend-abstract");
const BackendService_1 = require("./application_layer/BackendService");
// export let error = ErrorService.error
let init = () => Abtstract.init(BackendService_1.init);
exports.init = init;
let handleLogin = (account) => Abtstract.handleLogin(BackendService_1.handleLogin, account);
exports.handleLogin = handleLogin;
let getAllPublishExtensionProtocols = () => Abtstract.getAllPublishProtocolData([BackendService_1.getShopProtocolCollection, BackendService_1.getDataFromShopProtocolCollection], "publishedextensionprotocols");
exports.getAllPublishExtensionProtocols = getAllPublishExtensionProtocols;
let getAllPublishContributeProtocols = () => Abtstract.getAllPublishProtocolData([BackendService_1.getShopProtocolCollection, BackendService_1.getDataFromShopProtocolCollection], "publishedcontributeprotocols");
exports.getAllPublishContributeProtocols = getAllPublishContributeProtocols;
let getAllPublishExtensionProtocolConfigs = () => Abtstract.getAllPublishProtocolConfigData([BackendService_1.getShopProtocolCollection, BackendService_1.getDataFromShopProtocolCollection], "publishedextensionprotocolconfigs");
exports.getAllPublishExtensionProtocolConfigs = getAllPublishExtensionProtocolConfigs;
let getAllPublishContributeProtocolConfigs = () => Abtstract.getAllPublishProtocolConfigData([BackendService_1.getShopProtocolCollection, BackendService_1.getDataFromShopProtocolCollection], "publishedcontributeprotocolconfigs");
exports.getAllPublishContributeProtocolConfigs = getAllPublishContributeProtocolConfigs;
let getAllPublishExtensions = (protocolName, protocolVersion) => Abtstract.getAllPublishData([
    BackendService_1.getShopImplementCollection,
    BackendService_1.mapShopImplementCollection,
    BackendService_1.getAccountFromShopImplementCollectionData,
    BackendService_1.getFileDataFromShopImplementCollectionData,
    BackendService_1.getFile
], "publishedextensions", protocolName, protocolVersion);
exports.getAllPublishExtensions = getAllPublishExtensions;
let getAllPublishContributes = (protocolName, protocolVersion) => Abtstract.getAllPublishData([
    BackendService_1.getShopImplementCollection,
    BackendService_1.mapShopImplementCollection,
    BackendService_1.getAccountFromShopImplementCollectionData,
    BackendService_1.getFileDataFromShopImplementCollectionData,
    BackendService_1.getFile
], "publishedcontributes", protocolName, protocolVersion);
exports.getAllPublishContributes = getAllPublishContributes;
let publishApp = (appBinaryFile, appName, account) => Abtstract.publishApp([
    console.log,
    BackendService_1.uploadFile,
    BackendService_1.hasData,
    BackendService_1.addData,
    BackendService_1.updateData,
    BackendService_1.getFileID,
], appBinaryFile, appName, account);
exports.publishApp = publishApp;
let findPublishApp = (account, appName) => Abtstract.findPublishApp([
    BackendService_1.getDataByKey,
    BackendService_1.getFile
], account, appName);
exports.findPublishApp = findPublishApp;
let findAllPublishApps = (account) => Abtstract.findAllPublishApps(BackendService_1.getDataByKeyContain, account);
exports.findAllPublishApps = findAllPublishApps;
function _throwError(msg) {
    throw new Error(msg);
}
let publishElementContribute = (account, packageData, contributeBinaryFile) => Abtstract.publishElementContribute([
    console.log,
    _throwError, BackendService_1.uploadFile, BackendService_1.getShopImplementAccountData, BackendService_1.updateShopImplementData,
    BackendService_1.getDataFromShopImplementAccountData, BackendService_1.isContain, BackendService_1.buildShopImplementAccountData, BackendService_1.addShopImplementDataToDataFromShopImplementCollectionData,
    BackendService_1.getFileID
], account, packageData, contributeBinaryFile);
exports.publishElementContribute = publishElementContribute;
let publishElementAssembleData = (account, elementName, elementVersion, inspectorData) => Abtstract.publishElementAssembleData([
    _throwError,
    BackendService_1.getShopImplementAccountData, BackendService_1.updateShopImplementData, BackendService_1.getDataFromShopImplementAccountData, BackendService_1.isContain, BackendService_1.buildShopImplementAccountData, BackendService_1.addShopImplementDataToDataFromShopImplementCollectionData,
], account, elementName, elementVersion, inspectorData);
exports.publishElementAssembleData = publishElementAssembleData;
let getAllPublishNewestExtensions = (protocolName) => Abtstract.getAllPublishNewestData([
    BackendService_1.getShopImplementCollection,
    BackendService_1.mapShopImplementCollection,
    BackendService_1.getAccountFromShopImplementCollectionData,
    BackendService_1.getFileDataFromShopImplementCollectionData,
    BackendService_1.getFile
], "publishedextensions", protocolName);
exports.getAllPublishNewestExtensions = getAllPublishNewestExtensions;
let getElementAssembleData = (account, elementName, elementVersion) => Abtstract.getElementAssembleData([BackendService_1.getShopImplementAccountData, BackendService_1.getDataFromShopImplementAccountData], account, elementName, elementVersion);
exports.getElementAssembleData = getElementAssembleData;
