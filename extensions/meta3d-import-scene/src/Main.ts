import { service } from "meta3d-import-scene-protocol/src/service/ServiceType"
import { state } from "meta3d-import-scene-protocol/src/state/StateType"
import { state as meta3dState, getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, api } from "meta3d-type"
import { service as converterService } from "meta3d-scenegraph-converter-three-protocol/src/service/ServiceType"
import { service as converterGameViewService } from "meta3d-scenegraph-converter-three-gameview-protocol/src/service/ServiceType"
import { service as threeAPIService } from "meta3d-three-api-protocol/src/service/ServiceType"
import { GLTF, GLTFLoader } from "./three/GLTFLoader"
import { DefaultLoadingManager } from "./three/LoadingManager"
import { state as engineWholeState } from "meta3d-engine-whole-protocol/src/state/StateType"
import { service as engineWholeService } from "meta3d-engine-whole-protocol/src/service/ServiceType"
import { service as engineWholeGameViewService } from "meta3d-engine-whole-gameview-protocol/src/service/ServiceType"
import { dispose } from "meta3d-pipeline-utils/src/DisposeJobUtils"
import { activeCameraForGameView, activeCameraForSceneView, addGameObjectsForSceneView } from "meta3d-pipeline-editor-webgl1-view1-utils/src/CreateDefaultSceneJobUtils"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
// import { bindEvent } from "meta3d-pipeline-utils/src/ArcballCameraControllerEventUtils";
// import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"


let _disposeScene = (api: api, meta3dState: meta3dState): meta3dState => {
    let engineWholeService = api.getExtensionService<engineWholeService>(meta3dState, "meta3d-engine-whole-protocol")
    let engineWholeGameViewService = api.getExtensionService<engineWholeGameViewService>(meta3dState, "meta3d-engine-whole-gameview-protocol")

    meta3dState = engineWholeService.scene.gameObject.disposeGameObjects(
        meta3dState,
        engineWholeService.scene.gameObject.getAllGameObjects(meta3dState)
    )
    meta3dState = engineWholeGameViewService.scene.gameObject.disposeGameObjects(
        meta3dState,
        engineWholeGameViewService.scene.gameObject.getAllGameObjects(meta3dState)
    )

    return dispose(api, meta3dState)
}

// let _activeFirstBasicCameraView = (api: api, meta3dState: meta3dState): meta3dState => {
//     let { scene } = api.getExtensionService<engineWholeService>(meta3dState, "meta3d-engine-whole-protocol")


//     let basicCameraViewGameObjects = scene.gameObject.getAllGameObjects(meta3dState)
//         .filter(gameObject => scene.gameObject.hasBasicCameraView(meta3dState, gameObject))
//     // .map(gameObject => {
//     //     return scene.gameObject.getBasicCameraView(meta3dState, gameObject)
//     // })

//     if (basicCameraViewGameObjects.length == 0) {
//         throw new Error("error")
//     }

//     let basicCameraViewGameObject = basicCameraViewGameObjects[0]

//     meta3dState = scene.basicCameraView.active(
//         meta3dState,
//         scene.gameObject.getBasicCameraView(meta3dState, basicCameraViewGameObject)
//     )

//     return meta3dState
// }

// let _addArcballCameraController = (api: api, meta3dState: meta3dState): meta3dState => {
//     let { scene } = api.getExtensionService<engineWholeService>(meta3dState, "meta3d-engine-whole-protocol")

//     let data = scene.arcballCameraController.createArcballCameraController(meta3dState)
//     meta3dState = data[0]
//     let cameraController = data[1]

//     meta3dState = scene.arcballCameraController.setDistance(meta3dState, cameraController, 30)


//     let eventService = api.getExtensionService<eventService>(meta3dState, "meta3d-event-protocol")

//     bindEvent(eventService, "meta3d-event-protocol")



//     let basicCameraViewGameObjects = scene.gameObject.getAllGameObjects(meta3dState)
//         .filter(gameObject => scene.gameObject.hasBasicCameraView(meta3dState, gameObject))

//     if (basicCameraViewGameObjects.length == 0) {
//         throw new Error("error")
//     }

//     let basicCameraViewGameObject = basicCameraViewGameObjects[0]


//     meta3dState = scene.gameObject.addArcballCameraController(meta3dState, basicCameraViewGameObject, cameraController)


//     return meta3dState
// }

