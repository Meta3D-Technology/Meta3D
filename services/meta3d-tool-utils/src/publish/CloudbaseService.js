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
exports.addDataToBody = exports.addData = exports.isContain = exports.getCollection = exports.hasAccount = exports.init = void 0;
const node_sdk_1 = __importDefault(require("@cloudbase/node-sdk"));
const most_1 = require("most");
const BackendService = __importStar(require("meta3d-backend-cloudbase"));
let init = () => {
    let app = node_sdk_1.default.init({
        secretId: "AKIDnQnwrXx6yZtwiDSQbVGkxtZ0C8nBI8i2",
        secretKey: "4rNcbJkvpSnrgFXYJn0wax3rPhiSu5zb",
        env: "meta3d-4g18u7z10c8427f9" // 此处填入您的环境ID
    });
    return (0, most_1.just)(app);
};
exports.init = init;
// let _getDatabase = (app: any) => {
// 	return app.database()
// }
exports.hasAccount = BackendService.hasAccount;
// export let notHasData = (app: any, collectionName: string, data: object) => {
// 	return fromPromise(_getDatabase(app).collection(collectionName)
// 		.where(data)
// 		.get()
// 		.then(res => res.data.length === 0))
// }
// export let uploadFile = (app: any, cloudPath: string, fileContent: Buffer) => {
// 	return fromPromise(app.uploadFile({
// 		cloudPath,
// 		fileContent
// 	}))
// }
exports.getCollection = BackendService.getCollection;
exports.isContain = BackendService.isContain;
// export let getData = (app: any, collectionName: string, data: any) => {
// 	return _getDatabase(app).collection(collectionName)
// 		.where(data)
// 		.get()
// }
// export let updateCollection = (app: any, collectionName: string, updateData: any) => {
// 	return _getDatabase(app).collection(collectionName)
// 		.update(updateData)
// }
exports.addData = BackendService.addData;
exports.addDataToBody = BackendService.addDataToBody;
// export let updateData = (app: any, collectionName: string, whereData: any, updateData: any) => {
// 	return _getDatabase(app).collection(collectionName)
// 		.where(whereData)
// 		.update(updateData)
// }
//# sourceMappingURL=CloudbaseService.js.map