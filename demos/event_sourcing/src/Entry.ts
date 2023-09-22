import { service as eventSourcingService } from "./EventSourcing"
import { createMeta3dState } from "./Meta3dState"
import { eventName } from "./events"
import { meta3dState } from "./type"
import { service as loadGlbActionService } from "./loadGlbAction"
import { service as getCurrentGlbActionService } from "./GetCurrentGlbAction"
import { service as addGlbToSceneActionService } from "./AddGlbToSceneAction"
import { service as exportEventDataActionService } from "./ExportEventDataAction"
import { service as importEventDataActionService } from "./ImportEventDataAction"
import { service as undoActionService } from "./UndoAction"
import { service as redoActionService } from "./RedoAction"
import { service as loadGlbService } from "./LoadGlb"
import { service as getCurrentGlbService } from "./GetCurrentGlb"
import { service as addGlbToSceneService } from "./AddGlbToScene"
import { service as exportEventDataService } from "./ExportEventData"
import { service as importEventDataService } from "./ImportEventData"
import { service as importWholeAggregateService } from "./ImportWholeAggregate"
import { service as undoService } from "./Undo"
import { service as redoService } from "./Redo"

declare function drawUIs(meta3dState): meta3dState

let triggerUIActions = (meta3dState) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            loadGlbActionService.handler(meta3dState).then(meta3dState => {
                return getCurrentGlbActionService.handler(meta3dState).then((meta3dState) => {
                    return addGlbToSceneActionService.handler(meta3dState).then(meta3dState => {
                        return exportEventDataActionService.handler(meta3dState)
                    })
                })
            })
                .then(meta3dState => {
                    undoActionService.handler(meta3dState).then(meta3dState => {
                        undoActionService.handler(meta3dState).then(meta3dState => {
                            // TODO log
                            redoActionService.handler(meta3dState).then(meta3dState => {
                                // TODO log

                                resolve(meta3dState)
                            })
                        })
                    })
                })
        }, 1000)
    })
}

export let service = {
    init: () => {
        let meta3dState = createMeta3dState()

        meta3dState = importEventDataService.init(meta3dState)
        meta3dState = exportEventDataService.init(meta3dState)
        meta3dState = getCurrentGlbService.init(meta3dState)
        meta3dState = loadGlbService.init(meta3dState)
        meta3dState = importWholeAggregateService.init(meta3dState)
        meta3dState = addGlbToSceneService.init(meta3dState)
        meta3dState = undoService.init(meta3dState)
        meta3dState = redoService.init(meta3dState)

        console.log("init")

        // add finish init event(empty event) as key point
        // return eventSourcingService.addEventAndUpdateView<finish_init_event_inputData, finish_init_event_outputData>(meta3dState, {
        //     name: eventName.finish_init_event,
        //     inputData: [
        //     ]
        // })
        return new Promise((resolve, reject) => {
            resolve(meta3dState)

        })
    },
    update: (meta3dState) => {
        meta3dState = drawUIs(meta3dState)

        return triggerUIActions(meta3dState)
    }
}