let _loadScene = (meta3dState: meta3dState, api: api, sceneGLB: ArrayBuffer) => {
    let threeAPIService = api.getExtensionService<threeAPIService>(meta3dState, "meta3d-three-api-protocol")

    return new Promise((resolve, reject) => {
        new GLTFLoader(
            DefaultLoadingManager,
            {
                AnimationClip: threeAPIService.AnimationClip,
                Bone: threeAPIService.Bone,
                Box3: threeAPIService.Box3,
                BufferAttribute: threeAPIService.BufferAttribute,
                BufferGeometry: threeAPIService.BufferGeometry,
                ClampToEdgeWrapping: threeAPIService.ClampToEdgeWrapping,
                Color: threeAPIService.Color,
                DirectionalLight: threeAPIService.DirectionalLight,
                DoubleSide: threeAPIService.DoubleSide,
                FileLoader: threeAPIService.FileLoader,
                FrontSide: threeAPIService.FrontSide,
                Group: threeAPIService.Group,
                ImageBitmapLoader: threeAPIService.ImageBitmapLoader,
                InstancedMesh: threeAPIService.InstancedMesh,
                InterleavedBuffer: threeAPIService.InterleavedBuffer,
                InterleavedBufferAttribute: threeAPIService.InterleavedBufferAttribute,
                Interpolant: threeAPIService.Interpolant,
                InterpolateDiscrete: threeAPIService.InterpolateDiscrete,
                InterpolateLinear: threeAPIService.InterpolateLinear,
                Line: threeAPIService.Line,
                LineBasicMaterial: threeAPIService.LineBasicMaterial,
                LineLoop: threeAPIService.LineLoop,
                LineSegments: threeAPIService.LineSegments,
                LinearFilter: threeAPIService.LinearFilter,
                LinearMipmapLinearFilter: threeAPIService.LinearMipmapLinearFilter,
                LinearMipmapNearestFilter: threeAPIService.LinearMipmapNearestFilter,
                Loader: threeAPIService.Loader,
                LoaderUtils: threeAPIService.LoaderUtils,
                Material: threeAPIService.Material,
                MathUtils: threeAPIService.MathUtils,
                Matrix4: threeAPIService.Matrix4,
                Mesh: threeAPIService.Mesh,
                MeshBasicMaterial: threeAPIService.MeshBasicMaterial,
                MeshPhysicalMaterial: threeAPIService.MeshPhysicalMaterial,
                MeshStandardMaterial: threeAPIService.MeshStandardMaterial,
                MirroredRepeatWrapping: threeAPIService.MirroredRepeatWrapping,
                NearestFilter: threeAPIService.NearestFilter,
                NearestMipmapLinearFilter: threeAPIService.NearestMipmapLinearFilter,
                NearestMipmapNearestFilter: threeAPIService.NearestMipmapNearestFilter,
                NumberKeyframeTrack: threeAPIService.NumberKeyframeTrack,
                Object3D: threeAPIService.Object3D,
                OrthographicCamera: threeAPIService.OrthographicCamera,
                PerspectiveCamera: threeAPIService.PerspectiveCamera,
                PointLight: threeAPIService.PointLight,
                Points: threeAPIService.Points,
                PointsMaterial: threeAPIService.PointsMaterial,
                PropertyBinding: threeAPIService.PropertyBinding,
                Quaternion: threeAPIService.Quaternion,
                QuaternionKeyframeTrack: threeAPIService.QuaternionKeyframeTrack,
                RepeatWrapping: threeAPIService.RepeatWrapping,
                Skeleton: threeAPIService.Skeleton,
                SkinnedMesh: threeAPIService.SkinnedMesh,
                Sphere: threeAPIService.Sphere,
                SpotLight: threeAPIService.SpotLight,
                Texture: threeAPIService.Texture,
                TextureLoader: threeAPIService.TextureLoader,
                TriangleFanDrawMode: threeAPIService.TriangleFanDrawMode,
                TriangleStripDrawMode: threeAPIService.TriangleStripDrawMode,
                Vector2: threeAPIService.Vector2,
                Vector3: threeAPIService.Vector3,
                VectorKeyframeTrack: threeAPIService.VectorKeyframeTrack,
                SRGBColorSpace: threeAPIService.SRGBColorSpace,
            },
            {
                TriangleFanDrawMode: threeAPIService.TriangleFanDrawMode,
                TriangleStripDrawMode: threeAPIService.TriangleStripDrawMode,
                TrianglesDrawMode: threeAPIService.TrianglesDrawMode,
            }
        ).parse(
            sceneGLB,
            null,
            (gltf) => {
                resolve(gltf)
            },
            (event) => reject(event)
        )
    })

}

export let getExtensionService: getExtensionServiceMeta3D<service> = (api) => {
    return {
        loadScene: (meta3dState, sceneGLB) => {
            // return _loadScene(meta3dState, api, sceneGLB)
            //     .then((gltf: GLTF) => {
            //         meta3dState = api.getExtensionService<converterService>(meta3dState, "meta3d-scenegraph-converter-three-protocol").import(meta3dState, gltf.scene)

            //         meta3dState = _activeFirstBasicCameraView(api, meta3dState)

            //         return meta3dState
            //     })


            /*! where to use? */

            throw new Error("not implement")
        },
        import: (meta3dState, sceneGLB) => {
            return _loadScene(meta3dState, api, sceneGLB)
                .then((gltf: GLTF) => {
                    meta3dState = _disposeScene(api, meta3dState)

                    meta3dState = api.getExtensionService<converterService>(meta3dState, "meta3d-scenegraph-converter-three-protocol").import(meta3dState, gltf.scene)
                    meta3dState = api.getExtensionService<converterGameViewService>(meta3dState, "meta3d-scenegraph-converter-three-gameview-protocol").import(meta3dState, gltf.scene)



                    let engineWholeService = api.getExtensionService<engineWholeService>(meta3dState, "meta3d-engine-whole-protocol")
                    let canvas = getExn(api.getExtensionState<engineWholeState>(meta3dState, "meta3d-engine-whole-protocol").canvas)

                    let data = addGameObjectsForSceneView(meta3dState,
                        engineWholeService,
                        api.getExtensionService<eventService>(meta3dState, "meta3d-event-protocol"),
                        "meta3d-event-protocol",
                        [canvas.width, canvas.height],
                    )
                    meta3dState = data[0]
                    let arcballCameraControllerGameObject = data[2]

                    meta3dState = activeCameraForSceneView(meta3dState, engineWholeService, arcballCameraControllerGameObject)




                    meta3dState = activeCameraForGameView(meta3dState, api.getExtensionService<engineWholeGameViewService>(meta3dState, "meta3d-engine-whole-gameview-protocol"))



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
