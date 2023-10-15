import { customEvent, pointData, pointEvent } from "meta3d-event-protocol/src/service/EventType.gen"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { rect } from "meta3d-type/src/contribute/UIControlProtocolConfigType"

export enum target {
    SceneView,
    GameView,
    Other
}

export let getTarget = ():target => {
    return (globalThis as any)["meta3d_arcball_event_target"]
}

let _setTarget = (target: target) => {
    (globalThis as any)["meta3d_arcball_event_target"] = target
}

export let getIsEventStopForSceneView = () => {
    return (globalThis as any)["isEventStop_sceneview"]
}

export let setIsEventStopForSceneView = (isEventStop:boolean) => {
    (globalThis as any)["isEventStop_sceneview"] = isEventStop
}

export let getIsEventStopForGameView = () => {
    return (globalThis as any)["isEventStop_gameview"]
}

export let setIsEventStopForGameView = (isEventStop:boolean) => {
    (globalThis as any)["isEventStop_gameview"] = isEventStop
}

export let getDragOverLocation = () => {
    return (globalThis as any)["dragOverLocation"]
}

let _setDragOverLocation = (dragOverLocation: nullable<[number, number]>) => {
    (globalThis as any)["dragOverLocation"] = dragOverLocation
}

export let getYaw = () => {
    return (globalThis as any)["yaw"]
}

let _setYaw = (yaw: nullable<number>) => {
    (globalThis as any)["yaw"] = yaw
}

export let getPitch = () => {
    return (globalThis as any)["pitch"]
}

let _setPitch = (pitch: nullable<number>) => {
    (globalThis as any)["pitch"] = pitch
}


export let getWheel = () => {
    return (globalThis as any)["wheel"]
}

let _setWheel = (wheel: number) => {
    (globalThis as any)["wheel"] = wheel
}

// let _getPointDragOverHandleFunc = () => {
//     return (globalThis as any)["pointDragOverHandle"]
// }

// let _setPointDragOverHandle = (handleFunc: nullable<handleFunc>) => {
//     (globalThis as any)["pointDragOverHandle"] = handleFunc
// }

// let _getPointDragScaleHandleFunc = () => {
//     return (globalThis as any)["pointDragScaleHandle"]
// }

// let _setPointDragScaleHandle = (handleFunc: nullable<handleFunc>) => {
//     (globalThis as any)["pointDragScaleHandle"] = handleFunc
// }

// let _getPointDragOverHandleFuncForGameView = () => {
//     return (globalThis as any)["pointDragOverHandle_gameview"]
// }

// let _setPointDragOverHandleForGameView = (handleFunc: nullable<handleFunc>) => {
//     (globalThis as any)["pointDragOverHandle_gameview"] = handleFunc
// }

// let _getPointDragScaleHandleFuncForGameView = () => {
//     return (globalThis as any)["pointDragScaleHandle_gameview"]
// }

// let _setPointDragScaleHandleForGameView = (handleFunc: nullable<handleFunc>) => {
//     (globalThis as any)["pointDragScaleHandle_gameview"] = handleFunc
// }

export let reset = () => {
    _setDragOverLocation(null)
    // _setDragOverLocationForGameView(null)
    _setYaw(null)
    // _setYawForGameView(null)
    _setPitch(null)
    // _setPitchForGameView(null)
    _setWheel(0)
    // _setWheelForGameView(0)

    _setTarget(target.Other)

    setIsEventStopForSceneView(false)
    setIsEventStopForGameView(true)

    // _setPointDragOverHandle(null)
    // _setPointDragOverHandleForGameView(null)
    // _setPointDragScaleHandle(null)
    // _setPointDragScaleHandleForGameView(null)
}

export let init = reset

let _isInView = ([x, y]: pointData<number>, viewRect: rect) => {
    return x >= viewRect.x && x <= (viewRect.x + viewRect.width)
        && y >= viewRect.y && y <= (viewRect.y + viewRect.height)
}

let _prepareBindEvent = (sceneViewRect: rect, gameViewRect: rect) => {
    let moveWheel1 = true
    let moveWheel2 = false
    let wheelClock: any = null

    let _pointMoveHandleFunc = (event: customEvent) => {
        let { location } = getExn(event.userData) as any as pointEvent

        if (_isInView(location, sceneViewRect)) {
            _setTarget(target.SceneView)
        }
        else if (_isInView(location, gameViewRect)) {
            _setTarget(target.GameView)
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

export let bindEvent = ({ onCustomGlobalEvent, getPointMoveEventName, getPointDragOverEventName, getPointScaleEventName }: eventService, eventExtensionProtocolName: string, sceneViewRect: rect, gameViewRect: rect) => {
    let [_pointMoveHandleFunc, _pointDragOverHandleFunc, _pointDragScaleHandleFunc] = _prepareBindEvent(sceneViewRect, gameViewRect)

    onCustomGlobalEvent(eventExtensionProtocolName, [getPointMoveEventName(), 0, _pointMoveHandleFunc])
    onCustomGlobalEvent(eventExtensionProtocolName, [getPointDragOverEventName(), 0, _pointDragOverHandleFunc])
    onCustomGlobalEvent(eventExtensionProtocolName, [getPointScaleEventName(), 0, _pointDragScaleHandleFunc])
}