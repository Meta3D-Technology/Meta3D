"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeDuplicateItemsWithBuildKeyFunc = void 0;
let removeDuplicateItemsWithBuildKeyFunc = (arr, buildKeyFunc) => {
    var resultArr = [];
    // var map = MutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined);
    var map = {};
    for (var i = 0, i_finish = arr.length; i < i_finish; ++i) {
        var item = arr[i];
        var key = buildKeyFunc(item);
        // var match = MutableHashMap$Meta3dCommonlib.get(map, key);
        var match = map[key];
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
