import { getContribute as getContributeMeta3D } from "meta3d-type"
import { uiControlName, textureID, state as uiControlState, inputData, outputData } from "meta3d-ui-control-scene-view-protocol"
import { dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap } from "./DependentMapType"
import { texture, service } from "meta3d-ui-protocol/src/service/ServiceType"
import { uiControlContribute } from "meta3d-ui-protocol/src/contribute/UIControlContributeType"
import { state } from "meta3d-ui-protocol/src/state/StateType"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"
import { nullable, strictNullable } from "meta3d-commonlib-ts/src/nullable"
import { rect } from "meta3d-type/src/contribute/UIControlProtocolConfigType"

let _getFBOTexture = (getFBOTexture: (state: state, textureID: string) => nullable<texture>, state: state, textureID: string): strictNullable<texture> => {
    let texture = getFBOTexture(state, textureID)
    if (isNullable(texture)) {
        return null
    }

    return getExn(texture)
}

let _getFBORect = (rect: rect, windowBarHeight: number) => {
    return {
        x: rect.x,
        y: rect.y + windowBarHeight,
        width: rect.width,
        height: rect.height - windowBarHeight
    }
}

export let getContribute: getContributeMeta3D<dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap, uiControlContribute<inputData, outputData>> = (api, [dependentExtensionProtocolNameMap, _]) => {
    let { meta3dUIExtensionProtocolName } = dependentExtensionProtocolNameMap

    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            {
                rect,
                label,
                // textureID
            }
        ) => {
            let { beginWindow, endWindow, setNextWindowRect, getFBOTexture, addFBOTexture,
                getWindowBarHeight,
                setUIControlState } = api.getExtensionService<service>(meta3dState, meta3dUIExtensionProtocolName)
            let state = api.getExtensionState<state>(meta3dState, meta3dUIExtensionProtocolName)



            meta3dState = setNextWindowRect(meta3dState, rect)

            meta3dState = beginWindow(meta3dState, label)

            let fboRect = _getFBORect(rect, getWindowBarHeight(meta3dState))


            meta3dState = addFBOTexture(meta3dState, _getFBOTexture(getFBOTexture, state, textureID), fboRect)





            state = setUIControlState<uiControlState>(state, uiControlName, {
                rect: fboRect
            })

            meta3dState = api.setExtensionState<state>(meta3dState, meta3dUIExtensionProtocolName, state)

            console.log("tttt")



            return new Promise((resolve, reject) => {
                meta3dState = endWindow(meta3dState)

                resolve([meta3dState, null])
            })
        }
    }
}
