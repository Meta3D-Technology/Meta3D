// import { state as meta3dState, api } from "meta3d-type"
import { texture, service } from "meta3d-ui-protocol/src/service/ServiceType"
import { state } from "meta3d-ui-protocol/src/state/StateType"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"
import { nullable, strictNullable } from "meta3d-commonlib-ts/src/nullable"
import { rect } from "meta3d-type/src/contribute/UIControlProtocolConfigType"

export let changeToStrictlyNull = (getFBOTexture: (state: state, textureID: string) => nullable<texture>, state: state, textureID: string): strictNullable<texture> => {
    let texture = getFBOTexture(state, textureID)
    if (isNullable(texture)) {
        return null
    }

    return getExn(texture)
}

export let getFBORect = (rect: rect, windowBarHeight: number) => {
    return {
        x: rect.x,
        y: rect.y + windowBarHeight,
        width: rect.width,
        height: rect.height - windowBarHeight
    }
}

// export let func = (meta3dState: meta3dState,
//     api: api,
//     {
//         rect,
//         label,
//     }: any,
//     [uiControlName, textureID]: any
// ): Promise<[meta3dState, null]> => {
//     let { beginWindow, endWindow, setNextWindowRect, getFBOTexture, addFBOTexture,
//         getWindowBarHeight,
//         setUIControlState } = api.getExtensionService<service>(meta3dState, "meta3d-ui-protocol")
//     let state = api.getExtensionState<state>(meta3dState, "meta3d-ui-protocol")



//     meta3dState = setNextWindowRect(meta3dState, rect)

//     meta3dState = beginWindow(meta3dState, label)

//     let fboRect = _getFBORect(rect, getWindowBarHeight(meta3dState))


//     meta3dState = addFBOTexture(meta3dState, _getFBOTexture(getFBOTexture, state, textureID), fboRect)




//     state = api.getExtensionState<state>(meta3dState, "meta3d-ui-protocol")

//     state = setUIControlState<any>(state, uiControlName, {
//         rect: fboRect
//     })

//     meta3dState = api.setExtensionState<state>(meta3dState, "meta3d-ui-protocol", state)



//     return new Promise((resolve, reject) => {
//         meta3dState = endWindow(meta3dState)


//         resolve([meta3dState, null])
//     })

// }
