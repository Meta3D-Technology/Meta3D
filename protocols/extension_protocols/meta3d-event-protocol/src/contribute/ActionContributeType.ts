import { state as meta3dState, api } from "meta3d-type/src/Index"
import { actionData } from "../state/StateType"

export type actionName = string;

export type eventHandler = (
    meta3dState: meta3dState,
    actionData: actionData
) => Promise<meta3dState>;

export type actionContribute = {
    actionName: actionName,
    handler: eventHandler
}

// export type getActionContribute<dependentExtensionProtocolNameMap, actionData> = (api: api, dependentExtensionProtocolNameMap: dependentExtensionProtocolNameMap) => actionContribute<actionData>;
