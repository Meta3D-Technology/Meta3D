import { execFuncType } from "meta3d-core-protocol/src/service/ServiceType"
import { getState, setState } from "../Utils"
import { states } from "meta3d-pipeline-webgl1-three-gameviewrender-protocol/src/StateType"
import { state as converterState } from "meta3d-scenegraph-converter-three-protocol/src/state/StateType"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"
import { createComposerAndRenderTarget, render } from "meta3d-pipeline-webgl1-three-utils/src/RenderJobUtils"
import { service as renderService } from "meta3d-editor-gameview-render-protocol/src/service/ServiceType"
import { textureID } from "meta3d-ui-control-game-view-protocol"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService, threeAPIService, renderer, composer, renderPass, outlinePass, canvas } = getState(states)

    return mostService.callFunc(() => {
        if (api.getExtensionService<renderService>(meta3dState, "meta3d-editor-gameview-render-protocol").isPipelineStop(meta3dState)) {
            return meta3dState
        }

        let { perspectiveCamera, scene } = api.getExtensionState<converterState>(meta3dState,
            "meta3d-scenegraph-converter-three-protocol")

        perspectiveCamera = getExn(perspectiveCamera)
        scene = getExn(scene)

        let { getViewRect, getSelectedObjects } = getExn(api.getPackageService<renderService>(meta3dState, "meta3d-editor-gameview-render-protocol"))

        if (isNullable(composer)) {
            let { width, height } = getExn(getViewRect(meta3dState))

            let data = createComposerAndRenderTarget(threeAPIService, getExn(renderer), [width, height], scene, perspectiveCamera)
            composer = data[0]
            renderPass = data[1]
            outlinePass = data[2]


            meta3dState = setStatesFunc<states>(
                meta3dState,
                setState(states, {
                    ...getState(states),
                    composer,
                    renderPass,
                    outlinePass
                })
            )
        }
        else {
            composer = getExn(composer)
            renderPass = getExn(renderPass)
            outlinePass = getExn(outlinePass)
        }

        return render(meta3dState, getViewRect, getSelectedObjects, api, scene, perspectiveCamera, canvas, getExn(renderer), composer, renderPass, outlinePass, textureID)
    })
}