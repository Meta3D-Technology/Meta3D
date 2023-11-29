// import type { List, Seq } from 'immutable';
import type { List } from 'immutable';
import { state as meta3dState } from "meta3d-type"
import { gameObject } from "meta3d-gameobject-protocol"
import { events } from '../state/StateType';
import { nullable } from 'meta3d-commonlib-ts/src/nullable';

type component = number

type domainModelId = gameObject | component

type primitiveData = string | number | boolean | Object | Array<primitiveData>

type valueObject = primitiveData

export type outsideImmutableData = ArrayBuffer

export type outsideImmutableDataId = string

export type singleInputData = nullable<outsideImmutableDataId | domainModelId | valueObject | outsideImmutableData>

type eventName = string

export type eventData<inputData> = {
    name: eventName,
    isOnlyRead?: boolean,
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
    createAllEvents: <inputData extends Array<singleInputData>> (allEventData: Array<eventData<inputData>>, meta3dState: meta3dState) => List<eventData<inputData>>,
    // addOutsideImmutableData: (meta3dState: meta3dState, outsideImmutableDataId: outsideImmutableDataId, outsideImmutableData: outsideImmutableData) => meta3dState,
    // removeOutsideImmutableData: (meta3dState: meta3dState, outsideImmutableDataId: outsideImmutableDataId) => meta3dState,
    generateOutsideImmutableDataId: (meta3dState: meta3dState) => outsideImmutableDataId,
    // getOutsideImmutableData: (meta3dState: meta3dState, outsideImmutableDataId: outsideImmutableDataId) => outsideImmutableData,
    // // TODO remove?
    // getAllOutsideImmutableData: (meta3dState: meta3dState) => Seq.Indexed<[outsideImmutableDataId, outsideImmutableData]>,
    // // TODO remove?
    // getAllOutsideImmutableDataFromGlobalThis: () => Seq.Indexed<[outsideImmutableDataId, outsideImmutableData]>,
    getAllEvents: <inputData extends Array<singleInputData>>(meta3dState: meta3dState) => List<eventData<inputData>>,
    getAllEventsFromGlobalThis: <inputData extends Array<singleInputData>>(meta3dState: meta3dState) => List<eventData<inputData>>,
    replaceAllEvents: <inputData extends Array<singleInputData>>(meta3dState: meta3dState, allEvents: List<eventData<inputData>>) => meta3dState,
    getNeedReplaceAllEvents: (meta3dState: meta3dState) => events,
    setNeedReplaceAllEvents: <inputData extends Array<singleInputData>>(meta3dState: meta3dState, allEvents: List<eventData<inputData>>) => meta3dState,
    getNeedBackwardEvents: (meta3dState: meta3dState) => events,
    setNeedBackwardEvents: <inputData extends Array<singleInputData>>(meta3dState: meta3dState, events: List<eventData<inputData>>) => meta3dState,
    cleanAllNeedReplaceEvents: (meta3dState: meta3dState) => meta3dState,
    cleanAllNeedBackwardEvents: (meta3dState: meta3dState) => meta3dState,
    forwardView: <inputData extends Array<singleInputData>> (meta3dState: meta3dState, events: List<eventData<inputData>>) => Promise<meta3dState>,
    backwardView: <inputData extends Array<singleInputData>> (meta3dState: meta3dState, events: List<eventData<inputData>>) => Promise<meta3dState>,
}
