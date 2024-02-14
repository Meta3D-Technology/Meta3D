import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { inputFunc, specificData, outputData, uiControlName, state, imageBase64 } from "meta3d-ui-control-list-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { data } from "meta3d-input-list-protocol"
// import remove from "url-loader!./image/remove.png"
import { loadImage } from "meta3d-ui-control-utils/src/SpecificDataUtils"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

let _loadImage = (
    meta3dState: meta3dState,
    api: api,
    label: string,
    image: nullable<imageBase64>,
): Promise<meta3dState> => {
    return loadImage(meta3dState, api, [(meta3dState) => {
        let state = api.nullable.getExn(api.uiControl.getUIControlState<state>(meta3dState, label))

        return state.lastRemoveTextureImageBase64
    }, (meta3dState, texture, image) => {
        let state = api.nullable.getExn(api.uiControl.getUIControlState<state>(meta3dState, label))

        return {
            ...state,
            removeTexture: texture,
            lastRemoveTextureImageBase64: image
        }
    }], label, image)
}

export let getContribute: getContributeMeta3D<uiControlContribute<inputFunc, specificData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            getInputFunc,
            rect,
            {
                label,
                isRemoveable,
                itemWidth,
                itemHeight,
                removeImage
            }
        ) => {
            let inputPromise: Promise<data>
            if (api.nullable.isNullable(getInputFunc)) {
                inputPromise = Promise.resolve([])
            }
            else {
                inputPromise = api.nullable.getExn(getInputFunc)(meta3dState)
            }

            return inputPromise.then(items => {
                if (api.nullable.isNullable(api.uiControl.getUIControlState<state>(meta3dState, label))) {
                    meta3dState = api.uiControl.setUIControlState<state>(meta3dState, label, {
                        removeTexture: null,
                        lastRemoveTextureImageBase64: null,
                    })
                }

                return _loadImage(
                    meta3dState,
                    api,
                    label,
                    removeImage,
                ).then(meta3dState => {
                    let { list } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

                    let { removeTexture } = api.nullable.getExn(api.uiControl.getUIControlState<state>(meta3dState, label))

                    let data = list(meta3dState, label, [rect.width, rect.height], items, [itemWidth, itemHeight], isRemoveable, removeTexture)
                    meta3dState = data[0]

                    return [meta3dState, data[1]]
                })
            })
        },
        init: (meta3dState) => {
            return Promise.resolve(meta3dState)
        }
    }
}
