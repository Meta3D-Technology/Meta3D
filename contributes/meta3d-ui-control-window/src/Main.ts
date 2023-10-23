import { getContribute as getContributeMeta3D } from "meta3d-type"
import { inputData, outputData, uiControlName } from "meta3d-ui-control-window-protocol"
import { service } from "meta3d-ui-protocol/src/service/ServiceType"
import { uiControlContribute } from "meta3d-ui-protocol/src/contribute/UIControlContributeType"

export let getContribute: getContributeMeta3D<uiControlContribute<inputData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            {
                rect,
                label,
                childrenFunc
            }
        ) => {
            let { beginWindow, endWindow, setNextWindowRect } = api.getExtensionService<service>(meta3dState, "meta3d-ui-protocol")
            // let state = api.getExtensionState<state>(meta3dState, "meta3d-ui-protocol")

            meta3dState = setNextWindowRect(meta3dState, rect)

            meta3dState = beginWindow(meta3dState, label)

            return childrenFunc(meta3dState).then(meta3dState => {
                meta3dState = endWindow(meta3dState)

                return [meta3dState, null]
            })
        },
        init: (meta3dState) => Promise.resolve(meta3dState)
    }
}
