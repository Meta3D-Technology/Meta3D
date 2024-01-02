"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateHostFiles = void 0;
const most_1 = require("most");
let updateHostFiles = ([initFunc, updateHostFilesFunc]) => {
    return (0, most_1.fromPromise)(updateHostFilesFunc(initFunc()));
};
exports.updateHostFiles = updateHostFiles;
//# sourceMappingURL=Host.js.map