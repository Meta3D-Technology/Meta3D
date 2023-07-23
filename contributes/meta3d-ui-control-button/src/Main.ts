import { getContribute as getContributeMeta3D } from "meta3d-type"
import { inputData, outputData, uiControlName } from "meta3d-ui-control-button-protocol"
import { service } from "meta3d-ui-protocol/src/service/ServiceType"
import { uiControlContribute } from "meta3d-ui-protocol/src/contribute/UIControlContributeType"

export let getContribute: getContributeMeta3D<uiControlContribute<inputData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            {
                rect,
                label
            }
        ) => {
            let { button, setCursorPos } = api.getExtensionService<service>(meta3dState, "meta3d-ui-protocol")

            meta3dState = setCursorPos(meta3dState, [rect.x, rect.y])

            return new Promise((resolve, reject) => {
                resolve(button(meta3dState, label, [rect.width, rect.height]))
            })
        }
    }
}
