import { meta3dState, gameObject, pbrMaterial, outsideDataId } from "./type"

export enum eventName {
    get_current_gameObject_event = "get_current_gameObject_event",
    dispose_gameObject_event,
    dispose_pbrMaterial_event,
    import_eventData_event,
    export_eventData_event,
    load_glb_event,
    get_current_glb_id_event,
    add_glb_to_scene_event,
    import_wholeAggregate_event,
    undo,
    redo
}

// export type eventData = ArrayBuffer


type domainModelId = gameObject | pbrMaterial | number

type valueObject = string | number | boolean | Object | Array<valueObject>

export type outsideData = ArrayBuffer | HTMLElement

export type singleInputData = outsideDataId | domainModelId | valueObject | outsideData

export type eventData<inputData> = {
    // direction: "forwardView" | "backwardView",
    name: eventName,
    parent?: eventName,
    // inputData: Record<fieldName, outsideDataId | domainModelId | valueObject
    // >
    inputData: inputData
}


// export type events = {
//     backward_event: {
//         inputData: [meta3dState, eventName],
//         outputData: [meta3dState]
//     },
//     forward_event: {
//         inputData: [meta3dState, eventName],
//         outputData: [meta3dState]
//     },
//     dispose_gameObject_event: {
//         inputData: [meta3dState, gameObject],
//         outputData: [meta3dState]
//     },
//     dispose_pbrMaterial_event: {
//         inputData: [meta3dState, pbrMaterial],
//         outputData: [meta3dState]
//     },
//     import_eventData_event: {
//         inputData: [meta3dState, outsideDataId],
//         outputData: [meta3dState]
//     }
// }

// export type backward_event_inputData = [meta3dState, eventName]

// export type backward_event_outputData = meta3dState

// export type forward_event_inputData = [meta3dState, eventName]

// export type forward_event_outputData = meta3dState

// export type get_current_gameObject_event_inputData = meta3dState

// export type get_current_gameObject_event_outputData = [meta3dState, gameObject]

// export type dispose_gameObject_event_inputData = [meta3dState, gameObject]

// export type dispose_gameObject_event_outputData = meta3dState

// export type dispose_pbrMaterial_event_inputData = [meta3dState, pbrMaterial]

// export type dispose_pbrMaterial_event_outputData = meta3dState

// export type import_eventData_event_inputData = [meta3dState, outsideDataId]

// export type import_eventData_event_outputData = meta3dState


// export type backward_event_inputData = [eventName]

// export type backward_event_outputData = []

// export type forward_event_inputData = [eventName]

// export type forward_event_outputData = []

// export type finish_init_event_inputData = []

// export type finish_init_event_outputData = []

export type get_current_gameObject_event_inputData = [gameObject]

export type get_current_gameObject_event_outputData = []

export type dispose_gameObject_event_inputData = [gameObject]

export type dispose_gameObject_event_outputData = []

export type dispose_pbrMaterial_event_inputData = [pbrMaterial]

export type dispose_pbrMaterial_event_outputData = []

export type load_glb_event_inputData = [ArrayBuffer, outsideDataId]
// export type load_glb_event_inputData = [outsideDataId]

// export type load_glb_event_outputData = [outsideDataId]
export type load_glb_event_outputData = []

export type get_current_glb_id_event_inputData = [outsideDataId]

export type get_current_glb_id_event_outputData = []

export type add_glb_to_scene_event_inputData = [outsideDataId]

export type add_glb_to_scene_event_outputData = []

// export type import_eventData_event_inputData = [eventData]
// export type import_eventData_event_inputData = [Array<eventData<singleInputData>>, outsideDataId]
export type import_eventData_event_inputData = [Array<eventData<singleInputData>>]

export type import_eventData_event_outputData = []

export type export_eventData_event_inputData = [{
    isReset: boolean
}]

export type export_eventData_event_outputData = []

export type import_wholeAggregate_event_inputData = [ArrayBuffer]

export type import_wholeAggregate_event_outputData = []

export type undo_inputData = []

export type undo_outputData = []

export type redo_inputData = []

export type redo_outputData = []