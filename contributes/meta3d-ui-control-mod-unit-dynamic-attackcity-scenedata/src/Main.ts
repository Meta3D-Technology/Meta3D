import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { inputFunc, specificData, outputData, uiControlName, state, map } from "meta3d-ui-control-mod-unit-dynamic-attackcity-scenedata-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { data } from "meta3d-input-mod-unit-dynamic-attackcity-scenedata-protocol"
import { attackCitySingleSceneData } from "meta3d-action-mod-unit-init-protocol/src/StateType"
import { windowFlags } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { autoDifficulty } from "meta3d-action-mod-unit-publish-to-game-protocol/src/Type"
import { countFactor } from "meta3d-action-mod-unit-publish-to-game-protocol/src/UnitType"

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
                let { beginWindow, endWindow, setNextWindowRect, inputInt1, inputFloat1 } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

                return data.reduce<[meta3dState, [Array<attackCitySingleSceneData>, boolean]]>(([meta3dState, data], d, i) => {
                    let [newData, isValueUpdate] = data

                    let newDifficulty
                    [meta3dState, newDifficulty] = inputInt1(meta3dState, `${label}_ad_${i}`, d.difficulty, 1, 1, 100, "难度", autoDifficulty.VeryEasy + 1, autoDifficulty.VeryHard5 + 1)
                    if (!api.nullable.isNullable(newDifficulty)) {
                        isValueUpdate = true
                    }
                    else {
                        newDifficulty = d.difficulty
                    }

                    let newCountFactor
                    [meta3dState, newCountFactor] = inputFloat1(meta3dState, `${label}_cf_${i}`, d.countFactor, 0.1, 1, 100, "数量系数", countFactor.Level0, countFactor.Level10)
                    if (!api.nullable.isNullable(newCountFactor)) {
                        isValueUpdate = true
                    }
                    else {
                        newCountFactor = d.countFactor
                    }

                    return [meta3dState, [[...newData, {
                        ...d,
                        difficulty: api.nullable.getWithDefault(newDifficulty, d.difficulty),
                        countFactor: api.nullable.getWithDefault(newCountFactor, d.countFactor),
                    }], isValueUpdate]]
                }, [meta3dState, [[], false]])
            })
        },
        init: (meta3dState) => {
            return Promise.resolve(meta3dState)
        }
    }
}
