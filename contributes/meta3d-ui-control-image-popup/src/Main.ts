import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { uiControlName, state, inputFunc, specificData, outputData, imageBase64 } from "meta3d-ui-control-image-popup-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { data } from "meta3d-input-popup-protocol"
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
            getInputFunc,
            rect,
            {
                label,
                image,
                id
            }
        ) => {
            let inputPromise: Promise<data>
            if (api.nullable.isNullable(getInputFunc)) {
                inputPromise = Promise.resolve([])
            }
            else {
                inputPromise = api.nullable.getExn(getInputFunc)(meta3dState)
            }

            return inputPromise.then(selectedValues => {
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
                    let { imagePopup } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

                    let { clickTexture } = api.nullable.getExn(api.uiControl.getUIControlState<state>(meta3dState, label))


                    if (!api.nullable.isNullable(clickTexture)) {
                        let data = imagePopup(meta3dState, clickTexture, rect, selectedValues, id)
                        meta3dState = data[0]
                        let selectedIndex = data[1]

                        return Promise.resolve([meta3dState, selectedIndex])
                    }

                    return Promise.resolve([meta3dState, api.nullable.getEmpty()])
                })
            })
        },
        init: (meta3dState) => Promise.resolve(meta3dState)
    }
}
