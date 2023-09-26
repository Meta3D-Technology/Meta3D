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
        >(meta3dState, eventName.load_glb_event, (meta3dState, glb, glbId) => {
            // meta3dState = push(deepCopy(meta3dState))



            // console.log("load glbId:" + glbId)

            // let outsideDataId = eventSourcingService.generateOutsideDataId(meta3dState)

            meta3dState = eventSourcingService.addOutsideData(meta3dState, glbId, glb)

            return new Promise((resolve) => {
                // resolve([meta3dState, outsideDataId])
                resolve(meta3dState)
            })
        }, (meta3dState, glb, glbId) => {
            return new Promise((resolve) => {
                meta3dState = eventSourcingService.removeOutsideData(meta3dState, glbId)

                resolve(meta3dState)
            })
        }
        )
    }
}