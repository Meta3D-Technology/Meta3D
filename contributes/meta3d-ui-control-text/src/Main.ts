import { api, getContribute as getContributeMeta3D } from "meta3d-type"
import { inputFunc, specificData, outputData, uiControlName } from "meta3d-ui-control-text-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<uiControlContribute<inputFunc, specificData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            getInputFunc,
            rect,
            {
                isNotAbsolutePosition
            }
        ) => {
            if (api.nullable.isNullable(getInputFunc)) {
                return Promise.resolve([meta3dState, null])
            }

            return api.nullable.getExn(getInputFunc)(meta3dState, []).then((text_) => {
                if (api.nullable.isNullable(text_)) {
                    return [meta3dState, null]
                }

                text_ = api.nullable.getExn(text_)
                let { text, setCursorPos } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

                if (!isNotAbsolutePosition) {
                    meta3dState = setCursorPos(meta3dState, [rect.x, rect.y])
                }

                return [text(meta3dState, text_), null]
            })
        },
        init: (meta3dState) => {
            return Promise.resolve(meta3dState)
        }
    }
}
