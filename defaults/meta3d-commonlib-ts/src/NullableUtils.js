export function getExn(nullableValue) {
    if (nullableValue === null || nullableValue === undefined) {
        throw new Error("nullableValue should exist");
    }
    return nullableValue;
}
export function isNullable(nullableValue) {
    return nullableValue === null || nullableValue === undefined;
}
//# sourceMappingURL=NullableUtils.js.map