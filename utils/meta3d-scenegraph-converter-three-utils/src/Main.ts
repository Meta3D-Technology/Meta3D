import { service } from "meta3d-scenegraph-converter-three-protocol/src/service/ServiceType"
import { state } from "meta3d-scenegraph-converter-three-protocol/src/state/StateType"
import { state as meta3dState, getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, extensionLife, api } from "meta3d-type"
import { basicCameraView } from "meta3d-component-basiccameraview-protocol";
import {
    type Blending, type Side,
    type BufferAttribute as BufferAttributeType,
    type CubeTexture,
    type Texture as TextureType,
    type Color as ColorType,
    type Layers as LayersType, Matrix3 as Matrix3Type,
    type Matrix4 as Matrix4Type,
    type Sphere as SphereType,
    type Object3D as Object3DType,
    type Camera as CameraType,
    type PerspectiveCamera as PerspectiveCameraType,
    type Mesh as MeshType,
    type TypedArray,
    type BufferGeometry as BufferGeometryType,
    type Material as MaterialType,
    type MeshStandardMaterial as MeshStandardMaterialType,
    type MeshPhysicalMaterial as MeshPhysicalMaterialType,
    type Source as SourceType,
    type Wrapping,
    type AnyMapping,
    type MinificationTextureFilter,
    type MagnificationTextureFilter,
    // type AnyPixelFormat,
    type TextureDataType, Vector2 as Vector2Type, Vector3 as Vector3Type,
    type NormalMapTypes,
    type WebGL1PixelFormat,
    type TextureFilter,
    type DirectionalLight as DirectionalLightType,
    type ColorSpace,
    type Quaternion as QuaternionType
    // Quaternion,
} from "three";
import { getExn, getWithDefault, map, isNullable, bind, return_ } from "meta3d-commonlib-ts/src/NullableUtils"
import { createEmptyPhysicalMaterialInstanceMap, createEmptyGeometryInstanceMap, createEmptyMeshInstanceMap, getEngineSceneService, getMeta3dState, setAPI, setMeta3dState, createEmptyTextureInstanceMap, createEmptyDirectionLightInstanceMap, setGetAllGameObjectsFunc } from "./utils/GlobalUtils";
// import { componentName as basicCameraViewComponentName } from "meta3d-component-basiccameraview-protocol"
import { componentName as perspectiveCameraProjectionComponentName, perspectiveCameraProjection, pMatrix, dataName as perspectiveCameraProjectionDataName } from "meta3d-component-perspectivecameraprojection-protocol";
// import { componentName as transformComponentName } from "meta3d-component-transform-protocol"
// import { getActiveCameraView } from "meta3d-component-commonlib";
// import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
// import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { gameObject } from "meta3d-gameobject-protocol"
import { nullable, strictNullable } from "meta3d-commonlib-ts/src/nullable";
import { geometry } from "meta3d-component-geometry-protocol-common/src/Index";
import { pbrMaterial } from "meta3d-component-pbrmaterial-protocol-common/src/Index";
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
// import { service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { localRotation } from "meta3d-component-transform-protocol";
import { scene } from "meta3d-engine-scene-protocol/src/service/ServiceType";
import { diffuseColor, specularColor } from "meta3d-component-pbrmaterial-protocol";
import { filter, htmlImageElement, texture, wrap } from "meta3d-texture-basicsource-protocol/src/state/StateType";
import { color, directionLight } from "meta3d-component-directionlight-protocol";
import {
    BufferAttribute, Color, FrontSide, Layers, Matrix3, Matrix4, NoBlending, Sphere, Vector3, Quaternion, Source,
    ClampToEdgeWrapping,
    RepeatWrapping,
    MirroredRepeatWrapping,
    UVMapping,
    NearestFilter,
    NearestMipmapNearestFilter,
    NearestMipmapLinearFilter,
    LinearFilter,
    LinearMipmapNearestFilter,
    LinearMipmapLinearFilter,
    Vector2,
    TangentSpaceNormalMap,
    ObjectSpaceNormalMap,
    NoColorSpace,
    setThreeObjects
} from "./SetThreeObjects";
import {
    BufferGeometry,
    DirectionLight,
    Mesh,
    MeshPhysicalMaterial,
    PerspectiveCamera,
    Scene,
    Texture,
    getDirectionLightInstanceMap, getGeometryInstanceMap, getMeshInstanceMap, getPhysicalMaterialInstanceMap, getTextureInstanceMap
} from "./Classes";
import { setVariables } from "./SetVariables";

