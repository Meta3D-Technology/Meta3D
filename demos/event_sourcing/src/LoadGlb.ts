import { service as eventSourcingService } from "./EventSourcing"
import { push, undo } from "./RedoUndo"
import { eventName, get_current_gameObject_event_inputData, get_current_gameObject_event_outputData, load_glb_event_inputData, load_glb_event_outputData } from "./events"
import { gameObject, meta3dState, pbrMaterial } from "./type"

// declare function deepCopy(meta3dState): meta3dState
let deepCopy = (meta3dState) => {
    return meta3dState
}

export let service = {
    init: (meta3dState) => {
        return eventSourcingService.on<
            load_glb_event_inputData,
            load_glb_event_outputData
        >(meta3dState, eventName.load_glb_event, (meta3dState, glb) => {
            // TODO refactor: duplicate
            meta3dState = push(deepCopy(meta3dState))

            console.log("load glb:" + glb)

            let outsideDataId = eventSourcingService.generateOutsideDataId(meta3dState)

            meta3dState = eventSourcingService.addOutsideData(meta3dState, outsideDataId, glb)

            return new Promise((resolve) => {
                // resolve([meta3dState, outsideDataId])
                resolve(meta3dState)
            })
        }, (meta3dState) => {
            return new Promise((resolve) => {
                resolve(undo(meta3dState))
            })
        }
        )
    }
}