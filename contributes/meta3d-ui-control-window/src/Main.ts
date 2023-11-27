import { getContribute as getContributeMeta3D } from "meta3d-type"
import { uiControlName, state as uiControlState, inputFunc, specificData, outputData } from "meta3d-ui-control-window-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { data } from "meta3d-input-window-protocol"
import { windowFlags } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<uiControlContribute<inputFunc, specificData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            getInputFunc,
            {
                rect,
                label,
                childrenFunc
            }
        ) => {
            let inputPromise: Promise<data>
            if (api.nullable.isNullable(getInputFunc)) {
                inputPromise = Promise.resolve({
                    isShow: true,
                    flags: windowFlags.NoTitleBar
                })
            }
            else {
                inputPromise = api.nullable.getExn(getInputFunc)(meta3dState)
            }

            return inputPromise.then(data => {
                if (!data.isShow) {
                    return [meta3dState, null]
                }

                let { beginWindow, endWindow, setNextWindowRect } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

                meta3dState = setNextWindowRect(meta3dState, rect)

                meta3dState = beginWindow(meta3dState, label, data.flags)

                return childrenFunc(meta3dState).then(meta3dState => {
                    meta3dState = endWindow(meta3dState)

                    return [meta3dState, null]
                })
            })
        },
        init: (meta3dState) => Promise.resolve(meta3dState)
    }
}
