import { service as eventSourcingService } from "./EventSourcing"
import { eventName, load_glb_event_inputData, load_glb_event_outputData } from "./events"
import { meta3dState } from "./type"

// declare function getGlb(): ArrayBuffer
let getGlb = () => {
    return new ArrayBuffer(10)
}

export let service = {
    handler: (meta3dState) => {
        let outsideDataId = eventSourcingService.generateOutsideDataId(meta3dState)

        meta3dState = eventSourcingService.addOutsideData(meta3dState, outsideDataId, getGlb())

        return new Promise<meta3dState>((resolve, reject) => {
            resolve(eventSourcingService.addEvent<load_glb_event_inputData>(meta3dState, {
                name: eventName.load_glb_event,
                inputData: [
                    outsideDataId
                ]
            }))
        })
    }
}
