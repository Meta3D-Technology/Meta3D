import { getContribute as getContributeMeta3D } from "meta3d-type"
import { inputData, outputData, uiControlName } from "meta3d-ui-control-button-protocol"
import { dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap } from "meta3d-ui-control-button-protocol/src/DependentMapType"
import { service } from "meta3d-ui-protocol/src/service/ServiceType"
import { uiControlContribute } from "meta3d-ui-protocol/src/contribute/UIControlContributeType"

export let getContribute: getContributeMeta3D<dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap, uiControlContribute<inputData, outputData>> = (api, [dependentExtensionProtocolNameMap, _]) => {
    let { meta3dUIExtensionProtocolName } = dependentExtensionProtocolNameMap

    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            {
                rect,
                label
            }
        ) => {
            let { button, setCursorPos } = api.getExtensionService<service>(meta3dState, meta3dUIExtensionProtocolName)

            meta3dState = setCursorPos(meta3dState, [rect.x, rect.y])

            return new Promise((resolve, reject) => {
                resolve(button(meta3dState, label, [rect.width, rect.height]))
            })
        }
    }
}
