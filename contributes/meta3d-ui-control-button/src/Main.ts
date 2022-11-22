import { getContribute as getContributeMeta3D } from "meta3d-type"
import { inputData, outputData } from "meta3d-ui-control-button-protocol"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-ui-control-button-protocol/src/DependentMapType"
import { service } from "meta3d-ui-protocol/src/service/ServiceType"
import { uiControlContribute } from "meta3d-ui-protocol/src/contribute/UIControlContributeType"

export let getContribute: getContributeMeta3D<dependentExtensionNameMap, dependentContributeNameMap, uiControlContribute<inputData, outputData>> = (api, [dependentExtensionNameMap, _]) => {
    let { meta3dUIExtensionName } = dependentExtensionNameMap

    return {
        uiControlName: "Button",
        func: (meta3dState,
            {
                rect,
                label
            }
        ) => {
            let { button, setCursorPos } = api.getExtensionService<service>(meta3dState, meta3dUIExtensionName)

            meta3dState = setCursorPos(meta3dState, [rect.x, rect.y])

            return button(meta3dState, label, [rect.width, rect.height])
        }
    }
}
