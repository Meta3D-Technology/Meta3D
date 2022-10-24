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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFile = exports.updateShopImplementData = exports.getFileID = exports.addShopImplementDataToDataFromShopImplementCollectionData = exports.buildShopImplementAccountData = exports.getDataFromShopImplementAccountData = exports.getDataFromShopProtocolCollection = exports.getShopImplementAccountData = exports.addShopProtocolDataToDataFromShopProtocolCollectionData = exports.getShopProtocolCollection = exports.isContain = exports.hasAccount = exports.addDataToShopProtocolCollection = exports.init = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const most_1 = require("most");
const BackendService = __importStar(require("meta3d-backend-4everland"));
let init = () => {
    const s3 = new client_s3_1.S3({
        endpoint: "https://endpoint.4everland.co",
        signatureVersion: "v4",
        credentials: {
            accessKeyId: "P7SHR2MYU5CHLXKXCOG7",
            secretAccessKey: "5yhjyVdcpNNKjZ9X5sBe3738Lh9KftfDHQ6zkZKL",
            // sessionToken,
        },
        region: "us-west-2",
    });
    return (0, most_1.just)(s3);
};
exports.init = init;
exports.addDataToShopProtocolCollection = BackendService.addDataToShopProtocolCollection;
exports.hasAccount = BackendService.hasAccount;
exports.isContain = BackendService.isContain;
exports.getShopProtocolCollection = BackendService.getShopProtocolCollection;
exports.addShopProtocolDataToDataFromShopProtocolCollectionData = BackendService.addShopProtocolDataToDataFromShopProtocolCollectionData;
exports.getShopImplementAccountData = BackendService.getShopImplementAccountData;
exports.getDataFromShopProtocolCollection = BackendService.getDataFromShopProtocolCollection;
exports.getDataFromShopImplementAccountData = BackendService.getDataFromShopImplementAccountData;
exports.buildShopImplementAccountData = BackendService.buildShopImplementAccountData;
exports.addShopImplementDataToDataFromShopImplementCollectionData = BackendService.addShopImplementDataToDataFromShopImplementCollectionData;
exports.getFileID = BackendService.getFileID;
exports.updateShopImplementData = BackendService.updateShopImplementData;
exports.uploadFile = BackendService.uploadFile;
//# sourceMappingURL=4everlandService.js.map