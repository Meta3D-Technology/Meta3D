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
exports.publishContribute = exports.publishExtension = void 0;
const fs_1 = __importDefault(require("fs"));
const meta3d_1 = require("meta3d");
const CloudbaseService = __importStar(require("meta3d-tool-utils/src/publish/CloudbaseService"));
const PublishUtils_1 = require("meta3d-tool-utils/src/publish/PublishUtils");
const Publish_1 = require("./Publish");
// let _getFuncArrForExtension = (env: env, packageFilePath: string): [any, any, any, any, any, any, any, any, any, any, any] => {
// 	switch (env) {
// 		case "local":
// 			return [
// 				fs.readFileSync,
// 				console.log,
// 				console.error,
// 				buildReadJsonFunc(packageFilePath),
// 				CloudbaseService.init,
// 				CloudbaseService.hasAccount,
// 				CloudbaseService.getMarketProtocolCollection,
// 				CloudbaseService.isContain,
// 				CloudbaseService.addDataToMarketProtocolCollection,
// 				CloudbaseService.addMarketProtocolDataToDataFromMarketProtocolCollectionData,
// 				CloudbaseService.getDataFromMarketProtocolCollection
// 			]
// 		case "production":
// 			return [
// 				fs.readFileSync,
// 				console.log,
// 				console.error,
// 				buildReadJsonFunc(packageFilePath),
// 				_4everlandService.init, _4everlandService.hasAccount, _4everlandService.getMarketProtocolCollection, _4everlandService.isContain, _4everlandService.addDataToMarketProtocolCollection,
// 				_4everlandService.addMarketProtocolDataToDataFromMarketProtocolCollectionData,
// 				_4everlandService.getDataFromMarketProtocolCollection
// 			]
// 		default:
// 			throw new Error("unknown env")
// 	}
// }
let publishExtension = (env, packageFilePath, distFilePath) => {
    let funcArr = null;
    switch (env) {
        case "local":
            funcArr = [
                fs_1.default.readFileSync,
                console.log,
                console.error,
                (0, PublishUtils_1.buildReadJsonFunc)(packageFilePath),
                meta3d_1.generateExtension,
                CloudbaseService.initLocal,
                CloudbaseService.hasAccount,
                CloudbaseService.uploadFile,
                CloudbaseService.getMarketImplementAccountData,
                CloudbaseService.addMarketImplementData,
                // CloudbaseService.getDataFromMarketImplementAccountData,
                // CloudbaseService.isContain,
                // CloudbaseService.buildMarketImplementAccountData,
                // CloudbaseService.addMarketImplementDataToDataFromMarketImplementCollectionData,
                CloudbaseService.getFileID,
                CloudbaseService.parseMarketCollectionDataBodyForNodejs,
            ];
            break;
        case "production":
            funcArr = [
            // fs.readFileSync,
            // console.log,
            // console.error,
            // buildReadJsonFunc(packageFilePath),
            // generateExtension,
            // CloudbaseService.initProduction,
            // CloudbaseService.hasAccount,
            // CloudbaseService.uploadFile,
            // CloudbaseService.getMarketImplementAccountData,
            // CloudbaseService.updateMarketImplementData,
            // CloudbaseService.getDataFromMarketImplementAccountData,
            // CloudbaseService.isContain,
            // CloudbaseService.buildMarketImplementAccountData,
            // CloudbaseService.addMarketImplementDataToDataFromMarketImplementCollectionData,
            // CloudbaseService.getFileID,
            // CloudbaseService.parseMarketCollectionDataBodyForNodejs,
            ];
            break;
        default:
            throw new Error("unknown env");
    }
    return (0, Publish_1.publish)(funcArr, packageFilePath, distFilePath, "extension");
};
exports.publishExtension = publishExtension;
let publishContribute = (env, packageFilePath, distFilePath) => {
    let funcArr = null;
    switch (env) {
        case "local":
            funcArr = [
                fs_1.default.readFileSync,
                console.log,
                console.error,
                (0, PublishUtils_1.buildReadJsonFunc)(packageFilePath),
                meta3d_1.generateContribute,
                CloudbaseService.initLocal,
                CloudbaseService.hasAccount,
                CloudbaseService.uploadFile,
                CloudbaseService.getMarketImplementAccountData,
                CloudbaseService.addMarketImplementData,
                CloudbaseService.getFileID,
                CloudbaseService.parseMarketCollectionDataBodyForNodejs,
            ];
            break;
        case "production":
            funcArr = [
            // fs.readFileSync,
            // console.log,
            // console.error,
            // buildReadJsonFunc(packageFilePath),
            // generateContribute,
            // CloudbaseService.initProduction,
            // CloudbaseService.hasAccount,
            // CloudbaseService.uploadFile,
            // CloudbaseService.getMarketImplementAccountData,
            // CloudbaseService.updateMarketImplementData,
            // CloudbaseService.getDataFromMarketImplementAccountData,
            // CloudbaseService.isContain,
            // CloudbaseService.buildMarketImplementAccountData,
            // CloudbaseService.addMarketImplementDataToDataFromMarketImplementCollectionData,
            // CloudbaseService.getFileID,
            // CloudbaseService.parseMarketCollectionDataBodyForNodejs,
            ];
            break;
        default:
            throw new Error("unknown env");
    }
    return (0, Publish_1.publish)(funcArr, packageFilePath, distFilePath, "contribute");
};
exports.publishContribute = publishContribute;
// publishExtension(path.join(__dirname, "../mine/test_data/", "package.json"), path.join(__dirname, "../mine/test_data/", "main.js"))
// publishExtension(path.join(__dirname, "../mine/t/", "package.json"), path.join(__dirname, "../mine/t/", "main.js"))
//# sourceMappingURL=Main.js.map