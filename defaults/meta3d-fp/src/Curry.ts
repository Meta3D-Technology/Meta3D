// export function curry2<T, K, R>(func: (param1: T, param2: K) => R): (param1: T) => (param2: K) => R {
export function curry2<T, K, R>(func: (param1: T, param2: K) => R) {
    return (param1: T) => {
        return (param2: K) => {
            return func(param1, param2)
        }
    }
}

export function curry3<T, K, P, R>(func: (param1: T, param2: K, param3: P) => R) {
    return (param1: T) => {
        return (param2: K) => {
            return (param3: P) => {
                return func(param1, param2, param3)
            }
        }
    }
}