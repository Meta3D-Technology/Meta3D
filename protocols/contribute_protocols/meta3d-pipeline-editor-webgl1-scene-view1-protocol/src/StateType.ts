import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service, fbo } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { service as engineWholeService } from "meta3d-engine-whole-protocol/src/service/ServiceType"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { nullable, strictNullable } from "meta3d-commonlib-ts/src/nullable";
import { arcballCameraController } from "meta3d-component-arcballcameracontroller-protocol/src/Index"
// import { gameObject } from "meta3d-gameobject-protocol"

export const pipelineName = "Editor_WebGL1_SceneView1"

export type state = {
    mostService: mostService,
    webgl1Service: webgl1Service,
    uiService: uiService,
    eventService: eventService,
    engineWholeService: engineWholeService,

    canvas: HTMLCanvasElement,
    // cameraGameObject: nullable<gameObject>,
    // arcballCameraController: nullable<arcballCameraController>,
    lastYaw: nullable<number>,
    lastPitch: nullable<number>,
    fbo: strictNullable<fbo>,
}

export type states = {
    [pipelineName]: state
}
