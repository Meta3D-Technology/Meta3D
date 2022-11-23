import { getContribute as getContributeMeta3D } from "meta3d-type"
import { inputData, outputData } from "meta3d-ui-control-window-protocol"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-ui-control-window-protocol/src/DependentMapType"
import { service } from "meta3d-ui-protocol/src/service/ServiceType"
import { uiControlContribute } from "meta3d-ui-protocol/src/contribute/UIControlContributeType"

export let getContribute: getContributeMeta3D<dependentExtensionNameMap, dependentContributeNameMap, uiControlContribute<inputData, outputData>> = (api, [dependentExtensionNameMap, _]) => {
    let { meta3dUIExtensionName } = dependentExtensionNameMap

    return {
        uiControlName: "Window",
        func: (meta3dState,
            {
                rect,
                label,
                childrenFunc
            }
        ) => {
            let { beginWindow, endWindow, setNextWindowRect } = api.getExtensionService<service>(meta3dState, meta3dUIExtensionName)
            // let state = api.getExtensionState<state>(meta3dState, meta3dUIExtensionName)

            meta3dState = setNextWindowRect(meta3dState, rect)

            meta3dState = beginWindow(meta3dState, label)

            return childrenFunc(meta3dState).then(meta3dState => {
                meta3dState = endWindow(meta3dState)

                return [meta3dState, null]
            })
        }
    }
}
