import { api, getContribute as getContributeMeta3D } from "meta3d-type"
import { state as meta3dState } from "meta3d-type"
import { inputFunc, specificData, outputData, uiControlName, state, imageBase64 } from "meta3d-ui-control-switch-button-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { loadImage } from "meta3d-ui-control-utils/src/SpecificDataUtils"

let _loadImage = (
    meta3dState: meta3dState,
    api: api,
    label: string,
    image1: nullable<imageBase64>,
    image2: nullable<imageBase64>
): Promise<meta3dState> => {
    return loadImage(meta3dState, api, [(meta3dState) => {
        let state = api.nullable.getExn(api.uiControl.getUIControlState<state>(meta3dState, label))

        return state.lastClick1TextureImageBase64
    }, (meta3dState, texture, image) => {
        let state = api.nullable.getExn(api.uiControl.getUIControlState<state>(meta3dState, label))

        return {
            ...state,
            click1Texture: texture,
            lastClick1TextureImageBase64: image
        }
    }], label, image1).then(meta3dState => {
        return loadImage(meta3dState, api, [(meta3dState) => {
            let state = api.nullable.getExn(api.uiControl.getUIControlState<state>(meta3dState, label))

            return state.lastClick2TextureImageBase64
        }, (meta3dState, texture, image) => {
            let state = api.nullable.getExn(api.uiControl.getUIControlState<state>(meta3dState, label))

            return {
                ...state,
                click2Texture: texture,
                lastClick2TextureImageBase64: image
            }
        }], label, image2)
    })

    // let { loadImage } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

    // let state = api.nullable.getExn(api.uiControl.getUIControlState<state>(meta3dState, label))


    // let promise = null
    // if (!api.nullable.isNullable(image1) && api.nullable.getWithDefault(api.nullable.map(lastClick1TextureImageBase64 => lastClick1TextureImageBase64 != api.nullable.getExn(image1), state.lastClick1TextureImageBase64), true)) {
    //     promise = loadImage(meta3dState, api.nullable.getExn(image1)).then((click1Texture: any) => {
    //         meta3dState = api.uiControl.setUIControlState<state>(meta3dState, label, {
    //             ...state,
    //             click1Texture,
    //             lastClick1TextureImageBase64: api.nullable.getExn(image1)
    //         })

    //         return meta3dState
    //     })
    // }
    // else {
    //     promise = Promise.resolve(meta3dState)
    // }

    // if (!api.nullable.isNullable(image2) && api.nullable.getWithDefault(api.nullable.map(lastClick2TextureImageBase64 => lastClick2TextureImageBase64 != api.nullable.getExn(image2), state.lastClick2TextureImageBase64), true)) {
    //     return promise.then(meta3dState => {
    //         return loadImage(meta3dState, api.nullable.getExn(image2)).then((click2Texture: any) => {
    //             meta3dState = api.uiControl.setUIControlState<state>(meta3dState, label, {
    //                 ...state,
    //                 click2Texture,
    //                 lastClick2TextureImageBase64: api.nullable.getExn(image2)
    //             })

    //             return meta3dState
    //         })
    //     })
    // }

    // return promise
}

export let getContribute: getContributeMeta3D<uiControlContribute<inputFunc, specificData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            getInputFunc,
            rect,
            {
                label,
                image1,
                image2
            }
        ) => {
            if (api.nullable.isNullable(getInputFunc)) {
                return Promise.resolve([meta3dState, [false, false]])
            }

            return api.nullable.getExn(getInputFunc)(meta3dState).then(isClick1 => {
                if (api.nullable.isNullable(api.uiControl.getUIControlState<state>(meta3dState, label))) {
                    meta3dState = api.uiControl.setUIControlState<state>(meta3dState, label, {
                        click1Texture: null,
                        click2Texture: null,
                        lastClick1TextureImageBase64: null,
                        lastClick2TextureImageBase64: null,
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

                    let { click1Texture,
                        click2Texture,
                    } = api.nullable.getExn(api.uiControl.getUIControlState<state>(meta3dState, label))

                    if (!api.nullable.isNullable(click1Texture) && !api.nullable.isNullable(click2Texture)) {
                        return switchButton(meta3dState,
                            isClick1,
                            {
                                click1Texture: api.nullable.getExn(click1Texture),
                                click2Texture: api.nullable.getExn(click2Texture),
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
