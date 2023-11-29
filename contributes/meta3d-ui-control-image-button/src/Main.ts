import { api, getContribute as getContributeMeta3D } from "meta3d-type"
import { state as meta3dState } from "meta3d-type"
import { inputFunc, specificData, outputData, uiControlName, state, imageBase64 } from "meta3d-ui-control-image-button-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

let _loadImage = (
    meta3dState: meta3dState,
    api: api,
    label: string,
    image: nullable<imageBase64>,
): Promise<meta3dState> => {
    let { loadImage } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

    let state = api.nullable.getExn(api.uiControl.getUIControlState<state>(meta3dState, label))


    let promise = null
    if (!api.nullable.isNullable(image) && api.nullable.getWithDefault(api.nullable.map(lastClickTextureImageBase64 => lastClickTextureImageBase64 != api.nullable.getExn(image), state.lastClickTextureImageBase64), true)) {
        promise = loadImage(meta3dState, api.nullable.getExn(image)).then((clickTexture: any) => {
            meta3dState = api.uiControl.setUIControlState<state>(meta3dState, label, {
                ...state,
                clickTexture,
                lastClickTextureImageBase64: api.nullable.getExn(image)
            })

            return meta3dState
        })
    }
    else {
        promise = Promise.resolve(meta3dState)
    }

    return promise
}

export let getContribute: getContributeMeta3D<uiControlContribute<inputFunc, specificData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            _,
            rect,
            {
                label,
                image,
            }
        ) => {
            if (api.nullable.isNullable(api.uiControl.getUIControlState<state>(meta3dState, label))) {
                meta3dState = api.uiControl.setUIControlState<state>(meta3dState, label, {
                    clickTexture: null,
                    lastClickTextureImageBase64: null,
                })
            }

            return _loadImage(
                meta3dState,
                api,
                label,
                image,
            ).then(meta3dState => {
                let { imageButton, setCursorPos } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

                meta3dState = setCursorPos(meta3dState, [rect.x, rect.y])

                let { clickTexture } = api.nullable.getExn(api.uiControl.getUIControlState<state>(meta3dState, label))

                if (!api.nullable.isNullable(clickTexture)) {
                    return imageButton(meta3dState, api.nullable.getExn(clickTexture), [rect.width, rect.height])
                }

                return Promise.resolve([meta3dState, false])
            })

        },
        init: (meta3dState) => {
            return Promise.resolve(meta3dState)
        }
    }
}
