import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
// import { service as exportEventService } from "meta3d-export-scene-protocol/src/service/ServiceType"
// import { state } from "meta3d-export-scene-protocol/src/state/StateType"
// import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
// import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { clickUIData } from "meta3d-ui-control-button-protocol"
import { actionName, state } from "meta3d-action-export-event-protocol"
import { eventName, inputData } from "meta3d-action-export-event-protocol/src/EventType"
import { service as eventSourcingService } from "meta3d-event-sourcing-protocol/src/service/ServiceType"

let _download = (body: ArrayBuffer, filename: string, extension: string) => {
    const blob = new Blob([body], { type: "arraybuffer" });
    const fileName = filename + "." + extension;

    const link = document.createElement('a');

    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export let getContribute: getContributeMeta3D<actionContribute<clickUIData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            // let exportEventService = api.getExtensionService<exportEventService>(meta3dState, "meta3d-export-scene-protocol")
            let eventSourcingService = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol")

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState) => {
                    // exportEventService.export([(glb) => {
                    //     _download(glb, "scene", "glb")

                    //     resolve(meta3dState)
                    // }, (err) => {
                    //     throw err
                    // }], meta3dState)


                    let allEvents = eventSourcingService.getAllEvents(meta3dState)

                    let encoder = new TextEncoder()
                    let allEventsBuffer = encoder.encode(JSON.stringify(allEvents.toArray())).buffer

                    _download(allEventsBuffer, "event", "arraybuffer")

                    return Promise.resolve(meta3dState)
                }, (meta3dState) => {
                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            console.log("export scene")

            return new Promise<meta3dState>((resolve, reject) => {
                let eventSourcingService = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol")

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    isOnlyRead:true,
                    inputData: []
                }))
            })

        },
        createState: () => null
    }
}
