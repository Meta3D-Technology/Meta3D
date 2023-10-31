import { execFunc as execFuncType } from "meta3d-engine-core-gameview-protocol/src/contribute/work/PipelineContributeType"
import { getState, setState } from "../Utils";
import { states } from "meta3d-pipeline-viewrect-gameview-protocol/src/StateType"
import { getViewRect } from "meta3d-view-utils/src/GameViewRect";
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService } = getState(states)

    return mostService.callFunc(() => {
        //console.log("get view rect job");

        let uiService = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")
        let uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")

        return setStatesFunc<states>(
            meta3dState,
            setState(states, {
                ...getState(states),
                viewRect: getExn(getViewRect(
                    uiService,
                    uiState
                ))
            })
        )
    })
}