import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { inputFunc, specificData, outputData, uiControlName, state, arr } from "meta3d-ui-control-mod-unit-dynamic-features-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { data } from "meta3d-input-mod-unit-dynamic-feature-protocol"
import { windowFlags } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
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
                // let { beginWindow, endWindow, setNextWindowRect, text, inputInt1, popup } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

                // let windowRect = rect
                // let lastHeight = 0
                // return features.reduce<[meta3dState, [arr, boolean]]>(([meta3dState, data], [
                //     name,
                //     // careerFeatureName,
                //     // positive,
                //     description,
                //     // values,
                //     level,
                //     // minValue,
                //     maxLevel
                // ], i) => {
                //     let newHeight = 50 + 1 * 30
                //     windowRect = {
                //         ...windowRect,
                //         height: newHeight,
                //         y: windowRect.y + lastHeight
                //     }
                //     lastHeight = newHeight

                //     let [arr, isValueUpdate] = data

                //     meta3dState = setNextWindowRect(meta3dState, windowRect)

                //     meta3dState = beginWindow(meta3dState, name, windowFlags.None)

                //     meta3dState = text(meta3dState, description)

                //     let newLevel
                //     [meta3dState, newLevel] = inputInt1(meta3dState, `${name}_${i}`, level, 1, 1, 100, getLanguageTextData(api, meta3dState, languageKey.Level), 1, maxLevel)

                //     if (
                //         !api.nullable.isNullable(newLevel)
                //         // && newLevel > 0
                //     ) {
                //         isValueUpdate = true
                //     }
                //     else {
                //         newLevel = level
                //     }

                //     arr = [
                //         ...arr,
                //         {
                //             name,
                //             level: newLevel,
                //         }
                //     ]


                //     meta3dState = endWindow(meta3dState)

                //     return [meta3dState, [arr, isValueUpdate]]
                // }, [meta3dState, [[], false]])

                let initState = api.action.getActionState<initState>(meta3dState, initActionName)

                let { text, inputInt1 } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

                return data.reduce<[meta3dState, [arr, boolean]]>(([meta3dState, data], [
                    name,
                    description,
                    level,
                    maxLevel
                ], i) => {
                    let [arr, isValueUpdate] = data

                    meta3dState = text(meta3dState, `${name}:${description}`)

                    let newLevel
                    [meta3dState, newLevel] = inputInt1(meta3dState, `${label}_level_${i}`, level, 1, 1, 100, getLanguageTextData(api, meta3dState, initState.languageTextData, languageKey.Level), 1, maxLevel)
                    if (!api.nullable.isNullable(newLevel)) {
                        isValueUpdate = true
                    }
                    else {
                        newLevel = level
                    }

                    return [meta3dState, [[...arr, {
                        name,
                        level: newLevel,
                    }], isValueUpdate]]
                }, [meta3dState, [[], false]])

            })
        },
        init: (meta3dState) => {
            return Promise.resolve(meta3dState)
        }
    }
}
