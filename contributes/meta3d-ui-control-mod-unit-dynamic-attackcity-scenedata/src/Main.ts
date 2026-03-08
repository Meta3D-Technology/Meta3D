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

                // const interval = 10
                // let windowRect = rect
                // let lastHeight = 0
                return data.reduce<[meta3dState, Array<attackCitySingleSceneData>]>(([meta3dState, data], d, i) => {
                    // // let newHeight = 50 + Math.min(values.length, 1) * 30
                    // let newHeight = interval + 2 * 30
                    // windowRect = {
                    //     ...windowRect,
                    //     height: newHeight,
                    //     y: windowRect.y + lastHeight
                    // }
                    // lastHeight = newHeight

                    // meta3dState = setNextWindowRect(meta3dState, windowRect)

                    // meta3dState = beginWindow(meta3dState, `${label}_window_i`, windowFlags.None)

                    let newDifficulty
                    [meta3dState, newDifficulty] = inputInt1(meta3dState, `${label}_ad_${i}`, d.difficulty, 1, 1, 100, "难度", autoDifficulty.VeryEasy + 1, autoDifficulty.VeryHard5 + 1)

                    let newCountFactor
                    [meta3dState, newCountFactor] = inputFloat1(meta3dState, `${label}_cf_${i}`, d.countFactor, 0.1, 1, 100, "数量系数", countFactor.Level0, countFactor.Level10)

                    // meta3dState = endWindow(meta3dState)

                    return [meta3dState, [...data, {
                        difficulty: api.nullable.getWithDefault(newDifficulty, d.difficulty),
                        countFactor: api.nullable.getWithDefault(newCountFactor, d.countFactor),
                    }]]
                }, [meta3dState, []])
            })
        },
        init: (meta3dState) => {
            return Promise.resolve(meta3dState)
        }
    }
}
