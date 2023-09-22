import { service as eventSourcingService } from "./EventSourcing"
import { eventName, export_eventData_event_inputData, export_eventData_event_outputData } from "./events"

declare function exportEventData(eventData): void

export let service = {
    handler: (meta3dState) => {
        return eventSourcingService.addEventAndUpdateView<export_eventData_event_inputData, export_eventData_event_outputData>(meta3dState, {
            name: eventName.export_eventData_event,
            inputData: [
                {
                    isReset: false
                }
            ]
        }).then(([meta3dState, eventData]) => {
            exportEventData(eventData)

            return meta3dState
        })
    }
}




