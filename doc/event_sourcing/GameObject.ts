import { service as eventSourcingService } from "./EventSourcing"
import { push, undo } from "./RedoUndo"
import { eventName, dispose_gameObject_event_inputData, dispose_gameObject_event_outputData, dispose_pbrMaterial_event_inputData, dispose_pbrMaterial_event_outputData } from "./events"
import { meta3dState, pbrMaterial } from "./type"

declare function deepCopy(meta3dState): meta3dState

declare function getPBRMaterial(meta3dState, gameObject): pbrMaterial

export let service = {
    init: (meta3dState) => {
        return eventSourcingService.on<
            dispose_gameObject_event_inputData,
            dispose_gameObject_event_outputData
        >(meta3dState, eventName.dispose_gameObject_event, (meta3dState, gameObject) => {
            // TODO refactor: duplicate
            meta3dState = push(deepCopy(meta3dState))

            console.log("dispose gameObject:" + gameObject)

            return eventSourcingService.addEventAndUpdateView<dispose_pbrMaterial_event_inputData, dispose_pbrMaterial_event_outputData>(meta3dState, {
                name: eventName.dispose_pbrMaterial_event,
                parent: eventName.dispose_gameObject_event,
                inputData: [getPBRMaterial(meta3dState, gameObject)]
            })
        }, (meta3dState, gameObject) => {
            return new Promise((resolve) => {
                resolve(undo(meta3dState))
            })
        }
        )
    }
}