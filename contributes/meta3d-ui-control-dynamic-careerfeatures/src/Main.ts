import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { inputFunc, specificData, outputData, uiControlName, state, map } from "meta3d-ui-control-dynamic-careerfeatures-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { data } from "meta3d-input-mod-career-dynamic-careerfeatures-protocol"
import { windowFlags } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<uiControlContribute<inputFunc, specificData, outputData>> = (api) => {
    api.nullable
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            getInputFunc,
            rect,
            {
                label,
                // isRemoveable,
                // itemWidth,
                // itemHeight,
                // removeImage
                // width,
                // height
            }
        ) => {
            let inputPromise: Promise<data>
            if (api.nullable.isNullable(getInputFunc)) {
                inputPromise = Promise.resolve([])
            }
            else {
                inputPromise = api.nullable.getExn(getInputFunc)(meta3dState)
            }

            return inputPromise.then(features => {
                let { beginWindow, endWindow, setNextWindowRect, text, inputFloat1, sameLine } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

                let windowRect = rect
                let lastHeight = 0
                return features.reduce<[meta3dState, [map, boolean]]>(([meta3dState, data], [
                    careerFeatureName,
                    description,
                    values
                ], i) => {
                    // let newHeight = 40 + values.length * 40
                    let newHeight = 40 + 1 * 40
                    windowRect = {
                        ...windowRect,
                        height: newHeight,
                        y: windowRect.y + lastHeight
                    }
                    lastHeight = newHeight

                    let [map, isValueUpdate] = data

                    meta3dState = setNextWindowRect(meta3dState, windowRect)

                    meta3dState = beginWindow(meta3dState, careerFeatureName, windowFlags.None)

                    meta3dState = text(meta3dState, description)

                    let newValue
                    [meta3dState, map, isValueUpdate] = values.reduce(([meta3dState, map, isValueUpdate], value, i) => {
                        [meta3dState, newValue] = inputFloat1(meta3dState, `${careerFeatureName}_${i}`, value, 0.01, 0.1, 100, "")
                        if (i < values.length - 1) {
                            meta3dState = sameLine(meta3dState)
                        }

                        if (!api.nullable.isNullable(newValue)) {
                            map = map.set(careerFeatureName,
                                api.nullable.getWithDefault(
                                    map.get(careerFeatureName), api.immutable.createList()
                                ).set(i, newValue)
                            )
                            isValueUpdate = true
                        }

                        return [meta3dState, map, isValueUpdate]
                    }, [meta3dState, map, isValueUpdate])

                    meta3dState = endWindow(meta3dState)

                    return [meta3dState, [map, isValueUpdate]]
                }, [meta3dState, [api.immutable.createMap(), false]])
            })
        },
        init: (meta3dState) => {
            return Promise.resolve(meta3dState)
        }
    }
}
