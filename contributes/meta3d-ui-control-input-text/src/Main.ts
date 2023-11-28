import { api, getContribute as getContributeMeta3D } from "meta3d-type"
import { inputFunc, specificData, outputData, uiControlName } from "meta3d-ui-control-input-text-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<uiControlContribute<inputFunc, specificData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            getInputFunc,
            {
                rect,
                label,
                maxLength
            }
        ) => {
            if (api.nullable.isNullable(getInputFunc)) {
                return Promise.resolve([meta3dState, null])
            }

            return api.nullable.getExn(getInputFunc)(meta3dState).then((text) => {
                if (api.nullable.isNullable(text)) {
                    return [meta3dState, null]
                }

                text = api.nullable.getExn(text)

                let { inputText } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

                return inputText(meta3dState, label, text, maxLength, rect.width)
            })
        },
        init: (meta3dState) => {
            return Promise.resolve(meta3dState)
        }
    }
}
