import { getContribute as getContributeMeta3D } from "meta3d-type"
import { inputData, outputData } from "meta3d-ui-control-button-protocol"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-ui-control-button-protocol/src/DependentMapType"
import { service } from "meta3d-ui-protocol/src/service/ServiceType"
import { state } from "meta3d-ui-protocol/src/state/StateType"
import { uiControlContribute } from "meta3d-ui-protocol/src/contribute/UIControlContributeType"

export let getContribute: getContributeMeta3D<dependentExtensionNameMap, dependentContributeNameMap, uiControlContribute<inputData, outputData>> = (api, [dependentExtensionNameMap, _]) => {
    let { meta3dUIExtensionName } = dependentExtensionNameMap

    return {
        uiControlName: "Button2",
        func: (meta3dState,
            {
                rect,
                // text
                skin
            }
        ) => {
            // let { getSkin, drawBox, getIOData } = api.getExtensionService<service>(meta3dState, meta3dUIExtensionName)
            let { drawBox, getIOData } = api.getExtensionService<service>(meta3dState, meta3dUIExtensionName)
            let state = api.getExtensionState<state>(meta3dState, meta3dUIExtensionName)

            let { x, y, width, height } = rect

            let {
                pointTap,
                pointPosition,
                // pointMovementDelta
            } = getIOData(state)
            let [pointPositionX, pointPositionY] = pointPosition

            let isClick =
                pointPositionX >= x &&
                    pointPositionX <= x + width &&
                    pointPositionY >= y &&
                    pointPositionY <= y + height
                    ?
                    pointTap ?
                        true : false
                    : false


            // let { normal } = getSkin<skin>(state, skinName).skin.button
            let { normal } = skin
            // let { normal } = getSkin<buttonStyle>(state, meta3dSkinDefaultContributeName).button

            let background_color: any = normal.background_color.slice()
            background_color[1] = 0.5

            meta3dState = drawBox(meta3dState, rect, background_color)
            // meta3dState = drawText(meta3dState, rect, text)


            return [meta3dState, isClick]
        }
    }
}
