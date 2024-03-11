"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zip = exports.flatten = exports.push = exports.isArraysEqual = exports.reducePromise = exports.hasIntersect = exports.intersect = exports.hasDuplicateItems = exports.removeDuplicateItems = exports.removeDuplicateItemsWithBuildKeyFunc = void 0;
let removeDuplicateItemsWithBuildKeyFunc = (arr, buildKeyFunc) => {
    let resultArr = [];
    // let map = MutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined);
    let map = {};
    for (let i = 0, i_finish = arr.length; i < i_finish; ++i) {
        let item = arr[i];
        let key = buildKeyFunc(item);
        // let match = MutableHashMap$Meta3dCommonlib.get(map, key);
        let match = map[key];
        if (match !== undefined) {
        }
        else {
            // Js_array.push(item, resultArr);
            // MutableHashMap$Meta3dCommonlib.set(map, key, item);
            resultArr.push(item);
            map[key] = item;
        }
    }
    return resultArr;
};
exports.removeDuplicateItemsWithBuildKeyFunc = removeDuplicateItemsWithBuildKeyFunc;
let removeDuplicateItems = (arr) => {
    return (0, exports.removeDuplicateItemsWithBuildKeyFunc)(arr, (key) => key);
};
exports.removeDuplicateItems = removeDuplicateItems;
let hasDuplicateItems = (arr, buildKeyFunc) => {
    let result = false;
    let map = {};
    for (let i = 0, i_finish = arr.length; i < i_finish; ++i) {
        let item = arr[i];
        let key = buildKeyFunc(item);
        let match = map[key];
        if (match !== undefined) {
            result = true;
            break;
        }
        map[key] = item;
    }
    return result;
};
exports.hasDuplicateItems = hasDuplicateItems;
let intersect = (arr1, arr2) => arr1.filter((value) => arr2.includes(value));
exports.intersect = intersect;
let hasIntersect = (arr1, arr2) => (0, exports.intersect)(arr1, arr2).length > 0;
exports.hasIntersect = hasIntersect;
let reducePromise = (arr, func, initialValue) => {
    let _func = (initialValue, index) => {
        if (index >= arr.length) {
            return Promise.resolve(initialValue);
        }
        return func(initialValue, arr[index]).then(initialValue => {
            return _func(initialValue, index + 1);
        });
    };
    return _func(initialValue, 0);
};
exports.reducePromise = reducePromise;
let isArraysEqual = (a, b) => {
    if (a === b)
        return true;
    if (a == null || b == null)
        return false;
    if (a.length !== b.length)
        return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
};
exports.isArraysEqual = isArraysEqual;
let push = (arr, value) => {
    arr.push(value);
    return arr;
};
exports.push = push;
let flatten = (arr) => {
    return arr.reduce((result, valueArr) => {
        return result.concat(valueArr);
    }, []);
};
exports.flatten = flatten;
let zip = (...arr) => Array.from({ length: Math.max(...arr.map(a => a.length)) }, (_, i) => arr.map(a => a[i]));
exports.zip = zip;
//# sourceMappingURL=ArrayUtils.js.map