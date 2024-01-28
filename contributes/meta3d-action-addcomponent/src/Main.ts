import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute, service as editorWholeService, engineSceneService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, componentType, state, uiData } from "meta3d-action-addcomponent-protocol"
import { eventName, inputData } from "meta3d-action-addcomponent-protocol/src/EventType"
import { actionName as selectSceneTreeNodeActionName, state as selectSceneTreeNodeState } from "meta3d-action-select-scenetree-node-protocol"
import { runGameViewRenderOnlyOnce } from "meta3d-gameview-render-utils/src/GameViewRenderUtils"
import { getComponentType } from "meta3d-component-utils/src/Main"
import { gameObject } from "meta3d-gameobject-protocol"

let _addCameraGroup = (meta3dState: meta3dState, engineSceneService: engineSceneService, gameObject: gameObject) => {
    let data = engineSceneService.basicCameraView.createBasicCameraView(meta3dState)
    meta3dState = data[0]
    let cameraView = data[1]

    meta3dState = engineSceneService.gameObject.addBasicCameraView(meta3dState, gameObject, cameraView)

    data = engineSceneService.perspectiveCameraProjection.createPerspectiveCameraProjection(meta3dState)
    meta3dState = data[0]
    let cameraProjection = data[1]

    meta3dState = engineSceneService.perspectiveCameraProjection.setFovy(meta3dState, cameraProjection, 30)
    meta3dState = engineSceneService.perspectiveCameraProjection.setNear(meta3dState, cameraProjection, 1)
    meta3dState = engineSceneService.perspectiveCameraProjection.setFar(meta3dState, cameraProjection, 100)
    meta3dState = engineSceneService.gameObject.addPerspectiveCameraProjection(meta3dState, gameObject, cameraProjection)

    return meta3dState
}

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, gameObject, selectedIndex) => {
                    let editorWholeService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))
                    let engineSceneService = editorWholeService.scene(meta3dState)

                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    let componentType_ = getComponentType(selectedIndex)

                    switch (componentType_) {
                        case componentType.CameraGroup:
                        default:
                            meta3dState = _addCameraGroup(meta3dState, engineSceneService, gameObject)
                            break
                    }

                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        allAddedComponents: state.allAddedComponents.push([componentType_, gameObject]),
                    })

                    return Promise.resolve(runGameViewRenderOnlyOnce(meta3dState, api, api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))))
                }, (meta3dState) => {
                    let {
                        allAddedComponents
                    } = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    if (api.nullable.isNullable(allAddedComponents.last())) {
                        return Promise.resolve(meta3dState)
                    }

                    let [componentType_, gameObject] = api.nullable.getExn(allAddedComponents.last())

                    let engineSceneService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))
                        .scene(meta3dState)

                    switch (componentType_) {
                        case componentType.CameraGroup:
                        default:
                            meta3dState = engineSceneService.gameObject.disposeGameObjectBasicCameraViewComponent(meta3dState, gameObject, engineSceneService.gameObject.getBasicCameraView(meta3dState, gameObject))
                            meta3dState = engineSceneService.gameObject.disposeGameObjectPerspectiveCameraProjectionComponent(meta3dState, gameObject, engineSceneService.gameObject.getPerspectiveCameraProjection(meta3dState, gameObject))
                            break
                    }

                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))
                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        allAddedComponents: state.allAddedComponents.pop(),
                    })

                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            return new Promise<meta3dState>((resolve, reject) => {
                let {
                    selectedGameObject,
                } = api.nullable.getExn(api.action.getActionState<selectSceneTreeNodeState>(meta3dState, selectSceneTreeNodeActionName))

                let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    inputData: [
                        api.nullable.getExn(selectedGameObject),
                        uiData
                    ]
                }))
            })
        },
        createState: (meta3dState) => {
            return {
                allAddedComponents: api.immutable.createList()
            }
        }
    }
}
