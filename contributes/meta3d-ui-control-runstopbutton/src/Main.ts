import { api, getContribute as getContributeMeta3D } from "meta3d-type"
import { state as meta3dState } from "meta3d-type"
import { inputFunc, specificData, outputData, uiControlName, state, imageBase64 } from "meta3d-ui-control-runstopbutton-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
// import runImageSrc from "url-loader!./image/run.png"
// import stopImageSrc from "url-loader!./image/stop.png"
import { getExn, getWithDefault, isNullable, map } from "meta3d-commonlib-ts/src/NullableUtils"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
// import { actionName as runActionName, state as runState } from "meta3d-action-run-protocol"
// import { getActionStateInInput } from "meta3d-ui-utils/src/ElementStateUtils"

let _loadImage = (
    meta3dState: meta3dState,
    api: api,
    image1: nullable<imageBase64>,
    image2: nullable<imageBase64>
): Promise<meta3dState> => {
    let { getUIControlState, setUIControlState, loadImage } = getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

    let state = getExn(getUIControlState<state>(meta3dState, uiControlName))

    // console.warn(image1, image2);


    let promise = null
    // if (isNullable(state.runTexture) ) {
    // if (isNullable(state.runTexture) && !isNullable(image1)) {
    if (!isNullable(image1) && getWithDefault(map(lastRunTextureImageBase64 => lastRunTextureImageBase64 != getExn(image1), state.lastRunTextureImageBase64), true)) {
        promise = loadImage(meta3dState, getExn(image1)).then((runTexture: any) => {
            meta3dState = setUIControlState<state>(meta3dState, uiControlName, {
                ...state,
                runTexture,
                lastRunTextureImageBase64: getExn(image1)
            })

            return meta3dState
        })
    }
    else {
        promise = Promise.resolve(meta3dState)
    }

    // if (isNullable(state.stopTexture)) {
    // if (isNullable(state.stopTexture) && !isNullable(image2)) {
    if (!isNullable(image2) && getWithDefault(map(lastStopTextureImageBase64 => lastStopTextureImageBase64 != getExn(image2), state.lastStopTextureImageBase64), true)) {
        // if (!isNullable(image2)) {
        return promise.then(meta3dState => {
            return loadImage(meta3dState, getExn(image2)).then((stopTexture: any) => {
                meta3dState = setUIControlState<state>(meta3dState, uiControlName, {
                    ...state,
                    stopTexture,
                    lastStopTextureImageBase64: getExn(image2)
                })

                return meta3dState
            })
        })
    }

    return promise
}

export let getContribute: getContributeMeta3D<uiControlContribute<inputFunc, specificData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            getInputFunc,
            {
                rect,
                label,
                image1,
                image2
            }
        ) => {
            if (isNullable(getInputFunc)) {
                return Promise.resolve([meta3dState, [false, false]])
            }

            return getExn(getInputFunc)(meta3dState).then(isRun => {
                return _loadImage(
                    meta3dState,
                    api,
                    image1,
                    image2,
                ).then(meta3dState => {
                    let { runStopButton, getUIControlState, setCursorPos } = getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

                    meta3dState = setCursorPos(meta3dState, [rect.x, rect.y])

                    let { runTexture,
                        stopTexture,
                    } = getExn(getUIControlState<state>(meta3dState, uiControlName))

                    if (!isNullable(runTexture) && !isNullable(stopTexture)) {
                        return runStopButton(meta3dState,
                            isRun,
                            {
                                runTexture: getExn(runTexture),
                                stopTexture: getExn(stopTexture),
                            }, [rect.width, rect.height])
                    }

                    return Promise.resolve([meta3dState, [false, false]])
                })
            })
        },
        init: (meta3dState) => {
            let { setUIControlState } = getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

            // return loadImage(meta3dState, runImageSrc).then((runTexture: any) => {
            //     return loadImage(meta3dState, stopImageSrc).then((stopTexture: any) => {
            //         meta3dState = setUIControlState<state>(meta3dState, uiControlName, {
            //             runTexture,
            //             stopTexture,
            //         })

            //         return meta3dState
            //     })
            // })


            meta3dState = setUIControlState<state>(meta3dState, uiControlName, {
                runTexture: null,
                stopTexture: null,
                lastRunTextureImageBase64: null,
                lastStopTextureImageBase64: null,
            })

            return Promise.resolve(meta3dState)
        }
    }
}
