import { customEvent, pointData, pointEvent } from "meta3d-event-protocol/src/service/EventType.gen"
import { handleFunc } from "meta3d-event-protocol/src/service/ServiceType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"

export let getDragOverLocationForSceneView = () => {
    return (globalThis as any)["dragOverLocation_sceneview"]
}

let _setDragOverLocationForSceneView = (dragOverLocation: nullable<[number, number, number]>) => {
    (globalThis as any)["dragOverLocation_sceneview"] = dragOverLocation
}

export let getDragOverLocationForGameView = () => {
    return (globalThis as any)["dragOverLocation_gameview"]
}

let _setDragOverLocationForGameView = (dragOverLocation: nullable<[number, number, number]>) => {
    (globalThis as any)["dragOverLocation_gameview"] = dragOverLocation
}

export let getYawForSceneView = () => {
    return (globalThis as any)["yaw_sceneview"]
}

let _setYawForSceneView = (yaw: nullable<number>) => {
    (globalThis as any)["yaw_sceneview"] = yaw
}

export let getYawForGameView = () => {
    return (globalThis as any)["yaw_gameview"]
}

let _setYawForGameView = (yaw: nullable<number>) => {
    (globalThis as any)["yaw_gameview"] = yaw
}

export let getPitchForSceneView = () => {
    return (globalThis as any)["pitch_sceneview"]
}

let _setPitchForSceneView = (pitch: nullable<number>) => {
    (globalThis as any)["pitch_sceneview"] = pitch
}

export let getPitchForGameView = () => {
    return (globalThis as any)["pitch_gameview"]
}

let _setPitchForGameView = (pitch: nullable<number>) => {
    (globalThis as any)["pitch_gameview"] = pitch
}


export let getWheelForSceneView = () => {
    return (globalThis as any)["wheel_sceneview"]
}

let _setWheelForSceneView = (wheel: number) => {
    (globalThis as any)["wheel_sceneview"] = wheel
}

export let getWheelForGameView = () => {
    return (globalThis as any)["wheel_gameview"]
}

let _setWheelForGameView = (wheel: number) => {
    (globalThis as any)["wheel_gameview"] = wheel
}

let _getPointDragOverHandleFuncForSceneView = () => {
    return (globalThis as any)["pointDragOverHandle_sceneview"]
}

let _setPointDragOverHandleForSceneView = (handleFunc: nullable<handleFunc>) => {
    (globalThis as any)["pointDragOverHandle_sceneview"] = handleFunc
}

let _getPointDragScaleHandleFuncForSceneView = () => {
    return (globalThis as any)["pointDragScaleHandle_sceneview"]
}

let _setPointDragScaleHandleForSceneView = (handleFunc: nullable<handleFunc>) => {
    (globalThis as any)["pointDragScaleHandle_sceneview"] = handleFunc
}

let _getPointDragOverHandleFuncForGameView = () => {
    return (globalThis as any)["pointDragOverHandle_gameview"]
}

let _setPointDragOverHandleForGameView = (handleFunc: nullable<handleFunc>) => {
    (globalThis as any)["pointDragOverHandle_gameview"] = handleFunc
}

let _getPointDragScaleHandleFuncForGameView = () => {
    return (globalThis as any)["pointDragScaleHandle_gameview"]
}

let _setPointDragScaleHandleForGameView = (handleFunc: nullable<handleFunc>) => {
    (globalThis as any)["pointDragScaleHandle_gameview"] = handleFunc
}

export let reset = () => {
    _setDragOverLocationForSceneView(null)
    _setDragOverLocationForGameView(null)
    _setYawForSceneView(null)
    _setYawForGameView(null)
    _setPitchForSceneView(null)
    _setPitchForGameView(null)
    _setWheelForSceneView(0)
    _setWheelForGameView(0)

    _setPointDragOverHandleForSceneView(null)
    _setPointDragOverHandleForGameView(null)
    _setPointDragScaleHandleForSceneView(null)
    _setPointDragScaleHandleForGameView(null)
}

