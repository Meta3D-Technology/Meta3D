export let removeDuplicateItemsWithBuildKeyFunc = (arr: any, buildKeyFunc: any) => {
    let resultArr = [];
    // let map = MutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined);
    let map: any = {}
    for (let i = 0, i_finish = arr.length; i < i_finish; ++i) {
        let item = arr[i];
        let key = buildKeyFunc(item);
        // let match = MutableHashMap$Meta3dCommonlib.get(map, key);
        let match = map[key]
        if (match !== undefined) {

        } else {
            // Js_array.push(item, resultArr);
            // MutableHashMap$Meta3dCommonlib.set(map, key, item);
            resultArr.push(item)
            map[key] = item
        }
    }
    return resultArr
}

export let removeDuplicateItems = (arr: any) => {
    return removeDuplicateItemsWithBuildKeyFunc(arr, (key: number) => key)
}


export let hasDuplicateItems = (arr: any, buildKeyFunc: any): boolean => {
    let result = false
    let map: any = {}
    for (let i = 0, i_finish = arr.length; i < i_finish; ++i) {
        let item = arr[i];
        let key = buildKeyFunc(item);
        let match = map[key]
        if (match !== undefined) {
            result = true
            break
        }

        map[key] = item
    }
    return result
}

export let intersect = (arr1: any, arr2: any) => arr1.filter((value: any) => arr2.includes(value))

export let hasIntersect = (arr1: any, arr2: any) => intersect(arr1, arr2).length > 0


export let reducePromise = <initialValue, value>(arr: Array<value>, func: (initialValue: initialValue, value: value,) => Promise<initialValue>, initialValue: initialValue): Promise<initialValue> => {
    let _func = (initialValue: initialValue, index: number): Promise<initialValue> => {
        if (index >= arr.length) {
            return Promise.resolve(initialValue)
        }

        return func(initialValue, arr[index]).then(initialValue => {
            return _func(initialValue, index + 1)
        })
    }

    return _func(initialValue, 0)
}


export let isArraysEqual = (a: Array<any>, b: Array<any>) => {
    if (a === b) return true
    if (a == null || b == null) return false
    if (a.length !== b.length) return false

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false
    }
    return true
}

export let push = <T>(arr: Array<T>, value: T) => {
    arr.push(value)

    return arr
}

export let flatten = <T>(arr: Array<Array<T>>): Array<T> => {
    return arr.reduce((result, valueArr) => {
        return result.concat(valueArr)
    }, [])
}

export let zip = <T>(...arr: Array<Array<T>>): Array<T> => Array.from({ length: Math.max(...arr.map(a => a.length)) }, (_, i) => arr.map(a => a[i])) as Array<T>