import { service as eventSourcingService } from "./EventSourcing"
import { getCurrentGameObject } from "./GetCurrent"
import { dispose_gameObject_event_inputData, dispose_gameObject_event_outputData, eventName } from "./events"
import { meta3dState } from "./type"

export let service = {
    handler: (meta3dState) => {
        return new Promise<meta3dState>((resolve, reject) => {
            resolve(eventSourcingService.addEvent<dispose_gameObject_event_inputData>(meta3dState, {
                name: eventName.dispose_gameObject_event,
                inputData: [
                    getCurrentGameObject(meta3dState)
                ]
            }))
        })
    }
}



