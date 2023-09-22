import { service as eventSourcingService, eventData } from "./EventSourcing"
import { createMeta3dState } from "./Meta3dState"
import { push, undo } from "./RedoUndo"
import { eventName, import_eventData_event_inputData, import_eventData_event_outputData } from "./events"
import { gameObject, meta3dState, pbrMaterial } from "./type"

declare function deepCopy(meta3dState): meta3dState

declare function parseEventData(eventData): Array<eventData<any>>

declare function disposeAll(meta3dState): meta3dState

export let service = {
    init: (meta3dState) => {
        eventSourcingService.on<
            import_eventData_event_inputData,
            import_eventData_event_outputData
        >(meta3dState, eventName.import_eventData_event, (meta3dState, eventData) => {
            // TODO refactor: duplicate
            meta3dState = push(deepCopy(meta3dState))


            meta3dState = disposeAll(meta3dState)


            meta3dState = eventSourcingService.replaceAllEvents(meta3dState,
                // eventSourcingService.sliceEvent(
                //     eventSourcingService.getAllEvents(meta3dState),
                //     null,
                //     eventName.finish_init_event
                // ).concat(
                //     parseEventData(eventData)
                // )
                parseEventData(eventData)
            )

            return eventSourcingService.updateView<import_eventData_event_outputData>(meta3dState)
        }, (meta3dState) => {
            return new Promise((resolve) => {
                resolve(undo(meta3dState))
            })
        }
        )
    }
}