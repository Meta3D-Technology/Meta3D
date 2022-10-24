// import { _getExn } from "meta3d-commonlib-ts/src/NullableUtils";
import * as POContainer from "../logic_data/container/POContainer";

function _getExn<T>(nullableValue: T | null | undefined): T {
    if (nullableValue === null || nullableValue === undefined) {
        throw new Error("nullableValue should exist")
    }

    return nullableValue as T
}

export let getBackend = () => _getExn(POContainer.getPO().s3)

export let setBackend = (s3) => POContainer.setPO({
    ...POContainer.getPO(),
    s3: s3
});