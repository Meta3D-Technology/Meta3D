import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState, api } from "meta3d-type"
import { state } from "meta3d-editor-whole-protocol/src/state/StateType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { service as eventSourcingService } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
import { events } from "meta3d-event-sourcing-protocol/src/state/StateType"
// import { requireCheck, test } from "meta3d-ts-contract-utils"

let _isCurrentAllEventsNotContainPrevious = (currentAllEvents: events, previousAllEvents: events) => {
    let result = previousAllEvents.reduce((result, { name }, index) => {
        if (!result) {
            return result
        }

        if (name !== currentAllEvents.get(index).name) {
            return false
        }

        return result
    }, true)

    return result && currentAllEvents.count() < previousAllEvents.count()
}

let _getAddedEvents = (eventSourcingService: eventSourcingService, meta3dState, previousAllEvents: events) => {
    let currentAllEvents = eventSourcingService.getAllEvents(meta3dState)

    if (_isCurrentAllEventsNotContainPrevious(currentAllEvents, previousAllEvents)) {
        throw new Error("current all events should contain previous all events")
    }

    return currentAllEvents.slice(previousAllEvents.count())
}

// let _checkOnlyHasImportEvent = (eventSourcingService: eventSourcingService, meta3dState: meta3dState) => {
//     requireCheck(() => {
//         test("should only has import event", () => {
//             let allEvents = eventSourcingService.getAllEvents(meta3dState)

//             return allEvents.count() == 1 && getExn(allEvents.last()).name == eventName
//         })
//     }, true)
// }


export let sync = (meta3dState: meta3dState, api: api) => {
    let state = api.getExtensionState<state>(meta3dState, "meta3d-editor-whole-protocol")

    let eventSourcingService = getExn(api.getPackageService<eventService>(meta3dState, "meta3d-event-sourcing-protocol")).eventSourcing(meta3dState)

    let promise = null
    if (eventSourcingService.getNeedBackwardEvents(meta3dState).count() > 0) {
        let events = eventSourcingService.getNeedBackwardEvents(meta3dState)

        meta3dState = eventSourcingService.cleanAllNeedBackwardEvents(meta3dState)

        let allEvents = eventSourcingService.getAllEvents(meta3dState)

        promise = eventSourcingService.backwardView(
            meta3dState,
            events
        ).then(meta3dState => {
            return eventSourcingService.replaceAllEvents(meta3dState, allEvents.slice(0, allEvents.count() - events.count()))
        })
        // .then(meta3dState => {
        // 	return eventSourcingService.cleanAllNeedEvents(meta3dState)
        // })
    }
    else if (eventSourcingService.getNeedReplaceAllEvents(meta3dState).count() > 0) {
        // _checkOnlyHasImportEvent(eventSourcingService, meta3dState)
        // _checkOutsideImmutableDataIsEmpty(eventSourcingService, meta3dState)

        let events = eventSourcingService.getNeedReplaceAllEvents(meta3dState)

        meta3dState = eventSourcingService.cleanAllNeedReplaceEvents(meta3dState)

        meta3dState = eventSourcingService.replaceAllEvents(meta3dState, events)

        promise = eventSourcingService.forwardView(
            meta3dState,
            events
        )
        // .then(meta3dState => {
        // 	return eventSourcingService.cleanAllNeedEvents(meta3dState)
        // })
    }
    else {
        let addedEvents = _getAddedEvents(
            eventSourcingService,
            meta3dState, state.currentAllEvents)

        promise = eventSourcingService.forwardView(meta3dState, addedEvents)
    }

    return promise.then(meta3dState => {
        return api.setExtensionState<state>(meta3dState, "meta3d-editor-whole-protocol", {
            ...api.getExtensionState<state>(meta3dState, "meta3d-editor-whole-protocol"),
            currentAllEvents: eventSourcingService.getAllEvents(meta3dState)
        })
    })
}