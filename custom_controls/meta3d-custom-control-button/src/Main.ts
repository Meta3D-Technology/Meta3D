import { getCustomControlContribute as getCustomControlContributeMeta3D } from "meta3d-ui-protocol/src/contribute_points/CustomControlContributeType"
import { inputData, outputData, customControlName } from "meta3d-custom-control-button-protocol"
import { service } from "meta3d-ui-protocol/src/service/ServiceType"
import { state } from "meta3d-ui-protocol/src/state/StateType"
import { buttonStyle } from "meta3d-skin-protocol"

export let getCustomControlContribute: getCustomControlContributeMeta3D<inputData, outputData> = (skinName) => {
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

            meta3dState = drawBox(meta3dState, [api, uiExtensionName], rect, normal.background_color)
            meta3dState = drawText(meta3dState, [api, uiExtensionName], rect, text)


            return [meta3dState, isClick]
        }
    }
}
