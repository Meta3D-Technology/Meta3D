import { customEvent, pointData, pointEvent } from "meta3d-event-protocol/src/service/EventType.gen"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { rect } from "meta3d-type/src/contribute/UIControlProtocolConfigType"
import { target } from "meta3d-pipeline-webgl1-three-utils/src/Type";

export let getTarget = (): target => {
    return (globalThis as any)["meta3d_arcball_event_target_webrender"]
}

let _setTarget = (target: target) => {
    (globalThis as any)["meta3d_arcball_event_target_webrender"] = target
}

// export let getIsEventStop = () => {
//     return (globalThis as any)["isEventStop_webrender"]
// }

// export let setIsEventStop = (isEventStop: boolean) => {
//     (globalThis as any)["isEventStop_webrender"] = isEventStop
// }

// export let getIsEventStopForweb = () => {
//     return (globalThis as any)["isEventStop_web"]
// }

// export let setIsEventStopForweb = (isEventStop:boolean) => {
//     (globalThis as any)["isEventStop_web"] = isEventStop
// }

export let getDragOverLocation = () => {
    return (globalThis as any)["dragOverLocation_webrender"]
}

let _setDragOverLocation = (dragOverLocation: nullable<[number, number]>) => {
    (globalThis as any)["dragOverLocation_webrender"] = dragOverLocation
}

export let getYaw = () => {
    return (globalThis as any)["yaw_webrender"]
}

let _setYaw = (yaw: nullable<number>) => {
    (globalThis as any)["yaw_webrender"] = yaw
}

export let getPitch = () => {
    return (globalThis as any)["pitch_webrender"]
}

let _setPitch = (pitch: nullable<number>) => {
    (globalThis as any)["pitch_webrender"] = pitch
}


export let getWheel = () => {
    return (globalThis as any)["wheel_webrender"]
}

let _setWheel = (wheel: number) => {
    (globalThis as any)["wheel_webrender"] = wheel
}

export let reset = () => {
    _setDragOverLocation(null)
    _setYaw(null)
    _setPitch(null)
    _setWheel(0)

    _setTarget(target.Other)

    // setIsEventStop(false)
}

export let init = reset

let _isInView = ([x, y]: pointData<number>, viewRect: rect) => {
    return x >= viewRect.x && x <= (viewRect.x + viewRect.width)
        && y >= viewRect.y && y <= (viewRect.y + viewRect.height)
}

let _prepareBindEvent = (viewRect: rect) => {
    let moveWheel1 = true
    let moveWheel2 = false
    let wheelClock: any = null

    let _pointMoveHandleFunc = (event: customEvent) => {
        let { location } = getExn(event.userData) as any as pointEvent

        if (_isInView(location, viewRect)) {
            _setTarget(target.Web)
        }
        else {
            _setTarget(target.Other)
        }
    }

    let _pointDragOverHandleFunc = (event: customEvent) => {
        let { location, movementDelta } = getExn(event.userData) as any as pointEvent

        let x_dis = movementDelta[0]
        let y_dis = movementDelta[1]

        if (x_dis === 0 && y_dis === 0) {
            return
        }

        _setDragOverLocation(location)
        _setYaw(x_dis / 500)
        _setPitch(y_dis / 500)
    }

    let _stopWheel = () => {
        if (moveWheel2 == true) {
            moveWheel2 = false;
            moveWheel1 = true;

            _setWheel(0)
        }
    }

    let _pointDragScaleHandleFunc = (event: customEvent) => {
        if (moveWheel1 == true) {
            moveWheel1 = false;
            moveWheel2 = true;

            let { wheel } = getExn(event.userData) as any as pointEvent

            _setWheel(getExn(wheel))

            wheelClock = setTimeout(_stopWheel, 100);
        }
        else {
            clearTimeout(wheelClock);
            wheelClock = setTimeout(_stopWheel, 75);
        }
    }

    return [_pointMoveHandleFunc, _pointDragOverHandleFunc, _pointDragScaleHandleFunc]
}

export let bindEvent = ({ onCustomGlobalEvent, getPointMoveEventName, getPointDragOverEventName, getPointScaleEventName }: eventService, eventExtensionProtocolName: string, viewRect: rect) => {
    let [_pointMoveHandleFunc, _pointDragOverHandleFunc, _pointDragScaleHandleFunc] = _prepareBindEvent(viewRect)

    onCustomGlobalEvent(eventExtensionProtocolName, [getPointMoveEventName(), 0, _pointMoveHandleFunc])
    onCustomGlobalEvent(eventExtensionProtocolName, [getPointDragOverEventName(), 0, _pointDragOverHandleFunc])
    onCustomGlobalEvent(eventExtensionProtocolName, [getPointScaleEventName(), 0, _pointDragScaleHandleFunc])
}