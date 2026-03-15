import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { uiControlName, state, inputFunc, specificData, outputData, imageBase64 } from "meta3d-ui-control-grid-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { data } from "meta3d-input-grid-protocol"
import { reducePromise } from "meta3d-structure-utils/src/ArrayUtils"

let _loadImages = (
    meta3dState: meta3dState,
    api: api,
    label: string,
    itemsWithImageBase64: data
): Promise<meta3dState> => {
    let { loadImage } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

    let state = api.nullable.getExn(api.uiControl.getUIControlState<state>(meta3dState, label))


    let promise = null
    if (state.gridTextures.length == 0 || state.gridTextures.length != itemsWithImageBase64.length) {
        meta3dState = api.uiControl.setUIControlState<state>(meta3dState, label, {
            gridTextures: [],
        })

        promise = reducePromise(itemsWithImageBase64, (meta3dState, itemWithImageBase64) => {
            return loadImage(meta3dState, itemWithImageBase64.imageBase64).then((texture: any) => {
                let state = api.nullable.getExn(api.uiControl.getUIControlState<state>(meta3dState, label))

                meta3dState = api.uiControl.setUIControlState<state>(meta3dState, label, {
                    ...state,
                    gridTextures: [...state.gridTextures, {
                        texture,
                        name: itemWithImageBase64.name,
                    }],
                })

                return meta3dState
            })
        }, meta3dState)
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
                columnCount,
                cellWidth,
                totalHeight,
            }
        ) => {
            let inputPromise: Promise<data>
            if (api.nullable.isNullable(getInputFunc)) {
                inputPromise = Promise.resolve([])
            }
            else {
                inputPromise = api.nullable.getExn(getInputFunc)(meta3dState, [])
            }

            return inputPromise.then(itemsWithImageBase64 => {
                if (api.nullable.isNullable(api.uiControl.getUIControlState<state>(meta3dState, label))) {
                    meta3dState = api.uiControl.setUIControlState<state>(meta3dState, label, {
                        gridTextures: [],
                    })
                }

                return _loadImages(
                    meta3dState,
                    api,
                    label,
                    itemsWithImageBase64,
                ).then(meta3dState => {
                    let { grid } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

                    let { gridTextures } = api.nullable.getExn(api.uiControl.getUIControlState<state>(meta3dState, label))


                    if (gridTextures.length > 0) {
                        let data = grid(meta3dState, label, gridTextures, columnCount, cellWidth, totalHeight)
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
