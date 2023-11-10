import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { getState, setState } from "../Utils"
import { states } from "meta3d-pipeline-webgl1-three-sceneviewrender-protocol/src/StateType"
import { state as converterState } from "meta3d-scenegraph-converter-three-protocol/src/state/StateType"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"
import { createComposerAndRenderTarget, render } from "meta3d-pipeline-webgl1-three-utils/src/RenderJobUtils"
import { service as renderService } from "meta3d-editor-sceneview-render-protocol/src/service/ServiceType"
// import { textureID } from "meta3d-ui-control-protocol"
let textureID = ""

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService, threeAPIService, renderer, composer, renderPass, canvas } = getState(states)

    return mostService.callFunc(() => {
        // console.log("render job")

        let { perspectiveCamera, scene } = api.getExtensionState<converterState>(meta3dState,
            "meta3d-scenegraph-converter-three-protocol")

        perspectiveCamera = getExn(perspectiveCamera)
        scene = getExn(scene)

        let { getViewRect } = getExn(api.getPackageService<renderService>(meta3dState, "meta3d-editor-sceneview-render-protocol"))

        if (isNullable(composer)) {
            let { width, height } = getExn(getViewRect(meta3dState))

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