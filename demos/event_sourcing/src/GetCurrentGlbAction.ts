import { service as eventSourcingService } from "./EventSourcing"
import { eventName, get_current_glb_id_event_inputData, get_current_glb_id_event_outputData } from "./events"
import { outsideDataId } from "./type"

declare function getCurrentGlbIdByEvent(meta3dState): outsideDataId

export let service = {
    handler: (meta3dState) => {
        return eventSourcingService.addEventAndUpdateView<get_current_glb_id_event_inputData, get_current_glb_id_event_outputData>(meta3dState, {
            name: eventName.get_current_glb_id_event,
            inputData: [getCurrentGlbIdByEvent(meta3dState)]
        })
    }
}




