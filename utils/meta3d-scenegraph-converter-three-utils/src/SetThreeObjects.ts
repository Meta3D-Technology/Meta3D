import { service as threeAPIService } from "meta3d-three-api-protocol/src/service/ServiceType"
import { state as meta3dState, getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, extensionLife, api } from "meta3d-type"

export let BufferAttribute: any, Color: any, FrontSide: any, Layers: any, Matrix3: any, Matrix4: any, NoBlending: any, Sphere: any, Box3: any, Vector3: any, Quaternion: any, Source: any,
    ClampToEdgeWrapping: any,
    RepeatWrapping: any,
    MirroredRepeatWrapping: any,
    UVMapping: any,
    NearestFilter: any,
    NearestMipmapNearestFilter,
    NearestMipmapLinearFilter,
    LinearFilter,
    LinearMipmapNearestFilter,
    LinearMipmapLinearFilter,
    Vector2,
    TangentSpaceNormalMap,
    ObjectSpaceNormalMap,
    NoColorSpace

export let setThreeObjects = (api: api, meta3dState: meta3dState) => {
    let threeAPIService = api.getExtensionService<threeAPIService>(meta3dState, "meta3d-three-api-protocol")

    BufferAttribute = threeAPIService.BufferAttribute
    Color = threeAPIService.Color
    FrontSide = threeAPIService.FrontSide
    Layers = threeAPIService.Layers
    Matrix3 = threeAPIService.Matrix3
    Matrix4 = threeAPIService.Matrix4
    NoBlending = threeAPIService.NoBlending
    Sphere = threeAPIService.Sphere
    Box3 = threeAPIService.Box3
    Vector3 = threeAPIService.Vector3
    Quaternion = threeAPIService.Quaternion
    Source = threeAPIService.Source
    ClampToEdgeWrapping = threeAPIService.ClampToEdgeWrapping
    RepeatWrapping = threeAPIService.RepeatWrapping
    MirroredRepeatWrapping = threeAPIService.MirroredRepeatWrapping
    UVMapping = threeAPIService.UVMapping
    NearestFilter = threeAPIService.NearestFilter
    NearestMipmapNearestFilter = threeAPIService.NearestMipmapNearestFilter
    NearestMipmapNearestFilter = threeAPIService.NearestMipmapNearestFilter
    NearestMipmapLinearFilter = threeAPIService.NearestMipmapLinearFilter
    LinearFilter = threeAPIService.LinearFilter
    LinearMipmapNearestFilter = threeAPIService.LinearMipmapNearestFilter
    LinearMipmapLinearFilter = threeAPIService.LinearMipmapLinearFilter
    Vector2 = threeAPIService.Vector2
    TangentSpaceNormalMap = threeAPIService.TangentSpaceNormalMap
    ObjectSpaceNormalMap = threeAPIService.ObjectSpaceNormalMap
    NoColorSpace = threeAPIService.NoColorSpace
}