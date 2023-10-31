import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { clickUIData } from "meta3d-ui-control-button-protocol"
import { actionName, state } from "meta3d-action-stop-protocol"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { eventName, inputData } from "meta3d-action-stop-protocol/src/EventType"
import { service as eventSourcingService } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
import { events } from "meta3d-event-sourcing-protocol/src/state/StateType"
import { actionName as runActionName } from "meta3d-action-run-protocol"
import { List } from "immutable"

let _getLastEventsToRun = (eventSourcingService: eventSourcingService, meta3dState: meta3dState) => {
    let allEvents = eventSourcingService.getAllEvents(meta3dState)

    let _func = (result: events, index: number): events => {
        if (index < 0) {
            throw new Error("not find run event")
        }

        let event = getExn(allEvents.get(index))

        result = result.push(event)

        if (event.name === runActionName) {
            return result
        }

        return _func(result, index - 1)
    }

    return _func(List(), allEvents.count() - 1).reverse()
}

// let _backwardEventsBeforeRun = (meta3dState: meta3dState, eventSourcingService: eventSourcingService, lastEventsToRun: events) => {
//     let allEvents = eventSourcingService.getAllEvents(meta3dState)

//     return eventSourcingService.replaceAllEvents(meta3dState, allEvents.slice(allEvents.count() - lastEventsToRun.count()))
// }

export let getContribute: getContributeMeta3D<actionContribute<clickUIData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol")

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState) => {
                    // debugger
                    let lastEventsToRun = _getLastEventsToRun(eventSourcingService, meta3dState)

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
            //console.log("stop")

            return new Promise<meta3dState>((resolve, reject) => {
                let eventSourcingService = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol")

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    inputData: []
                }))
            })

        },
        createState: () => null
    }
}
