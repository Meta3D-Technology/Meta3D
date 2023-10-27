import { getContribute as getContributeMeta3D } from "meta3d-type"
import { inputData, outputData, uiControlName, state } from "meta3d-ui-control-runstopbutton-protocol"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { uiControlContribute } from "meta3d-ui-protocol/src/contribute/UIControlContributeType"
import runImageSrc from "url-loader!./image/run.png"
import stopImageSrc from "url-loader!./image/stop.png"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"
// import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { actionName as runActionName, state as runState } from "meta3d-action-run-protocol"
// import { actionName as stopActionName } from "meta3d-action-stop-protocol"
import { getActionStateInUIControl } from "meta3d-ui-utils/src/ElementStateUtils"

export let getContribute: getContributeMeta3D<uiControlContribute<inputData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            {
                rect,
                label
            }
        ) => {
            let runState = getActionStateInUIControl<runState>(meta3dState, api, runActionName)

            if (isNullable(runState)) {
                return Promise.resolve([meta3dState, [false, false]])
            }

            runState = getExn(runState)

            let { runStopButton, getUIControlState, setCursorPos } = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")

            meta3dState = setCursorPos(meta3dState, [rect.x, rect.y])

            let { runTexture,
                stopTexture,
            } = getExn(getUIControlState<state>(api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol"), uiControlName))

            return Promise.resolve(runStopButton(meta3dState,
                runState.isRun,
                {
                    runTexture,
                    stopTexture,
                }, [rect.width, rect.height]))
        },
        init: (meta3dState) => {
            let { setUIControlState, loadImage } = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")

            return loadImage(meta3dState, runImageSrc).then((runTexture: any) => {
                return loadImage(meta3dState, stopImageSrc).then((stopTexture: any) => {
                    let uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")

                    uiState = setUIControlState<state>(uiState, uiControlName, {
                        runTexture,
                        stopTexture,
                    })

                    return api.setExtensionState(meta3dState, "meta3d-ui-protocol", uiState)
                })
            })
        }
    }
}