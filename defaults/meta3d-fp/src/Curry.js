"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.curry4_1 = exports.curry3_1 = exports.curry4 = exports.curry3 = exports.curry2 = void 0;
// export function curry2<T, K, R>(func: (param1: T, param2: K) => R): (param1: T) => (param2: K) => R {
function curry2(func) {
    return (param1) => {
        return (param2) => {
            return func(param1, param2);
        };
    };
}
exports.curry2 = curry2;
function curry3(func) {
    return (param1) => {
        return (param2) => {
            return (param3) => {
                return func(param1, param2, param3);
            };
        };
    };
}
exports.curry3 = curry3;
function curry4(func) {
    return (param1) => {
        return (param2) => {
            return (param3) => {
                return (param4) => {
                    return func(param1, param2, param3, param4);
                };
            };
        };
    };
}
exports.curry4 = curry4;
function curry3_1(func) {
    return (param1) => {
        return (param2, param3) => {
            return func(param1, param2, param3);
        };
    };
}
exports.curry3_1 = curry3_1;
function curry4_1(func) {
    return (param1) => {
        return (param2, param3, param4) => {
            return func(param1, param2, param3, param4);
        };
    };
}
exports.curry4_1 = curry4_1;
