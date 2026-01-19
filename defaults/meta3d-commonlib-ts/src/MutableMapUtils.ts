import { isNullable } from "./NullableUtils"

// type MapType = Map<string, any>;
type MapType = any

export const create = (): MapType => {
    return new Map();
};

export const has = (map: MapType, key): boolean => {
    return map.has(key);
};

export const get = (map: MapType, key): any | undefined => {
    return map.get(key);
};

export const getExn = (map: MapType, key): any => {
    // if (map.has(key)) {
    //     throw new Error("Key not found error");
    // }
    // return map.get(key);

    let value = map.get(key)

    if (isNullable(value)) {
        throw new Error("error")
    }

    return value
};

export const getWithDefault = (map: MapType, key, defaultValue: any): any => {
    // return map.has(key) ? map.get(key) : defaultValue;
    let value = map.get(key)

    if (isNullable(value)) {
        return defaultValue
    }

    return value
};

export const concat = (map1: MapType, map2: MapType): MapType => {
    const result = new Map(map1);
    for (const [key, value] of map2) {
        result.set(key, value);
    }
    return result;
};

export const set = (map: MapType, key, value: any): MapType => {
    map.set(key, value);
    return map;
};

export const remove = (map: MapType, key): MapType => {
    map.delete(key);
    return map;
};

export const reduce = (
    map,
    func,
    initialValue,
) => {
    let accumulator = initialValue;
    for (const [key, value] of map) {
        accumulator = func(accumulator, value, key);
    }
    return accumulator;
};

export const reducePromise = (
    map,
    func,
    initialValue
): any => {
    return Array.from(map).reduce(
        (promise: any, [key, value]: any) =>
            promise.then(acc => func(acc, value, key)),
        Promise.resolve(initialValue)
    );
};
// export let reducePromise = <initialValue, value, key extends number | string>(map, func: (initialValue: initialValue, value: value, key: key) => Promise<initialValue>, initialValue: initialValue): Promise<initialValue> => {
//     let promise: Promise<initialValue> = Promise.resolve(initialValue)
//     // for (let key in map) {
//     //     if (map.hasOwnProperty(key)) {
//     //         promise = promise.then(initialValue => func(initialValue, map[key], key))
//     //     }
//     // }
//     for (const [key, value] of map) {
//         promise = promise.then(initialValue => func(initialValue, value, key))
//     }

//     return promise
// }


export const map = (
    map: MapType,
    func,
): MapType => {
    const result = new Map();
    let index = 0;
    for (const [key, value] of map) {
        result.set(key, func(value, key, index));
        index++;
    }
    return result;
};

export const forEach = (
    map: MapType,
    func,
): void => {
    // let index = 0;
    // map.forEach((value, key) => {
    //     func(value, key, index);
    //     index++;
    // });

    let index = 0;
    for (const [key, value] of map) {
        func(value, key, index++);
    }
};

export const getCount = (map: MapType): number => {
    return map.size;
};

export const entries = (map: MapType): [string, any][] => {
    // return Array.from(map.entries());
    return Array.from(map);
};

export const values = (map: MapType): any[] => {
    return Array.from(map.values());
};

export const keys = (map: MapType): any[] => {
    return Array.from(map.keys());
};

export const filter = (
    map: MapType,
    func,
): MapType => {
    const result = new Map();
    let index = 0;
    for (const [key, value] of map) {
        if (func(value, key, index)) {
            result.set(key, value);
        }
        index++;
    }
    return result;
};

export const toArray = (map: MapType): any[] => {
    return Array.from(map.values());
};

export const clear = (map: MapType): MapType => {
    map.clear();
    return map;
};