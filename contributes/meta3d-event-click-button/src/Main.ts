import { getContribute as getContributeMeta3D } from "meta3d-type"
import { eventContribute } from "meta3d-event-protocol/src/contribute/EventContributeType"
import { eventName, eventData } from "meta3d-event-click-button-protocol"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-event-click-button-protocol/src/DependentMapType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { changeText } from "./Action"

export let getContribute: getContributeMeta3D<dependentExtensionNameMap, dependentContributeNameMap, eventContribute<eventData>> = (api, [dependentExtensionNameMap, _]) => {
    let { meta3dUIExtensionName } = dependentExtensionNameMap
    return {
        eventName: eventName,
        handler: (meta3dState, eventData) => {
            console.log("click button")

            let { dispatch } = api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionName)

            let uiState = api.getExtensionState<uiState>(meta3dState, meta3dUIExtensionName)

            uiState = dispatch(uiState, changeText(Math.random().toString()))

            meta3dState = api.setExtensionState(meta3dState, meta3dUIExtensionName, uiState)


            return new Promise((resolve) => {
                resolve(meta3dState)
            })
        }
    }
}
