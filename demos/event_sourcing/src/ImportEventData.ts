import { service as eventSourcingService } from "./EventSourcing"
import { createMeta3dState } from "./Meta3dState"
import { push, undo } from "./RedoUndo"
import { eventName, import_eventData_event_inputData, import_eventData_event_outputData } from "./events"
import { gameObject, meta3dState, pbrMaterial } from "./type"

// declare function deepCopy(meta3dState): meta3dState

// declare function parseEventData(eventData): Array<eventData<any>>

// declare function disposeAll(meta3dState): meta3dState
// let disposeAll = (meta3dState: meta3dState) => {
//     return {
//         ...meta3dState,
//         // eventManager: {
//         //     eventData: {}
//         // },
//         eventSourcing: {
//             ...meta3dState.eventSourcing,
//             // events: [],
//             outsideData: {}
//         }

//     }
// }

let _removeLastEventWhichIsImportEventData = (meta3dState) => {
    let allEvents = eventSourcingService.getAllEvents(meta3dState)

    if (allEvents[allEvents.length - 1].name !== eventName.import_eventData_event) {
        throw new Error("last event is not import_eventData_event")
    }

    return allEvents.slice(0, -1)
}

export let service = {
    init: (meta3dState) => {
        return eventSourcingService.on<
            import_eventData_event_inputData,
            import_eventData_event_outputData
        >(meta3dState, eventName.import_eventData_event, (meta3dState, allEvents) => {
            // // TODO refactor: duplicate
            // meta3dState = push(deepCopy(meta3dState))


            // meta3dState = disposeAll(meta3dState)
            return eventSourcingService.backwardView(
                meta3dState,
                _removeLastEventWhichIsImportEventData(meta3dState)
            ).then(meta3dState => {
                console.log("allOutsideData:", eventSourcingService.getAllOutsideData(meta3dState))

                meta3dState = eventSourcingService.replaceAllEvents(meta3dState,
                    // eventSourcingService.sliceEvent(
                    //     eventSourcingService.getAllEvents(meta3dState),
                    //     null,
                    //     eventName.finish_init_event
                    // ).concat(
                    //     parseEventData(eventData)
                    // )
                    // parseEventData(eventData)
                    allEvents
                )

                return eventSourcingService.forwardView<import_eventData_event_inputData>(meta3dState, eventSourcingService.getAllEvents(meta3dState))
            })
        }, (meta3dState, allEvents) => {
            // return new Promise((resolve) => {
            //     // resolve(undo(meta3dState))
            //     // TODO remove outsideData by id
            // })

            throw new Error("shouldn't trigger")
        }
        )
    }
}