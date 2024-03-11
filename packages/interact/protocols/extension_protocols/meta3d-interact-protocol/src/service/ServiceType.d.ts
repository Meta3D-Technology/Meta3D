import { state as meta3dState, nullableAPI } from "meta3d-type"
import { pointEventName, priority, handleFunc } from "meta3d-event-protocol/src/service/ServiceType"
import type { Vector2, Camera, Object3D, Intersection } from "three"
import { nullable } from "meta3d-commonlib-ts/src/nullable"

type point = {
    onPointEvent: (meta3dState: meta3dState, pointEventName: pointEventName, priority: priority, handleFunc: handleFunc) => meta3dState,
    offPointEvent: (meta3dState: meta3dState, pointEventName: pointEventName, handleFunc: handleFunc) => meta3dState,

    getPointDownEventName(meta3dState: meta3dState): pointEventName;
    getPointUpEventName(meta3dState: meta3dState): pointEventName;
    getPointTapEventName(meta3dState: meta3dState): pointEventName;
    getPointMoveEventName(meta3dState: meta3dState): pointEventName;
    getPointScaleEventName(meta3dState: meta3dState): pointEventName;
    getPointDragStartEventName(meta3dState: meta3dState): pointEventName;
    getPointDragOverEventName(meta3dState: meta3dState): pointEventName;
}

type input = {
    point: point
}

type mousePos = [number, number]

type picking = {
    // setFromCamera: (meta3dState: meta3dState, mousePos: Vector2, camera: Camera) => meta3dState,
    setFromCurrentCamera: (meta3dState: meta3dState, mousePos: mousePos) => meta3dState,
    // intersectObject: <TIntersected extends Object3D>(
    //     meta3dState: meta3dState,
    //     object: any,
    //     recursive: boolean,
    // ) => Array<Intersection<TIntersected>>
    intersectScene: <TIntersected extends Object3D>(
        meta3dState: meta3dState,
        // object: valueObject,
        // recursive: boolean,
    ) => Array<Intersection<TIntersected>>
}

type valueObject = any

export type tweenId = string

type tween = {
    add: (meta3dState: meta3dState, id: tweenId, object: valueObject, {
        onStart,
        onUpdate,
        onRepeat,
        onComplete,
        onStop
    }: {
        onStart: nullable<(meta3dState: meta3dState, object: valueObject) => meta3dState>,
        onUpdate: nullable<(meta3dState: meta3dState, object: valueObject, elapsed: number) => meta3dState>,
        onRepeat: nullable<(meta3dState: meta3dState, object: valueObject) => meta3dState>,
        onComplete: nullable<(meta3dState: meta3dState, object: valueObject) => meta3dState>,
        onStop: nullable<(meta3dState: meta3dState, object: valueObject) => meta3dState>,
    }) => meta3dState,
    remove: (meta3dState: meta3dState, id: tweenId) => meta3dState,
    to: (meta3dState: meta3dState, id: tweenId, target: valueObject, duration: number) => meta3dState,
    start: (meta3dState: meta3dState, id: tweenId, time: nullable<number>) => meta3dState,
    stop: (meta3dState: meta3dState, id: tweenId) => meta3dState,
    end: (meta3dState: meta3dState, id: tweenId) => meta3dState,
    pause: (meta3dState: meta3dState, id: tweenId, time: nullable<number>) => meta3dState,
    resume: (meta3dState: meta3dState, id: tweenId, time: nullable<number>) => meta3dState,
    repeat: (meta3dState: meta3dState, id: tweenId, times: number) => meta3dState,
    isPlaying: (meta3dState: meta3dState, id: tweenId) => boolean,
    isPaused: (meta3dState: meta3dState, id: tweenId) => boolean,
    update: (meta3dState: meta3dState, id: tweenId, time: nullable<number>) => [meta3dState, boolean],
    updateAll: (meta3dState: meta3dState, time: nullable<number>) => [meta3dState, boolean],
    removeAll: (meta3dState: meta3dState) => meta3dState,
}

type animation = tween

export type service = {
    input: input,
    picking: picking,
    animation: animation,
}
