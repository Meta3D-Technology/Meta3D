"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExn = void 0;
function getExn(nullableValue) {
    if (nullableValue === null || nullableValue === undefined) {
        throw new Error("nullableValue should exist");
    }
    return nullableValue;
}
exports.getExn = getExn;
//# sourceMappingURL=NullableUtils.js.map