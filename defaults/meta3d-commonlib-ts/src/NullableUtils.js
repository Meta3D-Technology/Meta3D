"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmpty = exports.getWithDefault = exports.bind = exports.map = exports.isStrictNullable = exports.isNullable = exports.return_ = exports.getExnFromStrictNullable = exports.getExn = void 0;
let getExn = (nullableValue) => {
    if (nullableValue === null || nullableValue === undefined) {
        throw new Error("nullableValue should exist");
    }
    return nullableValue;
};
exports.getExn = getExn;
let getExnFromStrictNullable = (nullableValue) => {
    if (nullableValue === null) {
        throw new Error("nullableValue should exist");
    }
    return nullableValue;
};
exports.getExnFromStrictNullable = getExnFromStrictNullable;
let return_ = (value) => {
    return value;
};
exports.return_ = return_;
let isNullable = (nullableValue) => {
    return nullableValue === null || nullableValue === undefined;
};
exports.isNullable = isNullable;
let isStrictNullable = (nullableValue) => {
    return nullableValue === null;
};
exports.isStrictNullable = isStrictNullable;
let map = (func, nullableValue) => {
    if ((0, exports.isNullable)(nullableValue)) {
        return nullableValue;
    }
    return func(nullableValue);
};
exports.map = map;
let bind = (func, nullableValue) => {
    if ((0, exports.isNullable)(nullableValue)) {
        return nullableValue;
    }
    return func(nullableValue);
};
exports.bind = bind;
let getWithDefault = (nullableValue, default_) => {
    if ((0, exports.isNullable)(nullableValue)) {
        return default_;
    }
    return nullableValue;
};
exports.getWithDefault = getWithDefault;
let getEmpty = () => {
    return undefined;
};
exports.getEmpty = getEmpty;
//# sourceMappingURL=NullableUtils.js.map