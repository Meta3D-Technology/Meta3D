import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { getState, setState } from "../Utils"
import { states } from "meta3d-pipeline-webgl1-three-sceneviewrender-protocol/src/StateType";
import { bindEvent } from "../ArcballCameraControllerEventUtils"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";
import { service as renderService } from "meta3d-editor-sceneview-render-protocol/src/service/ServiceType"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService, eventService, isBinded } = getState(states)

    return mostService.callFunc(() => {
        //console.log("bind event once job")

        if (isBinded) {
            return meta3dState
        }

        let renderService = api.getExtensionService<renderService>(meta3dState, "meta3d-editor-sceneview-render-protocol")

        bindEvent(eventService, "meta3d-event-protocol",
            getExn(renderService.getViewRect(meta3dState))
        )

        return setStatesFunc<states>(
            meta3dState,
            setState(states,
                {
                    ...getState(states),
                    isBinded: true
                }
            )
        )
    })
}