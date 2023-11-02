import { execFunc as execFuncType } from "meta3d-engine-core-gameview-protocol/src/contribute/work/PipelineContributeType"
import { getState, setState } from "../Utils"
import { states } from "meta3d-pipeline-webgl1-three-gameview-protocol/src/StateType"
import { state as converterState } from "meta3d-scenegraph-converter-three-gameview-protocol/src/state/StateType"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"
import { getViewRect } from "meta3d-view-utils/src/GameViewRect";
import { createComposerAndRenderTarget, render } from "meta3d-pipeline-webgl1-three-utils/src/RenderJobUtils"
import { textureID } from "meta3d-ui-control-game-view-protocol"
import { service as uiService } from "meta3d-ui-protocol/src/service/ServiceType"
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService, threeAPIService, renderer, composer, renderPass, canvas } = getState(states)

    return mostService.callFunc(() => {
        // console.log("render job")

        let { perspectiveCamera, scene } = api.getExtensionState<converterState>(meta3dState,
            "meta3d-scenegraph-converter-three-gameview-protocol")

        perspectiveCamera = getExn(perspectiveCamera)
        scene = getExn(scene)

        if (isNullable(composer)) {
            let uiService = api.getExtensionService<uiService>(meta3dState, "meta3d-ui-protocol")
            let uiState = api.getExtensionState<uiState>(meta3dState, "meta3d-ui-protocol")

            let { width, height } = getExn(getViewRect(
                uiService,
                uiState
            ))

            let data = createComposerAndRenderTarget(threeAPIService, getExn(renderer), [width, height])
            composer = data[0]
            renderPass = data[1]

            meta3dState = setStatesFunc<states>(
                meta3dState,
                setState(states, {
                    ...getState(states),
                    composer,
                    renderPass
                })
            )
        }
        else {
            composer = getExn(composer)
            renderPass = getExn(renderPass)
        }

        return render(meta3dState, getViewRect, api, scene, perspectiveCamera, canvas, getExn(renderer), composer, renderPass, textureID)
    })
}