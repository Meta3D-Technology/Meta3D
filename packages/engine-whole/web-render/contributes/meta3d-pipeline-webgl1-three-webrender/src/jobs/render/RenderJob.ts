import { execFuncType } from "meta3d-core-protocol/src/service/ServiceType"
import { getState, setState } from "../Utils"
import { states } from "meta3d-pipeline-webgl1-three-webrender-protocol/src/StateType"
import { state as converterState } from "meta3d-scenegraph-converter-three-protocol/src/state/StateType"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { renderForEngine } from "meta3d-pipeline-webgl1-three-utils/src/RenderJobUtils"
import { service as renderService } from "meta3d-engine-web-render-protocol/src/service/ServiceType"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService, composer, renderPass, outlinePass } = getState(states)

    return mostService.callFunc(() => {
        let { perspectiveCamera, scene } = api.getExtensionState<converterState>(meta3dState,
            "meta3d-scenegraph-converter-three-protocol")

        perspectiveCamera = getExn(perspectiveCamera)
        scene = getExn(scene)

        let { getSelectedObjects } = getExn(api.getPackageService<renderService>(meta3dState, "meta3d-engine-web-render-protocol"))

        return renderForEngine(meta3dState, getSelectedObjects, scene, perspectiveCamera, composer, renderPass, outlinePass)
    })
}