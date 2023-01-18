import { state as meta3dState, api } from "meta3d-type/src/Index"

export type actionName = string;

export type eventHandler<actionData> = (
    meta3dState: meta3dState,
    actionData: actionData
) => Promise<meta3dState>;

export type actionContribute<actionData> = {
    actionName: actionName,
    handler: eventHandler<actionData>
}

// export type getActionContribute<dependentExtensionProtocolNameMap, actionData> = (api: api, dependentExtensionProtocolNameMap: dependentExtensionProtocolNameMap) => actionContribute<actionData>;
