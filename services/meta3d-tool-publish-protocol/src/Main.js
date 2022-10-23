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
exports.publishExtensionProtocol = void 0;
const fs_1 = __importDefault(require("fs"));
// import path from "path"
const CloudbaseService = __importStar(require("meta3d-tool-utils/src/publish/CloudbaseService"));
const _4everlandService = __importStar(require("meta3d-tool-utils/src/publish/4everlandService"));
const PublishUtils_1 = require("meta3d-tool-utils/src/publish/PublishUtils");
// import { publish, publishConfig } from "./Publish";
const Publish_1 = require("./Publish");
function publishExtensionProtocol(env, packageFilePath, iconPath) {
    let funcArr = null;
    switch (env) {
        case "local":
            funcArr = [
                fs_1.default.readFileSync,
                console.log,
                console.error,
                (0, PublishUtils_1.buildReadJsonFunc)(packageFilePath),
                CloudbaseService.init, CloudbaseService.hasAccount, CloudbaseService.getCollection, CloudbaseService.isContain, CloudbaseService.addData,
                CloudbaseService.addDataToBody
            ];
            break;
        case "production":
            funcArr = [
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
    return (0, Publish_1.publish)(funcArr, packageFilePath, iconPath, "extension");
}
exports.publishExtensionProtocol = publishExtensionProtocol;
// export function publishContributeProtocol(packageFilePath: string, iconPath: string) {
// 	return publish([
// 		fs.readFileSync,
// 		console.log,
// 		console.error,
// 		buildReadJsonFunc(packageFilePath),
// 		init, hasAccount, getCollection, addData], packageFilePath, iconPath, "contribute")
// }
// export function publishContributeProtocolConfig(packageFilePath: string, distFilePath: string) {
// 	return publishConfig([
// 		fs.readFileSync,
// 		console.log,
// 		console.error,
// 		buildReadJsonFunc(packageFilePath),
// 		init, hasAccount, getCollection, addData], packageFilePath, distFilePath, "contribute")
// }
// export function publishExtensionProtocolConfig(packageFilePath: string, distFilePath: string) {
// 	return publishConfig([
// 		fs.readFileSync,
// 		console.log,
// 		console.error,
// 		buildReadJsonFunc(packageFilePath),
// 		init, hasAccount, getCollection, addData], packageFilePath, distFilePath, "extension")
// }
// // publishExtensionProtocol(path.join(__dirname, "../../../protocols/extension_protocols/meta3d-editor-protocol/", "package.json"), path.join(__dirname, "../../../protocols/extension_protocols/meta3d-editor-protocol/", "icon.png"))
//# sourceMappingURL=Main.js.map