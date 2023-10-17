import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { clickUIData } from "meta3d-ui-control-button-protocol"
import { actionName, state } from "meta3d-action-export-single-event-protocol"
import { eventName, inputData } from "meta3d-action-export-single-event-protocol/src/EventType"
import { eventName as ImportSingleEventEventName } from "meta3d-action-import-single-event-protocol/src/EventType"
import { service as eventSourcingService } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
import { service as eventDataService } from "meta3d-event-data-protocol/src/service/ServiceType"
import { service as exportSceneService } from "meta3d-export-scene-protocol/src/service/ServiceType"
import { service as assetService } from "meta3d-asset-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<actionContribute<clickUIData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol")

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState) => {
                    let exportSceneService = api.getExtensionService<exportSceneService>(meta3dState, "meta3d-export-scene-protocol")

                    return (new Promise((resolve, reject) => {
                        return exportSceneService.export([(glb) => {
                            resolve(glb)
                        }, (err) => {
                            throw err
                        }], meta3dState)
                    }) as Promise<ArrayBuffer>).then(sceneGLB => {
                        let assetService = api.getExtensionService<assetService>(meta3dState, "meta3d-asset-protocol")

                        let assetFile = assetService.exportAsset(meta3dState)

                        let allEvents = eventSourcingService.createAllEvents(
                            [{
                                name: ImportSingleEventEventName,
                                isOnlyRead: false,
                                inputData: [
                                    sceneGLB, assetFile
                                ]
                            }]
                        ).toArray()

                        api.getExtensionService<eventDataService>(meta3dState, "meta3d-event-data-protocol").exportEventData(allEvents as any)

                        return Promise.resolve(meta3dState)
                    })
                }, (meta3dState) => {
                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            return new Promise<meta3dState>((resolve, reject) => {
                let eventSourcingService = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol")

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    isOnlyRead: true,
                    inputData: []
                }))
            })

        },
        createState: () => null
    }
}
