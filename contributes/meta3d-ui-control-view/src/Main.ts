import { getContribute as getContributeMeta3D } from "meta3d-type"
import { textureID, inputData, outputData } from "meta3d-ui-control-view-protocol"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-ui-control-view-protocol/src/DependentMapType"
import { texture, service } from "meta3d-ui-protocol/src/service/ServiceType"
import { uiControlContribute } from "meta3d-ui-protocol/src/contribute/UIControlContributeType"
import { state } from "meta3d-ui-protocol/src/state/StateType"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"
import { nullable, strictNullable } from "meta3d-commonlib-ts/src/nullable"

let _getFBOTexture = (getFBOTexture: (state: state, textureID: textureID) => nullable<texture>, state: state, textureID: textureID): strictNullable<texture> => {
    let texture = getFBOTexture(state, textureID)
    if (isNullable(texture)) {
        return null
    }

    return getExn(texture)
}

export let getContribute: getContributeMeta3D<dependentExtensionNameMap, dependentContributeNameMap, uiControlContribute<inputData, outputData>> = (api, [dependentExtensionNameMap, _]) => {
    let { meta3dUIExtensionName } = dependentExtensionNameMap

    return {
        uiControlName: "View",
        func: (meta3dState,
            {
                rect,
                label,
                textureID
            }
        ) => {
            let { beginWindow, endWindow, setNextWindowRect, getFBOTexture, addFBOTexture } = api.getExtensionService<service>(meta3dState, meta3dUIExtensionName)
            let state = api.getExtensionState<state>(meta3dState, meta3dUIExtensionName)

            meta3dState = setNextWindowRect(meta3dState, rect)

            meta3dState = beginWindow(meta3dState, label)


            meta3dState = addFBOTexture(meta3dState, _getFBOTexture(getFBOTexture, state, textureID), [rect.width, rect.height])


            return new Promise((resolve, reject) => {
                meta3dState = endWindow(meta3dState)

                resolve([meta3dState, null])
            })
        }
    }
}
