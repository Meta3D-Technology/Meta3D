export function getExn<T>(nullableValue: T | null | undefined): T {
    if (nullableValue === null || nullableValue === undefined) {
        throw new Error("nullableValue should exist")
    }

    return nullableValue as T
}

export function isNullable<T>(nullableValue: T | null | undefined): boolean {
    return nullableValue === null || nullableValue === undefined
}