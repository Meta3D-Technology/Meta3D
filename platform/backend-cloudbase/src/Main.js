"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPublishContributes = exports.getAllPublishExtensions = exports.getAllPublishContributeProtocols = exports.getAllPublishExtensionProtocols = exports.isLoginSuccess = exports.registerUser = exports.checkUserName = exports.init = exports.error = void 0;
const ErrorService = require("./application_layer/common/ErrorService");
const BackendService = require("./application_layer/common/BackendService");
const LoginService = require("./application_layer/user/LoginService");
const RegisterService = require("./application_layer/user/RegisterService");
const ShopService = require("./application_layer/shop/ShopService");
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
    return ShopService.getAllPublishProtocolData(CloudbaseService_1.getData, "publishedExtensionProtocols");
};
exports.getAllPublishExtensionProtocols = getAllPublishExtensionProtocols;
let getAllPublishContributeProtocols = () => {
    return ShopService.getAllPublishProtocolData(CloudbaseService_1.getData, "publishedContributeProtocols");
};
exports.getAllPublishContributeProtocols = getAllPublishContributeProtocols;
let getAllPublishExtensions = (protocolName, protocolVersion) => {
    return ShopService.getAllPublishData([CloudbaseService_1.getData, CloudbaseService_1.getFile], "publishedExtensions", protocolName, protocolVersion);
};
exports.getAllPublishExtensions = getAllPublishExtensions;
let getAllPublishContributes = (protocolName, protocolVersion) => {
    return ShopService.getAllPublishData([CloudbaseService_1.getData, CloudbaseService_1.getFile], "publishedContributes", protocolName, protocolVersion);
};
exports.getAllPublishContributes = getAllPublishContributes;
