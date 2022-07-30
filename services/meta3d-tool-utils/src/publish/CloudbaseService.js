"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateData = exports.getData = exports.uploadFile = exports.notHasData = exports.hasData = exports.init = void 0;
const node_sdk_1 = __importDefault(require("@cloudbase/node-sdk"));
const most_1 = require("most");
let init = () => {
    let app = node_sdk_1.default.init({
        secretId: "AKIDnQnwrXx6yZtwiDSQbVGkxtZ0C8nBI8i2",
        secretKey: "4rNcbJkvpSnrgFXYJn0wax3rPhiSu5zb",
        env: "meta3d-4g18u7z10c8427f9" // 此处填入您的环境ID
    });
    return (0, most_1.just)(app);
};
exports.init = init;
let _getDatabase = (app) => {
    return app.database();
};
let hasData = (app, collectionName, data) => {
    return (0, most_1.fromPromise)(_getDatabase(app).collection(collectionName)
        .where(data)
        .get()
        .then(res => res.data.length > 0));
};
exports.hasData = hasData;
let notHasData = (app, collectionName, data) => {
    return (0, most_1.fromPromise)(_getDatabase(app).collection(collectionName)
        .where(data)
        .get()
        .then(res => res.data.length === 0));
};
exports.notHasData = notHasData;
let uploadFile = (app, cloudPath, fileContent) => {
    return (0, most_1.fromPromise)(app.uploadFile({
        cloudPath,
        fileContent
    }));
};
exports.uploadFile = uploadFile;
let getData = (app, collectionName, data) => {
    return _getDatabase(app).collection(collectionName)
        .where(data)
        .get();
};
exports.getData = getData;
let updateData = (app, collectionName, whereData, updateData) => {
    return _getDatabase(app).collection(collectionName)
        .where(whereData)
        .update(updateData);
};
exports.updateData = updateData;
//# sourceMappingURL=CloudbaseService.js.map