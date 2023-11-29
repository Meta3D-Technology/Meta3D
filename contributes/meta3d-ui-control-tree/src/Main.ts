import { api, getContribute as getContributeMeta3D, state as meta3dState } from "meta3d-type"
import { inputFunc, specificData, outputData, uiControlName, imageBase64, state } from "meta3d-ui-control-tree-protocol"
import { service, uiControlContribute } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { imguiImplTexture, treeData } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { loadImage } from "meta3d-ui-control-utils/src/SpecificDataUtils"
import { data, nodeType, nodeLabel } from "meta3d-input-tree-protocol"

let _loadImage = (
    meta3dState: meta3dState,
    api: api,
    label: string,
    nodeType1Image: nullable<imageBase64>,
    nodeType2Image: nullable<imageBase64>,
    nodeType3Image: nullable<imageBase64>,
): Promise<meta3dState> => {
    return loadImage(meta3dState, api, [(meta3dState) => {
        let state = api.nullable.getExn(api.uiControl.getUIControlState<state>(meta3dState, label))

        return state.lastNodeType1TextureImageBase64
    }, (meta3dState, texture, image) => {
        let state = api.nullable.getExn(api.uiControl.getUIControlState<state>(meta3dState, label))

        return {
            ...state,
            nodeType1Texture: texture,
            lastNodeType1TextureImageBase64: image
        }
    }], label, nodeType1Image).then(meta3dState => {
        return loadImage(meta3dState, api, [(meta3dState) => {
            let state = api.nullable.getExn(api.uiControl.getUIControlState<state>(meta3dState, label))

            return state.lastNodeType2TextureImageBase64
        }, (meta3dState, texture, image) => {
            let state = api.nullable.getExn(api.uiControl.getUIControlState<state>(meta3dState, label))

            return {
                ...state,
                nodeType2Texture: texture,
                lastNodeType2TextureImageBase64: image
            }
        }], label, nodeType2Image)
    }).then(meta3dState => {
        return loadImage(meta3dState, api, [(meta3dState) => {
            let state = api.nullable.getExn(api.uiControl.getUIControlState<state>(meta3dState, label))

            return state.lastNodeType3TextureImageBase64
        }, (meta3dState, texture, image) => {
            let state = api.nullable.getExn(api.uiControl.getUIControlState<state>(meta3dState, label))

            return {
                ...state,
                nodeType3Texture: texture,
                lastNodeType3TextureImageBase64: image
            }
        }], label, nodeType3Image)
    })
}

export let _convertTreeData = (
    api: api,
    treeData: data,
    nodeType1Texture: nullable<imguiImplTexture>,
    nodeType2Texture: nullable<imguiImplTexture>,
    nodeType3Texture: nullable<imguiImplTexture>,
): nullable<treeData> => {
    let _func = (result: nullable<treeData>, treeData: data): nullable<treeData> => {
        if (api.nullable.isNullable(result)) {
            return api.nullable.getEmpty<treeData>()
        }

        // if (treeData.length == 0) {
        //     return api.nullable.return([])
        // }

        return treeData.reduce((result: nullable<treeData>, [nodeLabel, nodeType_, data]: [nodeLabel, nodeType, treeData]) => {
            return api.nullable.bind(result => {
                let texture: nullable<imguiImplTexture> = api.nullable.getEmpty()

                switch (nodeType_) {
                    case nodeType.Type1:
                        texture = nodeType1Texture
                        break
                    case nodeType.Type2:
                        texture = nodeType2Texture
                        break
                    case nodeType.Type3:
                        texture = nodeType3Texture
                        break
                    default:
                        throw new Error("error")
                }

                return api.nullable.bind(texture => {
                    // let childrenResult = _func(api.nullable.return(result), data)

                    // if (api.nullable.isNullable(childrenResult)) {
                    //     return api.nullable.getEmpty<treeData>()
                    // }

                    // childrenResult = api.nullable.getExn(childrenResult)

                    // if (childrenResult.length != 0) {
                    //     result.push([nodeLabel, texture, api.nullable.getExn(childrenResult)])
                    // }
                    // else {
                    //     result.push([nodeLabel, texture, []])
                    // }

                    // return api.nullable.return(result)


                    if (data.length != 0) {
                        return api.nullable.bind(childResult => {
                            result.push([nodeLabel, texture, childResult])

                            return result
                            // }, _func(api.nullable.return(result), data))
                        }, _func(api.nullable.return([]), data))
                    }

                    result.push([nodeLabel, texture, []])

                    return api.nullable.return(result)
                }, texture)
            }, result)
        }, result)
    }

    return _func(api.nullable.return([]), treeData)
}

export let getContribute: getContributeMeta3D<uiControlContribute<inputFunc, specificData, outputData>> = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState,
            getInputFunc,
            rect,
            {
                label,
                rootNodeLabel,
                nodeType1Image,
                nodeType2Image,
                nodeType3Image,
            }
        ) => {
            if (api.nullable.isNullable(getInputFunc)) {
                return Promise.resolve([meta3dState, [null, null]])
            }

            return api.nullable.getExn(getInputFunc)(meta3dState).then((treeData) => {
                if (api.nullable.isNullable(api.uiControl.getUIControlState<state>(meta3dState, label))) {
                    meta3dState = api.uiControl.setUIControlState<state>(meta3dState, label, {
                        lastTreeSelectedData: null,
                        nodeType1Texture: null,
                        nodeType2Texture: null,
                        nodeType3Texture: null,
                        lastNodeType1TextureImageBase64: null,
                        lastNodeType2TextureImageBase64: null,
                        lastNodeType3TextureImageBase64: null,
                    })
                }

                return _loadImage(
                    meta3dState,
                    api,
                    label,
                    nodeType1Image,
                    nodeType2Image,
                    nodeType3Image,
                ).then(meta3dState => {
                    let state = api.nullable.getExn(api.uiControl.getUIControlState<state>(meta3dState, label))
                    let {
                        lastTreeSelectedData,
                        nodeType1Texture,
                        nodeType2Texture,
                        nodeType3Texture,
                    } = state
                    let { tree } = api.nullable.getExn(api.getPackageService<service>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

                    return api.nullable.getWithDefault(
                        api.nullable.map(treeData => {
                            let data = tree(meta3dState, treeData,
                                rootNodeLabel,
                                lastTreeSelectedData,
                                "Tree Window", rect)
                            meta3dState = data[0]
                            let [treeSelectedData, treeDragData] = data[1]

                            meta3dState = api.uiControl.setUIControlState(meta3dState, label, {
                                ...state,
                                lastTreeSelectedData: api.nullable.isNullable(treeSelectedData) ? lastTreeSelectedData : treeSelectedData
                            })

                            return [meta3dState, [treeSelectedData, treeDragData]]
                        }, _convertTreeData(
                            api,
                            treeData,
                            nodeType1Texture,
                            nodeType2Texture,
                            nodeType3Texture,
                        )), [meta3dState, [null, null]]
                    )

                })
            })
        },
        init: (meta3dState) => {
            return Promise.resolve(meta3dState)
        }
    }
}
