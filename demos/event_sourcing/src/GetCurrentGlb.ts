import { service as eventSourcingService } from "./EventSourcing"
import { push, undo } from "./RedoUndo"
import { eventName, get_current_glb_id_event_inputData, get_current_glb_id_event_outputData } from "./events"
import { gameObject, meta3dState, pbrMaterial } from "./type"

declare function deepCopy(meta3dState): meta3dState

export declare function getCurrentGlbId(meta3dState): string

declare function setCurrentGlbId(meta3dState, glbId: string): meta3dState

export let service = {
    init: (meta3dState) => {
        return eventSourcingService.on<
            get_current_glb_id_event_inputData,
            get_current_glb_id_event_outputData
        >(meta3dState, eventName.get_current_glb_id_event, (meta3dState, glbId) => {
            // TODO refactor: duplicate
            meta3dState = push(deepCopy(meta3dState))

            meta3dState = setCurrentGlbId(meta3dState, glbId)

            return new Promise((resolve) => {
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