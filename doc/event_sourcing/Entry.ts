// view:
// meta3dState

import { service as eventSourcingService } from "./EventSourcing"
import { createMeta3dState } from "./Meta3dState"
import { eventName, finish_init_event_inputData, finish_init_event_outputData } from "./events"
import { meta3dState } from "./type"
import { service as loadGlbActionService } from "./loadGlbAction"

// extension:
// events protocol
// event register, trigger
// event sourcing
//     event store
//     controller



// contribute:



// init:
// event data: empty
// scene data: scene glb(contain 1 gameObject+1 pbrMaterial)
// outside data:
// image

declare function drawUIs(meta3dState): meta3dState

let triggerUIActions = (meta3dState) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            loadGlbActionService.handler(meta3dState).then(meta3dState => {
                TODO trigger more
                resolve(meta3dState)
            })
        }, 1000)
    })
}

export let service = {
    init: () => {
        let meta3dState = createMeta3dState()

        console.log("init")

        // add finish init event(empty event) as key point
        return eventSourcingService.addEventAndUpdateView<finish_init_event_inputData, finish_init_event_outputData>(meta3dState, {
            name: eventName.finish_init_event,
            inputData: [
            ]
        })
    },
    update: (meta3dState) => {
        meta3dState = drawUIs(meta3dState)

        return triggerUIActions(meta3dState)
    }
}