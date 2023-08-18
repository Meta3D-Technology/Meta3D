export let getExn = <T>(nullableValue: T | null | undefined): T => {
    if (nullableValue === null || nullableValue === undefined) {
        throw new Error("nullableValue should exist")
    }

    return nullableValue as T
}

export let getExnFromStrictNullable = <T>(nullableValue: T | null): T => {
    if (nullableValue === null) {
        throw new Error("nullableValue should exist")
    }

    return nullableValue as T
}

export let isNullable = <T>(nullableValue: T | null | undefined): boolean => {
    return nullableValue === null || nullableValue === undefined
}

export let isStrictNullable = <T>(nullableValue: T | null): boolean => {
    return nullableValue === null
}


export let map = <T, Y>(func: (nullableValue: T) => Y, nullableValue: T | null | undefined): Y | null | undefined => {
    if (isNullable(nullableValue)) {
        return nullableValue as null | undefined
    }

    return func(nullableValue as T)
}

export let getWithDefault = <T>(nullableValue: T | null | undefined, default_: T): T => {
    if (isNullable(nullableValue)) {
        return default_
    }

    return nullableValue as T
}