import { service as eventSourcingService } from "./EventSourcing"
import { eventName, undo_inputData, undo_outputData } from "./events"
import { meta3dState } from "./type"

export let service = {
    handler: (meta3dState) => {
        return new Promise<meta3dState>((resolve, reject) => {
            resolve(eventSourcingService.addEvent<undo_inputData>(meta3dState, {
                name: eventName.undo,
                inputData: [
                ]
            }))
        })
    }
}




