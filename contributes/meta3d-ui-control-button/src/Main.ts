import { getContribute as getContributeMeta3D } from "meta3d-type"
import { inputFunc, specificData, outputData, uiControlName } from "meta3d-ui-control-button-protocol"
import { service as editorWholeService, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<uiControlContribute<inputFunc, specificData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            _,
            rect,
            {
                label,
                isNotAbsolutePosition
            }
        ) => {
            let { button, setCursorPos } = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

            if (!isNotAbsolutePosition) {
                meta3dState = setCursorPos(meta3dState, [rect.x, rect.y])
            }

            return new Promise((resolve, reject) => {
                resolve(button(meta3dState, label, [rect.width, rect.height]))
            })
        },
        init: (meta3dState) => Promise.resolve(meta3dState)
    }
}
