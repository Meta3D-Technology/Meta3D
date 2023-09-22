// event store
// controller



import { eventName } from "./events"
import { gameObject, meta3dState, nullable, outsideDataId, pbrMaterial } from "./type"


type store = {

}


type state = {
    store: store
}



// declare function onCustonGlobal(meta3dState, eventName, priority, handleFunc): meta3dState

// declare function trigger(meta3dState, eventName): Promise<meta3dState>



type domainModelId = gameObject | pbrMaterial | number

type valueObject = string | number | boolean | Object | Array<valueObject>


type inputData_ = outsideDataId | domainModelId | valueObject



export type outsideData = ArrayBuffer | HTMLElement

// type fieldName = string

export type eventData<inputData> = {
    // direction: "forward" | "backward",
    name: eventName,
    parent?: eventName,
    // inputData: Record<fieldName, outsideDataId | domainModelId | valueObject
    // >
    inputData: inputData
}


type getOuptputData<outputData extends Array<any>> = outputData extends [] ? Promise<meta3dState> :
    Promise<[meta3dState, ...outputData]>

// type handleFunc<inputData extends Array<any>, outputData extends (null | Array<any>)> = (meta3dState: meta3dState, ...inputData: inputData) => outputData extends null ? meta3dState : outputData extends Array<any> ? [meta3dState, ...outputData] : meta3dState
// type handleFunc<inputData extends null | Array<any>, outputData extends null | Array<any>> = (meta3dState: meta3dState, ...inputData: inputData) => outputData extends null ? Promise<meta3dState> : outputData extends Array<any> ? Promise<[meta3dState, ...outputData]> : Error
type handleFunc<inputData extends Array<inputData_>, outputData extends Array<any>> = (meta3dState: meta3dState, ...inputData: inputData) =>
    // outputData extends [] ? Promise<meta3dState> :
    // Promise<[meta3dState, ...outputData]>
    getOuptputData<outputData>

// type backwardHandleFunc<inputData, outputData> = (meta3dState: meta3dState, inputData: inputData) => outputData

export type service = {
    // on: <inputData, outputData>(meta3dState, eventName: eventName, handleFunc: handleFunc<inputData, outputData>) => meta3dState,
    on: <inputData extends Array<inputData_>, outputData extends Array<any>>(meta3dState, eventName: eventName,
        forwardHandleFunc: handleFunc<inputData, outputData>,
        // TODO fix inputData?
        backwardHandleFunc?: handleFunc<inputData, []>
    ) => meta3dState,
    updateView: <outputData extends Array<any>> (meta3dState, targetEventName?: eventName) => getOuptputData<outputData>,
    addEvent: <inputData> (meta3dState, eventData: eventData<inputData>) => meta3dState,
    addEventAndUpdateView: <inputData, outputData extends Array<any>> (meta3dState, eventData: eventData<inputData>) => getOuptputData<outputData>,
    addOutsideData: (meta3dState, outsideDataId: outsideDataId, outsideData: outsideData) => meta3dState,
    generateOutsideDataId: (meta3dState) => outsideDataId,
    getOutsideData: (meta3dState, outsideDataId: outsideDataId) => outsideData,
    getAllOutsideData: (meta3dState) => Array<outsideData>,
    // getEventsAndOutsideData: <inputData>(meta3dState) => [Array<eventData<inputData>>, Array<outsideData>],
    getAllEvents: <inputData>(meta3dState) => Array<eventData<inputData>>,
    sliceEvent: <inputData>(eventData: Array<eventData<inputData>>, fromEventName: nullable<eventName>, toEventName: nullable<eventName>) => Array<eventData<inputData>>,
    replaceAllEvents: <inputData>(meta3dState, allEvents: Array<eventData<inputData>>) => meta3dState,
    // backward
    // forward
}

// TODO implement
export let service: service = null as any as service