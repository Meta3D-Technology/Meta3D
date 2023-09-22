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

let _getPointDragOverHandleFuncForSceneView = () => {
    return (globalThis as any)["pointDragOverHandle_sceneview"]
}

let _setPointDragOverHandleForSceneView = (handleFunc: nullable<handleFunc>) => {
    (globalThis as any)["pointDragOverHandle_sceneview"] = handleFunc
}

let _getPointDragOverHandleFuncForGameView = () => {
    return (globalThis as any)["pointDragOverHandle_gameview"]
}

let _setPointDragOverHandleForGameView = (handleFunc: nullable<handleFunc>) => {
    (globalThis as any)["pointDragOverHandle_gameview"] = handleFunc
}

export let reset = () => {
    _setDragOverLocationForSceneView(null)
    _setDragOverLocationForGameView(null)
    _setYawForSceneView(null)
    _setYawForGameView(null)
    _setPitchForSceneView(null)
    _setPitchForGameView(null)
    _setPointDragOverHandleForSceneView(null)
    _setPointDragOverHandleForGameView(null)
}

let _prepareBindEvent = ([setDragOverLocationFunc, setYawFunc, setPitchFunc]: any) => {
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

    return _pointDragOverHandleFunc
}

export let bindEventForSceneView = ({ onCustomGlobalEvent, getPointDragOverEventName }: eventService, eventExtensionProtocolName: string) => {
    _setPointDragOverHandleForSceneView(
        _prepareBindEvent([
            _setDragOverLocationForSceneView,
            _setYawForSceneView,
            _setPitchForSceneView
        ])
    )

    onCustomGlobalEvent(eventExtensionProtocolName, [getPointDragOverEventName(), 0, _getPointDragOverHandleFuncForSceneView()])
}

export let bindEventForGameView = ({ onCustomGlobalEvent, getPointDragOverEventName }: eventService, eventExtensionProtocolName: string) => {
    _setPointDragOverHandleForGameView(
        _prepareBindEvent([
            _setDragOverLocationForGameView,
            _setYawForGameView,
            _setPitchForGameView
        ])
    )

    onCustomGlobalEvent(eventExtensionProtocolName, [getPointDragOverEventName(), 0, _getPointDragOverHandleFuncForGameView()])
}

export let unbindEventForGameView = ({ offCustomGlobalEventByHandleFunc, getPointDragOverEventName }: eventService, eventExtensionProtocolName: string) => {
    offCustomGlobalEventByHandleFunc(
        eventExtensionProtocolName,
        [
            getPointDragOverEventName(), _getPointDragOverHandleFuncForGameView()
        ]
    )
}
