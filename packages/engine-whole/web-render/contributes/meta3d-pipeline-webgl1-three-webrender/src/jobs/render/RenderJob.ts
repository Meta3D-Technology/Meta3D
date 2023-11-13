import { execFuncType } from "meta3d-core-protocol/src/service/ServiceType"
import { getState, setState } from "../Utils"
import { states } from "meta3d-pipeline-webgl1-three-webrender-protocol/src/StateType"
import { state as converterState } from "meta3d-scenegraph-converter-three-protocol/src/state/StateType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { renderForEngine } from "meta3d-pipeline-webgl1-three-utils/src/RenderJobUtils"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService, composer, renderPass } = getState(states)

    return mostService.callFunc(() => {
        let { perspectiveCamera, scene } = api.getExtensionState<converterState>(meta3dState,
            "meta3d-scenegraph-converter-three-protocol")

        perspectiveCamera = getExn(perspectiveCamera)
        scene = getExn(scene)

        return renderForEngine(meta3dState, scene, perspectiveCamera, composer, renderPass)
    })
}