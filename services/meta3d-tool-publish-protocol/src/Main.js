"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishExtensionProtocolConfig = exports.publishContributeProtocolConfig = exports.publishContributeProtocol = exports.publishExtensionProtocol = void 0;
const fs_1 = __importDefault(require("fs"));
// import path from "path"
const CloudbaseService = __importStar(require("meta3d-tool-utils/src/publish/CloudbaseService"));
const _4everlandService = __importStar(require("meta3d-tool-utils/src/publish/4everlandService"));
const PublishUtils_1 = require("meta3d-tool-utils/src/publish/PublishUtils");
const Publish_1 = require("./Publish");
let _getFuncArr = (env, packageFilePath) => {
    switch (env) {
        case "local":
            return [
                fs_1.default.readFileSync,
                console.log,
                console.error,
                (0, PublishUtils_1.buildReadJsonFunc)(packageFilePath),
                CloudbaseService.init, CloudbaseService.hasAccount, CloudbaseService.getCollection, CloudbaseService.isContain, CloudbaseService.addData,
                CloudbaseService.addDataToBody
            ];
            break;
        case "production":
            return [
                fs_1.default.readFileSync,
                console.log,
                console.error,
                (0, PublishUtils_1.buildReadJsonFunc)(packageFilePath),
                _4everlandService.init, _4everlandService.hasAccount, _4everlandService.getCollection, _4everlandService.isContain, _4everlandService.addData,
                _4everlandService.addDataToBody
            ];
            break;
        default:
            throw new Error("unknown env");
    }
};
function publishExtensionProtocol(env, packageFilePath, iconPath) {
    return (0, Publish_1.publish)(_getFuncArr(env, packageFilePath), packageFilePath, iconPath, "extension");
}
exports.publishExtensionProtocol = publishExtensionProtocol;
function publishContributeProtocol(env, packageFilePath, iconPath) {
    return (0, Publish_1.publish)(_getFuncArr(env, packageFilePath), packageFilePath, iconPath, "contribute");
}
exports.publishContributeProtocol = publishContributeProtocol;
function publishContributeProtocolConfig(env, packageFilePath, distFilePath) {
    return (0, Publish_1.publishConfig)(_getFuncArr(env, packageFilePath), packageFilePath, distFilePath, "contribute");
}
exports.publishContributeProtocolConfig = publishContributeProtocolConfig;
function publishExtensionProtocolConfig(env, packageFilePath, distFilePath) {
    return (0, Publish_1.publishConfig)(_getFuncArr(env, packageFilePath), packageFilePath, distFilePath, "extension");
}
exports.publishExtensionProtocolConfig = publishExtensionProtocolConfig;
// // publishExtensionProtocol(path.join(__dirname, "../../../protocols/extension_protocols/meta3d-editor-protocol/", "package.json"), path.join(__dirname, "../../../protocols/extension_protocols/meta3d-editor-protocol/", "icon.png"))
//# sourceMappingURL=Main.js.map