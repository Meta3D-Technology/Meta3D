import { state } from "meta3d-event-protocol/src/state/StateType"
import { customEvent, pointData, pointEvent } from "meta3d-event-protocol/src/service/EventType.gen"
// import { service as engineWholeService } from "meta3d-engine-whole-protocol/src/service/ServiceType"
// import { arcballCameraController } from "meta3d-component-arcballcameracontroller-protocol/src/Index"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"

// let pointDragStartHandleFunc:customEventHandleFunc, pointDragOverHandleFunc:customEventHandleFunc, pointDragDropHandleFunc:customEventHandleFunc

let _dragOverLocation: nullable<pointData<number>> = null
let _yaw: nullable<number> = null
let _pitch: nullable<number> = null

// let _prepareBindEvent = ({ scene }: engineWholeService, arcballCameraController: arcballCameraController) => {
let _prepareBindEvent = () => {
    // let _pointDragStartHandleFunc = (event: customEvent, state: state): [state, customEvent] => {
    //     return [state, event]
    // }

    // let _pointDragOverHandleFunc = (event: customEvent, state: state): [state, customEvent] => {
    let _pointDragOverHandleFunc = (event: customEvent) => {
        let { location, movementDelta } = getExn(event.userData) as any as pointEvent

        let x_dis = movementDelta[0]
        let y_dis = movementDelta[1]

        if (x_dis === 0 && y_dis === 0) {
            // return [state, event]
            return
        }

        // let _yaw = x_dis / 500
        // let _pitch = y_dis / 500

        // let { getTheta, setTheta, getPhi, setPhi } = scene.arcballCameraController

        // setTheta(arcballCameraController, getExn(getTheta(arcballCameraController)) - _pitch)
        // setPhi(arcballCameraController, getExn(getPhi(arcballCameraController)) - _yaw)

        _dragOverLocation = location
        _yaw = x_dis / 500
        _pitch = y_dis / 500

        // return [state, event]
    }

    // let _pointDragDropHandleFunc = (event: customEvent, state: state): [state, customEvent] => {
    //     return [state, event]
    // }

    // pointDragStartHandleFunc = _pointDragStartHandleFunc
    // pointDragOverHandleFunc = _pointDragOverHandleFunc
    // pointDragDropHandleFunc = _pointDragDropHandleFunc

    // return [_pointDragStartHandleFunc, _pointDragOverHandleFunc, _pointDragDropHandleFunc]
    return _pointDragOverHandleFunc
}

export let bindEvent = ({ onCustomGlobalEvent, getPointDragOverEventName }: eventService, eventExtensionProtocolName: string) => {
    // let [_pointDragStartHandleFunc, _pointDragOverHandleFunc, _pointDragDropHandleFunc] = _prepareBindEvent(repo, arcballCameraController)
    let _pointDragOverHandleFunc = _prepareBindEvent()

    // onCustomGlobalEvent(getPointDragStartEventName(), 0, _pointDragStartHandleFunc)
    onCustomGlobalEvent(eventExtensionProtocolName, [getPointDragOverEventName(), 0, _pointDragOverHandleFunc])
    // onCustomGlobalEvent(getPointDragDropEventName(), 0, _pointDragDropHandleFunc)
}

export let getDragOverLocation = () => {
    return _dragOverLocation
}

export let getYaw = () => {
    return _yaw
}

export let getPitch = () => {
    return _pitch
}

// export let unbindEvent = () => {
//     offCustomGlobalEventByHandleFunc(getPointDragStartEventName(), pointDragStartHandleFunc)
//     offCustomGlobalEventByHandleFunc(getPointDragOverEventName(), pointDragOverHandleFunc)
//     offCustomGlobalEventByHandleFunc(getPointDragDropEventName(), pointDragDropHandleFunc)
// }