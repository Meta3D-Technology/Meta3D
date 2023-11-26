import { api, getContribute as getContributeMeta3D } from "meta3d-type"
import { inputFunc, specificData, outputData, uiControlName, imageBase64, state } from "meta3d-ui-control-asset-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { state as meta3dState } from "meta3d-type"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

// TODO refactor: duplicate
let _loadImage = (
    meta3dState: meta3dState,
    api: api,
    label: string,
    image: nullable<imageBase64>,
): Promise<meta3dState> => {
    let { loadImage } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

    let state = api.nullable.getExn(api.uiControl.getUIControlState<state>(meta3dState, label))


    let promise = null
    if (!api.nullable.isNullable(image) && api.nullable.getWithDefault(api.nullable.map(lastFileTextureImageBase64 => lastFileTextureImageBase64 != api.nullable.getExn(image), state.lastFileTextureImageBase64), true)) {
        promise = loadImage(meta3dState, api.nullable.getExn(image)).then((fileTexture: any) => {
            meta3dState = api.uiControl.setUIControlState<state>(meta3dState, label, {
                ...state,
                fileTexture,
                lastFileTextureImageBase64: api.nullable.getExn(image)
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
            {
                rect,
                label,
                image
            }
        ) => {
            if (api.nullable.isNullable(getInputFunc)) {
                return Promise.resolve([meta3dState, null])
            }

            return api.nullable.getExn(getInputFunc)(meta3dState).then((allAssetFiles) => {
                if (api.nullable.isNullable(api.uiControl.getUIControlState<state>(meta3dState, label))) {
                    meta3dState = api.uiControl.setUIControlState<state>(meta3dState, label, {
                        fileTexture: null,
                        lastFileTextureImageBase64: null,
                    })
                }

                return _loadImage(
                    meta3dState,
                    api,
                    label,
                    image,
                ).then(meta3dState => {
                    let { fileTexture } = api.nullable.getExn(api.uiControl.getUIControlState<state>(meta3dState, label))
                    let { asset } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

                    if (!api.nullable.isNullable(fileTexture)) {
                        return asset(meta3dState, api.nullable.getExn(fileTexture), allAssetFiles, label, rect)
                    }

                    return [meta3dState, null]
                })
            })
        },
        init: (meta3dState) => {
            return Promise.resolve(meta3dState)
        }
    }
}
