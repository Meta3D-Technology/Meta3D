"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHostFiles = exports.initProduction = exports.initLocal = void 0;
const manager_node_1 = __importDefault(require("@cloudbase/manager-node"));
const CloudbaseService_1 = require("meta3d-tool-utils/src/publish/CloudbaseService");
let initLocal = () => {
    let { secretId, secretKey, env } = (0, CloudbaseService_1.getLocalEnvData)();
    return new manager_node_1.default({
        secretId: secretId,
        secretKey: secretKey,
        envId: env
    }).hosting;
};
exports.initLocal = initLocal;
let initProduction = () => {
    let { secretId, secretKey, env
    // } = getProductionEnvData()
     } = (0, CloudbaseService_1.getLocalEnvData)();
    return new manager_node_1.default({
        secretId: secretId,
        secretKey: secretKey,
        envId: env
    }).hosting;
};
exports.initProduction = initProduction;
let updateHostFiles = (hosting) => {
    return hosting.deleteFiles({
        cloudPath: '/',
        isDir: true
    }).then(() => {
        return hosting.uploadFiles({
            localPath: '../../platform/frontend/dist/',
            cloudPath: '/',
            ignore: ['**/ignore.*'],
            onFileFinish: (err, data) => {
                if (!!err) {
                    throw err;
                }
            }
        });
    });
};
exports.updateHostFiles = updateHostFiles;
//# sourceMappingURL=CloudbaseHostService.js.map