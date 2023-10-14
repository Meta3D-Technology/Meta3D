import { state as meta3dState, getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, api } from "meta3d-type"
import { service as threeAPIService } from "meta3d-three-api-protocol/src/service/ServiceType"
import { GLTFLoader } from "./three/GLTFLoader"
import { DefaultLoadingManager } from "./three/LoadingManager"
import { service as engineWholeService } from "meta3d-engine-whole-sceneview-protocol/src/service/ServiceType"
import { service as engineWholeGameViewService } from "meta3d-engine-whole-gameview-protocol/src/service/ServiceType"
import type { GLTF } from "./three/GLTFLoader"

export let loadGlb = (meta3dState: meta3dState, api: api, glb: ArrayBuffer): Promise<GLTF> => {
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
            glb,
            null,
            (gltf) => {
                resolve(gltf)
            },
            (event) => reject(event)
        )
    })

}

export let activeFirstBasicCameraView = (meta3dState: meta3dState,
    { scene }: engineWholeService | engineWholeGameViewService
): meta3dState => {
    let basicCameraViewGameObjects = scene.gameObject.getAllGameObjects(meta3dState)
        .filter(gameObject => scene.gameObject.hasBasicCameraView(meta3dState, gameObject))

    if (basicCameraViewGameObjects.length == 0) {
        throw new Error("error")
    }

    let basicCameraViewGameObject = basicCameraViewGameObjects[0]

    meta3dState = scene.basicCameraView.active(
        meta3dState,
        scene.gameObject.getBasicCameraView(meta3dState, basicCameraViewGameObject)
    )

    return meta3dState
}