// class Group extends Object3D {
//     constructor(gameObject: gameObject) {
//         super(gameObject)
//     }

//     public get isGroup(): boolean {
//         return true
//     }

//     public get type(): string {
//         return "Group"
//     }
// }


let _convertToUint32ArrayIndices = (indices: TypedArray) => {
    if (!(indices instanceof Uint32Array)) {
        // return new Uint32Array(indices.buffer)
        return new Uint32Array(Array.from(indices))
    }

    return indices
}

let _getBufferGeometry = (mesh: MeshType): BufferGeometryType => {
    let geometry = mesh.geometry

    if (!geometry.isBufferGeometry) {
        throw new Error("error")
    }

    return geometry
}

let _getMeshMaterial = (mesh: MeshType): MeshPhysicalMaterialType | MeshStandardMaterialType => {
    let material = mesh.material as MaterialType

    if (material.type == "MeshPhysicalMaterial") {
        return material as MeshPhysicalMaterialType
    }

    if (material.type == "MeshStandardMaterial") {
        return material as MeshStandardMaterialType
    }

    throw new Error(`unsupport material type: ${material.type}`)
}

let _convertWrapToScene = (wrap_: Wrapping) => {
    switch (wrap_) {
        case ClampToEdgeWrapping:
            return wrap.Clamp_to_edge
        case RepeatWrapping:
            return wrap.Repeat
        case MirroredRepeatWrapping:
        default:
            return wrap.Mirrored_repeat
    }
}

let _convertFilterToScene = (filter_: TextureFilter) => {
    switch (filter_) {
        case NearestFilter:
            return filter.Nearest
        case NearestMipmapLinearFilter:
            return filter.Nearest_mipmap_linear
        case NearestMipmapNearestFilter:
            return filter.Nearest_mipmap_nearest
        case LinearFilter:
            return filter.Linear
        case LinearMipmapLinearFilter:
            return filter.Linear_mipmap_linear
        case LinearMipmapNearestFilter:
        default:
            return filter.Linear_mipmap_nearest
    }
}


let _createMap = (meta3dState: meta3dState,
    sceneService: scene,
    textureMap: Record<string, texture>,
    texture: nullable<TextureType>): [meta3dState, nullable<texture>, Record<string, texture>] => {
    return getWithDefault(bind((texture) => {
        if (textureMap[texture.uuid] === undefined) {
            let basicSourceTextureService = sceneService.basicSourceTexture

            let data = basicSourceTextureService.createTexture(meta3dState)
            meta3dState = data[0]
            let map = data[1]

            meta3dState = basicSourceTextureService.setName(meta3dState, map, texture.name)

            meta3dState = basicSourceTextureService.setImage(meta3dState, map, texture.image)
            meta3dState = basicSourceTextureService.setFlipY(meta3dState, map, texture.flipY)
            meta3dState = basicSourceTextureService.setFormat(meta3dState, map, texture.format as any as WebGL1PixelFormat)
            meta3dState = basicSourceTextureService.setType(meta3dState, map, texture.type)
            meta3dState = basicSourceTextureService.setMinFilter(meta3dState, map, _convertFilterToScene(texture.minFilter))
            meta3dState = basicSourceTextureService.setMagFilter(meta3dState, map, _convertFilterToScene(texture.magFilter))
            meta3dState = basicSourceTextureService.setWrapS(meta3dState, map, _convertWrapToScene(texture.wrapS))
            meta3dState = basicSourceTextureService.setWrapT(meta3dState, map, _convertWrapToScene(texture.wrapT))

            textureMap[texture.uuid] = map

            return [meta3dState, map, textureMap]
        }

        return [meta3dState, textureMap[texture.uuid], textureMap]
    }, texture), [meta3dState, null, textureMap])
}

let _convertTangentFromItemSize4To3 = (tangents: Float32Array) => {
    let result = []

    for (let i = 0; i < tangents.length; i += 4) {
        result.push(tangents[i])
        result.push(tangents[i + 1])
        result.push(tangents[i + 2])
    }

    return new Float32Array(result)
}

