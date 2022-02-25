import { state as meta3dState, extensionName, api } from "meta3d-type/src/Index"

// export abstract class execState { protected opaque!: any }; /* simulate opaque types */

export type id = string;

export type uiExtensionName = extensionName;

export type execFunc<dependentExtensionNameMap> = (
    [api, dependentExtensionNameMap]: [api, dependentExtensionNameMap],
    meta3dState: meta3dState
) => Promise<meta3dState>;

type registeredExecFunc = (_1: meta3dState) => Promise<meta3dState>;

export type registerData<execState> = {
    id: id,
    execFunc: registeredExecFunc,
    execState: execState
}
