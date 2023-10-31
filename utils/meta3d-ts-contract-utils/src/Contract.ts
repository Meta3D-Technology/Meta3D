export let buildAssetMessage = (expect:string, actual = "not as expect") => {
    return `expect ${expect}, but actual ${actual}`;
}

export let test = (message: string, func: () => boolean): void => {
    if (func() !== true) {
        throw new Error(message);
    }
}

export let requireCheck = (func: () => void, isTest: boolean): void => {
    if (!isTest) {
        return;
    }

    func();
}

export function ensureCheck<T extends any>(returnVal: T, func: (returnVal: T) => void, isTest: boolean): T {
    if (!isTest) {
        return returnVal;
    }

    func(returnVal);

    return returnVal;
}

export function assertPass() {
    return true;
}

export function assertTrue(source: true) {
    return source === true;
}

export function assertFalse(source: false) {
    return source === false;
}

function _isNullableExist<T extends any>(source: T): T extends null ? never : T extends undefined ? never : boolean;
function _isNullableExist(source:any) {
    return source !== undefined && source !== null;
};

export let assertNullableExist = _isNullableExist;

// export function assertEqual<S extends any, T extends any>(source: S, target: T): S extends T ? true : false;
export function assertEqual<S extends number, T extends number>(source: S, target: T): S extends T ? true : false;
export function assertEqual<S extends string, T extends string>(source: S, target: T): S extends T ? true : false;
export function assertEqual<S extends boolean, T extends boolean>(source: S, target: T): S extends T ? true : false;
export function assertEqual<S extends number | string | boolean, T extends number | string | boolean>(source: S, target: T): false;
export function assertEqual(source:any, target:any) {
    return source == target;
}

export function assertNotEqual<S extends number, T extends number>(source: S, target: T): S extends T ? false : true;
export function assertNotEqual<S extends string, T extends string>(source: S, target: T): S extends T ? false : true;
export function assertNotEqual<S extends boolean, T extends boolean>(source: S, target: T): S extends T ? false : true;
export function assertNotEqual<S extends number | string | boolean, T extends number | string | boolean>(source: S, target: T): true;
export function assertNotEqual(source:any, target:any) {
    return source != target;
}

export function assertGt(source: number, target: number) {
    return source > target;
}

export function assertGte(source: number, target: number) {
    return source >= target;
}

export function assertLt(source: number, target: number) {
    return source < target;
}

export function assertLte(source: number, target: number) {
    return source <= target;
}