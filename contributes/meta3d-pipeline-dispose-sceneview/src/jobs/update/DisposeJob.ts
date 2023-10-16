import { execFunc as execFuncType } from "meta3d-engine-core-sceneview-protocol/src/contribute/work/PipelineContributeType"
import { getState } from "../Utils"
import { states } from "meta3d-pipeline-dispose-sceneview-protocol/src/StateType"
import { dispose } from "meta3d-pipeline-utils/src/DisposeJobUtils"
import { state as engineCoreState } from "meta3d-engine-core-sceneview-protocol/src/state/StateType"
import { service as engineCoreService } from "meta3d-engine-core-sceneview-protocol/src/service/ServiceType"
import { event } from "meta3d-pipeline-dispose-sceneview-protocol/src/EventType"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService } = getState(states)

    return mostService.callFunc(() => {
        console.log("dispose job")

        return dispose<engineCoreState, engineCoreService>(api, meta3dState, "meta3d-engine-core-sceneview-protocol",
            {
                DisposeGameObjectsEventName: event.DisposeGameObjectsEventNameForSceneView,
                DisposeGeometrysEventName: event.DisposeGeometrysEventNameForSceneView,
                DisposePBRMaterialsEventName: event.DisposePBRMaterialsEventNameForSceneView,
                DisposeDirectionLightsEventName: event.DisposeDirectionLightsEventNameForSceneView,
                DisposeTransformsEventName: event.DisposeTransformsEventNameForSceneView,
                DisposeBasicCameraViewsEventName: event.DisposeBasicCameraViewsEventNameForSceneView,
                DisposePerspectiveCameraProjectionsEventName: event.DisposePerspectiveCameraProjectionsEventNameForSceneView,
                DisposeTextureEventName: event.DisposeTextureEventNameForSceneView,
            }
        )
    })
}