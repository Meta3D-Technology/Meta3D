import { getContribute as getContributeMeta3D } from "meta3d-type"
import { inputData, outputData, customControlName } from "meta3d-custom-control-button-protocol"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-custom-control-button-protocol/src/DependentMapType"
import { service } from "meta3d-ui-protocol/src/service/ServiceType"
import { state } from "meta3d-ui-protocol/src/state/StateType"
import { skinName, buttonStyle } from "meta3d-skin-default-protocol"
import { customControlContribute } from "meta3d-ui-protocol/src/contribute/CustomControlContributeType"

export let getContribute: getContributeMeta3D<dependentExtensionNameMap, dependentContributeNameMap, customControlContribute<inputData, outputData>> = (_api, _) => {
    return {
        customControlName: customControlName,
        func: (meta3dState, [api, uiExtensionName],
            {
                rect,
                text
            }
        ) => {
            let { getSkin, drawBox, drawText, getIOData } = api.getExtensionService<service>(meta3dState, uiExtensionName)
            let state = api.getExtensionState<state>(meta3dState, uiExtensionName)

            let { x, y, width, height } = rect

            let { pointPosition, isPointDown } = getIOData(state)
            let [pointPositionX, pointPositionY] = pointPosition

            let isClick =
                isPointDown &&
                    pointPositionX >= x &&
                    pointPositionX <= x + width &&
                    pointPositionY >= y &&
                    pointPositionY <= y + height
                    ? true : false



            let { normal } = getSkin<buttonStyle>(state, skinName).button
            // let { normal } = getSkin<buttonStyle>(state, meta3dSkinDefaultContributeName).button

            meta3dState = drawBox(meta3dState, [api, uiExtensionName], rect, normal.background_color)
            meta3dState = drawText(meta3dState, [api, uiExtensionName], rect, text)


            return [meta3dState, isClick]
        }
    }
}
