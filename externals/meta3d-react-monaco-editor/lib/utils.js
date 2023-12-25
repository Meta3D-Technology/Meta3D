"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noop = exports.processSize = void 0;
function processSize(size) {
    return !/^\d+$/.test(size) ? size : `${size}px`;
}
exports.processSize = processSize;
function noop() { }
exports.noop = noop;
//# sourceMappingURL=utils.js.map