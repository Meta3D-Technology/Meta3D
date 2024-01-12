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
exports.findAllRecommendPublishApps = exports.findAllPublishApps = exports.findAllPublishAppsByAccount = exports.findPublishApp = exports.publish = void 0;
const PublishAppUtils = __importStar(require("../../utils/PublishAppUtils"));
let publish = (funcs, sceneGLB, appName, account, description, previewBase64, isRecommend) => {
    return PublishAppUtils.publish(funcs, sceneGLB, appName, account, description, previewBase64, isRecommend, "publishedapps", "apps");
};
exports.publish = publish;
let findPublishApp = (funcs, account, appName, notUseCacheForFindApp) => {
    return PublishAppUtils.findPublishApp(funcs, account, appName, notUseCacheForFindApp, "publishedapps");
};
exports.findPublishApp = findPublishApp;
let findAllPublishAppsByAccount = (getDataWithWhereDataFunc, account) => {
    return PublishAppUtils.findAllPublishAppsByAccount(getDataWithWhereDataFunc, account, "publishedapps");
};
exports.findAllPublishAppsByAccount = findAllPublishAppsByAccount;
let findAllPublishApps = (getDataFunc, limitCount, skipCount) => {
    return PublishAppUtils.findAllPublishApps(getDataFunc, limitCount, skipCount, "publishedapps");
};
exports.findAllPublishApps = findAllPublishApps;
let findAllRecommendPublishApps = (getDataWithWhereDataFunc) => {
    return PublishAppUtils.findAllRecommendPublishApps(getDataWithWhereDataFunc, "publishedapps");
};
exports.findAllRecommendPublishApps = findAllRecommendPublishApps;
//# sourceMappingURL=PublishAppService.js.map