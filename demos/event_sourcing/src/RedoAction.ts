import { service as eventSourcingService } from "./EventSourcing"
import { eventName, redo_inputData, redo_outputData } from "./events"
import { meta3dState } from "./type"

export let service = {
    handler: (meta3dState) => {
        return new Promise<meta3dState>((resolve, reject) => {
            resolve(eventSourcingService.addEvent<redo_inputData>(meta3dState, {
                name: eventName.redo,
                inputData: [
                ]
            }))
        })
    }
}




