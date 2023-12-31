import { service } from "meta3d-import-scene-protocol/src/service/ServiceType"
import { state } from "meta3d-import-scene-protocol/src/state/StateType"
import { state as meta3dState, getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, api } from "meta3d-type"
import { service as threeService } from "meta3d-three-protocol/src/service/ServiceType"
import { dispose } from "meta3d-pipeline-utils/src/DisposeJobUtils"
import { addDefaultGameObjects, addGameObjectsForSceneView } from "meta3d-pipeline-webgl1-three-utils/src/CreateDefaultSceneJobUtils"
// import { activeFirstBasicCameraView } from "meta3d-load-scene-utils/src/Main"
import { service as assetService } from "meta3d-asset-protocol/src/service/ServiceType"
import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
import { event } from "meta3d-pipeline-dispose-protocol/src/EventType"
import { service as renderService } from "meta3d-editor-sceneview-render-protocol/src/service/ServiceType"

let _cleanScene = (api: api, meta3dState: meta3dState): meta3dState => {
    let { gameObject } = api.nullable.getExn(api.getPackageService<engineSceneService>(meta3dState, "meta3d-engine-scene-protocol"))

    meta3dState = gameObject.disposeGameObjects(
        meta3dState,
        gameObject.getAllGameObjects(meta3dState)
    )

    meta3dState = dispose(api, meta3dState,
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

    return meta3dState
}

export let getExtensionService: getExtensionServiceMeta3D<service> = (api) => {
    return {
        cleanScene: meta3dState => {
            return _cleanScene(api, meta3dState)
        },
        import: (meta3dState, sceneGLB) => {
            let { loadGlb } = api.nullable.getExn(api.getPackageService<assetService>(meta3dState, "meta3d-load-glb-protocol"))

            return loadGlb(meta3dState, sceneGLB)
                .then((gltf) => {
                    meta3dState = _cleanScene(api, meta3dState)

                    let data1 = api.nullable.getExn(api.getPackageService<threeService>(meta3dState, "meta3d-three-protocol")).converter(meta3dState).import(meta3dState, gltf.scene)
                    meta3dState = data1[0]


                    let engineSceneService = api.nullable.getExn(api.getPackageService<engineSceneService>(meta3dState, "meta3d-engine-scene-protocol"))

                    // let data = addDefaultGameObjects(meta3dState, engineSceneService)
                    // meta3dState = data[0]
                    // let cameraView = data[1]

                    // meta3dState = engineSceneService.basicCameraView.active(
                    //     meta3dState,
                    //     cameraView
                    // )

                    // meta3dState = activeFirstBasicCameraView(meta3dState, engineSceneService)

                    let data = addGameObjectsForSceneView(meta3dState, engineSceneService)
                    meta3dState = data[0]
                    // let cameraController = data[1]
                    let cameraGameObject = data[2]



                    let { setArcballCameraControllerGameObject } = api.nullable.getExn(api.getPackageService<renderService>(meta3dState, "meta3d-editor-sceneview-render-protocol"))

                    meta3dState = setArcballCameraControllerGameObject(meta3dState, cameraGameObject)

                    // TODO use plugin for GLTFExporter, GLTFLoader to support arcballCameraController


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
