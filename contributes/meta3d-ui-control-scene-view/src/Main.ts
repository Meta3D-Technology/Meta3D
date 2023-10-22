import { getContribute as getContributeMeta3D } from "meta3d-type"
import { uiControlName, textureID, state as uiControlState, inputData, outputData, dragDropType, dragDropData } from "meta3d-ui-control-scene-view-protocol"
import { uiControlContribute } from "meta3d-ui-protocol/src/contribute/UIControlContributeType"
import { changeToStrictlyNull, getFBORect } from "meta3d-ui-control-view-utils/src/Main"
import { service } from "meta3d-ui-protocol/src/service/ServiceType"
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
            // return func(
            //     meta3dState, api, {
            //     rect,
            //     label,
            // },
            //     [uiControlName, textureID]
            // ).then(([meta3dState, _]) => {
            //     let { handleDragDropTarget } = api.getExtensionService<service>(meta3dState, "meta3d-ui-protocol")

            //     return handleDragDropTarget<dragDropData>(meta3dState, dragDropType)
            // })

            let { beginWindow, endWindow, beginChild, endChild, setNextWindowRect, getFBOTexture, addFBOTexture,
                getWindowBarHeight,
                setUIControlState } = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")
            let uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")



            meta3dState = setNextWindowRect(meta3dState, rect)

            meta3dState = beginWindow(meta3dState, label)

            meta3dState = beginChild(meta3dState, "Child_SceneView")

            let fboRect = getFBORect(rect, getWindowBarHeight(meta3dState))


            meta3dState = addFBOTexture(meta3dState, changeToStrictlyNull(getFBOTexture, uiState, textureID), fboRect)


            meta3dState = endChild(meta3dState)


            let { handleDragDropTarget } = api.getExtensionService<service>(meta3dState, "meta3d-ui-protocol")

            let d = handleDragDropTarget<dragDropData>(meta3dState, dragDropType)
            meta3dState = d[0]
            let data = d[1]


            meta3dState = endWindow(meta3dState)



            uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")

            uiState = setUIControlState<any>(uiState, uiControlName, {
                rect: fboRect
            })

            meta3dState = api.setExtensionState<uiState>(meta3dState, "meta3d-ui-protocol", uiState)


            return Promise.resolve([meta3dState, data])
        }
    }
}
