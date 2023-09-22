import { service as eventSourcingService } from "./EventSourcing"
import { eventName, redo_inputData, redo_outputData } from "./events"

export let service = {
    handler: (meta3dState) => {
        return eventSourcingService.addEventAndUpdateView<redo_inputData, redo_outputData>(meta3dState, {
            name: eventName.redo,
            inputData: [
            ]
        })
    }
}




