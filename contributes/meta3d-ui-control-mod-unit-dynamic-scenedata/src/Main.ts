import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { inputFunc, specificData, outputData, uiControlName, state, map } from "meta3d-ui-control-mod-unit-dynamic-scenedata-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { data } from "meta3d-input-mod-unit-dynamic-scenedata-protocol"
import { singleSceneData } from "meta3d-action-mod-unit-init-protocol/src/StateType"
import { autoDifficulty } from "meta3d-action-mod-unit-publish-to-game-protocol/src/Type"
import { countFactor } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"
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
                let { beginWindow, endWindow, setNextWindowRect, popup, inputFloat1 } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

                const difficultyMap = {
                    // [autoDifficulty.VeryEasy]: "非常简单",
                    // [autoDifficulty.Easy]: "简单",
                    // [autoDifficulty.Middle]: "中等",
                    // [autoDifficulty.Hard]: "困难",
                    // [autoDifficulty.VeryHard]: "非常困难",
                    // [autoDifficulty.VeryHard1]: "非常困难1",
                    // [autoDifficulty.VeryHard2]: "非常困难2",
                    // [autoDifficulty.VeryHard3]: "非常困难3",
                    // [autoDifficulty.VeryHard4]: "非常困难4",
                    // [autoDifficulty.VeryHard5]: "非常困难5",
                    [autoDifficulty.VeryEasy]: "1",
                    [autoDifficulty.Easy]: "2",
                    [autoDifficulty.Middle]: "3",
                    [autoDifficulty.Hard]: "4",
                    [autoDifficulty.VeryHard]: "5",
                    [autoDifficulty.VeryHard1]: "6",
                    [autoDifficulty.VeryHard2]: "7",
                    [autoDifficulty.VeryHard3]: "8",
                    [autoDifficulty.VeryHard4]: "9",
                    [autoDifficulty.VeryHard5]: "10",
                }

                let initState = api.action.getActionState<initState>(meta3dState, initActionName)

                return data.reduce<[meta3dState, [Array<singleSceneData>, boolean]]>(([meta3dState, data], d, i) => {
                    let [newData, isValueUpdate] = data

                    let newDifficulty, newDifficultyIndex
                    // [meta3dState, newDifficulty] = inputInt1(meta3dState, `${label}_ad_${i}`, d.difficulty, 1, 1, 100, getLanguageTextData(api, meta3dState, languageKey.Difficulty), autoDifficulty.VeryEasy + 1, autoDifficulty.VeryHard5 + 1)
                    [meta3dState, newDifficultyIndex] = popup(meta3dState, `${getLanguageTextData(api, meta3dState, initState.languageTextData, languageKey.Difficulty)}##${label}_ad_${i}`, Object.values(difficultyMap), `${label}_ad_${i}`, difficultyMap[d.difficulty])

                    if (!api.nullable.isNullable(newDifficultyIndex)) {
                        isValueUpdate = true

                        // newDifficulty = Number(Object.keys(difficultyMap)[Object.values(difficultyMap).indexOf(api.nullable.getExn(newDifficultyValue))])
                        newDifficulty = Number(Object.keys(difficultyMap)[api.nullable.getExn(newDifficultyIndex)])
                    }
                    else {
                        newDifficulty = d.difficulty
                    }

                    let newGenerateRate
                    [meta3dState, newGenerateRate] = inputFloat1(meta3dState, `${label}_w_${i}`, d.weight, 0.01, 0.1, 100, getLanguageTextData(api, meta3dState, initState.languageTextData, languageKey.GenerateRate), 0, 1)
                    if (!api.nullable.isNullable(newGenerateRate)) {
                        isValueUpdate = true
                    }
                    else {
                        newGenerateRate = d.weight
                    }


                    let newCountFactor
                    [meta3dState, newCountFactor] = inputFloat1(meta3dState, `${label}_cf_${i}`, d.countFactor, 0.1, 1, 100, getLanguageTextData(api, meta3dState, initState.languageTextData, languageKey.CountFactor), countFactor.Level0, countFactor.Level10)
                    if (!api.nullable.isNullable(newCountFactor)) {
                        isValueUpdate = true
                    }
                    else {
                        newCountFactor = d.countFactor
                    }

                    return [meta3dState, [[...newData, {
                        ...d,
                        difficulty: newDifficulty,
                        weight: newGenerateRate,
                        countFactor: newCountFactor,
                    }], isValueUpdate]]
                }, [meta3dState, [[], false]])
            })
        },
        init: (meta3dState) => {
            return Promise.resolve(meta3dState)
        }
    }
}
