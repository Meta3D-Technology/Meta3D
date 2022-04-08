"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createExtensionState = exports.getExtensionService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
let getExtensionService = (_api, _dependentExtensionNameMap) => {
    return {
        joinRootPath: (p) => {
            return path_1.default.join(process.cwd(), p);
        },
        readFileSync: (path, encode) => {
            return fs_1.default.readFileSync(path, encode);
        },
    };
};
exports.getExtensionService = getExtensionService;
let createExtensionState = () => {
    return {};
};
exports.createExtensionState = createExtensionState;
//# sourceMappingURL=Main.js.map