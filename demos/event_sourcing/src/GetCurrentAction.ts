import { service as eventSourcingService } from "./EventSourcing"
import { eventName, get_current_gameObject_event_inputData, get_current_gameObject_event_outputData } from "./events"
import { gameObject } from "./type"
import { meta3dState } from "./type"

declare function getCurrentGameObjectByEvent(meta3dState): gameObject

export let service = {
    handler: (meta3dState) => {
        return new Promise<meta3dState>((resolve, reject) => {
            resolve(eventSourcingService.addEvent<get_current_gameObject_event_inputData>(meta3dState, {
                name: eventName.get_current_gameObject_event,
                inputData: [getCurrentGameObjectByEvent(meta3dState)]
            }))
        })
    }
}




