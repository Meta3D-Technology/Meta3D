export let removeDuplicateItemsWithBuildKeyFunc = (arr: any, buildKeyFunc: any) => {
    var resultArr = [];
    // var map = MutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined);
    var map:any = {}
    for (var i = 0, i_finish = arr.length; i < i_finish; ++i) {
        var item = arr[i];
        var key = buildKeyFunc(item);
        // var match = MutableHashMap$Meta3dCommonlib.get(map, key);
        var match = map[key]
        if (match !== undefined) {

        } else {
            // Js_array.push(item, resultArr);
            // MutableHashMap$Meta3dCommonlib.set(map, key, item);
            resultArr.push(item)
            map[key] = item
        }
    }
    return resultArr;
}

export let removeDuplicateItems = (arr: any) => {
    return removeDuplicateItemsWithBuildKeyFunc(arr, (key: number) => key)
}

export let intersect = (arr1: any, arr2: any) => arr1.filter((value: any) => arr2.includes(value))

export let hasIntersect = (arr1: any, arr2: any) => intersect(arr1, arr2).length > 0
