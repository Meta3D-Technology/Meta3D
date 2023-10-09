import { service as eventSourcingService } from "./EventSourcing"
import { eventData, eventName, undo_inputData, undo_outputData } from "./events"
import { meta3dState, pbrMaterial } from "./type"

// declare function _getLastStepEvents(allEvents): Array<eventData<any>>
let _getLastStepEvents = (allEvents) => {
    // TODO get no parent

    return [allEvents[allEvents.length - 1]]
}

let _lastStepEvents = null
// declare function saveLastStepEvents(meta3dState, lastStepEvents): meta3dState
let saveLastStepEvents = (meta3dState, lastStepEvents) => {
    _lastStepEvents = lastStepEvents

    return meta3dState
}

// export declare function getLastStepEvents(meta3dState): Array<eventData<any>>
export let getLastStepEvents = (meta3dState) => {
    return _lastStepEvents
}

export let service = {
    init: (meta3dState) => {
        return eventSourcingService.on<
            undo_inputData,
            undo_outputData
        >(meta3dState, eventName.undo, (meta3dState) => {
            let lastStepEvents = _getLastStepEvents(eventSourcingService.getAllEvents(meta3dState))

            // TODO update events
            return eventSourcingService.backwardView(meta3dState, lastStepEvents).then(meta3dState => {
                meta3dState = saveLastStepEvents(meta3dState, lastStepEvents)

                return meta3dState
            })
        }, (meta3dState) => {
            throw new Error("not implement")
        }
        )
    }
}