let _import = (sceneService: scene,
    meta3dState: meta3dState,
    [standardMaterialMap, bufferGeometryMap, textureMap],
    object3D: Object3DType, parent: nullable<gameObject>): [meta3dState, gameObject] => {
    let gameObjectService = sceneService.gameObject
    let transformService = sceneService.transform
    let basicCameraViewService = sceneService.basicCameraView
    let perspectiveCameraProjectionService = sceneService.perspectiveCameraProjection
    let geometryService = sceneService.geometry
    let pbrMaterialService = sceneService.pbrMaterial
    let directionLightService = sceneService.directionLight

    let data = gameObjectService.createGameObject(meta3dState)
    meta3dState = data[0]
    let gameObject = data[1]

    meta3dState = gameObjectService.setGameObjectName(meta3dState, gameObject, object3D.name)



    data = transformService.createTransform(meta3dState)
    meta3dState = data[0]
    let transform = data[1]

    meta3dState = transformService.setName(meta3dState, transform, object3D.name)
    meta3dState = transformService.setLocalPosition(meta3dState, transform, object3D.position.toArray())
    meta3dState = transformService.setLocalRotation(meta3dState, transform, object3D.quaternion.toArray() as any as localRotation)
    meta3dState = transformService.setLocalScale(meta3dState, transform, object3D.scale.toArray())

    if (!isNullable(parent)) {
        meta3dState = transformService.setParent(meta3dState, transform,
            gameObjectService.getTransform(meta3dState, getExn(parent))
        )
    }

    meta3dState = gameObjectService.addTransform(meta3dState, gameObject, transform)


    if ((object3D as any as CameraType).isCamera) {
        data = basicCameraViewService.createBasicCameraView(meta3dState)
        meta3dState = data[0]
        let basicCameraView = data[1]

        meta3dState = basicCameraViewService.setName(meta3dState, basicCameraView, object3D.name)

        meta3dState = gameObjectService.addBasicCameraView(meta3dState, gameObject, basicCameraView)

        if ((object3D as any as PerspectiveCameraType).isPerspectiveCamera) {
            let { near, far, fov, aspect, name } = object3D as any as PerspectiveCameraType

            data = perspectiveCameraProjectionService.createPerspectiveCameraProjection(meta3dState)
            meta3dState = data[0]
            let perspectiveCameraProjection = data[1]

            meta3dState = perspectiveCameraProjectionService.setName(meta3dState, perspectiveCameraProjection, name)

            meta3dState = perspectiveCameraProjectionService.setNear(meta3dState, perspectiveCameraProjection, near)
            meta3dState = perspectiveCameraProjectionService.setFar(meta3dState, perspectiveCameraProjection, far)
            meta3dState = perspectiveCameraProjectionService.setFovy(meta3dState, perspectiveCameraProjection, fov)
            meta3dState = perspectiveCameraProjectionService.setAspect(meta3dState, perspectiveCameraProjection, aspect)


            meta3dState = gameObjectService.addPerspectiveCameraProjection(meta3dState, gameObject, perspectiveCameraProjection)
        }

        // TODO handle ortho camera
    }
    else if ((object3D as any as MeshType).isMesh) {
        let mesh = object3D as any as MeshType

        let bufferGeometry = _getBufferGeometry(mesh)

        if (bufferGeometryMap[bufferGeometry.uuid] === undefined) {
            let data = geometryService.createGeometry(meta3dState)
            meta3dState = data[0]
            let geometry = data[1]

            meta3dState = geometryService.setName(meta3dState, geometry, bufferGeometry.name)

            meta3dState = geometryService.setVertices(meta3dState, geometry, bufferGeometry.getAttribute("position").array as any as Float32Array)
            if (bufferGeometry.getAttribute("normal") !== undefined) {
                meta3dState = geometryService.setNormals(meta3dState, geometry, bufferGeometry.getAttribute("normal").array as any as Float32Array)
            }
            if (bufferGeometry.getAttribute("uv") !== undefined) {
                meta3dState = geometryService.setTexCoords(meta3dState, geometry, bufferGeometry.getAttribute("uv").array as any as Float32Array)
            }
            if (bufferGeometry.getAttribute("tangent") !== undefined) {
                if (bufferGeometry.getAttribute("tangent").itemSize != 4) {
                    throw new Error("error")
                }

                meta3dState = geometryService.setTangents(meta3dState, geometry, _convertTangentFromItemSize4To3(bufferGeometry.getAttribute("tangent").array as any as Float32Array))
            }
            meta3dState = geometryService.setIndices(meta3dState,
                geometry,
                _convertToUint32ArrayIndices(
                    bufferGeometry.getIndex().array
                )
            )


            meta3dState = gameObjectService.addGeometry(meta3dState, gameObject, geometry)

            bufferGeometryMap[bufferGeometry.uuid] = geometry
        }
        else {
            meta3dState = gameObjectService.addGeometry(meta3dState, gameObject, bufferGeometryMap[bufferGeometry.uuid])
        }



        let meshMaterial = _getMeshMaterial(mesh)


        if (standardMaterialMap[meshMaterial.uuid] === undefined) {
            let data = pbrMaterialService.createPBRMaterial(meta3dState)
            meta3dState = data[0]
            let pbrMaterial = data[1]

            meta3dState = pbrMaterialService.setName(meta3dState, pbrMaterial, meshMaterial.name)

            meta3dState = pbrMaterialService.setDiffuseColor(meta3dState, pbrMaterial, meshMaterial.color.toArray() as any as diffuseColor
            )
            meta3dState = pbrMaterialService.setMetalness(meta3dState, pbrMaterial, meshMaterial.metalness)
            meta3dState = pbrMaterialService.setRoughness(meta3dState, pbrMaterial, meshMaterial.roughness)

            let mapData = _createMap(meta3dState, sceneService, textureMap, meshMaterial.map)
            meta3dState = mapData[0]
            let map = mapData[1]
            textureMap = mapData[2]
            if (!isNullable(map)) {
                meta3dState = pbrMaterialService.setDiffuseMap(meta3dState, pbrMaterial, getExn(map))
            }

            mapData = _createMap(meta3dState, sceneService, textureMap, meshMaterial.roughnessMap)
            meta3dState = mapData[0]
            map = mapData[1]
            textureMap = mapData[2]
            if (!isNullable(map)) {
                meta3dState = pbrMaterialService.setRoughnessMap(meta3dState, pbrMaterial, getExn(map))
            }

            mapData = _createMap(meta3dState, sceneService, textureMap, meshMaterial.metalnessMap)
            meta3dState = mapData[0]
            map = mapData[1]
            textureMap = mapData[2]
            if (!isNullable(map)) {
                meta3dState = pbrMaterialService.setMetalnessMap(meta3dState, pbrMaterial, getExn(map))
            }


            mapData = _createMap(meta3dState, sceneService, textureMap, meshMaterial.normalMap)
            meta3dState = mapData[0]
            map = mapData[1]
            textureMap = mapData[2]
            if (!isNullable(map)) {
                meta3dState = pbrMaterialService.setNormalMap(meta3dState, pbrMaterial, getExn(map))
            }


            if (meshMaterial.type == "MeshPhysicalMaterial") {
                let meshPhysicalMaterial: MeshPhysicalMaterialType = meshMaterial as MeshPhysicalMaterialType

                meta3dState = pbrMaterialService.setSpecularColor(meta3dState, pbrMaterial, meshPhysicalMaterial.specularColor.toArray() as any as specularColor
                )
                meta3dState = pbrMaterialService.setSpecular(meta3dState, pbrMaterial, meshPhysicalMaterial.specularIntensity)
                meta3dState = pbrMaterialService.setIOR(meta3dState, pbrMaterial, meshPhysicalMaterial.ior)
                meta3dState = pbrMaterialService.setTransmission(meta3dState, pbrMaterial, meshPhysicalMaterial.transmission)
            }





            meta3dState = gameObjectService.addPBRMaterial(meta3dState, gameObject, pbrMaterial)

            standardMaterialMap[meshMaterial.uuid] = pbrMaterial
        }
        else {
            meta3dState = gameObjectService.addPBRMaterial(meta3dState, gameObject, standardMaterialMap[meshMaterial.uuid])
        }
    }
    else if ((object3D as any as DirectionalLightType).isDirectionalLight) {
        // let { color, intensity, matrixWorld } = object3D as any as DirectionalLightType
        // if (object3D.matrixWorldNeedsUpdate) {
        //     object3D.updateMatrixWorld()
        // }


        let { color, intensity, matrix, name } = object3D as any as DirectionalLightType

        data = directionLightService.createDirectionLight(meta3dState)
        meta3dState = data[0]
        let directionLight = data[1]

        meta3dState = gameObjectService.addDirectionLight(meta3dState, gameObject, directionLight)


        meta3dState = directionLightService.setName(meta3dState, directionLight, name)

        meta3dState = directionLightService.setColor(meta3dState, directionLight, color.toArray() as any as color)
        meta3dState = directionLightService.setIntensity(meta3dState, directionLight, intensity)


        // let vec = (new Vector3(0, 0, 1)).applyQuaternion((new Quaternion()).setFromRotationMatrix(matrixWorld))
        // let direction = 

        // meta3dState = directionLightService.setDirection(meta3dState, directionLight, (new Vector3(0, 0, 1)).applyQuaternion((new Quaternion()).setFromRotationMatrix(matrixWorld)))




        let direction = new Vector3()
        let _ = matrix.decompose(direction, new Quaternion(), new Vector3())

        meta3dState = directionLightService.setDirection(meta3dState, directionLight, direction.toArray())
    }

    meta3dState = object3D.children.reduce((meta3dState, child) => {
        let data = _import(sceneService, meta3dState,
            [standardMaterialMap, bufferGeometryMap, textureMap],
            child, return_(gameObject)
        )
        return data[0]
    }, meta3dState)

    return [meta3dState, gameObject]
}

