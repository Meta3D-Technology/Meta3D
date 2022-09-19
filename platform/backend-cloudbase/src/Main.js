"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findAllPublishApps = exports.findPublishApp = exports.publishApp = exports.getAllPublishContributes = exports.getAllPublishExtensions = exports.getAllPublishContributeProtocols = exports.getAllPublishExtensionProtocols = exports.isLoginSuccess = exports.registerUser = exports.checkUserName = exports.init = exports.error = void 0;
const ErrorService = require("./application_layer/common/ErrorService");
const BackendService = require("./application_layer/common/BackendService");
const LoginService = require("./application_layer/user/LoginService");
const RegisterService = require("./application_layer/user/RegisterService");
const ShopService = require("./application_layer/shop/ShopService");
const PublishAppService = require("./application_layer/publish/PublishAppService");
const CloudbaseService_1 = require("./application_layer/cloudbase/CloudbaseService");
exports.error = ErrorService.error;
exports.init = BackendService.init;
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
