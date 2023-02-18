"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLimitCount = exports.isPublisherRegistered = exports.buildReadJsonFunc = void 0;
const most_1 = require("most");
const read_package_json_1 = __importDefault(require("read-package-json"));
function buildReadJsonFunc(packageFilePath) {
    return (packageFilePath) => {
        return (0, most_1.fromPromise)(new Promise((resolve, reject) => {
            (0, read_package_json_1.default)(packageFilePath, null, false, (err, packageJson) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(packageJson);
            });
        }));
    };
}
exports.buildReadJsonFunc = buildReadJsonFunc;
function isPublisherRegistered(hasAccountFunc, backendInstance, publisher) {
    return hasAccountFunc(backendInstance, "user", publisher);
}
exports.isPublisherRegistered = isPublisherRegistered;
function getLimitCount() {
    return 1000;
}
exports.getLimitCount = getLimitCount;
//# sourceMappingURL=PublishUtils.js.map