let _disposeMesh = (mesh: Mesh) => {
}

let _disposePhysicalMaterial = (material: MeshPhysicalMaterial) => {
    material.dispose()
}

let _disposeTexture = (texture: Texture) => {
    texture.dispose()
}

let _disposeGeometry = (geometry: BufferGeometry) => {
    geometry.dispose()
}

let _disposeDirectionLight = (directionLight: DirectionLight) => {
    directionLight.dispose()
}

let _disposeMeshInstance = (gameObject: gameObject) => {
    _disposeMesh(getMeshInstanceMap()[gameObject])
    getMeshInstanceMap()[gameObject] = undefined
}

let _disposePhysicalMaterialInstance = (material: pbrMaterial) => {
    _disposePhysicalMaterial(getPhysicalMaterialInstanceMap()[material])
    getPhysicalMaterialInstanceMap()[material] = undefined
}

let _disposeTextureInstance = (texture: texture) => {
    _disposeTexture(getTextureInstanceMap()[texture])
    getTextureInstanceMap()[texture] = undefined
}

let _disposeGeometryInstance = (geometry: geometry) => {
    _disposeGeometry(getGeometryInstanceMap()[geometry])
    getGeometryInstanceMap()[geometry] = undefined
}

let _disposeDirectionLightInstance = (directionLight: directionLight) => {
    _disposeDirectionLight(getDirectionLightInstanceMap()[directionLight])
    getDirectionLightInstanceMap()[directionLight] = undefined
}




