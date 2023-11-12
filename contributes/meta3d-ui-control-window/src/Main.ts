import { getContribute as getContributeMeta3D } from "meta3d-type"
import { inputData, outputData, uiControlName } from "meta3d-ui-control-window-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"

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
            let { beginWindow, endWindow, setNextWindowRect } = getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

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
