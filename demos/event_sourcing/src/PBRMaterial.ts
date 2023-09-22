import { service as eventSourcingService } from "./EventSourcing"
import { push, undo } from "./RedoUndo"
import { eventName, dispose_pbrMaterial_event_inputData, dispose_pbrMaterial_event_outputData } from "./events"
import { meta3dState, pbrMaterial } from "./type"

declare function deepCopy(meta3dState): meta3dState

export let service = {
    init: (meta3dState) => {
        return eventSourcingService.on<
            dispose_pbrMaterial_event_inputData,
            dispose_pbrMaterial_event_outputData
        >(meta3dState, eventName.dispose_pbrMaterial_event, (meta3dState, pbrMaterial) => {
            meta3dState = push(deepCopy(meta3dState))

            console.log("dispose pbrMaterial:" + pbrMaterial)

            return new Promise((resolve) => {
                resolve(meta3dState)
            })
        }
        )
    }
}