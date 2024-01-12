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
exports.findAllRecommendPublishFinalApps = exports.findAllPublishFinalApps = exports.findAllPublishFinalAppsByAccount = exports.findPublishFinalApp = exports.publish = void 0;
const PublishAppUtils = __importStar(require("../../utils/PublishAppUtils"));
let publish = (funcs, sceneGLB, appName, account, description, previewBase64, isRecommend) => {
    return PublishAppUtils.publish(funcs, sceneGLB, appName, account, description, previewBase64, isRecommend, "publishedfinalapps", "finalapps");
};
exports.publish = publish;
let findPublishFinalApp = (funcs, account, appName, notUseCacheForFindFinalApp) => {
    return PublishAppUtils.findPublishApp(funcs, account, appName, notUseCacheForFindFinalApp, "publishedfinalapps");
};
exports.findPublishFinalApp = findPublishFinalApp;
let findAllPublishFinalAppsByAccount = (getDataWithWhereDataFunc, account) => {
    return PublishAppUtils.findAllPublishAppsByAccount(getDataWithWhereDataFunc, account, "publishedfinalapps");
};
exports.findAllPublishFinalAppsByAccount = findAllPublishFinalAppsByAccount;
let findAllPublishFinalApps = (getDataFunc, limitCount, skipCount) => {
    return PublishAppUtils.findAllPublishApps(getDataFunc, limitCount, skipCount, "publishedfinalapps");
};
exports.findAllPublishFinalApps = findAllPublishFinalApps;
let findAllRecommendPublishFinalApps = (getDataWithWhereDataFunc) => {
    return PublishAppUtils.findAllRecommendPublishApps(getDataWithWhereDataFunc, "publishedfinalapps");
};
exports.findAllRecommendPublishFinalApps = findAllRecommendPublishFinalApps;
//# sourceMappingURL=PublishFinalAppService.js.map