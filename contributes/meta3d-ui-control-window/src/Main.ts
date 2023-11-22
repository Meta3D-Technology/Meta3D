import { getContribute as getContributeMeta3D } from "meta3d-type"
import { uiControlName, state as uiControlState, inputFunc, specificData, outputData } from "meta3d-ui-control-window-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<uiControlContribute<inputFunc, specificData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            _,
            {
                rect,
                label,
                childrenFunc
            }
        ) => {
            let { beginWindow, endWindow, setNextWindowRect } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

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
