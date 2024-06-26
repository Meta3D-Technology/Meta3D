import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { uiData, actionName, state } from "meta3d-action-export-data-protocol"
import { eventName, inputData } from "meta3d-action-export-data-protocol/src/EventType"
import { buildAllEventsOnlyHasImportDataEvent } from "meta3d-event-data-ts-utils/src/Main"
import { convertAllAssetDataForExport } from "meta3d-asset-utils/src/Main"

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState) => {
                    let editorWholeService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))


                    return (new Promise((resolve, reject) => {
                        return editorWholeService.exportScene([(glb) => {
                            resolve(glb)
                        }, (err) => {
                            throw err
                        }], meta3dState)
                    }) as Promise<ArrayBuffer>).then(sceneGLB => {
                        let assetData = editorWholeService.asset(meta3dState).exportAsset(convertAllAssetDataForExport(meta3dState, api))


                        editorWholeService.event(meta3dState).eventData(meta3dState).exportEventData(buildAllEventsOnlyHasImportDataEvent(sceneGLB, api.nullable.return(assetData)) as any)

                        return meta3dState
                    })
                }, (meta3dState) => {
                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            return new Promise<meta3dState>((resolve, reject) => {
                let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

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
