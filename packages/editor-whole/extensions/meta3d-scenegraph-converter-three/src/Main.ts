import { service } from "meta3d-scenegraph-converter-three-protocol/src/service/ServiceType"
import { state } from "meta3d-scenegraph-converter-three-protocol/src/state/StateType"
import { state as meta3dState, getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D } from "meta3d-type"
// import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
// import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { getExtensionServiceUtils, createExtensionStateUtils, getExtensionLifeUtils } from "meta3d-scenegraph-converter-three-utils/src/Main"
import { event } from "meta3d-pipeline-dispose-protocol/src/EventType"

export let getExtensionService: getExtensionServiceMeta3D<service> = (api) => {
    return getExtensionServiceUtils(
        // (meta3dState, isDebug) => {
        //     let { gameObject, basicCameraView } = api.getExtensionService<engineSceneService>(meta3dState, "meta3d-engine-scene-gameview-protocol")

        //     let cameraView = getExn(basicCameraView.getActiveCameraView(meta3dState, isDebug))
        //     let cameraProjection = gameObject.getPerspectiveCameraProjection(
        //         meta3dState,
        //         getExn(
        //             basicCameraView.getGameObjects(meta3dState, cameraView)[0]
        //         )
        //     )

        //     return [cameraView, cameraProjection]
        // },
        api,
        // TODO refactor: remove
        {
            DisposeGameObjectsEventName: event.DisposeGameObjectsEventName,
            DisposeGeometrysEventName: event.DisposeGeometrysEventName,
            DisposePBRMaterialsEventName: event.DisposePBRMaterialsEventName,
            DisposeDirectionLightsEventName: event.DisposeDirectionLightsEventName,
            DisposeTextureEventName: event.DisposeTextureEventName,
        },
    )
}

export let createExtensionState: createExtensionStateMeta3D<state> = () => {
    return createExtensionStateUtils()
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
    return getExtensionLifeUtils(api,
        {
            engineSceneProtocolName: "meta3d-engine-scene-protocol",
            globalKeyNameForMeta3dState: "meta3dState_for_scene_graph_converter",
            globalKeyNameForAPI: "api_for_scene_graph_converter",
            globalKeyNameForMeshInstanceMap: "meshInstanceMap_for_scene_graph_converter",
            globalKeyNameForPhysicalMaterialInstanceMap: "standardMaterialInstanceMap_for_scene_graph_converter",
            globalKeyNameForTextureInstanceMap: "textureInstanceMap_for_scene_graph_converter",
            globalKeyNameForGeometryInstanceMap: "geometryInstanceMap_for_scene_graph_converter",
            globalKeyNameForDirectionLightInstanceMap: "directionLightInstanceMap_for_scene_graph_converter"
        }
    )
}
