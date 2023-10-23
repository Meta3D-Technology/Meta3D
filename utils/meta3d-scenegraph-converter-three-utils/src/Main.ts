import { service } from "meta3d-scenegraph-converter-three-sceneview-protocol/src/service/ServiceType"
import { state } from "meta3d-scenegraph-converter-three-sceneview-protocol/src/state/StateType"
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
    type MeshStandardMaterial as MeshStandardMaterialType,
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
import { createEmptyStandardMaterialInstanceMap, createEmptyGeometryInstanceMap, createEmptyMeshInstanceMap, getEngineSceneService, getMeta3dState, setAPI, setMeta3dState, setVariables, createEmptyTextureInstanceMap, createEmptyDirectionLightInstanceMap } from "./utils/GlobalUtils";
// import { componentName as basicCameraViewComponentName } from "meta3d-component-basiccameraview-protocol"
import { componentName as perspectiveCameraProjectionComponentName, perspectiveCameraProjection, pMatrix, dataName as perspectiveCameraProjectionDataName } from "meta3d-component-perspectivecameraprojection-protocol";
// import { componentName as transformComponentName } from "meta3d-component-transform-protocol"
// import { getActiveCameraView } from "meta3d-component-commonlib";
// import { service as engineCoreService } from "meta3d-engine-core-sceneview-protocol/src/service/ServiceType"
// import { state as engineCoreState } from "meta3d-engine-core-sceneview-protocol/src/state/StateType"
import { gameObject } from "meta3d-gameobject-protocol"
import { nullable, strictNullable } from "meta3d-commonlib-ts/src/nullable";
import { geometry } from "meta3d-component-geometry-protocol-common/src/Index";
import { pbrMaterial } from "meta3d-component-pbrmaterial-protocol-common/src/Index";
import { service as threeAPIService } from "meta3d-three-api-protocol/src/service/ServiceType"
import { generateUUID } from "./three/MathUtils";
import { generateId } from "./utils/IdUtils";
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { EventDispatcher } from "./three/EventDispatcher";
import { service as engineWholeService } from "meta3d-engine-whole-sceneview-protocol/src/service/ServiceType"
import { localRotation } from "meta3d-component-transform-protocol";
import { scene } from "meta3d-engine-scene-sceneview-protocol/src/service/ServiceType";
import { diffuseColor } from "meta3d-component-pbrmaterial-protocol";
// import { state as engineCoreState } from "meta3d-engine-core-sceneview-protocol/src/state/StateType"
// import { service as engineCoreService } from "meta3d-engine-core-sceneview-protocol/src/service/ServiceType"
// import { state as pbrMaterialState, componentName as pbrMaterialComponentName } from "meta3d-component-pbrmaterial-protocol/src/Index"
// import { state as geometryState, componentName as geometryComponentName } from "meta3d-component-geometry-protocol/src/Index"
// import { isActuallyDisposeGeometry, isActuallyDisposePBRMateiral } from "meta3d-component-commonlib"
import { filter, htmlImageElement, texture, wrap } from "meta3d-texture-basicsource-protocol/src/state/StateType";
import { color, directionLight } from "meta3d-component-directionlight-protocol";
import { transform } from "meta3d-component-transform-protocol-common";
// import { service as textureService } from "meta3d-texture-basicsource-protocol/src/service/ServiceType"
// import {getDirection} from "meta3d-component-commonlib"

let BufferAttribute: any, Color: any, FrontSide: any, Layers: any, Matrix3: any, Matrix4: any, NoBlending: any, Sphere: any, Vector3: any, Quaternion: any, Source: any,
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




let _globalKeyNameForMeshInstanceMap: string
let _globalKeyNameForStandardMaterialInstanceMap: string
let _globalKeyNameForTextureInstanceMap: string
let _globalKeyNameForGeometryInstanceMap: string
let _globalKeyNameForDirectionLightInstanceMap: string

let _getEmptyGameObject = () => -1

let _disposeMesh = (mesh: Mesh) => {
}

