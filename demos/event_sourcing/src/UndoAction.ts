import { service as eventSourcingService } from "./EventSourcing"
import { eventName, undo_inputData, undo_outputData } from "./events"

export let service = {
    handler: (meta3dState) => {
        return eventSourcingService.addEventAndUpdateView<undo_inputData, undo_outputData>(meta3dState, {
            name: eventName.undo,
            inputData: [
            ]
        })
    }
}




