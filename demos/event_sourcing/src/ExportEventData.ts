import { service as eventSourcingService } from "./EventSourcing"
import { createMeta3dState } from "./Meta3dState"
import { push, undo } from "./RedoUndo"
import { eventData, eventName, export_eventData_event_inputData, export_eventData_event_outputData } from "./events"
import { gameObject, meta3dState, pbrMaterial } from "./type"

// declare function deepCopy(meta3dState): meta3dState

// declare function exportEventData(allEventData): eventData
// export declare function exportEventData(allEvents): void

let _download = (body: ArrayBuffer, filename: string, extension: string) => {
    const blob = new Blob([body], { type: "arraybuffer" });
    const fileName = filename + "." + extension;

    const link = document.createElement('a');

    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// TODO use BinaryFileOperator
// export let exportEventData = (allEvents, allOutsideData) => {
export let exportEventData = (allEvents) => {
    // let encoder = new TextEncoder()
    // let allEventsBuffer = encoder.encode(JSON.stringify(allEvents)).buffer

    // // TODO remove limit
    // if (allOutsideData.length != 1) {
    //     throw new Error("error")
    // }

    // let [outsideDataId1, outsideData1] = allOutsideData[0]

    // let outsideDataId1Buffer = encoder.encode(outsideDataId1).buffer


    // let allOutsideDataBuffer = new ArrayBuffer(outsideData1.byteLength + outsideDataId1Buffer.byteLength + 4)

    // let dataView = new DataView(allOutsideDataBuffer)
    // dataView.setUint32(0, outsideDataId1Buffer.byteLength)




    // let wholeBuffer = new ArrayBuffer(allEventsBuffer.byteLength + allOutsideDataBuffer.byteLength + 4)

    // dataView = new DataView(wholeBuffer)
    // dataView.setUint32(0, allEventsBuffer.byteLength)

    // _download(wholeBuffer, "wholeBuffer", "arraybuffer")



    TODO extract ArrayBuffer from allEvents:
    1.move them to another ArrayBuffer(outsideBufer)(with id)
    2.merge allEvents, outsideBufer
}

declare function generateSceneGlb(meta3dState): ArrayBuffer

declare function generateWholeAggregate(sceneGlb, allOutsideData): ArrayBuffer

export let service = {
    init: (meta3dState) => {
        return eventSourcingService.on<
            export_eventData_event_inputData,
            export_eventData_event_outputData
        >(meta3dState, eventName.export_eventData_event, (meta3dState, { isReset }) => {
            // // TODO refactor: duplicate
            // meta3dState = push(deepCopy(meta3dState))

            let allEvents
            if (!isReset) {
                // eventData = exportEventData(
                //     eventSourcingService.sliceEvent(
                //         eventSourcingService.getAllEvents(meta3dState),
                //         eventName.finish_init_event,
                //         null
                //     )
                // )
                allEvents = eventSourcingService.getAllEvents(meta3dState)
            }
            else {
                // eventData = exportEventData(
                //     eventSourcingService.getAllEvents(
                //         eventSourcingService.addEvent(
                //             createMeta3dState(),
                //             {
                //                 name: eventName.import_wholeAggregate_event,
                //                 inputData: [
                //                     generateWholeAggregate(
                //                         generateSceneGlb(meta3dState),
                //                         eventSourcingService.getAllOutsideData(meta3dState)
                //                     )
                //                 ]
                //             }
                //         )
                //     )
                // )
                allEvents = [
                    {
                        name: eventName.import_wholeAggregate_event,
                        inputData: [
                            generateWholeAggregate(
                                generateSceneGlb(meta3dState),
                                eventSourcingService.getAllOutsideData(meta3dState)
                            )
                        ]
                    }
                ]
            }

            // TODO fix
            // exportEventData(allEvents)

            return new Promise((resolve) => {
                resolve(meta3dState)
            })
        }, (meta3dState) => {
            return new Promise((resolve) => {
                resolve(undo(meta3dState))
            })
        }
        )
    },
    exportEventData: exportEventData
}