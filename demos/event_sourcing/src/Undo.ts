// import { service as eventSourcingService, eventData } from "./EventSourcing"
// import { eventName, undo_inputData, undo_outputData } from "./events"
// import { meta3dState, pbrMaterial } from "./type"

// declare function _getLastStepEvents(allEvents): Array<eventData<any>>

// declare function saveLastStepEvents(meta3dState, lastStepEvents): meta3dState

// export declare function getLastStepEvents(meta3dState): Array<eventData<any>>

// export let service = {
//     init: (meta3dState) => {
//         return eventSourcingService.on<
//             undo_inputData,
//             undo_outputData
//         >(meta3dState, eventName.undo, (meta3dState) => {
//             let lastStepEvents = _getLastStepEvents(eventSourcingService.getAllEvents(meta3dState))

//             return eventSourcingService.backward(meta3dState, lastStepEvents).then(meta3dState => {
//                 meta3dState = saveLastStepEvents(meta3dState, lastStepEvents)

//                 return meta3dState
//             })
//         }
//         )
//     }
// }