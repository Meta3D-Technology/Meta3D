import { service as eventSourcingService } from "./EventSourcing"
import { push, undo } from "./RedoUndo"
import { add_glb_to_scene_event_inputData, add_glb_to_scene_event_outputData, eventName } from "./events"
import { gameObject, meta3dState, pbrMaterial } from "./type"

declare function deepCopy(meta3dState): meta3dState

declare function addGlbToScene(meta3dState, glb): meta3dState

export let service = {
    init: (meta3dState) => {
        eventSourcingService.on<
            add_glb_to_scene_event_inputData,
            add_glb_to_scene_event_outputData
        >(meta3dState, eventName.add_glb_to_scene_event, (meta3dState, glbId) => {
            // TODO refactor: duplicate
            meta3dState = push(deepCopy(meta3dState))

            let glb = eventSourcingService.getOutsideData(meta3dState, glbId)

            meta3dState = addGlbToScene(meta3dState, glb)

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