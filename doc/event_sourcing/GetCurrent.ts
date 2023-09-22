import { service as eventSourcingService } from "./EventSourcing"
import { push, undo } from "./RedoUndo"
import { eventName, get_current_gameObject_event_inputData, get_current_gameObject_event_outputData } from "./events"
import { gameObject, meta3dState, pbrMaterial } from "./type"

declare function deepCopy(meta3dState): meta3dState

export declare function getCurrentGameObject(meta3dState): gameObject

declare function setCurrentGameObject(meta3dState, gameObject: gameObject): meta3dState

export let service = {
    init: (meta3dState) => {
        return eventSourcingService.on<
            get_current_gameObject_event_inputData,
            get_current_gameObject_event_outputData
        >(meta3dState, eventName.get_current_gameObject_event, (meta3dState, gameObject) => {
            // TODO refactor: duplicate
            meta3dState = push(deepCopy(meta3dState))

            meta3dState = setCurrentGameObject(meta3dState, gameObject)

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