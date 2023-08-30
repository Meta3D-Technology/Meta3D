import { getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { getState, setState } from "./Utils"
import { clickUIData } from "meta3d-ui-control-button-protocol"
import { actionName, state } from "meta3d-action-click-button-protocol"

export let getContribute: getContributeMeta3D<actionContribute<clickUIData, state>> = (api) => {
    return {
        actionName: actionName,
        handler: (meta3dState, uiData) => {
            console.log("click button")

            let { updateElementState, getCurrentElementState } = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")

            let uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")

            console.log(
                getCurrentElementState(uiState)
            )

            uiState = updateElementState(uiState,
                (elemenetState) => {
                    // return {
                    //     ...elemenetState,
                    //     x: elemenetState.x + 10
                    // }

                    let { x } = getState(elemenetState)

                    return setState(elemenetState, {
                        x: x + 10
                    })
                }
            )


            meta3dState = api.setExtensionState(meta3dState, "meta3d-ui-protocol", uiState)


            return new Promise((resolve) => {
                resolve(meta3dState)
            })
        },
        createState: () => {
            return {
                x: 0
            }
        }
    }
}
