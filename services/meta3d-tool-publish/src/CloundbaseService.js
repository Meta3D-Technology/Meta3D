"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayBufferToBuffer = exports.notHasData = exports.hasData = exports.getDatabase = exports.init = void 0;
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
let getDatabase = (app) => {
    return app.database();
};
exports.getDatabase = getDatabase;
let hasData = (app, collectionName, data) => {
    return (0, most_1.fromPromise)((0, exports.getDatabase)(app).collection(collectionName)
        .where(data)
        .get()
        .then(res => res.data.length > 0));
};
exports.hasData = hasData;
let notHasData = (app, collectionName, data) => {
    return (0, most_1.fromPromise)((0, exports.getDatabase)(app).collection(collectionName)
        .where(data)
        .get()
        .then(res => res.data.length === 0));
};
exports.notHasData = notHasData;
let arrayBufferToBuffer = (arrayBuffer) => {
    return Buffer.from(arrayBuffer);
};
exports.arrayBufferToBuffer = arrayBufferToBuffer;
//# sourceMappingURL=CloundbaseService.js.map