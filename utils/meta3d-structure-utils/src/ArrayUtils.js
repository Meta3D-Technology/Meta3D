export let removeDuplicateItemsWithBuildKeyFunc = (arr, buildKeyFunc) => {
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
export let removeDuplicateItems = (arr) => {
    return removeDuplicateItemsWithBuildKeyFunc(arr, (key) => key);
};
export let intersect = (arr1, arr2) => arr1.filter((value) => arr2.includes(value));
export let hasIntersect = (arr1, arr2) => intersect(arr1, arr2).length > 0;
//# sourceMappingURL=ArrayUtils.js.map