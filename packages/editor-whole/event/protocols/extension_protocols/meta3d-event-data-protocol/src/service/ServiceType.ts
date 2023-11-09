import { eventData, singleInputData } from "meta3d-event-sourcing-protocol/src/service/ServiceType"

export type service = {
    parseEventData: (eventData: ArrayBuffer) => Array<eventData<Array<singleInputData>>>
    // exportEventData: (allEvents: Array<eventData<Array<singleInputData>>>, filename: string, extension: string) => void,
    exportEventData: (allEvents: Array<eventData<Array<singleInputData>>>) => void,
}