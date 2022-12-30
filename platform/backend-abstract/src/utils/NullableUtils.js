"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNullable = exports.getExn = void 0;
function getExn(nullableValue) {
    if (nullableValue === null || nullableValue === undefined) {
        throw new Error("nullableValue should exist");
    }
    return nullableValue;
}
exports.getExn = getExn;
function isNullable(nullableValue) {
    return nullableValue === null || nullableValue === undefined;
}
exports.isNullable = isNullable;
