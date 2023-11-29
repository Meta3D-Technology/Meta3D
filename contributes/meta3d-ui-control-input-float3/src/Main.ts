import { api, getContribute as getContributeMeta3D } from "meta3d-type"
import { inputFunc, specificData, outputData, uiControlName } from "meta3d-ui-control-input-float3-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<uiControlContribute<inputFunc, specificData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            getInputFunc,
            rect,
            {
                label,
                step,
                stepFast
            }
        ) => {
            if (api.nullable.isNullable(getInputFunc)) {
                return Promise.resolve([meta3dState, null])
            }

            return api.nullable.getExn(getInputFunc)(meta3dState).then((value) => {
                if (api.nullable.isNullable(value)) {
                    return [meta3dState, null]
                }

                value = api.nullable.getExn(value)

                let { inputFloat3 } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

                return inputFloat3(meta3dState, label, value, step, stepFast, rect.width)
            })
        },
        init: (meta3dState) => {
            return Promise.resolve(meta3dState)
        }
    }
}
