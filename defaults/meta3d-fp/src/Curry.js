// export function curry2<T, K, R>(func: (param1: T, param2: K) => R): (param1: T) => (param2: K) => R {
export function curry2(func) {
    return (param1) => {
        return (param2) => {
            return func(param1, param2);
        };
    };
}
export function curry3(func) {
    return (param1) => {
        return (param2) => {
            return (param3) => {
                return func(param1, param2, param3);
            };
        };
    };
}
export function curry4(func) {
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
export function curry3_1(func) {
    return (param1) => {
        return (param2, param3) => {
            return func(param1, param2, param3);
        };
    };
}
export function curry4_1(func) {
    return (param1) => {
        return (param2, param3, param4) => {
            return func(param1, param2, param3, param4);
        };
    };
}
//# sourceMappingURL=Curry.js.map