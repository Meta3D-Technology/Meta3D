import { state as meta3dState, extensionName, api } from "meta3d-type/src/Index"

// export abstract class execState { protected opaque!: any }; /* simulate opaque types */

export type id = string;

export type uiExtensionName = extensionName;

export type execFunc<dependentExtensionNameMap> = (
    [api, dependentExtensionNameMap]: [api, dependentExtensionNameMap],
    meta3dState: meta3dState,
    id: id
) => Promise<meta3dState>;

type registeredExecFunc = (_1: meta3dState, id: id) => Promise<meta3dState>;

export type registerData<execState> = {
    id: id,
    execFunc: registeredExecFunc,
    execState: execState
}

export type reducerFunc<execState, action> = (execState: execState, action: action) => execState

export type reducerData<execState, action> = [id, reducerFunc<execState, action>]