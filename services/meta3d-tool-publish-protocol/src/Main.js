"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishExtensionProtocolConfig = exports.publishContributeProtocolConfig = exports.publishContributeProtocol = exports.publishExtensionProtocol = void 0;
const fs_1 = __importDefault(require("fs"));
// import path from "path"
const CloudbaseService_1 = require("meta3d-tool-utils/src/publish/CloudbaseService");
const PublishUtils_1 = require("meta3d-tool-utils/src/publish/PublishUtils");
const Publish_1 = require("./Publish");
function publishExtensionProtocol(packageFilePath, iconPath) {
    return (0, Publish_1.publish)([
        fs_1.default.readFileSync,
        console.log,
        console.error,
        (0, PublishUtils_1.buildReadJsonFunc)(packageFilePath),
        CloudbaseService_1.init, CloudbaseService_1.hasData, CloudbaseService_1.getCollection, CloudbaseService_1.addData
    ], packageFilePath, iconPath, "extension");
}
exports.publishExtensionProtocol = publishExtensionProtocol;
function publishContributeProtocol(packageFilePath, iconPath) {
    return (0, Publish_1.publish)([
        fs_1.default.readFileSync,
        console.log,
        console.error,
        (0, PublishUtils_1.buildReadJsonFunc)(packageFilePath),
        CloudbaseService_1.init, CloudbaseService_1.hasData, CloudbaseService_1.getCollection, CloudbaseService_1.addData
    ], packageFilePath, iconPath, "contribute");
}
exports.publishContributeProtocol = publishContributeProtocol;
function publishContributeProtocolConfig(packageFilePath, distFilePath) {
    return (0, Publish_1.publishConfig)([
        fs_1.default.readFileSync,
        console.log,
        console.error,
        (0, PublishUtils_1.buildReadJsonFunc)(packageFilePath),
        CloudbaseService_1.init, CloudbaseService_1.hasData, CloudbaseService_1.getCollection, CloudbaseService_1.addData
    ], packageFilePath, distFilePath, "contribute");
}
exports.publishContributeProtocolConfig = publishContributeProtocolConfig;
function publishExtensionProtocolConfig(packageFilePath, distFilePath) {
    return (0, Publish_1.publishConfig)([
        fs_1.default.readFileSync,
        console.log,
        console.error,
        (0, PublishUtils_1.buildReadJsonFunc)(packageFilePath),
        CloudbaseService_1.init, CloudbaseService_1.hasData, CloudbaseService_1.getCollection, CloudbaseService_1.addData
    ], packageFilePath, distFilePath, "extension");
}
exports.publishExtensionProtocolConfig = publishExtensionProtocolConfig;
// publishExtensionProtocol(path.join(__dirname, "../../../protocols/extension_protocols/meta3d-editor-protocol/", "package.json"), path.join(__dirname, "../../../protocols/extension_protocols/meta3d-editor-protocol/", "icon.png"))
//# sourceMappingURL=Main.js.map