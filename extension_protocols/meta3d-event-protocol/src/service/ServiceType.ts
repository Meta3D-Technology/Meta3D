import { state as meta3dState, extensionName } from "meta3d-type/src/Index"
import { eventName, eventContribute } from "../contribute_points/IEvent"
import { state } from "../state/StateType"

type eventExtensionName = extensionName

export type service = {
    readonly trigger: <eventData> (
        meta3dState: meta3dState,
        eventExtensionName: eventExtensionName,
        eventName: eventName,
        eventData: eventData
    ) => Promise<meta3dState>;
    readonly registerEvent: <eventData>(
        state: state,
        eventContribute: eventContribute<eventData>
    ) => state
};
