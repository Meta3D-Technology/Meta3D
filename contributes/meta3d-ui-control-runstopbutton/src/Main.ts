import { getContribute as getContributeMeta3D } from "meta3d-type"
import { inputFunc, specificData, outputData, uiControlName, state } from "meta3d-ui-control-runstopbutton-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import runImageSrc from "url-loader!./image/run.png"
import stopImageSrc from "url-loader!./image/stop.png"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"
// import { actionName as runActionName, state as runState } from "meta3d-action-run-protocol"
// import { getActionStateInInput } from "meta3d-ui-utils/src/ElementStateUtils"

export let getContribute: getContributeMeta3D<uiControlContribute<inputFunc, specificData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            getInputFunc,
            {
                rect,
                label
            }
        ) => {
            if (isNullable(getInputFunc)) {
                return Promise.resolve([meta3dState, [false, false]])
            }

            return getExn(getInputFunc)(meta3dState).then(isRun => {
                let { runStopButton, getUIControlState, setCursorPos } = getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

                meta3dState = setCursorPos(meta3dState, [rect.x, rect.y])

                let { runTexture,
                    stopTexture,
                } = getExn(getUIControlState<state>(meta3dState, uiControlName))

                return runStopButton(meta3dState,
                    isRun,
                    {
                        runTexture,
                        stopTexture,
                    }, [rect.width, rect.height])
            })
        },
        init: (meta3dState) => {
            let { setUIControlState, loadImage } = getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

            return loadImage(meta3dState, runImageSrc).then((runTexture: any) => {
                return loadImage(meta3dState, stopImageSrc).then((stopTexture: any) => {
                    meta3dState = setUIControlState<state>(meta3dState, uiControlName, {
                        runTexture,
                        stopTexture,
                    })

                    return meta3dState
                })
            })
        }
    }
}
