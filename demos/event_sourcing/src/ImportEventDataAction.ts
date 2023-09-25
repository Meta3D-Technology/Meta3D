import { service as eventSourcingService } from "./EventSourcing"
import { eventData, eventName, import_eventData_event_inputData, import_eventData_event_outputData } from "./events"
import { meta3dState } from "./type"

declare function getEventData(): eventData

export let service = {
    handler: (meta3dState) => {
        return new Promise<meta3dState>((resolve, reject) => {
            resolve(eventSourcingService.addEvent<import_eventData_event_inputData>(meta3dState, {
                name: eventName.import_eventData_event,
                inputData: [
                    getEventData()
                ]
            }))
        })
    }
}




