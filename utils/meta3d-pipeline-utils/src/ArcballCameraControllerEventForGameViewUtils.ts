import { customEvent, pointData, pointEvent } from "meta3d-event-protocol/src/service/EventType.gen"
import { handleFunc } from "meta3d-event-protocol/src/service/ServiceType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"

let _pointDragOverHandleFunc: handleFunc

let _dragOverLocation: nullable<pointData<number>> = null
let _yaw: nullable<number> = null
let _pitch: nullable<number> = null

let _prepareBindEvent = () => {
    let _pointDragOverHandleFunc = (event: customEvent) => {
        let { location, movementDelta } = getExn(event.userData) as any as pointEvent

        let x_dis = movementDelta[0]
        let y_dis = movementDelta[1]

        if (x_dis === 0 && y_dis === 0) {
            return
        }

        _dragOverLocation = location
        _yaw = x_dis / 500
        _pitch = y_dis / 500
    }

    return _pointDragOverHandleFunc
}

export let bindEvent = ({ onCustomGlobalEvent, getPointDragOverEventName }: eventService, eventExtensionProtocolName: string) => {
    _pointDragOverHandleFunc = _prepareBindEvent()

    onCustomGlobalEvent(eventExtensionProtocolName, [getPointDragOverEventName(), 0, _pointDragOverHandleFunc])
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

export let reset = () => {
    _dragOverLocation = null
    _yaw = null
    _pitch = null
}

export let unbindEvent = ({ offCustomGlobalEventByHandleFunc, getPointDragOverEventName }: eventService, eventExtensionProtocolName: string) => {
    offCustomGlobalEventByHandleFunc(
        eventExtensionProtocolName,
        [
            getPointDragOverEventName(), _pointDragOverHandleFunc
        ]
    )
}