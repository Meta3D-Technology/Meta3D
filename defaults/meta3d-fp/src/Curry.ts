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

export function curry4<T, K, P, O, R>(func: (param1: T, param2: K, param3: P, param4: O) => R) {
    return (param1: T) => {
        return (param2: K) => {
            return (param3: P) => {
                return (param4: O) => {
                    return func(param1, param2, param3, param4)
                }
            }
        }
    }
}

export function curry3_1<T, K, P, R>(func: (param1: T, param2: K, param3: P) => R) {
    return (param1: T) => {
        return (param2: K, param3: P) => {
            return func(param1, param2, param3)
        }
    }
}

export function curry4_1<T, K, P, O, R>(func: (param1: T, param2: K, param3: P, param4: O) => R) {
    return (param1: T) => {
        return (param2: K, param3: P, param4: O) => {
            return func(param1, param2, param3, param4)
        }
    }
}