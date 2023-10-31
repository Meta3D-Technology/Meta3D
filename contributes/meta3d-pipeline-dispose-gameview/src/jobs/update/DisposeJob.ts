import { execFunc as execFuncType } from "meta3d-engine-core-gameview-protocol/src/contribute/work/PipelineContributeType"
import { getState } from "../Utils"
import { states } from "meta3d-pipeline-dispose-gameview-protocol/src/StateType"
import { dispose } from "meta3d-pipeline-utils/src/DisposeJobUtils"
import { state as engineCoreState } from "meta3d-engine-core-gameview-protocol/src/state/StateType"
import { service as engineCoreService } from "meta3d-engine-core-gameview-protocol/src/service/ServiceType"
import { event } from "meta3d-pipeline-dispose-gameview-protocol/src/EventType"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService } = getState(states)

    return mostService.callFunc(() => {
        //console.log("dispose job")

        return dispose<engineCoreState, engineCoreService>(api, meta3dState, "meta3d-engine-core-gameview-protocol",
            {
                DisposeGameObjectsEventName: event.DisposeGameObjectsEventNameForGameView,
                DisposeGeometrysEventName: event.DisposeGeometrysEventNameForGameView,
                DisposePBRMaterialsEventName: event.DisposePBRMaterialsEventNameForGameView,
                DisposeDirectionLightsEventName: event.DisposeDirectionLightsEventNameForGameView,
                DisposeTransformsEventName: event.DisposeTransformsEventNameForGameView,
                DisposeBasicCameraViewsEventName: event.DisposeBasicCameraViewsEventNameForGameView,
                DisposePerspectiveCameraProjectionsEventName: event.DisposePerspectiveCameraProjectionsEventNameForGameView,
                DisposeTextureEventName: event.DisposeTextureEventNameForGameView,
            }
        )
    })
}