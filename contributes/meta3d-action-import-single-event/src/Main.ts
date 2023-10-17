import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { clickUIData } from "meta3d-ui-control-button-protocol"
import { actionName, state } from "meta3d-action-import-single-event-protocol"
import { eventName, inputData } from "meta3d-action-import-single-event-protocol/src/EventType"
import { service as eventSourcingService } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { service as importSceneService } from "meta3d-import-scene-protocol/src/service/ServiceType"
import { service as assetService } from "meta3d-asset-protocol/src/service/ServiceType"
import { service as runEngineGameViewService } from "meta3d-editor-run-engine-gameview-protocol/src/service/ServiceType"

let _checkOnlyHasImportEvent = (eventSourcingService: eventSourcingService, meta3dState: meta3dState) => {
    let allEvents = eventSourcingService.getAllEvents(meta3dState)

    if (!(allEvents.count() == 1 && getExn(allEvents.last()).name == eventName)) {
        throw new Error("should only has import event")
    }
}

export let getContribute: getContributeMeta3D<actionContribute<clickUIData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol")

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, sceneGLB, assetFile) => {
                    // TODO contract check
                    _checkOnlyHasImportEvent(eventSourcingService, meta3dState)

                    let importSceneService = api.getExtensionService<importSceneService>(meta3dState, "meta3d-import-scene-protocol")

                    return importSceneService.import(meta3dState, sceneGLB).then(meta3dState => {
                        let assetService = api.getExtensionService<assetService>(meta3dState, "meta3d-asset-protocol")

                        meta3dState = assetService.importAsset(meta3dState, assetFile)

                        return api.getExtensionService<runEngineGameViewService>(meta3dState, "meta3d-editor-run-engine-gameview-protocol").loopEngineWhenStop(meta3dState)
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
