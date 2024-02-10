import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData, assetType, asset } from "meta3d-action-add-asset-protocol"
import { eventName, glbName, glbData, id, inputData } from "meta3d-action-add-asset-protocol/src/EventType"
import glb from "url-loader!./image/glb.png"
import script from "url-loader!./image/script.png"
import { imguiImplTexture } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { importFile } from "meta3d-file-ts-utils/src/ImportFileUtils"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

let _getAssetType = (selectedIndex: number): assetType => {
    switch (selectedIndex) {
        case 0:
            return assetType.Glb
        case 1:
        default:
            return assetType.Script
    }
}

let _loadImages = (meta3dState: meta3dState, api: api) => {
    let { loadImage } = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).ui(meta3dState)

    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

    let promise = null
    if (api.nullable.isNullable(state.glbIcon)) {
        promise = loadImage(meta3dState, glb).then((glbTexture: imguiImplTexture) => {
            meta3dState = api.action.setActionState<state>(meta3dState, actionName, {
                ...state,
                glbIcon: api.nullable.return(glbTexture)
            })

            return meta3dState
        })
    }
    else {
        promise = Promise.resolve(meta3dState)
    }

    return promise.then(meta3dState => {
        let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

        if (api.nullable.isNullable(state.scriptIcon)) {
            return loadImage(meta3dState, script).then((scriptTexture: imguiImplTexture) => {
                meta3dState = api.action.setActionState<state>(meta3dState, actionName, {
                    ...state,
                    scriptIcon: api.nullable.return(scriptTexture)
                })

                return meta3dState
            })
        }
        else {
            return meta3dState
        }
    })
}

let _loadGlb = (meta3dState: meta3dState, api: api): Promise<[nullable<glbName>, nullable<glbData>]> => {
    return new Promise((resolve, reject) => {
        importFile((file: any, result: any) => {
            if (!file.name.includes(".glb")) {
                reject(new Error("文件后缀名应该是.glb"))
            }

            resolve([api.nullable.return(file.name.slice(0, -4)), api.nullable.return(result as ArrayBuffer)])
        }, (event: Event, file: any) => {
            reject(new Error(`读取${file.name}错误`))
        }, (loaded: number, total: number) => {
            // TODO show progress message
            console.log(`loading ${loaded / total} %`)
        }, () => {
            resolve(meta3dState)
        })
    })
}

let _createScriptAsset = (id: id, scriptTexture: imguiImplTexture, assetType: assetType): Promise<asset> => {
    return Promise.resolve([assetType, id, "Script Asset", scriptTexture,
        `{
        onInit:(api, meta3dState) =>{
            console.log("onInit")

            return Promise.resolve(meta3dState)
        },
        onUpdate:(api, meta3dState) =>{
            console.log("onUpdate")

            return Promise.resolve(meta3dState)
        },
        onStop:(api, meta3dState) =>{
            console.log("onStop")

            return Promise.resolve(meta3dState)
        },
    }`
    ])
}

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return _loadImages(meta3dState, api).then(meta3dState => {
                return Promise.resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, selectedIndex, id, glbName, glbData) => {
                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    let assetType_ = _getAssetType(selectedIndex)

                    let promise: Promise<asset>
                    switch (assetType_) {
                        case assetType.Glb:
                            promise = Promise.resolve([assetType_, id, api.nullable.getExn(glbName), api.nullable.getExn(state.glbIcon), api.nullable.getExn(glbData)])
                            break
                        case assetType.Script:
                        default:
                            promise = _createScriptAsset(id, api.nullable.getExn(state.scriptIcon), assetType_)
                            break
                    }

                    return promise.then(asset => {
                        return api.action.setActionState(meta3dState, actionName, {
                            ...state,
                            allAddedAssets: state.allAddedAssets.push(asset),
                        })
                    })

                }, (meta3dState) => {
                    let {
                        allAddedAssets
                    } = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    if (api.nullable.isNullable(allAddedAssets.last())) {
                        return Promise.resolve(meta3dState)
                    }

                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))
                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        allAddedAssets: state.allAddedAssets.pop(),
                    })

                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            let selectedIndex = uiData

            let promise: Promise<[nullable<glbName>, nullable<glbData>]>
            if (_getAssetType(selectedIndex) == assetType.Glb) {
                promise = _loadGlb(meta3dState, api)
            }
            else {
                promise = Promise.resolve([api.nullable.getEmpty(), api.nullable.getEmpty()])
            }

            return promise.then(([glbName, glbData]) => {
                return eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    inputData: [
                        selectedIndex,
                        eventSourcingService.generateOutsideImmutableDataId(meta3dState),
                        glbName,
                        glbData
                    ]
                })
            })
        },
        createState: (meta3dState) => {
            return {
                allAddedAssets: api.immutable.createList(),
                glbIcon: api.nullable.getEmpty(),
                scriptIcon: api.nullable.getEmpty(),
            }
        }
    }
}
