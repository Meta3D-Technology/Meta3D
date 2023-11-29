import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-add-cube-protocol"
import { eventName, inputData } from "meta3d-action-add-cube-protocol/src/EventType"
import { disposeGameObjectAndAllChildren } from "meta3d-dispose-utils/src/DisposeGameObjectUtils"
import { createCubeGameObject } from "meta3d-primitive-utils/src/CubeUtils"
import { runGameViewRenderOnlyOnce } from "meta3d-gameview-render-utils/src/GameViewRenderUtils"

let _createCube = (meta3dState: meta3dState, api: api) => {
    let engineSceneService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).scene(meta3dState)

    let diffuseColor: [number, number, number] = [Math.random(), Math.random(), Math.random()]
    let localPosition: [number, number, number] = [Math.random() * 10 - 5, Math.random() * 10 - 5, 0]

    return createCubeGameObject(meta3dState, engineSceneService, [localPosition, diffuseColor])
}

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState) => {
                    let data = _createCube(meta3dState, api)
                    meta3dState = data[0]
                    let addedGameObject = data[1]

                    let state = api.nullable.getExn(
                        api.action.getActionState<state>(meta3dState, actionName)
                    )

                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        addedGameObjects:
                            state.addedGameObjects.push(addedGameObject)
                    })

                    return Promise.resolve(runGameViewRenderOnlyOnce(meta3dState, api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))))
                }, (meta3dState) => {
                    let {
                        addedGameObjects,
                    } = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    let disposedGameObject = api.nullable.getExn(addedGameObjects.last())

                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        addedGameObjects:
                            state.addedGameObjects.pop()
                    })

                    meta3dState = disposeGameObjectAndAllChildren(meta3dState, api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")), disposedGameObject)

                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            return new Promise<meta3dState>((resolve, reject) => {
                let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    inputData: []
                }))
            })
        },
        createState: (meta3dState) => {
            return {
                addedGameObjects: api.immutable.createList(meta3dState),
            }
        }
    }
}
