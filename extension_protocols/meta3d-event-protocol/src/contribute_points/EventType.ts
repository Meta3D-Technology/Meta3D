import { state as meta3dState, extensionName, api } from "meta3d-type/src/Index"

export type eventName = string;

export type eventExtensionName = extensionName;

export type eventHandler<dependentExtensionNameMap, eventData> = (
    [api, dependentExtensionNameMap]: [api, dependentExtensionNameMap],
    meta3dState: meta3dState,
    eventData: eventData
) => Promise<meta3dState>;

export type onedEventHandler<eventData> = (
    meta3dState: meta3dState,
    eventData: eventData
) => Promise<meta3dState>;
