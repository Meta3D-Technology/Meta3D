import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D } from "meta3d-type/src/Index"

type dependentExtensionNameMap = null

export type service = {
    readonly func1: () => void;
};

type state = null

export let getExtensionService: getExtensionServiceMeta3D<
    dependentExtensionNameMap,
    service
> = (api, _) => {
    return {
        func1: () => {
            console.log("func1")
        }
    }
}

export let createExtensionState: createExtensionStateMeta3D<
    state
> = () => {
    return null
}
