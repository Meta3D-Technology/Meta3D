import { nullable } from "./nullable"

export let getExn = <T>(nullableValue: nullable<T>): T => {
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

export let return_ = <T>(value: T): nullable<T> => {
    return value as nullable<T>
}

export let isNullable = <T>(nullableValue: nullable<T>): boolean => {
    return nullableValue === null || nullableValue === undefined
}

export let isStrictNullable = <T>(nullableValue: T | null): boolean => {
    return nullableValue === null
}


export let map = <T, Y>(func: (nullableValue: T) => Y, nullableValue: nullable<T>): Y | null | undefined => {
    if (isNullable(nullableValue)) {
        return nullableValue as null | undefined
    }

    return func(nullableValue as T)
}

export let bind = <T, Y>(func: (nullableValue: T) => Y | null | undefined, nullableValue: nullable<T>): Y | null | undefined => {
    if (isNullable(nullableValue)) {
        return nullableValue as null | undefined
    }

    return func(nullableValue as T)
}

export let getWithDefault = <T>(nullableValue: nullable<T>, default_: T): T => {
    if (isNullable(nullableValue)) {
        return default_
    }

    return nullableValue as T
}

export let getEmpty = <T>(): nullable<T> => {
    return undefined
}

export let forEach = <T>(func: (nullableValue: T) => void, nullableValue: nullable<T>): void => {
    if (isNullable(nullableValue)) {
        return
    }

    func(nullableValue as T)

    return
}