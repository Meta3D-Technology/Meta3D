import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { inputFunc, specificData, outputData, uiControlName } from "meta3d-ui-control-mod-dynamic-texts-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { data } from "meta3d-input-mod-dynamic-texts-protocol"

export let getContribute: getContributeMeta3D<uiControlContribute<inputFunc, specificData, outputData>> = (api) => {
    api.nullable
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            getInputFunc,
            rect,
            {
                label,
            }
        ) => {
            let inputPromise: Promise<data>
            if (api.nullable.isNullable(getInputFunc)) {
                inputPromise = Promise.resolve([])
            }
            else {
                inputPromise = api.nullable.getExn(getInputFunc)(meta3dState, [])
            }

            return inputPromise.then(data => {
                let { text, sameLine } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

                meta3dState = data.reduce((meta3dState, value) => {
                    meta3dState = text(meta3dState, value)

                    meta3dState = sameLine(meta3dState)

                    return meta3dState
                }, meta3dState)

                return [meta3dState, null]
            })
        },
        init: (meta3dState) => {
            return Promise.resolve(meta3dState)
        }
    }
}
