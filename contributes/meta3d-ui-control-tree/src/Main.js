import { uiControlName } from "meta3d-ui-control-tree-protocol";
import { loadImage } from "meta3d-ui-control-utils/src/SpecificDataUtils";
import { nodeType } from "meta3d-input-tree-protocol";
let _loadImage = (meta3dState, api, label, nodeType1Image, nodeType2Image, nodeType3Image) => {
    return loadImage(meta3dState, api, [(meta3dState) => {
            let state = api.nullable.getExn(api.uiControl.getUIControlState(meta3dState, label));
            return state.lastNodeType1TextureImageBase64;
        }, (meta3dState, texture, image) => {
            let state = api.nullable.getExn(api.uiControl.getUIControlState(meta3dState, label));
            return Object.assign(Object.assign({}, state), { nodeType1Texture: texture, lastNodeType1TextureImageBase64: image });
        }], label, nodeType1Image).then(meta3dState => {
        return loadImage(meta3dState, api, [(meta3dState) => {
                let state = api.nullable.getExn(api.uiControl.getUIControlState(meta3dState, label));
                return state.lastNodeType2TextureImageBase64;
            }, (meta3dState, texture, image) => {
                let state = api.nullable.getExn(api.uiControl.getUIControlState(meta3dState, label));
                return Object.assign(Object.assign({}, state), { nodeType2Texture: texture, lastNodeType2TextureImageBase64: image });
            }], label, nodeType2Image);
    }).then(meta3dState => {
        return loadImage(meta3dState, api, [(meta3dState) => {
                let state = api.nullable.getExn(api.uiControl.getUIControlState(meta3dState, label));
                return state.lastNodeType3TextureImageBase64;
            }, (meta3dState, texture, image) => {
                let state = api.nullable.getExn(api.uiControl.getUIControlState(meta3dState, label));
                return Object.assign(Object.assign({}, state), { nodeType3Texture: texture, lastNodeType3TextureImageBase64: image });
            }], label, nodeType3Image);
    });
};
export let _convertTreeData = (api, treeData, nodeType1Texture, nodeType2Texture, nodeType3Texture) => {
    let _func = (result, treeData) => {
        if (api.nullable.isNullable(result)) {
            return api.nullable.getEmpty();
        }
        // if (treeData.length == 0) {
        //     return api.nullable.return([])
        // }
        return treeData.reduce((result, [nodeLabel, nodeType_, data]) => {
            return api.nullable.bind(result => {
                let texture = api.nullable.getEmpty();
                switch (nodeType_) {
                    case nodeType.Type1:
                        texture = nodeType1Texture;
                        break;
                    case nodeType.Type2:
                        texture = nodeType2Texture;
                        break;
                    case nodeType.Type3:
                        texture = nodeType3Texture;
                        break;
                    default:
                        throw new Error("error");
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
                            result.push([nodeLabel, texture, childResult]);
                            return result;
                            // }, _func(api.nullable.return(result), data))
                        }, _func(api.nullable.return([]), data));
                    }
                    result.push([nodeLabel, texture, []]);
                    return api.nullable.return(result);
                }, texture);
            }, result);
        }, result);
    };
    return _func(api.nullable.return([]), treeData);
};
let _generateUniqueId = () => {
    return Math.floor(Math.random() * 1000000.0).toString();
};
export let getContribute = (api) => {
    return {
        uiControlName: uiControlName,
        func: (meta3dState, getInputFunc, rect, { label, rootNodeLabel, nodeType1Image, nodeType2Image, nodeType3Image, }) => {
            if (api.nullable.isNullable(getInputFunc)) {
                return Promise.resolve([meta3dState, [null, null]]);
            }
            return api.nullable.getExn(getInputFunc)(meta3dState).then((treeData) => {
                if (api.nullable.isNullable(api.uiControl.getUIControlState(meta3dState, label))) {
                    meta3dState = api.uiControl.setUIControlState(meta3dState, label, {
                        id: "Tree Window##" + _generateUniqueId(),
                        lastTreeSelectedData: null,
                        nodeType1Texture: null,
                        nodeType2Texture: null,
                        nodeType3Texture: null,
                        lastNodeType1TextureImageBase64: null,
                        lastNodeType2TextureImageBase64: null,
                        lastNodeType3TextureImageBase64: null,
                    });
                }
                return _loadImage(meta3dState, api, label, nodeType1Image, nodeType2Image, nodeType3Image).then(meta3dState => {
                    let state = api.nullable.getExn(api.uiControl.getUIControlState(meta3dState, label));
                    let { id, lastTreeSelectedData, nodeType1Texture, nodeType2Texture, nodeType3Texture, } = state;
                    let { tree } = api.nullable.getExn(api.getPackageService(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState);
                    return api.nullable.getWithDefault(api.nullable.map(treeData => {
                        let data = tree(meta3dState, treeData, rootNodeLabel, lastTreeSelectedData, id, rect);
                        meta3dState = data[0];
                        let [treeSelectedData, treeDragData] = data[1];
                        meta3dState = api.uiControl.setUIControlState(meta3dState, label, Object.assign(Object.assign({}, state), { lastTreeSelectedData: api.nullable.isNullable(treeSelectedData) ? lastTreeSelectedData : treeSelectedData }));
                        return [meta3dState, [treeSelectedData, treeDragData]];
                    }, _convertTreeData(api, treeData, nodeType1Texture, nodeType2Texture, nodeType3Texture)), [meta3dState, [null, null]]);
                });
            });
        },
        init: (meta3dState) => {
            return Promise.resolve(meta3dState);
        }
    };
};
//# sourceMappingURL=Main.js.map