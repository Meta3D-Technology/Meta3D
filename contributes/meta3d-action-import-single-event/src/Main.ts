import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { clickUIData } from "meta3d-ui-control-button-protocol"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { eventSourcingService } from "meta3d-event-protocol/src/service/ServiceType"
import { actionName, state } from "meta3d-action-import-single-event-protocol"
import { eventName, inputData } from "meta3d-action-import-single-event-protocol/src/EventType"
// import { service as eventSourcingService } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
// import { api.nullable.getExn } from "meta3d-commonlib-ts/src/NullableUtils"
// import { service as importSceneService } from "meta3d-import-scene-protocol/src/service/ServiceType"
// import { service as assetService } from "meta3d-asset-protocol/src/service/ServiceType"
// import { service as runEngineGameViewService } from "meta3d-editor-run-engine-gameview-protocol/src/service/ServiceType"
import { requireCheck, test } from "meta3d-ts-contract-utils"
import { service as gameViewRenderService } from "meta3d-editor-gameview-render-protocol/src/service/ServiceType"

let _checkOnlyHasImportEvent = (eventSourcingService: eventSourcingService, api: api, meta3dState: meta3dState) => {
    requireCheck(() => {
        test("should only has import event", () => {
            let allEvents = eventSourcingService.getAllEvents(meta3dState)

            return allEvents.count() == 1 && api.nullable.getExn(allEvents.last()).name == eventName
        })
    }, true)
}

export let getContribute: getContributeMeta3D<actionContribute<clickUIData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                // resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, sceneGLB, assetFile) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, sceneGLB) => {
                    _checkOnlyHasImportEvent(eventSourcingService, api, meta3dState)

                    let editorWholeService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))

                    return editorWholeService.importScene(meta3dState, sceneGLB).then(meta3dState => {
                        // let assetService = api.getExtensionService<assetService>(meta3dState, "meta3d-asset-protocol")

                        // meta3dState = assetService.importAsset(meta3dState, assetFile)

                        return api.nullable.getWithDefault(
                            api.nullable.map(
                                ({ runOnlyOnce }) => {
                                    return runOnlyOnce(meta3dState)
                                },
                                editorWholeService.getPluggablePackageService<gameViewRenderService>(meta3dState, "meta3d-editor-gameview-render-protocol")
                            ),
                            meta3dState
                        )
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
