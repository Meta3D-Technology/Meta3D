import { getExtensionService as getExtensionServiceMeta3d, createExtensionState as createExtensionStateMeta3d } from "meta3d-type/src/Index"

type dependentExtensionNameMap = null

export type service = {
    readonly func1: () => void;
};

type state = null

export let getExtensionService: getExtensionServiceMeta3d<
    dependentExtensionNameMap,
    service
> = (api, _) => {
    return {
        func1: () => {
            console.log("func1")
        }
    }
}

export let createExtensionState: createExtensionStateMeta3d<
    state
> = () => {
    return null
}
