import { getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { getState, setState } from "./Utils"
import { clickUIData } from "meta3d-ui-control-button-protocol"
import { actionName, state } from "meta3d-action-click-button-protocol"
import { setElementStateField } from "meta3d-ui-utils/src/ElemenetStateUtils"

export let getContribute: getContributeMeta3D<actionContribute<clickUIData, state>> = (api) => {
    return {
        actionName: actionName,
        handler: (meta3dState, uiData) => {
            console.log("click button")

            meta3dState = setElementStateField([
                (elementState: any) => {
                    let { x } = getState(elementState)

                    return { x: x + 10 }
                },
                setState
            ], meta3dState, api)


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
