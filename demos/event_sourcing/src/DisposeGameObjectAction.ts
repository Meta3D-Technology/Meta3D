import { service as eventSourcingService } from "./EventSourcing"
import { getCurrentGameObject } from "./GetCurrent"
import { dispose_gameObject_event_inputData, dispose_gameObject_event_outputData, eventName } from "./events"

export let service = {
    handler: (meta3dState) => {
        return eventSourcingService.addEventAndUpdateView<dispose_gameObject_event_inputData, dispose_gameObject_event_outputData>(meta3dState, {
            name: eventName.dispose_gameObject_event,
            inputData: [
                getCurrentGameObject(meta3dState)
            ]
        })
    }
}



