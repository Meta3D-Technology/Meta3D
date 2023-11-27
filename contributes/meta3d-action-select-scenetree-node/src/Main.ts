import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-select-scenetree-node-protocol"
import { eventName, inputData } from "meta3d-action-select-scenetree-node-protocol/src/EventType"
import { findSelectedGameObject, getAllTopGameObjects, buildHierachyGameObjects } from "meta3d-scenetree-utils/src/SceneTreeUtils"

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, selectedGameObject) => {
                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        allSelectedGameObjects: state.allSelectedGameObjects.push(selectedGameObject),
                        selectedGameObject: selectedGameObject,
                    })

                    return Promise.resolve(meta3dState)
                }, (meta3dState) => {
                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))
                    let {
                        allSelectedGameObjects
                    } = state

                    if (api.nullable.isNullable(allSelectedGameObjects.last())) {
                        return Promise.resolve(meta3dState)
                    }

                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        allSelectedGameObjects: state.allSelectedGameObjects.pop(),
                        selectedGameObject: api.nullable.getExn(state.allSelectedGameObjects.last())
                    })

                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            return new Promise<meta3dState>((resolve, reject) => {
                let editorWholeService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))
                let eventSourcingService = editorWholeService.event(meta3dState).eventSourcing(meta3dState)

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    inputData: [
                        findSelectedGameObject(buildHierachyGameObjects([],
                            editorWholeService,
                            meta3dState, getAllTopGameObjects(meta3dState, editorWholeService)), api.nullable.getExn(uiData))
                    ]
                }))
            })
        },
        createState: (meta3dState) => {
            return {
                selectedGameObject: null,
                allSelectedGameObjects: api.immutable.createList(meta3dState),
            }
        }
    }
}
