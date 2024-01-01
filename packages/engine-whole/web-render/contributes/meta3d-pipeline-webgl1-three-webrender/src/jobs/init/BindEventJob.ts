import { execFuncType } from "meta3d-core-protocol/src/service/ServiceType"
import { getState, setState } from "../Utils"
import { states } from "meta3d-pipeline-webgl1-three-webrender-protocol/src/StateType";
import { bindEvent } from "../ArcballCameraControllerEventUtils"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";
import { service as renderService } from "meta3d-engine-web-render-protocol/src/service/ServiceType"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService, eventService } = getState(states)

    return mostService.callFunc(() => {
        let renderService = api.getExtensionService<renderService>(meta3dState, "meta3d-engine-web-render-protocol")

        bindEvent(eventService, "meta3d-event-protocol",
            getExn(renderService.getViewRect(meta3dState))
        )

        return meta3dState
    })
}