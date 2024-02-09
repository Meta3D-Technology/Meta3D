import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData, assetType, asset } from "meta3d-action-add-asset-protocol"
import { eventName, inputData } from "meta3d-action-add-asset-protocol/src/EventType"
import glb from "url-loader!./image/glb.png"
import script from "url-loader!./image/script.png"
import { imguiImplTexture } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { importFile } from "meta3d-file-ts-utils/src/ImportFileUtils"
import { eventSourcingService } from "meta3d-event-protocol/src/service/ServiceType"

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

    return loadImage(meta3dState, glb).then((glbTexture: imguiImplTexture) => {
        return loadImage(meta3dState, script).then((scriptTexture: imguiImplTexture) => {
            return [glbTexture, scriptTexture]
        })
    })
}

let _loadGlb = (meta3dState: meta3dState, eventSourcingService: eventSourcingService, glbTexture: imguiImplTexture, assetType: assetType): Promise<asset> => {
    return new Promise((resolve, reject) => {
        importFile((file: any, result: any) => {
            if (!file.name.includes(".glb")) {
                reject(new Error("文件后缀名应该是.glb"))
            }

            resolve([assetType, eventSourcingService.generateOutsideImmutableDataId(meta3dState), file.name.slice(0, -4), glbTexture, result as ArrayBuffer])
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

let _createScriptAsset = (meta3dState: meta3dState, eventSourcingService: eventSourcingService, scriptTexture: imguiImplTexture, assetType: assetType): Promise<asset> => {
    return Promise.resolve([assetType, eventSourcingService.generateOutsideImmutableDataId(meta3dState), "Script Asset", scriptTexture,
        `{
        onInit:(api, meta3dState) =>{
            console.log("onInit")

            return Promise.resolve(meta3dState)
        },
        onUpdate:(api, meta3dState) =>{
            console.log("onUpdate")

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

            // TODO loadImages here

            return Promise.resolve( eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, selectedIndex) => {
                // let editorWholeService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))

                return _loadImages(meta3dState, api).then(([glbTexture, scriptTexture]) => {

                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    let assetType_ = _getAssetType(selectedIndex)

                    let promise = null

                    switch (assetType_) {
                        case assetType.Glb:
                            promise = _loadGlb(meta3dState, eventSourcingService, glbTexture, assetType_)
                            break
                        case assetType.Script:
                        default:
                            promise = _createScriptAsset(meta3dState, eventSourcingService, scriptTexture, assetType_)
                            break
                    }

                    return promise.then(asset => {
                        return api.action.setActionState(meta3dState, actionName, {
                            ...state,
                            allAddedAssets: state.allAddedAssets.push(asset),
                        })
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
        },
        handler: (meta3dState, uiData) => {
            return new Promise<meta3dState>((resolve, reject) => {
                let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    inputData: [
                        uiData
                    ]
                }))
            })
        },
        createState: (meta3dState) => {
            return {
                allAddedAssets: api.immutable.createList()
            }
        }
    }
}
