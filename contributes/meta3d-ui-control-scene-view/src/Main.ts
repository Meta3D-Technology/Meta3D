import { getContribute as getContributeMeta3D } from "meta3d-type"
import { uiControlName, textureID, state as uiControlState, inputData, outputData, dragDropType, dragDropData } from "meta3d-ui-control-scene-view-protocol"
import { changeToStrictlyNull, getFBORect } from "meta3d-ui-control-view-utils/src/Main"
import { uiControlContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { service as renderService } from "meta3d-editor-sceneview-render-protocol/src/service/ServiceType"
// import { actionName as dropGlbActionName } from "meta3d-action-drop-glb-to-sceneview-protocol"
import { getExn, getWithDefault, isNullable, map } from "meta3d-commonlib-ts/src/NullableUtils"
// import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<uiControlContribute<inputData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            {
                rect,
                label,
            }
        ) => {
            let { ui, getPluggablePackageService } = getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))
            let { beginWindow, endWindow, beginChild, endChild, setNextWindowRect, getFBOTexture, addFBOTexture,
                getWindowBarHeight,
                // setUIControlState,
                handleDragDropTarget
            } = ui(meta3dState)


            meta3dState = setNextWindowRect(meta3dState, rect)

            meta3dState = beginWindow(meta3dState, label)

            meta3dState = beginChild(meta3dState, "Child_SceneView")

            // let fboRect = getFBORect(rect, getWindowBarHeight(meta3dState))
            let fboRect = getFBORect(rect, 0)
            // fboRect = {
            //     x: fboRect.x - 5,
            //     y: fboRect.y - 5,
            //     width: fboRect.width + 10,
            //     height: fboRect.height + 10,
            // }


            meta3dState = addFBOTexture(meta3dState, changeToStrictlyNull(getFBOTexture, meta3dState, textureID), fboRect)


            meta3dState = endChild(meta3dState)


            // let { handleDragDropTarget } = api.getExtensionService<service>(meta3dState, "meta3d-ui-protocol")

            /*! 
            * refer to https://github.com/ocornut/imgui/issues/1771
            */

            let d = handleDragDropTarget<dragDropData>(meta3dState, dragDropType)
            meta3dState = d[0]
            let data = d[1]


            meta3dState = endWindow(meta3dState)



            meta3dState = getWithDefault(
                map((renderService) => {
                    return renderService.setViewRect(meta3dState, fboRect)
                }, getPluggablePackageService<renderService>(meta3dState, "meta3d-editor-sceneview-render-protocol")),
                meta3dState
            )



            // let { trigger } = api.getExtensionService<eventService>(meta3dState, "meta3d-event-protocol")

            // if (!isNullable(data)) {
            //     return trigger(meta3dState, "meta3d-event-protocol", dropGlbActionName, getExn(data)).then(meta3dState => [meta3dState, null])
            // }

            return Promise.resolve([meta3dState, null])
        },
        init: (meta3dState) => Promise.resolve(meta3dState)
    }
}
