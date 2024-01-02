import { fromPromise } from "most";

export let updateHostFiles = (
    [initFunc, updateHostFilesFunc]: [any, any]
) => {
    return fromPromise(updateHostFilesFunc(initFunc()))
}