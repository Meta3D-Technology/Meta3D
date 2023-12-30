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
exports.publish = void 0;
const CloudbaseService = __importStar(require("meta3d-tool-utils/src/publish/CloudbaseService"));
const Compatible = __importStar(require("./compatible/Compatible"));
const most_1 = require("most");
let _upgradeDatabaseOldData = (env, targetVersion) => {
    let funcArr = null;
    switch (env) {
        case "local":
            funcArr = [
                CloudbaseService.initLocal,
                CloudbaseService.updateAllDatabaseData,
            ];
            break;
        case "production":
            funcArr = [
                CloudbaseService.initProduction,
                CloudbaseService.updateAllDatabaseData,
            ];
            break;
        default:
            throw new Error("unknown env");
    }
    return Compatible.upgradeDatabaseOldData(funcArr, targetVersion);
};
let _upgradeStorageOldData = (env, targetVersion) => {
    let funcArr = null;
    switch (env) {
        case "local":
            funcArr = [
                CloudbaseService.initLocal,
                CloudbaseService.updateAllStorageData,
            ];
            break;
        case "production":
            funcArr = [
                CloudbaseService.initProduction,
                CloudbaseService.updateAllStorageData,
            ];
            break;
        default:
            throw new Error("unknown env");
    }
    return Compatible.upgradeStorageOldData(funcArr, targetVersion);
};
let publish = (env, targetVersion) => {
    return (0, most_1.mergeArray)([
        _upgradeDatabaseOldData(env, targetVersion),
        _upgradeStorageOldData(env, targetVersion),
    ]).drain();
};
exports.publish = publish;
//# sourceMappingURL=Main.js.map