import { getEventContribute as getEventContributeMeta3D } from "meta3d-event-protocol/src/contribute_points/EventContributeType"
import { eventName, dependentExtensionNameMap, eventData } from "meta3d-event-show-extension-protocol"

export let getEventContribute: getEventContributeMeta3D<dependentExtensionNameMap, eventData> = (_api, _dependentExtensionNameMap) => {
    return {
        eventName: eventName,
        handler: (meta3dState, { extensionName }) => {
            console.log("show extension: ", extensionName)

            return new Promise((resolve) => {
                resolve(meta3dState)
            })
        }
    }
}