let _disposeStandardMaterial = (material: MeshStandardMaterial) => {
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


/*! for WebGLProperties->get(xxx), use the same instance
*/

let _getMeshInstanceMap = (): Array<Mesh> => {
    return (globalThis as any)[_globalKeyNameForMeshInstanceMap]
}

let _disposeMeshInstance = (gameObject: gameObject) => {
    _disposeMesh(_getMeshInstanceMap()[gameObject])
    _getMeshInstanceMap()[gameObject] = undefined
}

let _getOrCreateMeshInstance = (gameObject: gameObject) => {
    if (_getMeshInstanceMap()[gameObject] === undefined) {
        _getMeshInstanceMap()[gameObject] = new Mesh(gameObject)
    }

    return _getMeshInstanceMap()[gameObject]
}

let _getStandardMaterialInstanceMap = (): Array<MeshStandardMaterial> => {
    return (globalThis as any)[_globalKeyNameForStandardMaterialInstanceMap]
}

let _disposeStandardMaterialInstance = (material: pbrMaterial) => {
    _disposeStandardMaterial(_getStandardMaterialInstanceMap()[material])
    _getStandardMaterialInstanceMap()[material] = undefined
}

let _getOrCreateStandardMaterialInstance = (material: pbrMaterial) => {
    if (_getStandardMaterialInstanceMap()[material] === undefined) {
        _getStandardMaterialInstanceMap()[material] = new MeshStandardMaterial(material)
    }

    return _getStandardMaterialInstanceMap()[material]
}


let _getTextureInstanceMap = (): Array<Texture> => {
    return (globalThis as any)[_globalKeyNameForTextureInstanceMap]
}

let _disposeTextureInstance = (texture: texture) => {
    _disposeTexture(_getTextureInstanceMap()[texture])
    _getTextureInstanceMap()[texture] = undefined
}

let _getOrCreateTextureInstance = (texture: texture) => {
    if (_getTextureInstanceMap()[texture] === undefined) {
        _getTextureInstanceMap()[texture] = new Texture(texture)
    }

    return _getTextureInstanceMap()[texture]
}


let _getGeometryInstanceMap = (): Array<BufferGeometry> => {
    return (globalThis as any)[_globalKeyNameForGeometryInstanceMap]
}

let _disposeGeometryInstance = (geometry: geometry) => {
    _disposeGeometry(_getGeometryInstanceMap()[geometry])
    _getGeometryInstanceMap()[geometry] = undefined
}

let _getOrCreateGeometryInstance = (geometry: geometry) => {
    if (_getGeometryInstanceMap()[geometry] === undefined) {
        _getGeometryInstanceMap()[geometry] = new BufferGeometry(geometry)
    }

    return _getGeometryInstanceMap()[geometry]
}


let _getDirectionLightInstanceMap = (): Array<DirectionLight> => {
    return (globalThis as any)[_globalKeyNameForDirectionLightInstanceMap]
}

let _disposeDirectionLightInstance = (directionLight: directionLight) => {
    _disposeDirectionLight(_getDirectionLightInstanceMap()[directionLight])
    _getDirectionLightInstanceMap()[directionLight] = undefined
}

let _getOrCreateDirectionLightInstance = (directionLight: directionLight, gameObject: gameObject) => {
    if (_getDirectionLightInstanceMap()[directionLight] === undefined) {
        _getDirectionLightInstanceMap()[directionLight] = new DirectionLight(directionLight, gameObject)
    }

    return _getDirectionLightInstanceMap()[directionLight]
}



// let _clearAllInstanceMaps = () => {
//     createEmptyMeshInstanceMap()
//     createEmptyStandardMaterialInstanceMap()
//     createEmptyTextureInstanceMap()
//     createEmptyGeometryInstanceMap()
// }

// let _getAllMeshInstances = () => {
//     return _getMeshInstanceMap().filter(value => value !== undefined)
// }

// let _getAllStandardMaterialInstances = () => {
//     return _getStandardMaterialInstanceMap().filter(value => value !== undefined)
// }

// let _getAllGeometryInstances = () => {
//     return _getGeometryInstanceMap().filter(value => value !== undefined)
// }

let _convertToMatrix4 = (mat: Float32Array): Matrix4Type => {
    // return new Matrix4(
    //     mat[0],
    //     mat[1],
    //     mat[2],
    //     mat[3],
    //     mat[4],
    //     mat[5],
    //     mat[6],
    //     mat[7],
    //     mat[8],
    //     mat[9],
    //     mat[10],
    //     mat[11],
    //     mat[12],
    //     mat[13],
    //     mat[14],
    //     mat[15],
    // )

    return new Matrix4(
        mat[0],
        mat[4],
        mat[8],
        mat[12],

        mat[1],
        mat[5],
        mat[9],
        mat[13],

        mat[2],
        mat[6],
        mat[10],
        mat[14],

        mat[3],
        mat[7],
        mat[11],
        mat[15],
    )
}

// let _getCameraView = (engineCoreState: engineCoreState, engineCoreService: engineCoreService, isDebug: boolean) =>  {
//     return getExn(getActiveCameraView(engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, basicCameraViewComponentName), engineCoreService, isDebug))
// }

// let _getCameraProjection = (engineCoreState: engineCoreState, engineCoreService: engineCoreService, gameObject: gameObject) =>  {
//     return getExn(engineCoreService.getComponent<perspectiveCameraProjection>(engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, perspectiveCameraProjectionComponentName), gameObject))
// }

let _getMatrix = (gameObject: gameObject): Matrix4Type => {
    let meta3dState = getMeta3dState()

    let engineSceneService = getEngineSceneService(meta3dState)

    let transformComponent = engineSceneService.gameObject.getTransform(meta3dState, getExn(
        gameObject
    ))

    return (new Matrix4()).compose(
        (new Vector3()).fromArray(
            getExn(engineSceneService.transform.getLocalPosition(meta3dState, transformComponent))
        ),
        (new Quaternion()).fromArray(
            engineSceneService.transform.getLocalRotation(meta3dState, transformComponent)
        )
        ,
        (new Vector3()).fromArray(
            getExn(engineSceneService.transform.getLocalScale(meta3dState, transformComponent))
        ),
    )

}

class Object3D {
    constructor(gameObject: gameObject) {
        this.gameObject = gameObject
    }

    protected gameObject: gameObject

    public get isObject3D(): boolean {
        return true
    }

    public get name(): string {
        let meta3dState = getMeta3dState()

        let { gameObject } = getEngineSceneService(meta3dState)

        return getWithDefault(gameObject.getGameObjectName(meta3dState, this.gameObject), "")
    }

    public get renderOrder(): number {
        return 0
    }

    public get visible(): boolean {
        return true
    }

    public get layers(): LayersType {
        return new Layers()
    }

    protected getParent(): nullable<gameObject> {
        let meta3dState = getMeta3dState()

        let { gameObject, transform } = getEngineSceneService(meta3dState)

        return bind((transform_) => getExn(transform.getGameObjects(meta3dState, transform_)[0]), transform.getParent(meta3dState, gameObject.getTransform(meta3dState, this.gameObject)))
    }

    protected getChildren(newInstanceFunc: any) {
        let meta3dState = getMeta3dState()

        let { gameObject, transform } = getEngineSceneService(meta3dState)

        return getWithDefault(
            transform.getChildren(meta3dState, gameObject.getTransform(meta3dState, this.gameObject)),
            []
        ).map(child => {
            return newInstanceFunc(getExn(transform.getGameObjects(meta3dState, child)[0]))
        })
    }

    public get matrixWorldAutoUpdate(): boolean {
        return false
    }

    public get matrixAutoUpdate(): boolean {
        return false
    }

    public get matrix(): Matrix4Type {
        return new Matrix4()
    }

    public get userData(): { [key: string]: any } {
        return {}
    }

    public get children(): Array<Object3D | Mesh | PerspectiveCamera | DirectionLight> {
        let meta3dState = getMeta3dState()

        let engineSceneService = getEngineSceneService(meta3dState)

        return this.getChildren((gameObject: gameObject) => _createInstance(engineSceneService, meta3dState, gameObject))
    }

    public onBeforeRender(scene: Scene, camera: Camera, geometry: BufferGeometry, material: MeshStandardMaterial, group: any) {
    }

    public onAfterRender(scene: Scene, camera: Camera, geometry: BufferGeometry, object: Object3D, group: any) {
    }
}

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

class Camera extends Object3D {
    constructor(basicCameraViewComponent: basicCameraView, perspectiveCameraProjectionComponent: perspectiveCameraProjection, gameObject: gameObject) {
        super(gameObject)

        this.basicCameraViewComponent = basicCameraViewComponent
        this.perspectiveCameraProjectionComponent = perspectiveCameraProjectionComponent
    }

    protected basicCameraViewComponent: basicCameraView
    protected perspectiveCameraProjectionComponent: perspectiveCameraProjection


    public get isCamera(): boolean {
        return true
    }

    public get name(): string {
        let meta3dState = getMeta3dState()

        let { basicCameraView } = getEngineSceneService(meta3dState)

        return getWithDefault(basicCameraView.getName(meta3dState, this.basicCameraViewComponent), "")
    }

    public get layers(): LayersType {
        return new Layers()
    }

    // public get matrixWorldAutoUpdate(): boolean {
    //     return false
    // }

    // public get value(): string {
    //     return
    // }

    public get projectionMatrix(): Matrix4Type {
        // let meta3dState = getMeta3dState()
        // let engineCoreState = getEngineCoreState(meta3dState)
        // let engineCoreService = getEngineCoreService(meta3dState)

        // return _convertToMatrix4(
        //     getExn(engineCoreService.getComponentData<perspectiveCameraProjection, pMatrix>(engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, perspectiveCameraProjectionComponentName), this.perspectiveCameraProjectionComponent, perspectiveCameraProjectionDataName.pMatrix))
        // )

        let meta3dState = getMeta3dState()

        let { perspectiveCameraProjection } = getEngineSceneService(meta3dState)

        return _convertToMatrix4(
            getExn(
                perspectiveCameraProjection.getPMatrix(
                    meta3dState,
                    this.perspectiveCameraProjectionComponent
                )
            )
        )
    }

    public get matrixWorldInverse(): Matrix4Type {
        // let meta3dState = getMeta3dState()
        // let engineCoreState = getEngineCoreState(meta3dState)
        // let engineCoreService = getEngineCoreService(meta3dState)

        // let usedBasicCameraViewContribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, basicCameraViewComponentName)

        // return _convertToMatrix4(
        //     getExn(getViewWorldToCameraMatrix(
        //         usedBasicCameraViewContribute,
        //         engineCoreService,
        //         engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, transformComponentName),
        //         this.basicCameraViewComponent
        //     ))
        // )


        let meta3dState = getMeta3dState()

        let { basicCameraView } = getEngineSceneService(meta3dState)

        return _convertToMatrix4(
            getExn(
                basicCameraView.getViewWorldToCameraMatrix(
                    meta3dState,
                    this.basicCameraViewComponent
                )
            )
        )
    }

    // public get children(): Array<Object3D> {
    //     return []
    // }

    public get matrix(): Matrix4Type {
        let meta3dState = getMeta3dState()

        let { basicCameraView } = getEngineSceneService(meta3dState)

        return _getMatrix(
            basicCameraView.getGameObjects(meta3dState, this.basicCameraViewComponent)[0]
        )
    }
}

class PerspectiveCamera extends Camera {
    constructor(basicCameraViewComponent: basicCameraView, perspectiveCameraProjectionComponent: perspectiveCameraProjection, gameObject: gameObject) {
        super(basicCameraViewComponent, perspectiveCameraProjectionComponent, gameObject)
    }

    public get name(): string {
        let meta3dState = getMeta3dState()

        let { perspectiveCameraProjection } = getEngineSceneService(meta3dState)

        return getWithDefault(perspectiveCameraProjection.getName(meta3dState, this.perspectiveCameraProjectionComponent), "")
    }

    public get far(): number {
        let meta3dState = getMeta3dState()

        let { perspectiveCameraProjection } = getEngineSceneService(meta3dState)

        return getExn(
            perspectiveCameraProjection.getFar(meta3dState,
                this.perspectiveCameraProjectionComponent
            )
        )
    }

    public get near(): number {
        let meta3dState = getMeta3dState()

        let { perspectiveCameraProjection } = getEngineSceneService(meta3dState)

        return getExn(
            perspectiveCameraProjection.getNear(meta3dState,
                this.perspectiveCameraProjectionComponent
            )
        )
    }

    public get fov(): number {
        let meta3dState = getMeta3dState()

        let { perspectiveCameraProjection } = getEngineSceneService(meta3dState)

        return getExn(
            perspectiveCameraProjection.getFovy(meta3dState,
                this.perspectiveCameraProjectionComponent
            )
        )
    }

    public get aspect(): number {
        let meta3dState = getMeta3dState()

        let { perspectiveCameraProjection } = getEngineSceneService(meta3dState)

        return getExn(
            perspectiveCameraProjection.getAspect(meta3dState,
                this.perspectiveCameraProjectionComponent
            )
        )
    }

}

let _getExnDirectionLightValue = (getFuncName, light, handleReturnFunc = (v) => v) => {
    let meta3dState = getMeta3dState()

    let { directionLight } = getEngineSceneService(meta3dState)

    return handleReturnFunc(getExn(
        directionLight[getFuncName](meta3dState,
            light
        )
    ))
}


class Light extends Object3D {
    constructor(gameObject: gameObject) {
        super(gameObject)
    }

    public get isLight(): boolean {
        return true
    }

    // public get children(): Array<Object3D> {
    //     return []
    // }
}

class DirectionLight extends Light {
    constructor(light: directionLight, gameObject: gameObject) {
        super(gameObject)

        this._light = light
    }

    private _light: directionLight

    public get isDirectionalLight(): boolean {
        return true
    }

    public get type(): string {
        return "DirectionalLight"
    }

    public get name(): string {
        let meta3dState = getMeta3dState()

        let { directionLight } = getEngineSceneService(meta3dState)

        return getWithDefault(directionLight.getName(meta3dState, this._light), "")
    }

    public get castShadow(): boolean {
        return false
    }

    // public get position(): Vector3Type {
    //     let defaultPosition = new Vector3(0, 1, 0)

    //     return defaultPosition
    // }

    // public get scale(): Vector3Type {
    //     return new Vector3(1, 1, 1)
    // }

    // public get quaternion(): QuaternionType {
    //     return _getExnDirectionLightValue("getDirection", this._light, (direction: Array<number>) => {
    //         let mat: Matrix4Type = new Matrix4()

    //         return (new Quaternion()).setFromRotationMatrix(
    //             mat.lookAt(this.position, new Vector3(-direction[0], -direction[1], -direction[2]), new Vector3(0, 1, 0))
    //         )
    //     })
    // }

    public get matrixWorld(): Matrix4Type {
        // TODO check: no parent or parent's matrix is identity

        // return _getExnDirectionLightValue("getDirection", this._light, (direction: Array<number>) => {
        //     let mat: Matrix4Type = new Matrix4()

        //     let defaultScale = new Vector3(1, 1, 1)

        //     // let target = (new Vector3(direction[0], direction[1], direction[2])).add(defaultPosition)
        //     // target = new Vector3(-target.x, -target.y, -target.z)

        //     return mat.compose(this.position, (new Quaternion()).setFromRotationMatrix(
        //         mat.lookAt(this.position, new Vector3(-direction[0], -direction[1], -direction[2]), new Vector3(0, 1, 0))

        //         // mat.lookAt(defaultPosition, target, new Vector3(0, 1, 0))
        //     ), defaultScale)
        //     // return mat.lookAt(defaultPosition, new Vector3(-direction[0], -direction[1], -direction[2]), new Vector3(0, 1, 0))
        // })






        // return (new Matrix4()).compose(this.position, this.quaternion, this.scale)




        let self = this

        return _getExnDirectionLightValue("getDirection", this._light, (direction: Array<number>) => {
            let pos = self.target.position.toArray()

            return (new Matrix4()).setPosition(direction[0] + pos[0], direction[1] + pos[1], direction[2] + pos[2])
        })
    }

    public get matrix(): Matrix4Type {
        // TODO check: no parent or parent's matrix is identity

        // return this.matrixWorld




        return _getExnDirectionLightValue("getDirection", this._light, (direction: Array<number>) => {
            return (new Matrix4()).setPosition(direction[0], direction[1], direction[2])
        })
    }

    public get target(): Object3DType {
        // return _getExnDirectionLightValue("getDirection", this._light, (direction: Array<number>) => {
        //     let mat: Matrix4Type = new Matrix4()

        //     return {
        //         parent: this._light,
        //         matrixWorld: mat.setPosition(direction[0], direction[1], direction[2]),
        //         // position: [0, 0, -1]
        //     } as any as Object3DType
        // })

        let position = [0, 0, -1]
        let mat: Matrix4Type = new Matrix4()

        return {
            parent: this,
            // matrixWorld: mat.setPosition(position[0], position[1], position[2]),
            // matrixWorld: mat.setPosition(position[0], position[1], position[2]).multiply(this.matrixWorld),


            // matrixWorld: this.matrixWorld.multiply(mat.setPosition(position[0], position[1], position[2])),



            matrixWorld: mat.setPosition(position[0], position[1], position[2]),
            position: (new Vector3()).fromArray(position)
        } as any as Object3DType
    }

    public get color(): ColorType {
        return _getExnDirectionLightValue("getColor", this._light, (v) => new Color(...v))
    }

    public get intensity(): number {
        return _getExnDirectionLightValue("getIntensity", this._light)
    }

    public dispose() {
        // this.shadow.dispose();
    }
}

let _createInstance = (engineSceneService, meta3dState, gameObject) => {
    if (engineSceneService.gameObject.hasPerspectiveCameraProjection(meta3dState, gameObject)) {
        return new PerspectiveCamera(
            engineSceneService.gameObject.getBasicCameraView(meta3dState, gameObject),
            engineSceneService.gameObject.getPerspectiveCameraProjection(meta3dState, gameObject),
            gameObject
        )
    }

    if (engineSceneService.gameObject.hasDirectionLight(meta3dState, gameObject)) {
        return _getOrCreateDirectionLightInstance(
            engineSceneService.gameObject.getDirectionLight(meta3dState, gameObject),
            gameObject
        )
    }

    if (engineSceneService.gameObject.hasGeometry(meta3dState, gameObject)) {
        return _getOrCreateMeshInstance(gameObject)
    }

    return new Object3D(gameObject)
}

class Scene extends Object3D {
    constructor() {
        super(_getEmptyGameObject())
    }


    public get isScene(): boolean {
        return true
    }

    public get name(): string {
        return "Scene"
    }

    public get layers(): LayersType {
        let layers = new Layers()
        layers.disableAll()

        return layers
    }

    public get parent(): nullable<Mesh> {
        return null
    }

    public get children(): Array<Object3D> {
        let meta3dState = getMeta3dState()

        let engineSceneService = getEngineSceneService(meta3dState)

        let allGameObjects = engineSceneService.gameObject.getAllGameObjects(meta3dState)

        return allGameObjects.filter(gameObject => {
            return isNullable(engineSceneService.transform.getParent(meta3dState, engineSceneService.gameObject.getTransform(meta3dState, gameObject)))
        }).map(gameObject => _createInstance(engineSceneService, meta3dState, gameObject))

        // return (
        //     allGameObjects.filter(gameObject => {
        //         return engineSceneService.gameObject.hasPerspectiveCameraProjection(meta3dState, gameObject)
        //     }).map(gameObject => {
        //         return new PerspectiveCamera(
        //             engineSceneService.gameObject.getBasicCameraView(meta3dState, gameObject),
        //             engineSceneService.gameObject.getPerspectiveCameraProjection(meta3dState, gameObject),
        //         )
        //     }) as Array<Object3D>
        // ).concat(
        //     allGameObjects.filter(gameObject => {
        //         return engineSceneService.gameObject.hasGeometry(meta3dState, gameObject) && isNullable(engineSceneService.transform.getParent(meta3dState, engineSceneService.gameObject.getTransform(meta3dState, gameObject)))
        //     }).map(gameObject => {
        //         return _getOrCreateMeshInstance(gameObject)
        //     })
        // ).concat(
        //     allGameObjects.filter(gameObject => {
        //         return engineSceneService.gameObject.hasDirectionLight(meta3dState, gameObject)
        //     }).map(gameObject => {
        //         return _getOrCreateDirectionLightInstance(
        //             engineSceneService.gameObject.getDirectionLight(meta3dState, gameObject)
        //         )
        //     })
        // )
        // TODO add Group?
        // .concat(
        //     allGameObjects.filter(gameObject => {
        //         return !engineSceneService.gameObject.hasPerspectiveCameraProjection(meta3dState, gameObject) && !engineSceneService.gameObject.hasGeometry(meta3dState, gameObject) && !engineSceneService.gameObject.hasDirectionLight(meta3dState, gameObject) && isNullable(engineSceneService.transform.getParent(meta3dState,
        //             engineSceneService.gameObject.getTransform(meta3dState, gameObject)
        //         ))
        //     }).map(gameObject => {
        //         return new Group(gameObject)
        //     })
        // )
    }

    public get background(): nullable<ColorType | TextureType | CubeTexture> {
        return null
    }

    public get overrideMaterial(): nullable<Material> {
        return null
    }

    public get matrixWorld(): Matrix4Type {
        return new Matrix4()
    }

    // public add(...object: Array<Object3D>) {
    // }
}

class Mesh extends Object3D {
    constructor(gameObject: gameObject) {
        super(gameObject)
    }

    public modelViewMatrix = new Matrix4()
    public normalMatrix = new Matrix3()


    public get isMesh(): boolean {
        return true
    }

    public get layers(): LayersType {
        let layers = new Layers()
        layers.enableAll()

        return layers
    }

    public get frustumCulled(): boolean {
        return false
    }

    public get parent(): nullable<Mesh> {
        return _getOrCreateMeshInstance(getExn(this.getParent()))
    }

    // public get children(): Array<Mesh> {
    //     let meta3dState = getMeta3dState()

    //     let engineSceneService = getEngineSceneService(meta3dState)

    //     return this.getChildren((gameObject: gameObject) => _createInstance(engineSceneService, meta3dState, gameObject))
    // }

    public get matrix(): Matrix4Type {
        return _getMatrix(
            this.gameObject
        )
    }

    public get matrixWorld(): Matrix4Type {
        let meta3dState = getMeta3dState()

        let { gameObject, transform } = getEngineSceneService(meta3dState)

        return _convertToMatrix4(
            getExn(
                transform.getLocalToWorldMatrix(
                    meta3dState,
                    gameObject.getTransform(meta3dState, this.gameObject)
                )
            )
        )
    }

    public get geometry(): BufferGeometry {
        let meta3dState = getMeta3dState()

        let { gameObject } = getEngineSceneService(meta3dState)

        return _getOrCreateGeometryInstance(gameObject.getGeometry(meta3dState, this.gameObject))
    }

    public get material(): MeshStandardMaterial {
        let meta3dState = getMeta3dState()

        let { gameObject } = getEngineSceneService(meta3dState)

        return _getOrCreateStandardMaterialInstance(gameObject.getPBRMaterial(meta3dState, this.gameObject))

    }
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

let _convertTangentFromItemSize3To4 = (tangents: Float32Array) => {
    let result = []

    for (let i = 0; i < tangents.length; i += 3) {
        result.push(tangents[i])
        result.push(tangents[i + 1])
        result.push(tangents[i + 2])
        result.push(1)
    }

    return new Float32Array(result)
}

class BufferGeometry extends EventDispatcher {
    constructor(geometry: geometry) {
        super()

        this._geometry = geometry


        let meta3dState = getMeta3dState()

        let engineSceneService = getEngineSceneService(meta3dState)


        this._positionAttribute = new BufferAttribute(getExn(
            engineSceneService.geometry.getVertices(meta3dState, this._geometry)
        ), 3)
        this._normalAttribute = bind(
            (value) => new BufferAttribute(value, 3),
            engineSceneService.geometry.getNormals(meta3dState, this._geometry)
        )
        this._uvAttribute = bind(
            (value) => new BufferAttribute(value, 2),
            engineSceneService.geometry.getTexCoords(meta3dState, this._geometry)
        )
        this._tangentAttribute = bind(
            (value) => new BufferAttribute(value, 4),
            _convertTangentFromItemSize3To4(engineSceneService.geometry.getTangents(meta3dState, this._geometry))
        )
        this._indexAttribute = new BufferAttribute(getExn(
            engineSceneService.geometry.getIndices(meta3dState, this._geometry)
        ), 1)

        this.uuid = generateUUID()
    }

    private _geometry: geometry
    private _positionAttribute: BufferAttributeType
    private _normalAttribute: nullable<BufferAttributeType>
    private _uvAttribute: nullable<BufferAttributeType>
    private _tangentAttribute: nullable<BufferAttributeType>
    private _indexAttribute: BufferAttributeType

    public uuid: string


    public get id(): number {
        return generateId()
    }

    public get name(): string {
        let meta3dState = getMeta3dState()

        let { geometry } = getEngineSceneService(meta3dState)

        return getWithDefault(geometry.getName(meta3dState, this._geometry), "")
    }

    public get boundingSphere(): nullable<SphereType> {
        // TODO fix fake data
        return new Sphere(
            new Vector3(0, 0, 0),
            100000
        )
    }

    public get index(): nullable<BufferAttributeType> {
        return this._indexAttribute
    }

    public get attributes(): Record<string, any> {
        return {
            "position": this._positionAttribute,
            "normal": this._normalAttribute,
            "uv": this._uvAttribute,
            "tangent": this._tangentAttribute,
        }
    }

    public get morphAttributes(): Record<string, any> {
        return {}
    }

    public get drawRange(): { start: number; count: number } {
        return { start: 0, count: Infinity }
    }

    public get userData(): { [key: string]: any } {
        return {}
    }



    public getAttribute(name: string) {
        return this.attributes[name]
    }

    public setAttribute(name: string, attribute: BufferAttributeType) {
        this.attributes[name] = attribute

        return this
    }

    public getIndex() {
        return this.index
    }

    public dispose() {
        this.dispatchEvent({ type: 'dispose' });
    }
}

let _getExnTextureValue = (getFuncName, texture, handleReturnFunc = (v) => v) => {
    let meta3dState = getMeta3dState()

    let { basicSourceTexture } = getEngineSceneService(meta3dState)

    return handleReturnFunc(getExn(
        basicSourceTexture[getFuncName](meta3dState,
            texture
        )
    ))
}

let _convertWrapToThree = (wrap_: wrap) => {
    switch (wrap_) {
        case wrap.Clamp_to_edge:
            return ClampToEdgeWrapping
        case wrap.Repeat:
            return RepeatWrapping
        case wrap.Mirrored_repeat:
        default:
            return MirroredRepeatWrapping
    }
}

let _convertFilterToThree = (filter_: filter) => {
    switch (filter_) {
        case filter.Nearest:
            return NearestFilter
        case filter.Nearest_mipmap_linear:
            return NearestMipmapLinearFilter
        case filter.Nearest_mipmap_nearest:
            return NearestMipmapNearestFilter
        case filter.Linear:
            return LinearFilter
        case filter.Linear_mipmap_linear:
            return LinearMipmapLinearFilter
        case filter.Linear_mipmap_nearest:
        default:
            return LinearMipmapNearestFilter
    }
}


class Texture extends EventDispatcher {
    constructor(texture: texture) {
        super()

        let self = this

        this.texture = texture

        _getExnTextureValue("getImage", this.texture, (image) => { self.source = new Source(image) })

        this.uuid = generateUUID()

        this.needsUpdate = true
    }

    protected texture: texture

    public uuid: string
    public source: SourceType

    public version: number = 0


    public set needsUpdate(value) {

        if (value === true) {

            this.version++;
            this.source.needsUpdate = true;

        }

    }

    // public get source(): SourceType {
    //     return _getExnTextureValue("getImage", this.texture, (image) => new Source(image))
    // }

    public get name(): string {
        let meta3dState = getMeta3dState()

        let { basicSourceTexture } = getEngineSceneService(meta3dState)

        return getWithDefault(basicSourceTexture.getName(meta3dState, this.texture), "")
    }

    public get image(): TexImageSource {
        return this.source.data
    }

    public get mipmaps(): Array<any> {
        return []
    }

    public get colorSpace(): ColorSpace {
        return NoColorSpace
    }

    public get channel(): number {
        return 0
    }

    public get mapping(): AnyMapping {
        return UVMapping
    }

    public get wrapS(): Wrapping {
        return _getExnTextureValue("getWrapS", this.texture, _convertWrapToThree)
    }

    public get wrapT(): Wrapping {
        return _getExnTextureValue("getWrapT", this.texture, _convertWrapToThree)
    }

    public get minFilter(): MinificationTextureFilter {
        return _getExnTextureValue("getMinFilter", this.texture, _convertFilterToThree)
    }

    public get magFilter(): MagnificationTextureFilter {
        return _getExnTextureValue("getMagFilter", this.texture, _convertFilterToThree)
    }

    public get anisotropy(): number {
        return 1
    }

    public get format(): WebGL1PixelFormat {
        return _getExnTextureValue("getFormat", this.texture)
    }

    public get type(): TextureDataType {
        return _getExnTextureValue("getType", this.texture)
    }

    public get internalFormat(): null {
        return null
    }

    public get generateMipmaps(): boolean {
        return false
    }

    public get premultiplyAlpha(): false {
        return false
    }

    public get flipY(): boolean {
        return _getExnTextureValue("getFlipY", this.texture)
    }

    public get matrixAutoUpdate(): boolean {
        return false
    }

    public get matrix(): Matrix3Type {
        return new Matrix3()
    }

    public get unpackAlignment(): number {
        return 4
    }


    public get isRenderTargetTexture(): boolean {
        return false
    }


    public get needsPMREMUpdate(): boolean {
        return false
    }

    public get userData(): any {
        return {}
    }

    public get offset(): Vector2Type {
        return new Vector2(0, 0)
    }

    public get repeat(): Vector2Type {
        return new Vector2(1, 1)
    }

    public get center(): Vector2Type {
        return new Vector2(0, 0)
    }

    public get rotation(): number {
        return 0
    }

    public dispose() {
        this.dispatchEvent({ type: 'dispose' });
    }
}

class Material extends EventDispatcher {
    constructor(material: pbrMaterial) {
        super()

        this.material = material

        this.uuid = generateUUID()
    }

    protected material: pbrMaterial

    public uuid: string

    public version: number = 0


    public get id(): number {
        return generateId()
    }

    public get visible(): boolean {
        return true
    }

    public get transparent(): boolean {
        return false
    }

    // public get version(): number {
    //     return 0
    // }

    public get wireframe(): boolean {
        return false
    }

    public get side(): Side {
        return FrontSide
    }

    public get shadowSide(): nullable<Side> {
        return null
    }

    public get toneMapped(): boolean {
        return true
    }

    public get premultipliedAlpha(): boolean {
        return false
    }

    public get forceSinglePass(): boolean {
        return false
    }

    public get needsUpdate(): boolean {
        return false
    }

    public get opacity(): number {
        return 1
    }

    public get depthTest(): boolean {
        return true
    }

    public get alphaTest(): number {
        return 0
    }

    public get alphaToCoverage(): boolean {
        return false
    }

    public get clipIntersection(): boolean {
        return false
    }

    public get clipShadows(): boolean {
        return false
    }

    public get colorWrite(): boolean {
        return true
    }

    public get depthWrite(): boolean {
        return true
    }

    public get stencilWrite(): boolean {
        return false
    }

    public get polygonOffset(): boolean {
        return false
    }

    public get precision(): nullable<boolean> {
        return null
    }

    public get blending(): Blending {
        return NoBlending
    }

    public get userData(): { [key: string]: any } {
        return {}
    }



    public onBeforeRender(scene: Scene, camera: Camera, geometry: BufferGeometry, object: Object3D, group: any) {
    }

    public onBuild(object: Object3D, parameters: any) {
    }

    public onBeforeCompile(parameters: any) {
    }

    public customProgramCacheKey() {
        return {}
    }

    public dispose() {
        this.dispatchEvent({ type: 'dispose' });
    }
}

// class MeshStandardMaterial extends Material {
//     constructor(material: pbrMaterial) {
//         super(material)
//     }


//     public get isMeshStandardMaterial(): boolean {
//         return true
//     }

//     public get color(): ColorType {
//         let meta3dState = getMeta3dState()

//         let { pbrMaterial } = getEngineSceneService(meta3dState)

//         let [r, g, b] = getExn(
//             pbrMaterial.getDiffuseColor(meta3dState,
//                 this.material
//             )
//         )

//         return new Color(r, g, b)
//     }

//     public get name(): string {
//         return "MeshStandardMaterial"
//     }

//     public get type(): string {
//         return "MeshStandardMaterial"
//     }

//     public get reflectivity(): number {
//         return 1
//     }

//     public get refractionRatio(): number {
//         return 0.98
//     }

//     public get fog(): boolean {
//         return false
//     }


//     public setMaterial(material: pbrMaterial) {
//         this.material = material
//     }
// }

let _getExnMaterialValue = (getFuncName, material, handleReturnFunc = (v) => v) => {
    let meta3dState = getMeta3dState()

    let { pbrMaterial } = getEngineSceneService(meta3dState)

    return handleReturnFunc(getExn(
        pbrMaterial[getFuncName](meta3dState,
            material
        )
    ))
}

let _getMaterialValue = (getFuncName, material, handleReturnFunc = (v) => v) => {
    let meta3dState = getMeta3dState()

    let { pbrMaterial } = getEngineSceneService(meta3dState)

    return handleReturnFunc(
        pbrMaterial[getFuncName](meta3dState,
            material
        )
    )
}

class MeshStandardMaterial extends Material {
    constructor(material: pbrMaterial) {
        super(material)
    }


    public get isMeshStandardMaterial(): boolean {
        return true
    }

    public get color(): ColorType {
        return _getExnMaterialValue("getDiffuseColor", this.material, (v) => new Color(...v))
    }

    public get name(): string {
        let meta3dState = getMeta3dState()

        let { pbrMaterial } = getEngineSceneService(meta3dState)

        return getWithDefault(pbrMaterial.getName(meta3dState, this.material), "")
    }

    public get type(): string {
        return "MeshStandardMaterial"
    }

    public get roughness(): number {
        return _getExnMaterialValue("getRoughness", this.material)
    }

    public get metalness(): number {
        return _getExnMaterialValue("getMetalness", this.material)
    }

    public get map(): nullable<Texture> {
        return bind(_getOrCreateTextureInstance, _getMaterialValue("getDiffuseMap", this.material))
    }

    public get lightMap(): null {
        return null
    }

    public get lightMapIntensity(): number {
        return 1
    }

    public get aoMap(): null {
        return null
    }

    public get aoMapIntensity(): number {
        return 1
    }

    public get emissive(): ColorType {
        return new Color(0x000000)
    }

    public get emissiveIntensity(): number {
        return 1
    }

    public get emissiveMap(): null {
        return null
    }

    public get bumpMap(): null {
        return null
    }

    public get bumpScale(): number {
        return 1
    }

    public get normalMap(): nullable<Texture> {
        return bind(_getOrCreateTextureInstance, _getMaterialValue("getNormalMap", this.material))
    }

    public get normalMapType(): NormalMapTypes {
        return TangentSpaceNormalMap
    }

    public get normalScale(): Vector2Type {
        return new Vector2(1, 1)
    }

    public get displacementMap(): null {
        return null
    }

    public get displacementScale(): number {
        return 1
    }

    public get displacementBias(): number {
        return 0
    }

    public get roughnessMap(): nullable<Texture> {
        return bind(_getOrCreateTextureInstance, _getMaterialValue("getRoughnessMap", this.material))
    }

    public get metalnessMap(): nullable<Texture> {
        return bind(_getOrCreateTextureInstance, _getMaterialValue("getMetalnessMap", this.material))
    }

    public get alphaMap(): null {
        return null
    }

    public get envMap(): null {
        return null
    }


    public get wireframe(): boolean {
        return false
    }

    public get wireframeLinewidth(): number {
        return 1
    }

    public get wireframeLinecap(): string {
        return "round"
    }

    public get wireframeLinejoin(): string {
        return "round"
    }

    public get flatShading(): boolean {
        return false
    }

    public get fog(): boolean {
        return false
    }

    // public setMaterial(material: pbrMaterial) {
    //     this.material = material
    // }
}

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

let _getMeshStandardMaterial = (mesh: MeshType): MeshStandardMaterialType => {
    let material = mesh.material as MeshStandardMaterialType

    if (material.type == "MeshStandardMaterial") {
        return material
    }

    console.warn(`unsupport material type: ${material.type}`);

    return material
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

    meta3dState = gameObjectService.setGameObjectName(meta3dState, gameObject, Object3D.name)



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



        let meshStandardMaterial = _getMeshStandardMaterial(mesh)


        if (standardMaterialMap[meshStandardMaterial.uuid] === undefined) {
            let data = pbrMaterialService.createPBRMaterial(meta3dState)
            meta3dState = data[0]
            let pbrMaterial = data[1]

            meta3dState = pbrMaterialService.setName(meta3dState, pbrMaterial, meshStandardMaterial.name)

            meta3dState = pbrMaterialService.setDiffuseColor(meta3dState, pbrMaterial, meshStandardMaterial.color.toArray() as any as diffuseColor
            )
            meta3dState = pbrMaterialService.setMetalness(meta3dState, pbrMaterial, meshStandardMaterial.metalness)
            meta3dState = pbrMaterialService.setRoughness(meta3dState, pbrMaterial, meshStandardMaterial.roughness)



            let mapData = _createMap(meta3dState, sceneService, textureMap, meshStandardMaterial.map)
            meta3dState = mapData[0]
            let map = mapData[1]
            textureMap = mapData[2]
            if (!isNullable(map)) {
                meta3dState = pbrMaterialService.setDiffuseMap(meta3dState, pbrMaterial, getExn(map))
            }

            mapData = _createMap(meta3dState, sceneService, textureMap, meshStandardMaterial.roughnessMap)
            meta3dState = mapData[0]
            map = mapData[1]
            textureMap = mapData[2]
            if (!isNullable(map)) {
                meta3dState = pbrMaterialService.setRoughnessMap(meta3dState, pbrMaterial, getExn(map))
            }

            mapData = _createMap(meta3dState, sceneService, textureMap, meshStandardMaterial.metalnessMap)
            meta3dState = mapData[0]
            map = mapData[1]
            textureMap = mapData[2]
            if (!isNullable(map)) {
                meta3dState = pbrMaterialService.setMetalnessMap(meta3dState, pbrMaterial, getExn(map))
            }


            mapData = _createMap(meta3dState, sceneService, textureMap, meshStandardMaterial.normalMap)
            meta3dState = mapData[0]
            map = mapData[1]
            textureMap = mapData[2]
            if (!isNullable(map)) {
                meta3dState = pbrMaterialService.setNormalMap(meta3dState, pbrMaterial, getExn(map))
            }



            meta3dState = gameObjectService.addPBRMaterial(meta3dState, gameObject, pbrMaterial)

            standardMaterialMap[meshStandardMaterial.uuid] = pbrMaterial
        }
        else {
            meta3dState = gameObjectService.addPBRMaterial(meta3dState, gameObject, standardMaterialMap[meshStandardMaterial.uuid])
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

let _setVariables = (
    engineSceneProtocolName, globalKeyNameForMeta3dState, globalKeyNameForAPI, globalKeyNameForMeshInstanceMap, globalKeyNameForStandardMaterialInstanceMap,

    globalKeyNameForTextureInstanceMap,
    globalKeyNameForGeometryInstanceMap,

    globalKeyNameForDirectionLightInstanceMap
) => {
    setVariables(
        engineSceneProtocolName, globalKeyNameForMeta3dState, globalKeyNameForAPI, globalKeyNameForMeshInstanceMap, globalKeyNameForStandardMaterialInstanceMap,
        globalKeyNameForTextureInstanceMap,
        globalKeyNameForGeometryInstanceMap,
        globalKeyNameForDirectionLightInstanceMap
    )

    _globalKeyNameForMeshInstanceMap = globalKeyNameForMeshInstanceMap
    _globalKeyNameForStandardMaterialInstanceMap = globalKeyNameForStandardMaterialInstanceMap

    _globalKeyNameForTextureInstanceMap = globalKeyNameForTextureInstanceMap

    _globalKeyNameForGeometryInstanceMap = globalKeyNameForGeometryInstanceMap

    _globalKeyNameForDirectionLightInstanceMap = globalKeyNameForDirectionLightInstanceMap
}

// let _isActuallyDisposePBRMaterial = (api: api, meta3dState: meta3dState,
//     engineCoreProtocolName: string,
//     material: number, gameObjects: Array<number>): boolean => {
//     let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, engineCoreProtocolName)
//     let engineCoreService = api.getExtensionService<engineCoreService>(
//         meta3dState,
//         engineCoreProtocolName
//     )

//     let contribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, pbrMaterialComponentName)

//     return isActuallyDisposePBRMateiral(
//         contribute.state as any as pbrMaterialState,
//         material, gameObjects
//     )
// }

// let _isActuallyDisposeGeometry = (api: api, meta3dState: meta3dState,
//     engineCoreProtocolName: string,
//     geometry: number, gameObjects: Array<number>): boolean => {
//     let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, engineCoreProtocolName)
//     let engineCoreService = api.getExtensionService<engineCoreService>(
//         meta3dState,
//         engineCoreProtocolName
//     )

//     let contribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, geometryComponentName)

//     return isActuallyDisposeGeometry(
//         contribute.state as any as geometryState,
//         geometry, gameObjects
//     )
// }

// let _disposeGameObject = (meta3dState: meta3dState, api: api, [engineCoreProtocolName, engineWholeProtocolName]: [string, string], gameObject: gameObject) => {
//     let { scene } = api.getExtensionService<engineWholeService>(meta3dState, engineWholeProtocolName)
//     let gameObjectService = scene.gameObject
//     let pbrMaterialService = scene.pbrMaterial
//     let geometryService = scene.geometry

//     if (gameObjectService.hasDirectionLight(meta3dState, gameObject)) {
//         _disposeDirectionLightInstance(
//             gameObjectService.getDirectionLight(meta3dState, gameObject)
//         )
//     }
//     else {
//         _disposeMeshInstance(gameObject)

//         if (
//             gameObjectService.hasPBRMaterial(meta3dState, gameObject)
//         ) {
//             let material = gameObjectService.getPBRMaterial(meta3dState, gameObject)

//             if (
//                 _isActuallyDisposePBRMaterial(api, meta3dState,
//                     engineCoreProtocolName,
//                     material, pbrMaterialService.getGameObjects(meta3dState, material))
//             ) {
//                 _disposeStandardMaterialInstance(material)
//             }
//         }

//         if (
//             gameObjectService.hasGeometry(meta3dState, gameObject)
//         ) {
//             let geometry = gameObjectService.getGeometry(meta3dState, gameObject) as any

//             if (
//                 _isActuallyDisposeGeometry(api, meta3dState,
//                     engineCoreProtocolName,
//                     geometry, geometryService.getGameObjects(meta3dState, geometry))
//             ) {
//                 _disposeGeometryInstance(geometry)
//             }
//         }
//     }

//     meta3dState = gameObjectService.disposeGameObjects(meta3dState, [gameObject])

//     return meta3dState
// }

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
                _disposeStandardMaterialInstance(pbrMaterial)
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

let _setThreeObjects = (api: api, meta3dState: meta3dState) => {
    let threeAPIService = api.getExtensionService<threeAPIService>(meta3dState, "meta3d-three-api-protocol")

    BufferAttribute = threeAPIService.BufferAttribute
    Color = threeAPIService.Color
    FrontSide = threeAPIService.FrontSide
    Layers = threeAPIService.Layers
    Matrix3 = threeAPIService.Matrix3
    Matrix4 = threeAPIService.Matrix4
    NoBlending = threeAPIService.NoBlending
    Sphere = threeAPIService.Sphere
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

export let getExtensionServiceUtils = (
    // getCameraComponentsFunc: (meta3dState: meta3dState, isDebug: boolean) => [basicCameraView, perspectiveCameraProjection],
    api: api,
    allEventNames,
    // disposeGameObjectEventName,
    // [engineWholeProtocolName, engineCoreProtocolName]
    engineWholeProtocolName
): service => {
    return {
        init: (meta3dState) => {
            let eventProtocolName = "meta3d-event-protocol"

            let eventService = api.getExtensionService<eventService>(
                meta3dState,
                eventProtocolName
            )

            meta3dState = _bindDisposeEvent(meta3dState, eventService, allEventNames)

            return meta3dState
        },
        convert: (meta3dState) => {
            let isDebug = true

            setMeta3dState(meta3dState)

            _setThreeObjects(api, meta3dState)

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
            let { scene } = api.getExtensionService<engineWholeService>(meta3dState, engineWholeProtocolName)

            let standardMaterialMap = {}
            let bufferGeometryMap = {}
            let textureMap: Record<string, texture> = {}

            _setThreeObjects(api, meta3dState)

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
        engineSceneProtocolName, globalKeyNameForMeta3dState, globalKeyNameForAPI, globalKeyNameForMeshInstanceMap, globalKeyNameForStandardMaterialInstanceMap,
        globalKeyNameForTextureInstanceMap,
        globalKeyNameForGeometryInstanceMap,

        globalKeyNameForDirectionLightInstanceMap
    }: any
): extensionLife<service> => {
    return {
        onRegister: (meta3dState, service) => {
            _setVariables(
                engineSceneProtocolName, globalKeyNameForMeta3dState, globalKeyNameForAPI, globalKeyNameForMeshInstanceMap, globalKeyNameForStandardMaterialInstanceMap,

                globalKeyNameForTextureInstanceMap,

                globalKeyNameForGeometryInstanceMap,

                globalKeyNameForDirectionLightInstanceMap
            )

            setAPI(api)

            createEmptyMeshInstanceMap()
            createEmptyStandardMaterialInstanceMap()
            createEmptyTextureInstanceMap()
            createEmptyGeometryInstanceMap()
            createEmptyDirectionLightInstanceMap()

            return meta3dState
        },
        onRestore: (currentMeta3dState, targetMeta3dState) => {
            // // TODO perf: defer dispose if too many

            // _getAllMeshInstances().forEach(_disposeMesh)
            // _getAllStandardMaterialInstances().forEach(_disposeStandardMaterial)
            // _getAllGeometryInstances().forEach(_disposeGeometry)

            // // TODO perf: remove instead of dispose
            // _clearAllInstanceMaps()

            return targetMeta3dState
        },
        onDeepCopy: (meta3dState) => meta3dState
    }
}
