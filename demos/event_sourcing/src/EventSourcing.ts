// event store
// controller



import { eventData, eventName, inputData_, outsideData } from "./events"
import { gameObject, meta3dState, nullable, outsideDataId, pbrMaterial } from "./type"
import { service as eventManagerService } from "./EventManager"


type store = {

}


type state = {
    store: store
}



// declare function onCustonGlobal(meta3dState, eventName, priority, handleFunc): meta3dState

// declare function trigger(meta3dState, eventName): Promise<meta3dState>





// type fieldName = string


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
    init: (meta3dState) => meta3dState,
    // on: <inputData, outputData>(meta3dState, eventName: eventName, handleFunc: handleFunc<inputData, outputData>) => meta3dState,
    on: <inputData extends Array<inputData_>, outputData extends Array<any>>(meta3dState, eventName: eventName,
        forwardHandleFunc: handleFunc<inputData, outputData>,
        // backwardHandleFunc?: handleFunc<inputData, []>
        backwardHandleFunc: handleFunc<inputData, []>
    ) => meta3dState,
    // updateView: <outputData extends Array<any>> (meta3dState, targetEventName?: eventName) => getOuptputData<outputData>,
    //share all events in meta3dState, globalThis
    addEvent: <inputData> (meta3dState, eventData: eventData<inputData>) => meta3dState,
    // addEventAndUpdateView: <inputData, outputData extends Array<any>> (meta3dState, eventData: eventData<inputData>) => getOuptputData<outputData>,
    addOutsideData: (meta3dState, outsideDataId: outsideDataId, outsideData: outsideData) => meta3dState,
    removeOutsideData: (meta3dState, outsideDataId: outsideDataId) => meta3dState,
    // removeOutsideData: (meta3dState, outsideData: outsideData) => meta3dState,
    generateOutsideDataId: (meta3dState) => outsideDataId,
    getOutsideData: (meta3dState, outsideDataId: outsideDataId) => outsideData,
    // getAllOutsideData: (meta3dState) => Array<outsideData>,
    getAllOutsideData: (meta3dState) => Array<[outsideDataId, outsideData]>,
    getAllOutsideDataFromGlobalThis: () => Array<[outsideDataId, outsideData]>,
    // getEventsAndOutsideData: <inputData>(meta3dState) => [Array<eventData<inputData>>, Array<outsideData>],
    getAllEvents: <inputData>(meta3dState) => Array<eventData<inputData>>,
    getAllEventsFromGlobalThis: <inputData>() => Array<eventData<inputData>>,
    // sliceEvent: <inputData>(eventData: Array<eventData<inputData>>, fromEventName: nullable<eventName>, toEventName: nullable<eventName>) => Array<eventData<inputData>>,
    replaceAllEvents: <inputData>(meta3dState, allEvents: Array<eventData<inputData>>) => meta3dState,
    forwardView: <inputData> (meta3dState, events: Array<eventData<inputData>>) => Promise<meta3dState>,
    backwardView: <inputData> (meta3dState, events: Array<eventData<inputData>>) => Promise<meta3dState>,
}

// export let service: service = null as any as service
export let service: service = {
    init: (meta3dState) => {
        globalThis["events"] = []
        globalThis["outsideData"] = {}

        return meta3dState
    },
    on: (meta3dState, eventName,
        forwardHandleFunc,
        backwardHandleFunc
    ) => {
        meta3dState = eventManagerService.on(meta3dState, eventName + "_forward", forwardHandleFunc)
        meta3dState = eventManagerService.on(meta3dState, eventName + "_backward", backwardHandleFunc)

        return meta3dState
    },
    addEvent: (meta3dState, eventData) => {
        meta3dState.eventSourcing.events.push(eventData)

        globalThis["events"] = meta3dState.eventSourcing.events

        return meta3dState
    },
    addOutsideData: (meta3dState, outsideDataId, outsideData) => {
        meta3dState.eventSourcing.outsideData[outsideDataId] = outsideData

        globalThis["outsideData"] = meta3dState.eventSourcing.outsideData

        return meta3dState
    },
    removeOutsideData: (meta3dState, outsideDataId) => {
        delete meta3dState.eventSourcing.outsideData[outsideDataId]

        globalThis["outsideData"] = meta3dState.eventSourcing.outsideData

        return meta3dState
    },
    // removeOutsideData: (meta3dState, outsideData) => {
    //     for (let id in meta3dState.eventSourcing.outsideData) {
    //         if (meta3dState.eventSourcing.outsideData[id] === outsideData) {
    //             delete meta3dState.eventSourcing.outsideData[id]
    //         }
    //     }

    //     globalThis["outsideData"] = meta3dState.eventSourcing.outsideData

    //     return meta3dState
    // },
    generateOutsideDataId: (meta3dState) => {
        // return Math.floor(Math.random() * 100000000).toString()
        // TODO fix
        return "1"
    },
    getOutsideData: (meta3dState, outsideDataId) => {
        return meta3dState.eventSourcing.outsideData[outsideDataId]
    },
    getAllOutsideData: (meta3dState) => {
        return Object.entries(meta3dState.eventSourcing.outsideData)
    },
    getAllOutsideDataFromGlobalThis: () => {
        return Object.entries(globalThis["outsideData"])
    },
    getAllEvents: (meta3dState) => {
        return meta3dState.eventSourcing.events.slice()
    },
    getAllEventsFromGlobalThis: () => {
        return globalThis["events"]
    },
    replaceAllEvents: (meta3dState, allEvents) => {
        meta3dState.eventSourcing.events = allEvents

        return meta3dState
    },
    forwardView: (meta3dState, events) => {
        let _func = (meta3dState, index) => {
            if (index >= events.length) {
                return Promise.resolve(meta3dState)
            }

            let { name, inputData } = events[index]

            return eventManagerService.trigger(meta3dState, name + "_forward", inputData).then(meta3dState => {
                return _func(meta3dState, index + 1)
            })
        }

        return _func(meta3dState, 0)
    },
    backwardView: (meta3dState, events) => {
        let _func = (meta3dState, index) => {
            if (index < 0) {
                return Promise.resolve(meta3dState)
            }

            let { name, inputData } = events[index]

            return eventManagerService.trigger(meta3dState, name + "_backward", inputData).then(meta3dState => {
                return _func(meta3dState, index - 1)
            })
        }

        return _func(meta3dState, events.length - 1)
    }
}