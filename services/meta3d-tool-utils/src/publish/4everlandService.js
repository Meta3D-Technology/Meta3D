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
exports.parseMarketCollectionDataBodyForNodejs = exports.uploadFile = exports.updateMarketImplementData = exports.getFileID = exports.addMarketImplementDataToDataFromMarketImplementCollectionData = exports.buildMarketImplementAccountData = exports.getDataFromMarketImplementAccountData = exports.getDataFromMarketProtocolCollection = exports.getMarketImplementAccountData = exports.addMarketProtocolDataToDataFromMarketProtocolCollectionData = exports.getMarketProtocolCollection = exports.isContain = exports.hasAccount = exports.addDataToMarketProtocolCollection = exports.init = void 0;
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
exports.addDataToMarketProtocolCollection = BackendService.addDataToMarketProtocolCollection;
exports.hasAccount = BackendService.hasAccount;
exports.isContain = BackendService.isContain;
exports.getMarketProtocolCollection = BackendService.getMarketProtocolCollection;
exports.addMarketProtocolDataToDataFromMarketProtocolCollectionData = BackendService.addMarketProtocolDataToDataFromMarketProtocolCollectionData;
exports.getMarketImplementAccountData = BackendService.getMarketImplementAccountData;
exports.getDataFromMarketProtocolCollection = BackendService.getDataFromMarketProtocolCollection;
exports.getDataFromMarketImplementAccountData = BackendService.getDataFromMarketImplementAccountData;
exports.buildMarketImplementAccountData = BackendService.buildMarketImplementAccountData;
exports.addMarketImplementDataToDataFromMarketImplementCollectionData = BackendService.addMarketImplementDataToDataFromMarketImplementCollectionData;
exports.getFileID = BackendService.getFileID;
exports.updateMarketImplementData = BackendService.updateMarketImplementData;
exports.uploadFile = BackendService.uploadFile;
exports.parseMarketCollectionDataBodyForNodejs = BackendService.parseMarketCollectionDataBodyForNodejs;
//# sourceMappingURL=4everlandService.js.map