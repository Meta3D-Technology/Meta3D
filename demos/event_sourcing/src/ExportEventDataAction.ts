import { service as eventSourcingService } from "./EventSourcing"
import { eventName, export_eventData_event_inputData, export_eventData_event_outputData } from "./events"
import { meta3dState } from "./type"

// export declare function exportEventData(eventData): void

export let service = {
    handler: (meta3dState, isReset) => {
        return new Promise<meta3dState>((resolve, reject) => {
            resolve(eventSourcingService.addEvent<export_eventData_event_inputData>(meta3dState, {
                name: eventName.export_eventData_event,
                inputData: [
                    {
                        isReset: isReset
                    }
                ]
            }))
        })
        // .then(([meta3dState, eventData]) => {
        //     exportEventData(eventData)

        //     return meta3dState
        // })
    }
}



