import { service } from "meta3d-import-scene-protocol/src/service/ServiceType"
import { state } from "meta3d-import-scene-protocol/src/state/StateType"
import { state as meta3dState, getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, api } from "meta3d-type"
import { service as converterService } from "meta3d-scenegraph-converter-three-sceneview-protocol/src/service/ServiceType"
import { service as converterGameViewService } from "meta3d-scenegraph-converter-three-gameview-protocol/src/service/ServiceType"
// import { DefaultLoadingManager } from "./three/LoadingManager"
import { state as engineWholeState } from "meta3d-engine-whole-sceneview-protocol/src/state/StateType"
import { service as engineWholeService } from "meta3d-engine-whole-sceneview-protocol/src/service/ServiceType"
import { service as engineWholeGameViewService } from "meta3d-engine-whole-gameview-protocol/src/service/ServiceType"
import { dispose } from "meta3d-pipeline-utils/src/DisposeJobUtils"
import { activeCameraForSceneView, addGameObjectsForSceneView } from "meta3d-pipeline-editor-webgl1-view1-utils/src/CreateDefaultSceneJobUtils"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { loadGlb, activeFirstBasicCameraView } from "meta3d-load-scene-utils/src/Main"
import type { GLTF } from "meta3d-load-scene-utils/src/three/GLTFLoader"
import { state as engineCoreSceneViewState } from "meta3d-engine-core-sceneview-protocol/src/state/StateType"
import { service as engineCoreSceneViewService } from "meta3d-engine-core-sceneview-protocol/src/service/ServiceType"
import { state as engineCoreGameViewState } from "meta3d-engine-core-gameview-protocol/src/state/StateType"
import { service as engineCoreGameViewService } from "meta3d-engine-core-gameview-protocol/src/service/ServiceType"
import { event as eventForSceneView } from "meta3d-pipeline-dispose-sceneview-protocol/src/EventType"
import { event as eventForGameView } from "meta3d-pipeline-dispose-gameview-protocol/src/EventType"

let _disposeScene = (api: api, meta3dState: meta3dState): meta3dState => {
    let engineWholeService = api.getExtensionService<engineWholeService>(meta3dState, "meta3d-engine-whole-sceneview-protocol")
    let engineWholeGameViewService = api.getExtensionService<engineWholeGameViewService>(meta3dState, "meta3d-engine-whole-gameview-protocol")

    meta3dState = engineWholeService.scene.gameObject.disposeGameObjects(
        meta3dState,
        engineWholeService.scene.gameObject.getAllGameObjects(meta3dState)
    )
    meta3dState = engineWholeGameViewService.scene.gameObject.disposeGameObjects(
        meta3dState,
        engineWholeGameViewService.scene.gameObject.getAllGameObjects(meta3dState)
    )

    meta3dState = dispose<engineCoreSceneViewState, engineCoreSceneViewService>(api, meta3dState, "meta3d-engine-core-sceneview-protocol",
        {
            DisposeGameObjectsEventName: eventForSceneView.DisposeGameObjectsEventNameForSceneView,
            DisposeGeometrysEventName: eventForSceneView.DisposeGeometrysEventNameForSceneView,
            DisposePBRMaterialsEventName: eventForSceneView.DisposePBRMaterialsEventNameForSceneView,
            DisposeDirectionLightsEventName: eventForSceneView.DisposeDirectionLightsEventNameForSceneView,
            DisposeTransformsEventName: eventForSceneView.DisposeTransformsEventNameForSceneView,
            DisposeBasicCameraViewsEventName: eventForSceneView.DisposeBasicCameraViewsEventNameForSceneView,
            DisposePerspectiveCameraProjectionsEventName: eventForSceneView.DisposePerspectiveCameraProjectionsEventNameForSceneView,
            DisposeTextureEventName: eventForSceneView.DisposeTextureEventNameForSceneView,
        }
    )
    meta3dState = dispose<engineCoreGameViewState, engineCoreGameViewService>(api, meta3dState, "meta3d-engine-core-gameview-protocol",
        {
            DisposeGameObjectsEventName: eventForGameView.DisposeGameObjectsEventNameForGameView,
            DisposeGeometrysEventName: eventForGameView.DisposeGeometrysEventNameForGameView,
            DisposePBRMaterialsEventName: eventForGameView.DisposePBRMaterialsEventNameForGameView,
            DisposeDirectionLightsEventName: eventForGameView.DisposeDirectionLightsEventNameForGameView,
            DisposeTransformsEventName: eventForGameView.DisposeTransformsEventNameForGameView,
            DisposeBasicCameraViewsEventName: eventForGameView.DisposeBasicCameraViewsEventNameForGameView,
            DisposePerspectiveCameraProjectionsEventName: eventForGameView.DisposePerspectiveCameraProjectionsEventNameForGameView,
            DisposeTextureEventName: eventForGameView.DisposeTextureEventNameForGameView,
        }
    )

    return meta3dState
}

export let getExtensionService: getExtensionServiceMeta3D<service> = (api) => {
    return {
        import: (meta3dState, sceneGLB) => {
            return loadGlb(meta3dState, api, sceneGLB)
                .then((gltf: GLTF) => {
                    meta3dState = _disposeScene(api, meta3dState)

                    let data1 = api.getExtensionService<converterService>(meta3dState, "meta3d-scenegraph-converter-three-sceneview-protocol").import(meta3dState, gltf.scene)
                    meta3dState = data1[0]

                    data1 = api.getExtensionService<converterGameViewService>(meta3dState, "meta3d-scenegraph-converter-three-gameview-protocol").import(meta3dState, gltf.scene)
                    meta3dState = data1[0]


                    let engineWholeService = api.getExtensionService<engineWholeService>(meta3dState, "meta3d-engine-whole-sceneview-protocol")
                    let canvas = getExn(api.getExtensionState<engineWholeState>(meta3dState, "meta3d-engine-whole-sceneview-protocol").canvas)

                    let data2 = addGameObjectsForSceneView(meta3dState,
                        engineWholeService,
                        // api.getExtensionService<eventService>(meta3dState, "meta3d-event-protocol"),
                        // "meta3d-event-protocol",
                        [canvas.width, canvas.height],
                    )
                    meta3dState = data2[0]
                    let arcballCameraControllerGameObject = data2[2]

                    meta3dState = activeCameraForSceneView(meta3dState, engineWholeService, arcballCameraControllerGameObject)



                    // TODO use plugin for GLTFExporter, GLTFLoader to support arcballCameraController



                    // meta3dState = activeCameraForGameView(meta3dState, api.getExtensionService<engineWholeGameViewService>(meta3dState, "meta3d-engine-whole-gameview-protocol"))
                    meta3dState = activeFirstBasicCameraView(meta3dState, api.getExtensionService<engineWholeGameViewService>(meta3dState, "meta3d-engine-whole-gameview-protocol"))



                    return meta3dState
                })
        }
    }
}

export let createExtensionState: createExtensionStateMeta3D<state> = () => {
    return null
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
    return {
    }
}
