import { service as eventSourcingService, outsideData } from "./EventSourcing"
import { push, undo } from "./RedoUndo"
import { eventName, import_wholeAggregate_event_inputData, import_wholeAggregate_event_outputData } from "./events"
import { gameObject, meta3dState, pbrMaterial } from "./type"

declare function deepCopy(meta3dState): meta3dState

type sceneGlb = ArrayBuffer

declare function parseWholeAggregate(wholeAggregate: ArrayBuffer): [sceneGlb, Array<outsideData>]

declare function loadScene(meta3dState, sceneGlb): meta3dState

export let service = {
    init: (meta3dState) => {
        return eventSourcingService.on<
            import_wholeAggregate_event_inputData,
            import_wholeAggregate_event_outputData
        >(meta3dState, eventName.import_wholeAggregate_event, (meta3dState, wholeAggregate) => {
            // TODO refactor: duplicate
            meta3dState = push(deepCopy(meta3dState))

            let [sceneGlb, allOutsideData] = parseWholeAggregate(wholeAggregate)

            meta3dState = loadScene(meta3dState, sceneGlb)

            meta3dState = allOutsideData.reduce((meta3dState, outsideData) => {
                return eventSourcingService.addOutsideData(meta3dState,
                    eventSourcingService.generateOutsideDataId(meta3dState),
                    outsideData
                )
            }, meta3dState)

            return new Promise((resolve) => {
                resolve(meta3dState)
            })
        }, (meta3dState) => {
            return new Promise((resolve) => {
                resolve(undo(meta3dState))
            })
        }
        )
    }
}