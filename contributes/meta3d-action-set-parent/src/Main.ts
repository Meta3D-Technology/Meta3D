import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-set-parent-protocol"
import { eventName, inputData } from "meta3d-action-set-parent-protocol/src/EventType"
import { findSelectedGameObject, getAllTopGameObjects, buildHierachyGameObjects } from "meta3d-scenetree-utils/src/SceneTreeUtils"
import { runGameViewRenderOnlyOnce } from "meta3d-gameview-render-utils/src/GameViewRenderUtils"

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, { source, target }) => {
                    let editorWholeService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))
                    let engineSceneService = editorWholeService.scene(meta3dState)

                    let sourceTranform = engineSceneService.gameObject.getTransform(meta3dState, source)
                    let targetTranform = api.nullable.map(target => {
                        return engineSceneService.gameObject.getTransform(meta3dState, target)
                    }, target)

                    let oldParent = api.nullable.bind((parent) => {
                        return engineSceneService.transform.getGameObjects(meta3dState, parent)[0]
                    }, engineSceneService.transform.getParent(meta3dState, sourceTranform))

                    meta3dState = engineSceneService.transform.setParent(meta3dState, sourceTranform, targetTranform)


                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        allHierachyData: state.allHierachyData.push({
                            source,
                            oldParent
                        }),
                    })


                    return Promise.resolve(runGameViewRenderOnlyOnce(meta3dState, api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))))
                }, (meta3dState) => {
                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))
                    let {
                        allHierachyData
                    } = state

                    if (api.nullable.isNullable(allHierachyData.last())) {
                        return Promise.resolve(meta3dState)
                    }

                    let { source, oldParent } = api.nullable.getExn(allHierachyData.last())

                    let editorWholeService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))
                    let engineSceneService = editorWholeService.scene(meta3dState)

                    meta3dState = engineSceneService.transform.setParent(meta3dState,
                        engineSceneService.gameObject.getTransform(meta3dState, source),
                        api.nullable.bind((oldParent) => {
                            return engineSceneService.gameObject.getTransform(meta3dState, oldParent)
                        }, oldParent)
                    )

                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...api.action.getActionState<state>(meta3dState, actionName),
                        allHierachyData: state.allHierachyData.pop(),
                    })


                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            return new Promise<meta3dState>((resolve, reject) => {
                let editorWholeService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))
                let eventSourcingService = editorWholeService.event(meta3dState).eventSourcing(meta3dState)

                let { source, target } = uiData

                let hierachyGameObjects = buildHierachyGameObjects([],
                    editorWholeService,
                    meta3dState, getAllTopGameObjects(meta3dState, editorWholeService))

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    inputData: [{
                        source: findSelectedGameObject(hierachyGameObjects, source),
                        target: target.length == 0 ? null : findSelectedGameObject(hierachyGameObjects, target)
                    }]
                }))
            })
        },
        createState: (meta3dState) => {
            return {
                allHierachyData: api.immutable.createList()
            }
        }
    }
}
