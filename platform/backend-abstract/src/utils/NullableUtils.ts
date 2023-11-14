export let getExn = <T>(nullableValue: T | null | undefined): T => {
    if (nullableValue === null || nullableValue === undefined) {
        throw new Error("nullableValue should exist")
    }

    return nullableValue as T
}

export let isNullable = <T>(nullableValue: T | null | undefined): boolean => {
    return nullableValue === null || nullableValue === undefined
}

export let getWithDefault = <T>(nullableValue: T | null | undefined, default_: T): T => {
    if (isNullable(nullableValue)) {
        return default_
    }

    return nullableValue as T
}