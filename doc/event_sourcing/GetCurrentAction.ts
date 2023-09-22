import { service as eventSourcingService } from "./EventSourcing"
import { eventName, get_current_gameObject_event_inputData, get_current_gameObject_event_outputData } from "./events"
import { gameObject } from "./type"

declare function getCurrentGameObjectByEvent(meta3dState): gameObject

export let service = {
    handler: (meta3dState) => {
        return eventSourcingService.addEventAndUpdateView<get_current_gameObject_event_inputData, get_current_gameObject_event_outputData>(meta3dState, {
            name: eventName.get_current_gameObject_event,
            inputData: [getCurrentGameObjectByEvent(meta3dState)]
        })
    }
}




