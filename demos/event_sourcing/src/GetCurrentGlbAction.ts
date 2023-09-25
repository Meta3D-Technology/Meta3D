import { service as eventSourcingService } from "./EventSourcing"
import { eventName, get_current_glb_id_event_inputData, get_current_glb_id_event_outputData } from "./events"
import { outsideDataId } from "./type"
import { meta3dState } from "./type"

declare function getCurrentGlbIdByEvent(meta3dState): outsideDataId

export let service = {
    handler: (meta3dState) => {
        return new Promise<meta3dState>((resolve, reject) =>{
resolve(eventSourcingService.addEvent<get_current_glb_id_event_inputData>(meta3dState, {
            name: eventName.get_current_glb_id_event,
            inputData: [getCurrentGlbIdByEvent(meta3dState)]
        }))
        }) 
    }
}




