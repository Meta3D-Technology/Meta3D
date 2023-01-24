import { getContribute as getContributeMeta3D } from "meta3d-type"
import { uiControlName, textureID, state as uiControlState, inputData, outputData } from "meta3d-ui-control-scene-view-protocol"
import { dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap } from "meta3d-ui-control-scene-view-protocol/src/DependentMapType"
import { texture, service } from "meta3d-ui-protocol/src/service/ServiceType"
import { uiControlContribute } from "meta3d-ui-protocol/src/contribute/UIControlContributeType"
import { state } from "meta3d-ui-protocol/src/state/StateType"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"
import { nullable, strictNullable } from "meta3d-commonlib-ts/src/nullable"

let _getFBOTexture = (getFBOTexture: (state: state, textureID: string) => nullable<texture>, state: state, textureID: string): strictNullable<texture> => {
    let texture = getFBOTexture(state, textureID)
    if (isNullable(texture)) {
        return null
    }

    return getExn(texture)
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
            let { beginWindow, endWindow, setNextWindowRect, getFBOTexture, addFBOTexture, setUIControlState } = api.getExtensionService<service>(meta3dState, meta3dUIExtensionProtocolName)
            let state = api.getExtensionState<state>(meta3dState, meta3dUIExtensionProtocolName)



            meta3dState = setNextWindowRect(meta3dState, rect)

            meta3dState = beginWindow(meta3dState, label)


            // meta3dState = addFBOTexture(meta3dState, _getFBOTexture(getFBOTexture, state, textureID), [rect.width, rect.height])
            meta3dState = addFBOTexture(meta3dState, _getFBOTexture(getFBOTexture, state, textureID), rect)
            // meta3dState = addFBOTexture(meta3dState, _getFBOTexture(getFBOTexture, state, textureID), {
            //     x: 0,
            //     y: 0,
            //     // TODO fix: consider bar height?
            //     width: rect.width,
            //     height: rect.height
            // })






            // TODO fix: add bar height?
            state = setUIControlState<uiControlState>(state, uiControlName, {
                rect: rect
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
