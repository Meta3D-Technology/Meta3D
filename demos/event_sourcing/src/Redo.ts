// import { service as eventSourcingService, eventData } from "./EventSourcing"
// import { getLastStepEvents } from "./Undo"
// import { eventName, redo_inputData, redo_outputData } from "./events"
// import { meta3dState, pbrMaterial } from "./type"

// export let service = {
//     init: (meta3dState) => {
//         return eventSourcingService.on<
//             redo_inputData,
//             redo_outputData
//         >(meta3dState, eventName.redo, (meta3dState) => {
//             let lastStepEvents = getLastStepEvents(meta3dState)

//             return eventSourcingService.forwardView(meta3dState, lastStepEvents)
//         }
//         )
//     }
// }