import type { List, Map } from 'immutable';
import { state as meta3dState } from "meta3d-type"
import { gameObject } from "meta3d-gameobject-protocol"

type component = number

type domainModelId = gameObject | component

type primitiveData = string | number | boolean | Object | Array<primitiveData>

type valueObject = primitiveData

export type outsideData = ArrayBuffer

export type outsideDataId = string

export type singleInputData = outsideDataId | domainModelId | valueObject | outsideData

type eventName = string

export type eventData<inputData> = {
    name: eventName,
    // parent?: eventName,
    inputData: inputData
}

// type getOuptputData<outputData extends Array<any>> = outputData extends [] ? Promise<meta3dState> :
//     Promise<[meta3dState, ...outputData]>

// type handleFunc<inputData extends Array<singleInputData>, outputData extends Array<any>> = (meta3dState: meta3dState, ...inputData: inputData) =>
//     getOuptputData<outputData>
type handleFunc<inputData extends Array<singleInputData>> = (meta3dState: meta3dState, ...inputData: inputData) => Promise<meta3dState>

export type service = {
    init: (meta3dState: meta3dState) => meta3dState,
    on: <inputData extends Array<singleInputData>>(meta3dState: meta3dState, eventName: eventName, priority: number,
        forwardHandleFunc: handleFunc<inputData>,
        backwardHandleFunc: handleFunc<inputData>
    ) => meta3dState,
    addEvent: <inputData extends Array<singleInputData>> (meta3dState: meta3dState, eventData: eventData<inputData>) => meta3dState,
    addOutsideData: (meta3dState: meta3dState, outsideDataId: outsideDataId, outsideData: outsideData) => meta3dState,
    removeOutsideData: (meta3dState: meta3dState, outsideDataId: outsideDataId) => meta3dState,
    generateOutsideDataId: (meta3dState: meta3dState) => outsideDataId,
    getOutsideData: (meta3dState: meta3dState, outsideDataId: outsideDataId) => outsideData,
    getAllOutsideData: (meta3dState: meta3dState) => IterableIterator<[outsideDataId, outsideData]>,
    getAllOutsideDataFromGlobalThis: () => IterableIterator<[outsideDataId, outsideData]>,
    getAllEvents: <inputData extends Array<singleInputData>>(meta3dState: meta3dState) => List<eventData<inputData>>,
    getAllEventsFromGlobalThis: <inputData extends Array<singleInputData>>() => List<eventData<inputData>>,
    replaceAllEvents: <inputData extends Array<singleInputData>>(meta3dState: meta3dState, allEvents: List<eventData<inputData>>) => meta3dState,
    forwardView: <inputData extends Array<singleInputData>> (meta3dState: meta3dState, events: List<eventData<inputData>>) => Promise<meta3dState>,
    backwardView: <inputData extends Array<singleInputData>> (meta3dState: meta3dState, events: List<eventData<inputData>>) => Promise<meta3dState>,
}
