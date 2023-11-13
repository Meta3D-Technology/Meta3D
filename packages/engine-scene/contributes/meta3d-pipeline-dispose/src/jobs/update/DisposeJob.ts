import { execFuncType } from "meta3d-core-protocol/src/service/ServiceType"
import { getState } from "../Utils"
import { states } from "meta3d-pipeline-dispose-protocol/src/StateType"
import { dispose } from "meta3d-pipeline-utils/src/DisposeJobUtils"
import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import {  engineCoreService } from "meta3d-core-protocol/src/service/ServiceType"
import { event } from "meta3d-pipeline-dispose-protocol/src/EventType"

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let { mostService } = getState(states)

    return mostService.callFunc(() => {
        return dispose(api, meta3dState,
            {
                DisposeGameObjectsEventName: event.DisposeGameObjectsEventName,
                DisposeGeometrysEventName: event.DisposeGeometrysEventName,
                DisposePBRMaterialsEventName: event.DisposePBRMaterialsEventName,
                DisposeDirectionLightsEventName: event.DisposeDirectionLightsEventName,
                DisposeTransformsEventName: event.DisposeTransformsEventName,
                DisposeBasicCameraViewsEventName: event.DisposeBasicCameraViewsEventName,
                DisposePerspectiveCameraProjectionsEventName: event.DisposePerspectiveCameraProjectionsEventName,
                DisposeTextureEventName: event.DisposeTextureEventName,
            }
        )
    })
}