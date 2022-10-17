"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishContribute = exports.publishExtension = void 0;
const fs_1 = __importDefault(require("fs"));
const meta3d_1 = require("meta3d");
const CloudbaseService_1 = require("meta3d-tool-utils/src/publish/CloudbaseService");
const PublishUtils_1 = require("meta3d-tool-utils/src/publish/PublishUtils");
const Publish_1 = require("./Publish");
function publishExtension(packageFilePath, distFilePath) {
    return (0, Publish_1.publish)([
        fs_1.default.readFileSync,
        console.log,
        console.error,
        (0, PublishUtils_1.buildReadJsonFunc)(packageFilePath),
        meta3d_1.generateExtension, CloudbaseService_1.init, CloudbaseService_1.hasData, CloudbaseService_1.uploadFile, CloudbaseService_1.getData, CloudbaseService_1.updateData
    ], packageFilePath, distFilePath, "extension");
}
exports.publishExtension = publishExtension;
function publishContribute(packageFilePath, distFilePath) {
    return (0, Publish_1.publish)([
        fs_1.default.readFileSync,
        console.log,
        console.error,
        (0, PublishUtils_1.buildReadJsonFunc)(packageFilePath),
        meta3d_1.generateContribute, CloudbaseService_1.init, CloudbaseService_1.hasData, CloudbaseService_1.uploadFile, CloudbaseService_1.getData, CloudbaseService_1.updateData
    ], packageFilePath, distFilePath, "contribute");
}
exports.publishContribute = publishContribute;
// publishExtension(path.join(__dirname, "../mine/test_data/", "package.json"), path.join(__dirname, "../mine/test_data/", "main.js"))
// publishExtension(path.join(__dirname, "../mine/t/", "package.json"), path.join(__dirname, "../mine/t/", "main.js"))
//# sourceMappingURL=Main.js.map