import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { state as meta3dState, api } from "meta3d-type"
import { service } from "meta3d-editor-whole-protocol/src/service/ServiceType"

type imageBase64 = string

export let loadImage = (
    meta3dState: meta3dState,
    api: api,
    [getLastImageFunc, setImageDataFunc]: [(meta3dState: meta3dState) => nullable<imageBase64>, (meta3dState: meta3dState, texture: any, image: imageBase64) => any],
    label: string,
    image: nullable<imageBase64>,
): Promise<meta3dState> => {
    let { loadImage } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

    let promise = null
    if (!api.nullable.isNullable(image) && api.nullable.getWithDefault(api.nullable.map(lastFileTextureImageBase64 => lastFileTextureImageBase64 != api.nullable.getExn(image), getLastImageFunc(meta3dState)), true)) {
        promise = loadImage(meta3dState, api.nullable.getExn(image)).then((texture: any) => {
            meta3dState = api.uiControl.setUIControlState(meta3dState, label,
                setImageDataFunc(
                    meta3dState,
                    texture,
                    api.nullable.getExn(image)
                ))

            return meta3dState
        })
    }
    else {
        promise = Promise.resolve(meta3dState)
    }

    return promise
}