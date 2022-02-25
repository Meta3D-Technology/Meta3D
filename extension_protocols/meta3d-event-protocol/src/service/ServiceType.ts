import { state as meta3dState } from "meta3d-type/src/Index"
import { eventName, eventExtensionName, onedEventHandler } from "../contribute_points/EventType"
import { state } from "../state/StateType"

export type service = {
    readonly trigger: <eventData> (
        meta3dState: meta3dState,
        eventExtensionName: eventExtensionName,
        eventName: eventName,
        eventData: eventData
    ) => Promise<meta3dState>;
    readonly onCustomEvent: <eventData>(
        state: state,
        eventName: eventName,
        eventHandler: onedEventHandler<eventData>
    ) => state
};
