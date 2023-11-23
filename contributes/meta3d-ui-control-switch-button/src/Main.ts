import { api, getContribute as getContributeMeta3D } from "meta3d-type"
import { state as meta3dState } from "meta3d-type"
import { inputFunc, specificData, outputData, uiControlName, state, imageBase64 } from "meta3d-ui-control-switch-button-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

let _loadImage = (
    meta3dState: meta3dState,
    api: api,
    label: string,
    image1: nullable<imageBase64>,
    image2: nullable<imageBase64>
): Promise<meta3dState> => {
    let { loadImage } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

    let state = api.nullable.getExn(api.uiControl.getUIControlState<state>(meta3dState, label))


    let promise = null
    if (!api.nullable.isNullable(image1) && api.nullable.getWithDefault(api.nullable.map(lastEvent1TextureImageBase64 => lastEvent1TextureImageBase64 != api.nullable.getExn(image1), state.lastEvent1TextureImageBase64), true)) {
        promise = loadImage(meta3dState, api.nullable.getExn(image1)).then((event1Texture: any) => {
            meta3dState = api.uiControl.setUIControlState<state>(meta3dState, label, {
                ...state,
                event1Texture,
                lastEvent1TextureImageBase64: api.nullable.getExn(image1)
            })

            return meta3dState
        })
    }
    else {
        promise = Promise.resolve(meta3dState)
    }

    if (!api.nullable.isNullable(image2) && api.nullable.getWithDefault(api.nullable.map(lastEvent2TextureImageBase64 => lastEvent2TextureImageBase64 != api.nullable.getExn(image2), state.lastEvent2TextureImageBase64), true)) {
        return promise.then(meta3dState => {
            return loadImage(meta3dState, api.nullable.getExn(image2)).then((event2Texture: any) => {
                meta3dState = api.uiControl.setUIControlState<state>(meta3dState, label, {
                    ...state,
                    event2Texture,
                    lastEvent2TextureImageBase64: api.nullable.getExn(image2)
                })

                return meta3dState
            })
        })
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
                image1,
                image2
            }
        ) => {
            if (api.nullable.isNullable(getInputFunc)) {
                return Promise.resolve([meta3dState, [false, false]])
            }

            return api.nullable.getExn(getInputFunc)(meta3dState).then(isEvent1 => {
                if (api.nullable.isNullable(api.uiControl.getUIControlState<state>(meta3dState, label))) {
                    meta3dState = api.uiControl.setUIControlState<state>(meta3dState, label, {
                        event1Texture: null,
                        event2Texture: null,
                        lastEvent1TextureImageBase64: null,
                        lastEvent2TextureImageBase64: null,
                    })
                }

                return _loadImage(
                    meta3dState,
                    api,
                    label,
                    image1,
                    image2,
                ).then(meta3dState => {
                    let { switchButton, setCursorPos } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

                    meta3dState = setCursorPos(meta3dState, [rect.x, rect.y])

                    let { event1Texture,
                        event2Texture,
                    } = api.nullable.getExn(api.uiControl.getUIControlState<state>(meta3dState, label))

                    if (!api.nullable.isNullable(event1Texture) && !api.nullable.isNullable(event2Texture)) {
                        return switchButton(meta3dState,
                            isEvent1,
                            {
                                event1Texture: api.nullable.getExn(event1Texture),
                                event2Texture: api.nullable.getExn(event2Texture),
                            }, [rect.width, rect.height])
                    }

                    return Promise.resolve([meta3dState, [false, false]])
                })
            })
        },
        init: (meta3dState) => {
            return Promise.resolve(meta3dState)
        }
    }
}
