import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { getState, setState } from "../Utils";
import { states } from "meta3d-pipeline-editor-webgl1-game-view1-protocol/src/StateType";
import { getDragOverLocationForGameView, getPitchForGameView, getYawForGameView, reset } from "meta3d-pipeline-utils/src/ArcballCameraControllerEventUtils";
import { getViewRect } from "meta3d-view-utils/src/GameViewRect";
import { update } from "meta3d-pipeline-editor-webgl1-view1-utils/src/UpdateArcballCameraControllerJobUtils";

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let {
        mostService,
        engineWholeService,
        uiService,
        lastYaw,
        lastPitch
    } = getState(states)


    return mostService.callFunc(() => {
        console.log("update arcballCameraController job");

        let data = update(meta3dState, api, [engineWholeService, uiService], [
            [reset, getDragOverLocationForGameView, getYawForGameView, getPitchForGameView],
            getViewRect
        ],
            [
                lastYaw, lastPitch
            ]
        )
        meta3dState = data[0]
        let currentYaw = data[1]
        let currentPitch = data[2]

        return setStatesFunc<states>(
            meta3dState,
            setState(states,
                {
                    ...getState(states),
                    lastYaw: currentYaw,
                    lastPitch: currentPitch,
                }
            )
        )
    })
}