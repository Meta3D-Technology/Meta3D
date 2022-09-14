import { getContribute as getContributeMeta3D } from "meta3d-type"
import { eventContribute } from "meta3d-event-protocol/src/contribute/EventContributeType"
import { eventName, eventData } from "meta3d-event-click-button-protocol"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-event-click-button-protocol/src/DependentMapType"

export let getContribute: getContributeMeta3D<dependentExtensionNameMap, dependentContributeNameMap, eventContribute<eventData>> = (_api, _) => {
    return {
        // TODO remove eventName? can get it from protocol directly!
        eventName: eventName,
        handler: (meta3dState, eventData) => {
            console.log("click button")

            return new Promise((resolve) => {
                resolve(meta3dState)
            })
        }
    }
}
