import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { clickUIData } from "meta3d-ui-control-button-protocol"
import { actionName, state } from "meta3d-action-stop-protocol"
import { eventName, inputData } from "meta3d-action-stop-protocol/src/EventType"
// import { service as eventSourcingService } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { eventSourcingService, events } from "meta3d-event-protocol/src/service/ServiceType"
// import { actionName as runActionName, evenam } from "meta3d-action-run-protocol"
import { eventName as runEventName } from "meta3d-action-run-protocol/src/EventType"

let _getLastEventsToRun = (eventSourcingService: eventSourcingService, api: api, meta3dState: meta3dState) => {
    let allEvents = eventSourcingService.getAllEvents(meta3dState)

    let _func = (result: events, index: number): events => {
        if (index < 0) {
            throw new Error("not find run event")
        }

        let event = api.nullable.getExn(allEvents.get(index))

        result = result.push(event)

        if (event.name === runEventName) {
            return result
        }

        return _func(result, index - 1)
    }

    return _func(api.immutable.createList(meta3dState), allEvents.count() - 1).reverse()
}

// let _backwardEventsBeforeRun = (meta3dState: meta3dState, eventSourcingService: eventSourcingService, lastEventsToRun: events) => {
//     let allEvents = eventSourcingService.getAllEvents(meta3dState)

//     return eventSourcingService.replaceAllEvents(meta3dState, allEvents.slice(allEvents.count() - lastEventsToRun.count()))
// }

export let getContribute: getContributeMeta3D<actionContribute<clickUIData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState) => {
                    let lastEventsToRun = _getLastEventsToRun(eventSourcingService, api, meta3dState)

                    // return eventSourcingService.backwardView(
                    //     meta3dState,
                    //     lastEventsToRun
                    // ).then(meta3dState => {
                    //     return _backwardEventsBeforeRun(meta3dState, eventSourcingService, lastEventsToRun)
                    // })

                    return new Promise((resolve, reject) => {
                        resolve(eventSourcingService.setNeedBackwardEvents(meta3dState, lastEventsToRun))
                    })
                }, (meta3dState) => {
                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            return new Promise<meta3dState>((resolve, reject) => {
                let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    inputData: []
                }))
            })

        },
        createState: () => null
    }
}
