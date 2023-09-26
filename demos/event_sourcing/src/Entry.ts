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
// import { service as undoService } from "./Undo"
// import { service as redoService } from "./Redo"
import { service as multiEditService } from "./multi_edit/client/MultiEdit"

// declare function drawUIs(meta3dState): meta3dState
let drawUIs = (meta3dState) => {
return meta3dState
}

let _triggerUIActions = (meta3dState: meta3dState): Promise<meta3dState> => {
    if (globalThis["load-glb"] === true) {
        globalThis["load-glb"] = false

        return loadGlbActionService.handler(meta3dState)
    }

    // if (globalThis["add-glb"] === true) {
    //     globalThis["add-glb"] = false

    //     return addGlbToSceneActionService.handler(meta3dState)
    // }

    // if (globalThis["export"] === true) {
    //     globalThis["export"] = false

    //     return exportEventDataActionService.handler(meta3dState, false)
    // }

    // if (globalThis["import"] === true) {
    //     globalThis["import"] = false

    //     return importEventDataActionService.handler(meta3dState)
    // }

    // if (globalThis["undo"] === true) {
    //     globalThis["undo"] = false

    //     return undoActionService.handler(meta3dState)
    // }

    // if (globalThis["redo"] === true) {
    //     globalThis["redo"] = false

    //     return redoActionService.handler(meta3dState)
    // }

    return Promise.resolve(meta3dState)

    // return loadGlbActionService.handler(meta3dState).then(meta3dState => {
    //     return getCurrentGlbActionService.handler(meta3dState).then((meta3dState) => {
    //         return addGlbToSceneActionService.handler(meta3dState).then(meta3dState => {
    //             throw new Error("error")

    //             return exportEventDataActionService.handler(meta3dState, false)
    //         })
    //     })
    // })
    //     .then(meta3dState => {
    //         return undoActionService.handler(meta3dState).then(meta3dState => {
    //             return undoActionService.handler(meta3dState).then(meta3dState => {
    //                 // TODO log
    //                 return redoActionService.handler(meta3dState).then(meta3dState => {
    //                     // TODO log

    //                     // resolve(meta3dState)
    //                     return meta3dState
    //                 })
    //             })
    //         })
    //     })
}

export let service = {
    init: () => {
        let meta3dState = createMeta3dState()

        // meta3dState = importEventDataService.init(meta3dState)
        // meta3dState = exportEventDataService.init(meta3dState)
        // meta3dState = getCurrentGlbService.init(meta3dState)
        meta3dState = loadGlbService.init(meta3dState)
        // meta3dState = importWholeAggregateService.init(meta3dState)
        // meta3dState = addGlbToSceneService.init(meta3dState)
        // meta3dState = undoService.init(meta3dState)
        // meta3dState = redoService.init(meta3dState)


        meta3dState = multiEditService.init(meta3dState)


        console.log("init")

        // add finish init event(empty event) as key point
        // return eventSourcingService.addEvent<finish_init_event_inputData>(meta3dState, {
        //     name: eventName.finish_init_event,
        //     inputData: [
        //     ]
        // })
        return new Promise((resolve, reject) => {
            resolve(meta3dState)
        })
    },
    update: (meta3dState) => {
        try {
            meta3dState = drawUIs(meta3dState)

            return _triggerUIActions(meta3dState).then(meta3dState => {
                return multiEditService.sync(meta3dState)
            })
        } catch (e) {
            console.error(e);

            // exportEventDataService.exportEventData(eventSourcingService.getAllEventsFromGlobalThis())
        }
    }
}