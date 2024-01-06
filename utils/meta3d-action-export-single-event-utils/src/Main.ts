import { api, state as meta3dState } from "meta3d-type"
import { service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { eventName as ImportSingleEventEventName } from "meta3d-action-import-single-event-protocol/src/EventType"

export let getSingleEventAllEvents = (api: api, meta3dState: meta3dState) => {
    let editorWholeService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))
    let eventSourcingService = editorWholeService.event(meta3dState).eventSourcing(meta3dState)

    return (new Promise((resolve, reject) => {
        return editorWholeService.exportScene([(glb) => {
            resolve(glb)
        }, (err) => {
            throw err
        }], meta3dState)
    }) as Promise<ArrayBuffer>).then(sceneGLB => {
        return eventSourcingService.createAllEvents(
            [{
                name: ImportSingleEventEventName,
                isOnlyRead: false,
                inputData: [
                    sceneGLB,
                ]
            }],
            meta3dState
        ).toArray()
    })
}
