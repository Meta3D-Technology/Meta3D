import { state as meta3dState } from "meta3d-type"
import { pointEventName, priority, handleFunc } from "meta3d-event-protocol/src/service/ServiceType"
import type { Vector2, Camera, Object3D, Intersection } from "three"

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
    //     object: Object3D,
    //     recursive: boolean,
    // ) => Array<Intersection<TIntersected>>
    intersectScene: <TIntersected extends Object3D>(
        meta3dState: meta3dState,
        // object: Object3D,
        // recursive: boolean,
    ) => Array<Intersection<TIntersected>>
}

export type service = {
    input: input,
    picking: picking
}
