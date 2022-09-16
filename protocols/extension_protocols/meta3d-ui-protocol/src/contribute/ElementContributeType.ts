import { state as meta3dState, api } from "meta3d-type/src/Index"
import { elementName } from "./UIType"

export type elementFunc<elementState> = (_1: meta3dState, elementState: elementState) => Promise<meta3dState>;

export type elementContribute<elementState> = {
    elementName: elementName,
    execOrder: number,
    elementFunc: elementFunc<elementState>,
    elementState: elementState
}

// export type getElementContribute<dependentExtensionNameMap, elementState> = (api: api, dependentExtensionNameMap: dependentExtensionNameMap) => elementContribute<elementState>;

export type reducerFunc<elementState, action> = (elementState: elementState, action: action) => elementState

export type reducerData<elementState, action> = [elementName, reducerFunc<elementState, action>]