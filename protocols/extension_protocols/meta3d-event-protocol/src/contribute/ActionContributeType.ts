import { state as meta3dState, api } from "meta3d-type/src/Index"

export type eventName = string;

export type eventHandler<eventData> = (
    meta3dState: meta3dState,
    eventData: eventData
) => Promise<meta3dState>;

export type actionContribute<eventData> = {
    eventName: eventName,
    handler: eventHandler<eventData>
}

// export type getActionContribute<dependentExtensionNameMap, eventData> = (api: api, dependentExtensionNameMap: dependentExtensionNameMap) => actionContribute<eventData>;
