import { getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"

export let getContribute: getContributeMeta3D<actionContribute> = (api) => {
    return {
        actionName: "ClickButton",
        handler: (meta3dState, actionData) => {
            console.log("click button")

            let { updateElementState } = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")

            let uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")

            uiState = updateElementState(uiState,
                (elemenetState) => {
                    return {
                        ...elemenetState,
                        x: elemenetState.x + 10
                    }
                }
            )


            meta3dState = api.setExtensionState(meta3dState, "meta3d-ui-protocol", uiState)


            return new Promise((resolve) => {
                resolve(meta3dState)
            })
        }
    }
}
