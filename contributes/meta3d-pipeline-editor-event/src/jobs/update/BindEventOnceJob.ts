import { execFunc as execFuncType } from "meta3d-engine-core-sceneview-protocol/src/contribute/work/PipelineContributeType"
import { getState, setState } from "../Utils"
import { states } from "meta3d-pipeline-editor-event-protocol/src/StateType"
import { bindEvent } from "meta3d-pipeline-utils/src/ArcballCameraControllerEventUtils"
import { getViewRect as getSceneViewRect } from "meta3d-view-utils/src/SceneViewRect";
import { getViewRect as getGameViewRect } from "meta3d-view-utils/src/GameViewRect";
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService, eventService, isBinded } = getState(states)

    return mostService.callFunc(() => {
        //console.log("bind event once job")

        if (isBinded) {
            return meta3dState
        }

        let uiService = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")
        let uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")

        bindEvent(eventService, "meta3d-event-protocol",
            getExn(getSceneViewRect(
                uiService,
                uiState
            )),
            getExn(getGameViewRect(
                uiService,
                uiState
            ))
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