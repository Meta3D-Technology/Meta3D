import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as webgl1Service } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"

export const pipelineName = "Editor_WebGL1_SceneView2"

export type state = {
    mostService: mostService,
    webgl1Service: webgl1Service,
    uiService: uiService,
}

export type states = {
    [pipelineName]: state
}
