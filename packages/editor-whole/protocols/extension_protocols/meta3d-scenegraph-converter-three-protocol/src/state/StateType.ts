import type { PerspectiveCamera, Scene } from "three"
import { nullable } from 'meta3d-commonlib-ts/src/nullable';

export type state = {
    perspectiveCamera: nullable<PerspectiveCamera>,
    scene: nullable<Scene>,
    // event: {
    //     disposeGameObjectEventName: string,
    //     disposeGeometryEventName: string,
    //     disposePBRMaterialEventName: string,
    //     disposeArcballCameraControllerEventName: string,
    //     disposeBasicCameraViewEventName: string,
    //     disposeTransformEventName: string,
    //     disposePerspectiveCameraProjectionEventName: string,
    // }
}