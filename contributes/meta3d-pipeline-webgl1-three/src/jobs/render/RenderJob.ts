import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { getState, setState } from "../Utils"
import { states } from "meta3d-pipeline-webgl1-three-protocol/src/StateType"
import { state as converterState } from "meta3d-scenegraph-converter-three-protocol/src/state/StateType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService, renderer } = getState(states)

    return mostService.callFunc(() => {
        console.log("render job")

        let { perspectiveCamera, scene } = api.getExtensionState<converterState>(meta3dState, "meta3d-scenegraph-converter-three-protocol")

        perspectiveCamera = getExn(perspectiveCamera)

        console.log(
            perspectiveCamera.matrixWorldInverse
        )

        // TODO renderer = getExn(renderer)
        // TODO renderer.render( scene, perspectiveCamera );

        return meta3dState
    })
}