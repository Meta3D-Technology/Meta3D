import { service } from "meta3d-export-scene-protocol/src/service/ServiceType"
import { state } from "meta3d-export-scene-protocol/src/state/StateType"
import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D } from "meta3d-type"
import { GLTFExporter } from "./three/GLTFExporter"
import { service as converterService } from "meta3d-scenegraph-converter-three-protocol/src/service/ServiceType"
import { service as threeAPIService } from "meta3d-three-api-protocol/src/service/ServiceType"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils";

export let getExtensionService: getExtensionServiceMeta3D<service> = (api) => {
    return {
        export: ([onFinishFunc, onErrorFunc], meta3dState) => {
            let { perspectiveCamera, scene } =
                api.getExtensionService<converterService>(meta3dState, "meta3d-scenegraph-converter-three-protocol").convert(meta3dState)

            let scene_ = getExn(scene)

            // if (!isNullable(perspectiveCamera)) {
            //     scene_.add(getExn(perspectiveCamera))
            // }


            let threeAPIService = api.getExtensionService<threeAPIService>(meta3dState, "meta3d-three-api-protocol")

            new GLTFExporter(
                {
                    BufferAttribute: threeAPIService.BufferAttribute,
                    ClampToEdgeWrapping: threeAPIService.ClampToEdgeWrapping,
                    Color: threeAPIService.Color,
                    DoubleSide: threeAPIService.DoubleSide,
                    InterpolateDiscrete: threeAPIService.InterpolateDiscrete,
                    InterpolateLinear: threeAPIService.InterpolateLinear,
                    NoColorSpace: threeAPIService.NoColorSpace,
                    LinearFilter: threeAPIService.LinearFilter,
                    LinearMipmapLinearFilter: threeAPIService.LinearMipmapLinearFilter,
                    LinearMipmapNearestFilter: threeAPIService.LinearMipmapNearestFilter,
                    MathUtils: threeAPIService.MathUtils,
                    Matrix4: threeAPIService.Matrix4,
                    MirroredRepeatWrapping: threeAPIService.MirroredRepeatWrapping,
                    NearestFilter: threeAPIService.NearestFilter,
                    NearestMipmapLinearFilter: threeAPIService.NearestMipmapLinearFilter,
                    NearestMipmapNearestFilter: threeAPIService.NearestMipmapNearestFilter,
                    PropertyBinding: threeAPIService.PropertyBinding,
                    RGBAFormat: threeAPIService.RGBAFormat,
                    RepeatWrapping: threeAPIService.RepeatWrapping,
                    Scene: threeAPIService.Scene,
                    Source: threeAPIService.Source,
                    SRGBColorSpace: threeAPIService.SRGBColorSpace,
                    CompressedTexture: threeAPIService.CompressedTexture,
                    Vector3: threeAPIService.Vector3,
                },
                {
                    PlaneGeometry: threeAPIService.PlaneGeometry,
                    ShaderMaterial: threeAPIService.ShaderMaterial,
                    Uniform: threeAPIService.Uniform,
                    Mesh: threeAPIService.Mesh,
                    PerspectiveCamera: threeAPIService.PerspectiveCamera,
                    Scene: threeAPIService.Scene,
                    WebGLRenderer: threeAPIService.WebGLRenderer,
                    Texture: threeAPIService.Texture,
                    SRGBColorSpace: threeAPIService.SRGBColorSpace
                }
            ).parse(
                scene_,
                onFinishFunc as (gltf: ArrayBuffer | { [key: string]: any }) => void,
                onErrorFunc,
                {
                    binary: true
                }
            )
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
