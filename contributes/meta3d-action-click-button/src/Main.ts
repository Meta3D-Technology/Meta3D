import { getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { actionData } from "meta3d-action-click-button-protocol"
import { dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap } from "./DependentMapType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"

export let getContribute: getContributeMeta3D<dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap, actionContribute<actionData>> = (api, [dependentExtensionProtocolNameMap, _]) => {
    let { meta3dUIExtensionProtocolName } = dependentExtensionProtocolNameMap
    return {
        actionName: "ClickButton",
        handler: (meta3dState, actionData) => {
            console.log("click button")

            let { dispatch } = api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionProtocolName)

            let uiState = api.getExtensionState<uiState>(meta3dState, meta3dUIExtensionProtocolName)

            uiState = dispatch(uiState,
                "changeX", "firstButton", (oldValue) => oldValue + 10
            )

            meta3dState = api.setExtensionState(meta3dState, meta3dUIExtensionProtocolName, uiState)


            return new Promise((resolve) => {
                resolve(meta3dState)
            })
        }
    }
}
