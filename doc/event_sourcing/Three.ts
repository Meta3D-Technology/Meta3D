import { service as eventSourcingService } from "./EventSourcing"
import { eventName, dispose_gameObject_event_inputData, dispose_gameObject_event_outputData } from "./events"

export let service = {
    init: (meta3dState) => {
        eventSourcingService.on<
            dispose_gameObject_event_inputData,
            dispose_gameObject_event_outputData
        >(meta3dState, eventName.dispose_gameObject_event, (meta3dState, gameObject) => {
            console.log("dispose gameObject in three:" + gameObject)

            return new Promise((resolve) => {
                resolve(meta3dState)
            })
        }, (meta3dState, gameObject) => {
            console.log("backward in gpu")

            return new Promise((resolve) => {
                resolve(meta3dState)
            })
        }
        )
    }
}