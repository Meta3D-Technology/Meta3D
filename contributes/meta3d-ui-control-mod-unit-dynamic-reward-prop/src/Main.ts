import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { inputFunc, specificData, outputData, uiControlName } from "meta3d-ui-control-mod-unit-dynamic-reward-prop-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { data } from "meta3d-input-mod-unit-dynamic-reward-prop-protocol"
import { propData } from "meta3d-action-mod-unit-init-protocol"
import { count, rate } from "meta3d-action-mod-unit-publish-to-game-protocol/src/Type"
import { getLanguageTextData } from "meta3d-language-utils/src/Main"
import { languageKey } from "meta3d-language-utils/src/Type"
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
                let { text, inputInt1, inputFloat1 } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

                let initState = api.action.getActionState<initState>(meta3dState, initActionName)

                return data.reduce<[meta3dState, [Array<propData>, boolean]]>(([meta3dState, data], d, i) => {
                    let [newData, isValueUpdate] = data

                    meta3dState = text(meta3dState, getLanguageTextData(api, meta3dState, initState.languageTextData, d.name))

                    let newCount
                    // [meta3dState, newCount] = inputInt1(meta3dState, `${label}_count_${i}`, d.count, 1, 1, 100, getLanguageTextData(api, meta3dState, initState.languageTextData, languageKey.Count), 1, +Infinity)
                    [meta3dState, newCount] = inputInt1(meta3dState, `${label}_count_${i}`, d.count, 1, 1, 100, getLanguageTextData(api, meta3dState, initState.languageTextData, languageKey.Count), 1, initState.allPropData.find(prop => prop.name === d.name).maxCount)

                    if (!api.nullable.isNullable(newCount)) {
                        isValueUpdate = true
                    }
                    else {
                        newCount = d.count
                    }

                    let newRate
                    [meta3dState, newRate] = inputFloat1(meta3dState, `${label}_rate_${i}`, d.rate, 0.1, 1, 100, getLanguageTextData(api, meta3dState, initState.languageTextData, languageKey.DropRate), rate.Zero, rate.Must)
                    if (!api.nullable.isNullable(newRate)) {
                        isValueUpdate = true
                    }
                    else {
                        newRate = d.rate
                    }

                    return [meta3dState, [[...newData, {
                        ...d,
                        count: newCount,
                        rate: newRate,
                    }], isValueUpdate]]
                }, [meta3dState, [[], false]])
            })
        },
        init: (meta3dState) => {
            return Promise.resolve(meta3dState)
        }
    }
}
