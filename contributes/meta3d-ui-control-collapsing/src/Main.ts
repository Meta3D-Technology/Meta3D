import { getContribute as getContributeMeta3D } from "meta3d-type"
import { uiControlName, state as uiControlState, inputFunc, specificData, outputData } from "meta3d-ui-control-collapsing-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { data } from "meta3d-input-collapse-protocol"

export let getContribute: getContributeMeta3D<uiControlContribute<inputFunc, specificData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            getInputFunc,
            rect,
            {
                label,
                isOpen,
                cond,
                childrenFunc
            }
        ) => {
            let inputPromise: Promise<data>
            if (api.nullable.isNullable(getInputFunc)) {
                inputPromise = Promise.resolve(true)
            }
            else {
                inputPromise = api.nullable.getExn(getInputFunc)(meta3dState)
            }

            return inputPromise.then(isShow => {
                if (!isShow) {
                    return [meta3dState, null]
                }

                let { collapsing } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

                let data = collapsing(meta3dState, label, isOpen, cond.selected)
                meta3dState = data[0]
                let isOpen_ = data[1]

                if (isOpen_) {
                    return childrenFunc(meta3dState).then(meta3dState => {
                        return [meta3dState, null]
                    })
                }

                return Promise.resolve([meta3dState, null])
            })
        },
        init: (meta3dState) => Promise.resolve(meta3dState)
    }
}
