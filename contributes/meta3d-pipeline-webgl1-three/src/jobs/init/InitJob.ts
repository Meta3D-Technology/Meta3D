import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { getState, setState } from "../Utils"
import { states } from "meta3d-pipeline-webgl1-three-protocol/src/StateType"
import { WebGLRenderer } from "three"
import { getViewRect } from "meta3d-view-utils/src/ViewRect"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils";

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService, uiService } = getState(states)

    return mostService.callFunc(() => {
        console.log("init job")

        let renderer = new WebGLRenderer({
            antialias: true,
            context: uiService.getContext(meta3dState)
        })

        let { width, height } = getExn(getViewRect(uiService, api.getExtensionState(meta3dState, "meta3d-ui-protocol")))

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
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