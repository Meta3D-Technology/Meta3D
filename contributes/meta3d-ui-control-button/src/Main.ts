import { getContribute as getContributeMeta3D } from "meta3d-type"
import { inputData, outputData, uiControlName } from "meta3d-ui-control-button-protocol"
import { service as editorWholeService, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"

export let getContribute: getContributeMeta3D<uiControlContribute<inputData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            {
                rect,
                label
            }
        ) => {
            let { button, setCursorPos } = getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

            meta3dState = setCursorPos(meta3dState, [rect.x, rect.y])

            return new Promise((resolve, reject) => {
                resolve(button(meta3dState, label, [rect.width, rect.height]))
            })
        },
        init: (meta3dState) => Promise.resolve(meta3dState)
    }
}