let _bindDisposeEvent = (meta3dState: meta3dState, eventService: eventService,
    {
        DisposeGameObjectsEventName,
        DisposeGeometrysEventName,
        DisposePBRMaterialsEventName,
        DisposeDirectionLightsEventName,
        // DisposeTransformsEventName,
        // DisposeBasicCameraViewsEventName,
        // DisposePerspectiveCameraProjectionsEventName,
        DisposeTextureEventName,
    }
): meta3dState => {
    meta3dState = eventService.onCustomGlobalEvent2(meta3dState, "meta3d-event-protocol", [
        DisposeGameObjectsEventName, 0, (meta3dState, { userData }) => {
            (getExn(userData) as any as Array<gameObject>).forEach(gameObject => {
                _disposeMeshInstance(gameObject)
            })

            return meta3dState
        }
    ])
    meta3dState = eventService.onCustomGlobalEvent2(meta3dState, "meta3d-event-protocol", [
        DisposeGeometrysEventName, 0, (meta3dState, { userData }) => {
            (getExn(userData) as any as Array<geometry>).forEach(geometry => {
                _disposeGeometryInstance(geometry)
            })

            return meta3dState
        }
    ])
    meta3dState = eventService.onCustomGlobalEvent2(meta3dState, "meta3d-event-protocol", [
        DisposePBRMaterialsEventName, 0, (meta3dState, { userData }) => {
            (getExn(userData) as any as Array<pbrMaterial>).forEach(pbrMaterial => {
                _disposePhysicalMaterialInstance(pbrMaterial)
            })

            return meta3dState
        }
    ])
    meta3dState = eventService.onCustomGlobalEvent2(meta3dState, "meta3d-event-protocol", [
        DisposeTextureEventName, 0, (meta3dState, { userData }) => {
            (getExn(userData) as any as Array<texture>).forEach(texture => {
                _disposeTextureInstance(texture)
            })

            return meta3dState
        }
    ])
    meta3dState = eventService.onCustomGlobalEvent2(meta3dState, "meta3d-event-protocol", [
        DisposeDirectionLightsEventName, 0, (meta3dState, { userData }) => {
            (getExn(userData) as any as Array<directionLight>).forEach(directionLight => {
                _disposeDirectionLightInstance(directionLight)
            })

            return meta3dState
        }
    ])

    return meta3dState
}


