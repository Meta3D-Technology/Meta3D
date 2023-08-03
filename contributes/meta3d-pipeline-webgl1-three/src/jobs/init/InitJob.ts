import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { getState, setState } from "../Utils"
import { states } from "meta3d-pipeline-webgl1-three-protocol/src/StateType"
// import { getViewRect } from "meta3d-view-utils/src/ViewRect"
// import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService, converterService, threeAPIService, uiService, canvas } = getState(states)

    return mostService.callFunc(() => {
        console.log("init job")

        // converterService.init()


        let renderer = new threeAPIService.WebGLRenderer({
            antialias: true,
            canvas: canvas,
            context: uiService.getContext(meta3dState)
        })

        // renderer.setPixelRatio(window.devicePixelRatio);
        // renderer.setSize(canvas.width, canvas.height);
        // document.body.appendChild(renderer.domElement);
        renderer.setClearAlpha(1.0)

        return setStatesFunc<states>(
            meta3dState,
            setState(states, {
                ...getState(states),
                renderer
            })
        )
    })
}