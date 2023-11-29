import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state } from "meta3d-action-drop-glb-to-sceneview-protocol"
import { eventName, inputData } from "meta3d-action-drop-glb-to-sceneview-protocol/src/EventType"
// import { service as eventSourcingService } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
// import { service as converterSceneViewService } from "meta3d-scenegraph-converter-three-sceneview-protocol/src/service/ServiceType"
// import { service as converterGameViewService } from "meta3d-scenegraph-converter-three-gameview-protocol/src/service/ServiceType"
// import { service as runEngineGameViewService } from "meta3d-editor-run-engine-gameview-protocol/src/service/ServiceType"
// import { service as assetService } from "meta3d-asset-protocol/src/service/ServiceType"
// import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"
// import { getActionState, setElementStateField } from "meta3d-ui-utils/src/ElementStateUtils"
// import { getState, setState } from "./Utils"
import { disposeGameObjectAndAllChildren } from "meta3d-dispose-utils/src/DisposeGameObjectUtils"
// import { service as engineWholeService } from "meta3d-engine-whole-sceneview-protocol/src/service/ServiceType"
// import { service as engineWholeGameViewService } from "meta3d-engine-whole-gameview-protocol/src/service/ServiceType"
// import { service as loadGLBService } from "meta3d-load-glb-protocol/src/service/ServiceType"
import { uiControlName as assetUIControlName } from "meta3d-ui-control-asset-protocol"
import { dropAssetFileUIData } from "meta3d-ui-control-scene-view-protocol"
// // import { GLTF } from "meta3d-load-scene-utils/src/three/GLTFLoader"
import { runGameViewRenderOnlyOnce } from "meta3d-gameview-render-utils/src/GameViewRenderUtils"

export let getContribute: getContributeMeta3D<actionContribute<dropAssetFileUIData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, { fromUIControlName, data }) => {
                    if (fromUIControlName !== assetUIControlName) {
                        return Promise.resolve(meta3dState)
                    }

                    let glbId = data

                    let editorWholeService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))
                    let { getAllGLBAssets, loadGlb } = editorWholeService.asset(meta3dState)

                    let allGLBAssets = getAllGLBAssets(meta3dState)

                    if (allGLBAssets.length == 0) {
                        return Promise.resolve(meta3dState)
                    }

                    let [_glbId, _glbName, glb] = api.nullable.getExn(allGLBAssets.find((asset) => {
                        return asset[0] == glbId
                    }))

                    return loadGlb(meta3dState, glb)
                        .then((gltf) => {
                            let data = editorWholeService.addScene(meta3dState, gltf.scene)
                            meta3dState = data[0]
                            let importedGameObject = data[1]

                            let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))
                            meta3dState = api.action.setActionState(meta3dState, actionName, {
                                ...state,
                                importedGameObjects:
                                    state.importedGameObjects.push(importedGameObject)
                            })

                            return runGameViewRenderOnlyOnce(meta3dState, editorWholeService)
                        })
                }, (meta3dState) => {
                    let {
                        importedGameObjects,
                    } = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    if (api.nullable.isNullable(importedGameObjects.last())) {
                        return Promise.resolve(meta3dState)
                    }

                    let disposedGameObject = api.nullable.getExn(importedGameObjects.last())

                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))
                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        importedGameObjects: state.importedGameObjects.pop()
                    })

                    let editorWholeService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))

                    meta3dState = disposeGameObjectAndAllChildren(meta3dState, editorWholeService, disposedGameObject)


                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            return new Promise<meta3dState>((resolve, reject) => {
                let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    inputData: [uiData]
                }))
            })
        },
        createState: (meta3dState) => {
            return {
                importedGameObjects: api.immutable.createList(meta3dState),
            }
        }
    }
}
