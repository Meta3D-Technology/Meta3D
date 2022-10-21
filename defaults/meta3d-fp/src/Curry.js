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
//# sourceMappingURL=Curry.js.map