import { getContribute as getContributeMeta3D } from "meta3d-type"
import { uiControlName, state as uiControlState, inputFunc, specificData, outputData } from "meta3d-ui-control-checkbox-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { data } from "meta3d-input-checkbox-protocol"

export let getContribute: getContributeMeta3D<uiControlContribute<inputFunc, specificData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            getInputFunc,
            _,
            {
                label,
                isSelect
            }
        ) => {
            let inputPromise: Promise<data>
            if (api.nullable.isNullable(getInputFunc)) {
                inputPromise = Promise.resolve(isSelect)
            }
            else {
                inputPromise = api.nullable.getExn(getInputFunc)(meta3dState)
            }

            return inputPromise.then(isSelect => {
                let { checkbox } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

                let data = checkbox(meta3dState, label, isSelect)
                meta3dState = data[0]
                let isSelect_ = data[1]

                return Promise.resolve([meta3dState, isSelect_])
            })
        },
        init: (meta3dState) => Promise.resolve(meta3dState)
    }
}
