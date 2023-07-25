import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { getState, setState } from "../Utils"
import { states } from "meta3d-pipeline-webgl1-three-protocol/src/StateType"
import { WebGLRenderer } from "three"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService, canvas } = getState(states)

    return mostService.callFunc(() => {
        console.log("init job")

        let renderer = new WebGLRenderer({
            antialias: true,
            canvas
        })

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(canvas.width, canvas.height);
        document.body.appendChild(renderer.domElement);

        return setStatesFunc<states>(
            meta3dState,
            setState(states, {
                ...getState(states),
                renderer
            })
        )
    })
}