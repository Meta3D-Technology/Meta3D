import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { eventSourcingService } from "meta3d-event-protocol/src/service/ServiceType"
import { uiData, actionName, state } from "meta3d-action-import-data-protocol"
import { eventName, inputData } from "meta3d-action-import-data-protocol/src/EventType"
// import { service as eventSourcingService } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
// import { service as importSceneService } from "meta3d-import-scene-protocol/src/service/ServiceType"
// import { service as assetService } from "meta3d-asset-protocol/src/service/ServiceType"
// import { service as runEngineGameViewService } from "meta3d-editor-run-engine-gameview-protocol/src/service/ServiceType"
// import { requireCheck, test } from "meta3d-ts-contract-utils"
import { runGameViewRenderOnlyOnce } from "meta3d-gameview-render-utils/src/GameViewRenderUtils"
import { eventData, singleInputData } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
import { actionName as addAssetActionName, state as addAssetState } from "meta3d-action-add-asset-protocol"
import { convertAllAssetDataForImport } from "meta3d-asset-utils/src/Main"

// let _checkOnlyHasImportEvent = (eventSourcingService: eventSourcingService, api: api, meta3dState: meta3dState) => {
//     requireCheck(() => {
//         test("should only has import event", () => {
//             let allEvents = eventSourcingService.getAllEvents(meta3dState)

//             return allEvents.count() == 1 && api.nullable.getExn(allEvents.last()).name == eventName
//         })
//     }, true)
// }

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, sceneGLB, assetData) => {
                    // _checkOnlyHasImportEvent(eventSourcingService, api, meta3dState)

                    let editorWholeService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))

                    return editorWholeService.importScene(meta3dState, sceneGLB).then(meta3dState => {
                        meta3dState = api.nullable.getWithDefault(
                            api.nullable.map(assetData => {
                                let addAssetState = api.nullable.getExn(api.action.getActionState<addAssetState>(meta3dState, addAssetActionName))


                                meta3dState = api.action.setActionState(meta3dState, addAssetActionName, {
                                    ...addAssetState,
                                    allAddedAssets: api.immutable.createListOfData(
                                        convertAllAssetDataForImport(
                                            [
                                                api.nullable.getExn(addAssetState.glbIcon),
                                                api.nullable.getExn(addAssetState.scriptIcon),
                                            ],
                                            editorWholeService.asset(meta3dState).parseAsset(assetData))
                                    )
                                })
                            }, assetData),
                            meta3dState
                        )


                        meta3dState = eventSourcingService.setNeedReplaceAllEvents(meta3dState, api.immutable.createList<eventData<Array<singleInputData>>>())

                        return Promise.resolve(runGameViewRenderOnlyOnce(meta3dState, api, api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))))
                    })
                }, (meta3dState) => {
                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            return Promise.resolve(meta3dState)
        },
        createState: () => null
    }
}
