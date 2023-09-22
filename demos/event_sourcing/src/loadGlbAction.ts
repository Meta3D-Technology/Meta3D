import { service as eventSourcingService } from "./EventSourcing"
import { eventName, load_glb_event_inputData, load_glb_event_outputData } from "./events"

declare function getGlb(): ArrayBuffer

export let service = {
    handler: (meta3dState) => {
        return eventSourcingService.addEventAndUpdateView<load_glb_event_inputData, load_glb_event_outputData>(meta3dState, {
            name: eventName.load_glb_event,
            inputData: [
                getGlb()
            ]
        })
    }
}




