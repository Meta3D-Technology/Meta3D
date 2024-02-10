import { nullable } from "meta3d-commonlib-ts/src/nullable";
import { eventData } from "meta3d-event-sourcing-protocol/src/service/ServiceType";

let _getImportDataEventName = () => "ImportDataEvent"

export let buildAllEventsOnlyHasImportDataEvent = (sceneGLB: ArrayBuffer, assetData: nullable<ArrayBuffer>): Array<eventData<[ArrayBuffer, nullable<ArrayBuffer>]>> => {
    return [
        {
            name: _getImportDataEventName(),
            isOnlyRead: false,
            inputData: [sceneGLB, assetData],
        },
    ]
}