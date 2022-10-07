import { getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { actionName, actionData } from "meta3d-action-click-button-protocol"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-action-click-button-protocol/src/DependentMapType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"

export let getContribute: getContributeMeta3D<dependentExtensionNameMap, dependentContributeNameMap, actionContribute<actionData>> = (api, [dependentExtensionNameMap, _]) => {
    let { meta3dUIExtensionName } = dependentExtensionNameMap
    return {
        actionName: actionName,
        handler: (meta3dState, actionData) => {
            console.log("click button")

            let { dispatch } = api.getExtensionService<uiService>(meta3dState, meta3dUIExtensionName)

            let uiState = api.getExtensionState<uiState>(meta3dState, meta3dUIExtensionName)

            uiState = dispatch(uiState,
                "changeX", "firstButton", (oldValue) => oldValue + 10
            )

            meta3dState = api.setExtensionState(meta3dState, meta3dUIExtensionName, uiState)


            return new Promise((resolve) => {
                resolve(meta3dState)
            })
        }
    }
}
