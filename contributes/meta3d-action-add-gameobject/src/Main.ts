import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData, gameObjectType } from "meta3d-action-add-gameobject-protocol"
import { eventName, inputData } from "meta3d-action-add-gameobject-protocol/src/EventType"
import { disposeGameObjectAndAllChildren } from "meta3d-dispose-utils/src/DisposeGameObjectUtils"
import { createCubeGameObject } from "meta3d-primitive-utils/src/CubeUtils"
import { runGameViewRenderOnlyOnce } from "meta3d-gameview-render-utils/src/GameViewRenderUtils"

let _getGameObjectType = (selectedIndex: number): gameObjectType => {
    switch (selectedIndex) {
        case 0:
            return gameObjectType.EmptyGameObject
        case 1:
        default:
            return gameObjectType.Cube
    }
}

let _createEmptyGameObject = (meta3dState: meta3dState, api: api) => {
    let engineSceneService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).scene(meta3dState)

    let data = engineSceneService.gameObject.createGameObject(meta3dState)
    meta3dState = data[0]
    let gameObject = data[1]

    meta3dState = engineSceneService.gameObject.setGameObjectName(meta3dState, gameObject, "GameObject")

    data = engineSceneService.transform.createTransform(meta3dState)
    meta3dState = data[0]
    let transform = data[1]

    meta3dState = engineSceneService.gameObject.addTransform(meta3dState, gameObject, transform)

    return [meta3dState, gameObject]
}

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
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, selectedIndex) => {
                    let data = null

                    let type = _getGameObjectType(selectedIndex)

                    switch (type) {
                        case gameObjectType.EmptyGameObject:
                            data = _createEmptyGameObject(meta3dState, api)
                            break
                        case gameObjectType.Cube:
                        default:
                            data = _createCube(meta3dState, api)
                            break
                    }


                    meta3dState = data[0]
                    let addedGameObject = data[1]

                    let state = api.nullable.getExn(
                        api.action.getActionState<state>(meta3dState, actionName)
                    )

                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        addedGameObjects:
                            state.addedGameObjects.push([type, addedGameObject])
                    })

                    return Promise.resolve(runGameViewRenderOnlyOnce(meta3dState, api, api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))))
                }, (meta3dState) => {
                    let {
                        addedGameObjects,
                    } = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    let [_, disposedGameObject] = api.nullable.getExn(addedGameObjects.last())

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

                let selectedIndex = uiData

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    inputData: [selectedIndex]
                }))
            })
        },
        createState: (meta3dState) => {
            return {
                addedGameObjects: api.immutable.createList(),
            }
        }
    }
}