export let init = reset

let _prepareBindEvent = ([setDragOverLocationFunc, setYawFunc, setPitchFunc, setWheelFunc]: any) => {
    let moveWheel1 = true
    let moveWheel2 = false
    let wheelClock: any = null

    let _pointDragOverHandleFunc = (event: customEvent) => {
        let { location, movementDelta } = getExn(event.userData) as any as pointEvent

        let x_dis = movementDelta[0]
        let y_dis = movementDelta[1]

        if (x_dis === 0 && y_dis === 0) {
            return
        }

        setDragOverLocationFunc(location)
        setYawFunc(x_dis / 500)
        setPitchFunc(y_dis / 500)
    }

    let _stopWheel = () => {
        if (moveWheel2 == true) {
            moveWheel2 = false;
            moveWheel1 = true;

            setWheelFunc(0)
        }
    }

    let _pointDragScaleHandleFunc = (event: customEvent) => {
        if (moveWheel1 == true) {
            moveWheel1 = false;
            moveWheel2 = true;

            let { wheel } = getExn(event.userData) as any as pointEvent

            setWheelFunc(wheel)

            wheelClock = setTimeout(_stopWheel, 100);
        }
        else {
            clearTimeout(wheelClock);
            wheelClock = setTimeout(_stopWheel, 75);
        }
    }

    return [_pointDragOverHandleFunc, _pointDragScaleHandleFunc]
}

export let bindEventForSceneView = ({ onCustomGlobalEvent, getPointDragOverEventName, getPointScaleEventName }: eventService, eventExtensionProtocolName: string) => {
    let [_pointDragOverHandleFunc, _pointDragScaleHandleFunc] = _prepareBindEvent([
        _setDragOverLocationForSceneView,
        _setYawForSceneView,
        _setPitchForSceneView,
        _setWheelForSceneView
    ])

    _setPointDragOverHandleForSceneView(_pointDragOverHandleFunc)
    _setPointDragScaleHandleForSceneView(_pointDragScaleHandleFunc)

    onCustomGlobalEvent(eventExtensionProtocolName, [getPointDragOverEventName(), 0, _getPointDragOverHandleFuncForSceneView()])
    onCustomGlobalEvent(eventExtensionProtocolName, [getPointScaleEventName(), 0, _getPointDragScaleHandleFuncForSceneView()])
}

export let bindEventForGameView = ({ onCustomGlobalEvent, getPointDragOverEventName, getPointScaleEventName }: eventService, eventExtensionProtocolName: string) => {
    let [_pointDragOverHandleFunc, _pointDragScaleHandleFunc] = _prepareBindEvent([
        _setDragOverLocationForGameView,
        _setYawForGameView,
        _setPitchForGameView,
        _setWheelForGameView
    ])

    _setPointDragOverHandleForGameView(_pointDragOverHandleFunc)
    _setPointDragScaleHandleForGameView(_pointDragScaleHandleFunc)

    onCustomGlobalEvent(eventExtensionProtocolName, [getPointDragOverEventName(), 0, _getPointDragOverHandleFuncForGameView()])
    onCustomGlobalEvent(eventExtensionProtocolName, [getPointScaleEventName(), 0, _getPointDragScaleHandleFuncForGameView()])

}

export let unbindEventForGameView = ({ offCustomGlobalEventByHandleFunc, getPointDragOverEventName, getPointScaleEventName }: eventService, eventExtensionProtocolName: string) => {
    offCustomGlobalEventByHandleFunc(
        eventExtensionProtocolName,
        [
            getPointDragOverEventName(), _getPointDragOverHandleFuncForGameView()
        ]
    )
    offCustomGlobalEventByHandleFunc(
        eventExtensionProtocolName,
        [
            getPointScaleEventName(), _getPointDragScaleHandleFuncForGameView()
        ]
    )
}
