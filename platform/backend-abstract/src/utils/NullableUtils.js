"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWithDefault = exports.isNullable = exports.getExn = void 0;
let getExn = (nullableValue) => {
    if (nullableValue === null || nullableValue === undefined) {
        throw new Error("nullableValue should exist");
    }
    return nullableValue;
};
exports.getExn = getExn;
let isNullable = (nullableValue) => {
    return nullableValue === null || nullableValue === undefined;
};
exports.isNullable = isNullable;
let getWithDefault = (nullableValue, default_) => {
    if ((0, exports.isNullable)(nullableValue)) {
        return default_;
    }
    return nullableValue;
};
exports.getWithDefault = getWithDefault;
//# sourceMappingURL=NullableUtils.js.map