import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { inputFunc, specificData, outputData, uiControlName, state, arr } from "meta3d-ui-control-mod-unit-dynamic-behaviourdata-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { data } from "meta3d-input-mod-unit-dynamic-bahaviourdata-protocol"
import { getLanguageTextData } from "meta3d-language-utils/src/Main"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"

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
                let initState = api.action.getActionState<initState>(meta3dState, initActionName)

                let { inputFloat1 } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

                return data.reduce<[meta3dState, [arr, boolean]]>(([meta3dState, data], [modeKey, key, value, minValue, maxValue], i) => {
                    let [arr, isValueUpdate] = data

                    let newValue
                    [meta3dState, newValue] = inputFloat1(meta3dState, `${label}_${key}_${i}`, value, 0.1, 1, 100, getLanguageTextData(api, meta3dState, initState.languageTextData, key), minValue, maxValue)
                    if (!api.nullable.isNullable(newValue)) {
                        isValueUpdate = true
                    }
                    else {
                        newValue = value
                    }

                    return [meta3dState, [[...arr, [
                        modeKey,
                        key,
                        newValue,
                    ]], isValueUpdate]]
                }, [meta3dState, [[], false]])

            })
        },
        init: (meta3dState) => {
            return Promise.resolve(meta3dState)
        }
    }
}
