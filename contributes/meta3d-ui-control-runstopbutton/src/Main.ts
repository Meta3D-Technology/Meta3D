import { api, getContribute as getContributeMeta3D } from "meta3d-type"
import { state as meta3dState } from "meta3d-type"
import { inputFunc, specificData, outputData, uiControlName, state, imageBase64 } from "meta3d-ui-control-runstopbutton-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
// import runImageSrc from "url-loader!./image/run.png"
// import stopImageSrc from "url-loader!./image/stop.png"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
// import { actionName as runActionName, state as runState } from "meta3d-action-run-protocol"

let _loadImage = (
    meta3dState: meta3dState,
    api: api,
    image1: nullable<imageBase64>,
    image2: nullable<imageBase64>
): Promise<meta3dState> => {
    let { loadImage } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

    let state = api.nullable.getExn(api.uiControl.getUIControlState<state>(meta3dState, uiControlName))

    // console.warn(image1, image2);


    let promise = null
    // if (api.nullable.isNullable(state.runTexture) ) {
    // if (api.nullable.isNullable(state.runTexture) && !api.nullable.isNullable(image1)) {
    if (!api.nullable.isNullable(image1) && api.nullable.getWithDefault(api.nullable.map(lastRunTextureImageBase64 => lastRunTextureImageBase64 != api.nullable.getExn(image1), state.lastRunTextureImageBase64), true)) {
        promise = loadImage(meta3dState, api.nullable.getExn(image1)).then((runTexture: any) => {
            meta3dState = api.uiControl.setUIControlState<state>(meta3dState, uiControlName, {
                ...state,
                runTexture,
                lastRunTextureImageBase64: api.nullable.getExn(image1)
            })

            return meta3dState
        })
    }
    else {
        promise = Promise.resolve(meta3dState)
    }

    // if (api.nullable.isNullable(state.stopTexture)) {
    // if (api.nullable.isNullable(state.stopTexture) && !api.nullable.isNullable(image2)) {
    if (!api.nullable.isNullable(image2) && api.nullable.getWithDefault(api.nullable.map(lastStopTextureImageBase64 => lastStopTextureImageBase64 != api.nullable.getExn(image2), state.lastStopTextureImageBase64), true)) {
        // if (!api.nullable.isNullable(image2)) {
        return promise.then(meta3dState => {
            return loadImage(meta3dState, api.nullable.getExn(image2)).then((stopTexture: any) => {
                meta3dState = api.uiControl.setUIControlState<state>(meta3dState, uiControlName, {
                    ...state,
                    stopTexture,
                    lastStopTextureImageBase64: api.nullable.getExn(image2)
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
            if (api.nullable.isNullable(getInputFunc)) {
                return Promise.resolve([meta3dState, [false, false]])
            }

            return api.nullable.getExn(getInputFunc)(meta3dState).then(isRun => {
                return _loadImage(
                    meta3dState,
                    api,
                    image1,
                    image2,
                ).then(meta3dState => {
                    let { runStopButton, setCursorPos } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

                    meta3dState = setCursorPos(meta3dState, [rect.x, rect.y])

                    let { runTexture,
                        stopTexture,
                    } = api.nullable.getExn(api.uiControl.getUIControlState<state>(meta3dState, uiControlName))

                    if (!api.nullable.isNullable(runTexture) && !api.nullable.isNullable(stopTexture)) {
                        return runStopButton(meta3dState,
                            isRun,
                            {
                                runTexture: api.nullable.getExn(runTexture),
                                stopTexture: api.nullable.getExn(stopTexture),
                            }, [rect.width, rect.height])
                    }

                    return Promise.resolve([meta3dState, [false, false]])
                })
            })
        },
        init: (meta3dState) => {
            meta3dState = api.uiControl.setUIControlState<state>(meta3dState, uiControlName, {
                runTexture: null,
                stopTexture: null,
                lastRunTextureImageBase64: null,
                lastStopTextureImageBase64: null,
            })

            return Promise.resolve(meta3dState)
        }
    }
}
