import { state as meta3dState, api } from "meta3d-type/src/Index"
import { nullable } from "meta3d-commonlib-ts/src/nullable";

export type elementName = string

export type elementFunc<elementState> = (_1: meta3dState, elementState: elementState) => Promise<meta3dState>;


type handler = {
    actionName: string,
    updatedElementStateFieldName: string,
}

type reducers = {
    role: string,
    handlers: Array<handler>,
}

export type elementContribute<elementState> = {
    elementName: elementName,
    execOrder: number,
    elementFunc: elementFunc<elementState>,
    elementState: elementState
    reducers: nullable<reducers>
}

// export type getElementContribute<dependentExtensionNameMap, elementState> = (api: api, dependentExtensionNameMap: dependentExtensionNameMap) => elementContribute<elementState>;

// export type reducerFunc<elementState, action> = (elementState: elementState, action: action) => elementState

// export type reducerData<elementState, action> = [elementName, reducerFunc<elementState, action>]