"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPublishContributes = exports.getAllPublishExtensions = exports.getAllPublishContributeProtocolConfigs = exports.getAllPublishExtensionProtocolConfigs = exports.getAllPublishContributeProtocols = exports.getAllPublishExtensionProtocols = exports.handleLogin = exports.init = void 0;
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
