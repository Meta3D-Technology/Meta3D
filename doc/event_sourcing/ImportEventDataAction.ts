import { service as eventSourcingService } from "./EventSourcing"
import { eventData, eventName, import_eventData_event_inputData, import_eventData_event_outputData } from "./events"

declare function getEventData(): eventData

export let service = {
    handler: (meta3dState) => {
        return eventSourcingService.addEventAndUpdateView<import_eventData_event_inputData, import_eventData_event_outputData>(meta3dState, {
            name: eventName.import_eventData_event,
            inputData: [
                getEventData()
            ]
        })
    }
}