export let getExtensionServiceUtils = (
    // getCameraComponentsFunc: (meta3dState: meta3dState, isDebug: boolean) => [basicCameraView, perspectiveCameraProjection],
    api: api,
    allEventNames,
    // disposeGameObjectEventName,
): service => {
    return {
        init: (meta3dState) => {
            let eventProtocolName = "meta3d-event-protocol"

            let eventService = getExn(api.getPackageService<eventService>(
                meta3dState,
                eventProtocolName
            ))

            meta3dState = _bindDisposeEvent(meta3dState, eventService, allEventNames)

            return meta3dState
        },
        convert: (getAllGameObjectsFunc, meta3dState) => {
            let isDebug = true

            setMeta3dState(meta3dState)
            setGetAllGameObjectsFunc(getAllGameObjectsFunc)

            setThreeObjects(api, meta3dState)

            let { gameObject, basicCameraView } = getEngineSceneService(meta3dState)

            let cameraView = getExn(basicCameraView.getActiveCameraView(meta3dState, isDebug))
            let cameraGameObject = getExn(basicCameraView.getGameObjects(meta3dState, cameraView)[0])

            let cameraProjection = gameObject.getPerspectiveCameraProjection(
                meta3dState,
                cameraGameObject
            )

            return {
                perspectiveCamera: new PerspectiveCamera(
                    cameraView,
                    cameraProjection,
                    cameraGameObject
                ) as any,
                scene: new Scene() as any,
                // event: allEventNames
            }
        },
        import: (meta3dState, sceneGroup) => {
            let scene = getExn(api.getPackageService<scene>(meta3dState, "meta3d-engine-scene-protocol"))

            let standardMaterialMap = {}
            let bufferGeometryMap = {}
            let textureMap: Record<string, texture> = {}

            setThreeObjects(api, meta3dState)

            return _import(scene, meta3dState,
                [standardMaterialMap, bufferGeometryMap, textureMap],
                sceneGroup as Object3DType, null)
        }
    }
}

export let createExtensionStateUtils = (
    // allEventNames
): state => {
    return {
        perspectiveCamera: null,
        scene: null,
        // event: allEventNames
    }
}

export let getExtensionLifeUtils = (api: api,
    {
        engineSceneProtocolName, globalKeyNameForMeta3dState, globalKeyNameForAPI, globalKeyNameForMeshInstanceMap, globalKeyNameForPhysicalMaterialInstanceMap,
        globalKeyNameForTextureInstanceMap,
        globalKeyNameForGeometryInstanceMap,

        globalKeyNameForDirectionLightInstanceMap
    }: any
): extensionLife<service> => {
    return {
        onRegister: (meta3dState, service) => {
            setVariables(
                engineSceneProtocolName, globalKeyNameForMeta3dState, globalKeyNameForAPI, globalKeyNameForMeshInstanceMap, globalKeyNameForPhysicalMaterialInstanceMap,

                globalKeyNameForTextureInstanceMap,

                globalKeyNameForGeometryInstanceMap,

                globalKeyNameForDirectionLightInstanceMap
            )

            setAPI(api)

            createEmptyMeshInstanceMap()
            createEmptyPhysicalMaterialInstanceMap()
            createEmptyTextureInstanceMap()
            createEmptyGeometryInstanceMap()
            createEmptyDirectionLightInstanceMap()

            return meta3dState
        },
        onRestore: (currentMeta3dState, targetMeta3dState) => {
            return targetMeta3dState
        },
        onDeepCopy: (meta3dState) => meta3dState
    }
}
