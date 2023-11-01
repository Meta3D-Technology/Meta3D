import { getContribute as getContributeMeta3D } from "meta3d-type"
import { uiControlName, textureID, state as uiControlState, inputData, outputData } from "meta3d-ui-control-game-view-protocol"
import { uiControlContribute } from "meta3d-ui-protocol/src/contribute/UIControlContributeType"
import { changeToStrictlyNull, getFBORect } from "meta3d-ui-control-view-utils/src/Main"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"

export let getContribute: getContributeMeta3D<uiControlContribute<inputData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            {
                rect,
                label,
            }
        ) => {
            let { beginWindow, endWindow, setNextWindowRect, getFBOTexture, addFBOTexture,
                getWindowBarHeight,
                setUIControlState } = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")
            let uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")



            meta3dState = setNextWindowRect(meta3dState, rect)

            meta3dState = beginWindow(meta3dState, label)


            // let fboRect = getFBORect(rect, getWindowBarHeight(meta3dState))
            let fboRect = getFBORect(rect, 0)
            // fboRect = {
            //     x: fboRect.x - 2,
            //     y: fboRect.y - 2,
            //     width: fboRect.width + 4,
            //     height: fboRect.height
            // }


            // meta3dState = addFBOTexture(meta3dState, changeToStrictlyNull(getFBOTexture, uiState, textureID), fboRect)


            meta3dState = endWindow(meta3dState)



            uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")

            uiState = setUIControlState<uiControlState>(uiState, uiControlName, {
                rect: fboRect
            })

            meta3dState = api.setExtensionState<uiState>(meta3dState, "meta3d-ui-protocol", uiState)


            return Promise.resolve([meta3dState, null])
        },
        init: (meta3dState) => Promise.resolve(meta3dState)
    }
}
