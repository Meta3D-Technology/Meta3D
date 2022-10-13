"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElementAssembleData = exports.getAllPublishNewestExtensions = exports.publishedElementAssembleData = exports.publishElementContribute = exports.findAllPublishApps = exports.findPublishApp = exports.publishApp = exports.getAllPublishContributes = exports.getAllPublishExtensions = exports.getAllPublishContributeProtocolConfigs = exports.getAllPublishContributeProtocols = exports.getAllPublishExtensionProtocols = exports.isLoginSuccess = exports.registerUser = exports.checkUserName = exports.init = exports.error = void 0;
const ErrorService = require("./application_layer/common/ErrorService");
const LoginService = require("./application_layer/user/LoginService");
const RegisterService = require("./application_layer/user/RegisterService");
const ShopService = require("./application_layer/shop/ShopService");
const PublishAppService = require("./application_layer/publish/PublishAppService");
const PublishElementContributeService = require("./application_layer/assemble_space/element_assemble/PublishElementContributeService");
const GetElementDataService = require("./application_layer/assemble_space/element_assemble/GetElementDataService");
const CloudbaseService_1 = require("./application_layer/cloudbase/CloudbaseService");
exports.error = ErrorService.error;
exports.init = CloudbaseService_1.init;
let checkUserName = (username) => {
    return RegisterService.checkUserName(CloudbaseService_1.notHasData, username);
};
exports.checkUserName = checkUserName;
let registerUser = (username, password) => {
    return RegisterService.register(CloudbaseService_1.addData, username, password);
};
exports.registerUser = registerUser;
let isLoginSuccess = (username, password) => {
    return LoginService.isLoginSuccess(CloudbaseService_1.notHasData, username, password);
};
exports.isLoginSuccess = isLoginSuccess;
let getAllPublishExtensionProtocols = () => {
    return ShopService.getAllPublishProtocolData(CloudbaseService_1.getCollection, "publishedExtensionProtocols");
};
exports.getAllPublishExtensionProtocols = getAllPublishExtensionProtocols;
let getAllPublishContributeProtocols = () => {
    return ShopService.getAllPublishProtocolData(CloudbaseService_1.getCollection, "publishedContributeProtocols");
};
exports.getAllPublishContributeProtocols = getAllPublishContributeProtocols;
let getAllPublishContributeProtocolConfigs = () => {
    return ShopService.getAllPublishProtocolConfigData(CloudbaseService_1.getCollection, "publishedContributeProtocolConfigs");
};
exports.getAllPublishContributeProtocolConfigs = getAllPublishContributeProtocolConfigs;
let getAllPublishExtensions = (protocolName, protocolVersion) => {
    return ShopService.getAllPublishData([CloudbaseService_1.getCollection, CloudbaseService_1.getFile], "publishedExtensions", protocolName, protocolVersion);
};
exports.getAllPublishExtensions = getAllPublishExtensions;
let getAllPublishContributes = (protocolName, protocolVersion) => {
    return ShopService.getAllPublishData([CloudbaseService_1.getCollection, CloudbaseService_1.getFile], "publishedContributes", protocolName, protocolVersion);
};
exports.getAllPublishContributes = getAllPublishContributes;
let publishApp = (appBinaryFile, appName, username) => {
    return PublishAppService.publish([
        console.log,
        CloudbaseService_1.uploadFile,
        CloudbaseService_1.hasData,
        CloudbaseService_1.addData,
        CloudbaseService_1.updateData
    ], appBinaryFile, appName, username);
};
exports.publishApp = publishApp;
let findPublishApp = (username, appName) => {
    return PublishAppService.findPublishApp([CloudbaseService_1.getData, CloudbaseService_1.getFile], username, appName);
};
exports.findPublishApp = findPublishApp;
let findAllPublishApps = (username) => {
    return PublishAppService.findAllPublishApps([CloudbaseService_1.getData, CloudbaseService_1.getFile], username);
};
exports.findAllPublishApps = findAllPublishApps;
function publishElementContribute(username, packageData, contributeBinaryFile) {
    return PublishElementContributeService.publishElementContribute([
        console.log,
        console.error,
        CloudbaseService_1.hasData, CloudbaseService_1.uploadFile, CloudbaseService_1.getData, CloudbaseService_1.updateData
    ], username, packageData, contributeBinaryFile);
}
exports.publishElementContribute = publishElementContribute;
function publishedElementAssembleData(username, elementName, elementVersion, inspectorData) {
    return PublishElementContributeService.publishElementAssembleData([
        console.log,
        console.error,
        CloudbaseService_1.hasData, CloudbaseService_1.getData, CloudbaseService_1.updateData
    ], username, elementName, elementVersion, inspectorData);
}
exports.publishedElementAssembleData = publishedElementAssembleData;
let getAllPublishNewestExtensions = (protocolName) => {
    return GetElementDataService.getAllPublishNewestData([CloudbaseService_1.getCollection, CloudbaseService_1.getFile], "publishedExtensions", protocolName);
};
exports.getAllPublishNewestExtensions = getAllPublishNewestExtensions;
let getElementAssembleData = (username, elementName, elementVersion) => {
    return GetElementDataService.getElementAssembleData(CloudbaseService_1.getData, username, elementName, elementVersion);
};
exports.getElementAssembleData = getElementAssembleData;
