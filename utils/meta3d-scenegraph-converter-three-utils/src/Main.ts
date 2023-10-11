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
    type Layers as LayersType,
    // Matrix3 as Matrix3Type,
    type Matrix4 as Matrix4Type,
    type Sphere as SphereType, Object3D as Object3DType,
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
    type TextureDataType,
    type Vector2 as Vector2Type, Vector3 as Vector3Type,
    type NormalMapTypes,
    type WebGL1PixelFormat,
    type TextureFilter,
    type DirectionalLight as DirectionalLightType
    // Quaternion,
} from "three";
import { getExn, getWithDefault, map, isNullable, bind } from "meta3d-commonlib-ts/src/NullableUtils"
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
import { state as engineCoreState } from "meta3d-engine-core-sceneview-protocol/src/state/StateType"
import { service as engineCoreService } from "meta3d-engine-core-sceneview-protocol/src/service/ServiceType"
import { state as pbrMaterialState, componentName as pbrMaterialComponentName } from "meta3d-component-pbrmaterial-protocol/src/Index"
import { state as geometryState, componentName as geometryComponentName } from "meta3d-component-geometry-protocol/src/Index"
import { isActuallyDisposeGeometry, isActuallyDisposePBRMateiral } from "meta3d-component-commonlib"
import { filter, htmlImageElement, texture, wrap } from "meta3d-texture-basicsource-protocol/src/state/StateType";
import { color, directionLight } from "meta3d-component-directionlight-protocol";
// import { service as textureService } from "meta3d-texture-basicsource-protocol/src/service/ServiceType"
// import {getDirection} from "meta3d-component-commonlib"

let BufferAttribute: any, Color: any, FrontSide: any, Layers: any, Matrix3: any, Matrix4: any, NoBlending: any, Sphere: any, Vector3: any, Quaternion: any, Source: any,
    ClampToEdgeWrapping: any,
    RepeatWrapping: any,
    MirroredRepeatWrapping: any,
    UVMapping: any,
    NearestFilter: any,
    NearestMipmapNearestFilter,
    NearestMipMapNearestFilter,
    NearestMipmapLinearFilter,
    NearestMipMapLinearFilter,
    LinearFilter,
    LinearMipmapNearestFilter,
    LinearMipMapNearestFilter,
    LinearMipmapLinearFilter,
    LinearMipMapLinearFilter,
    Vector2,
    TangentSpaceNormalMap,
    ObjectSpaceNormalMap




let _globalKeyNameForMeshInstanceMap: string
let _globalKeyNameForStandardMaterialInstanceMap: string
let _globalKeyNameForTextureInstanceMap: string
let _globalKeyNameForGeometryInstanceMap: string
let _globalKeyNameForDirectionLightInstanceMap: string

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

let _getMeshInstance = (gameObject: gameObject) => {
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


    // TODO handle dispose maps
    //      TODO need judge is actually dispose map
}

let _getStandardMaterialInstance = (material: pbrMaterial) => {
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

let _getTextureInstance = (texture: texture) => {
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

let _getGeometryInstance = (geometry: geometry) => {
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

let _getDirectionLightInstance = (directionLight: directionLight) => {
    if (_getDirectionLightInstanceMap()[directionLight] === undefined) {
        _getDirectionLightInstanceMap()[directionLight] = new DirectionLight(directionLight)
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

let _getEmptyGameObject = () => {
    return -1
}

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

    public get visible(): boolean {
        return true
    }

    public get layers(): LayersType {
        return new Layers()
    }

    protected getParent(newInstanceFunc: any) {
        let meta3dState = getMeta3dState()

        let { gameObject, transform } = getEngineSceneService(meta3dState)

        return newInstanceFunc(transform.getParent(meta3dState, gameObject.getTransform(meta3dState, this.gameObject)))
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

    public get userData(): { [key: string]: any } {
        return {}
    }


    public onBeforeRender(scene: Scene, camera: Camera, geometry: BufferGeometry, material: MeshStandardMaterial, group: any) {
    }

    public onAfterRender(scene: Scene, camera: Camera, geometry: BufferGeometry, object: Object3D, group: any) {
    }
}

class Camera extends Object3D {
    constructor(basicCameraViewComponent: basicCameraView, perspectiveCameraProjectionComponent: perspectiveCameraProjection) {
        super(_getEmptyGameObject())

        this.basicCameraViewComponent = basicCameraViewComponent
        this.perspectiveCameraProjectionComponent = perspectiveCameraProjectionComponent
    }

    protected basicCameraViewComponent: basicCameraView
    protected perspectiveCameraProjectionComponent: perspectiveCameraProjection


    public get isCamera(): boolean {
        return true
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

    public get children(): Array<Object3D> {
        return []
    }

    public get matrix(): Matrix4Type {
        let meta3dState = getMeta3dState()

        let { basicCameraView } = getEngineSceneService(meta3dState)

        return _getMatrix(
            basicCameraView.getGameObjects(meta3dState, this.basicCameraViewComponent)[0]
        )
    }
}

class PerspectiveCamera extends Camera {
    constructor(basicCameraViewComponent: basicCameraView, perspectiveCameraProjectionComponent: perspectiveCameraProjection) {
        super(basicCameraViewComponent, perspectiveCameraProjectionComponent)
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
    constructor() {
        super(_getEmptyGameObject())
    }

    public get isLight(): boolean {
        return true
    }
}

class DirectionLight extends Object3D {
    constructor(light: directionLight) {
        super(_getEmptyGameObject())

        this._light = light
    }

    private _light: directionLight

    public get isDirectionalLight(): boolean {
        return true
    }

    public get type(): string {
        return "DirectionalLight"
    }

    public get castShadow(): boolean {
        return false
    }

    public get position(): Vector3Type {
        return new Vector3(0, 0, 0)
    }

    public get target(): Object3DType {
        return _getExnDirectionLightValue("getDirection", this._light, (direction) => {
            return {
                position: direction
            } as any as Object3DType
        })
    }

    public get color(): ColorType {
        return _getExnDirectionLightValue("getColor", this._light)
    }

    public get intensity(): number {
        return _getExnDirectionLightValue("getIntensiy", this._light)
    }

    public dispose() {
        // this.shadow.dispose();
    }
}

class Scene extends Object3D {
    constructor() {
        super(_getEmptyGameObject())
    }


    public get isScene(): boolean {
        return true
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

        return (
            allGameObjects.filter(gameObject => {
                return engineSceneService.gameObject.hasPerspectiveCameraProjection(meta3dState, gameObject)
            }).map(gameObject => {
                return new PerspectiveCamera(
                    engineSceneService.gameObject.getBasicCameraView(meta3dState, gameObject),
                    engineSceneService.gameObject.getPerspectiveCameraProjection(meta3dState, gameObject),
                )
            }) as Array<Object3D>
        ).concat(
            allGameObjects.filter(gameObject => {
                return engineSceneService.gameObject.hasGeometry(meta3dState, gameObject) && isNullable(engineSceneService.transform.getParent(meta3dState,
                    engineSceneService.gameObject.getTransform(meta3dState, gameObject)
                ))
            }).map(gameObject => {
                return _getMeshInstance(gameObject)
            })
        ).concat(
            allGameObjects.filter(gameObject => {
                return engineSceneService.gameObject.hasDirectionLight(meta3dState, gameObject)
            }).map(gameObject => {
                return _getDirectionLightInstance(
                    engineSceneService.gameObject.getDirectionLight(meta3dState, gameObject)
                )
            })
        )
    }

    public get background(): nullable<ColorType | TextureType | CubeTexture> {
        return null
    }

    public get overrideMaterial(): nullable<Material> {
        return null
    }

    public get matrix(): Matrix4Type {
        return new Matrix4()
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
        return this.getParent((gameObject: gameObject) => _getMeshInstance(gameObject))
    }

    public get children(): Array<Mesh> {
        return this.getChildren((gameObject: gameObject) => _getMeshInstance(gameObject))
    }

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

        return _getGeometryInstance(gameObject.getGeometry(meta3dState, this.gameObject))
    }

    public get material(): MeshStandardMaterial {
        let meta3dState = getMeta3dState()

        let { gameObject } = getEngineSceneService(meta3dState)

        return _getStandardMaterialInstance(gameObject.getPBRMaterial(meta3dState, this.gameObject))

    }
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
        this._indexAttribute = new BufferAttribute(getExn(
            engineSceneService.geometry.getIndices(meta3dState, this._geometry)
        ), 1)

        this.uuid = generateUUID()
    }

    private _geometry: geometry
    private _positionAttribute: BufferAttributeType
    private _indexAttribute: BufferAttributeType

    public uuid: string


    public get id(): number {
        return generateId()
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
            "position": this._positionAttribute
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
            return NearestMipMapLinearFilter
        case filter.Nearest_mipmap_nearest:
            return NearestMipMapNearestFilter
        case filter.Linear:
            return LinearFilter
        case filter.Linear_mipmap_linear:
            return LinearMipMapLinearFilter
        case filter.Linear_mipmap_nearest:
        default:
            return LinearMipMapNearestFilter
    }
}


class Texture extends EventDispatcher {
    constructor(texture: texture) {
        super()

        this.texture = texture

        this.uuid = generateUUID()
    }

    protected texture: texture

    public uuid: string

    public get source(): SourceType {
        return _getExnTextureValue("getImage", this.texture, (image) => new Source(image))
    }

    public get name(): string {
        return ""
    }

    public get image(): TexImageSource {
        return this.source.data
    }

    public get mipmaps(): Array<any> {
        return []
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

    public get version(): number {
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


    public get id(): number {
        return generateId()
    }

    public get visible(): boolean {
        return true
    }

    public get transparent(): boolean {
        return false
    }

    public get version(): number {
        return 0
    }

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
        return "MeshStandardMaterial"
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
        return bind(_getTextureInstance, _getMaterialValue("getDiffuseMap", this.material))
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
        return bind(_getTextureInstance, _getMaterialValue("getNormalMap", this.material))
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
        return bind(_getTextureInstance, _getMaterialValue("getRoughnessMap", this.material))
    }

    public get metalnessMap(): nullable<Texture> {
        return bind(_getTextureInstance, _getMaterialValue("getMetalnessMap", this.material))
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
        return new Uint32Array(indices.buffer)
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

    if (material.type !== "MeshStandardMaterial") {
        throw new Error("error")
    }

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
        case NearestMipMapLinearFilter:
            return filter.Nearest_mipmap_linear
        case NearestMipMapNearestFilter:
            return filter.Nearest_mipmap_nearest
        case LinearFilter:
            return filter.Linear
        case LinearMipMapLinearFilter:
            return filter.Linear_mipmap_linear
        case LinearMipMapNearestFilter:
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
    object3Ds: Array<Object3DType>) => {
    let gameObjectService = sceneService.gameObject
    let transformService = sceneService.transform
    let basicCameraViewService = sceneService.basicCameraView
    let perspectiveCameraProjectionService = sceneService.perspectiveCameraProjection
    let geometryService = sceneService.geometry
    let pbrMaterialService = sceneService.pbrMaterial
    let directionLightService = sceneService.directionLight

    let _standardMaterialMap = {}
    let _bufferGeometryMap = {}
    let _textureMap: Record<string, texture> = {}

    return object3Ds.reduce((meta3dState, object3D) => {
        let data = gameObjectService.createGameObject(meta3dState)
        meta3dState = data[0]
        let gameObject = data[1]


        data = transformService.createTransform(meta3dState)
        meta3dState = data[0]
        let transform = data[1]

        meta3dState = transformService.setLocalPosition(meta3dState, transform, object3D.position.toArray())
        meta3dState = transformService.setLocalRotation(meta3dState, transform, object3D.quaternion.toArray() as any as localRotation)
        meta3dState = transformService.setLocalScale(meta3dState, transform, object3D.scale.toArray())


        meta3dState = gameObjectService.addTransform(meta3dState, gameObject, transform)


        if ((object3D as any as CameraType).isCamera) {
            data = basicCameraViewService.createBasicCameraView(meta3dState)
            meta3dState = data[0]
            let basicCameraView = data[1]

            meta3dState = gameObjectService.addBasicCameraView(meta3dState, gameObject, basicCameraView)

            if ((object3D as any as PerspectiveCameraType).isPerspectiveCamera) {
                let { near, far, fov, aspect } = object3D as any as PerspectiveCameraType

                data = perspectiveCameraProjectionService.createPerspectiveCameraProjection(meta3dState)
                meta3dState = data[0]
                let perspectiveCameraProjection = data[1]

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

            if (_bufferGeometryMap[bufferGeometry.uuid] === undefined) {
                let data = geometryService.createGeometry(meta3dState)
                meta3dState = data[0]
                let geometry = data[1]


                meta3dState = geometryService.setVertices(meta3dState, geometry, bufferGeometry.getAttribute("position").array as any as Float32Array
                )
                meta3dState = geometryService.setIndices(meta3dState,
                    geometry,
                    _convertToUint32ArrayIndices(
                        bufferGeometry.getIndex().array
                    )
                )


                meta3dState = gameObjectService.addGeometry(meta3dState, gameObject, geometry)

                _bufferGeometryMap[bufferGeometry.uuid] = geometry
            }
            else {
                meta3dState = gameObjectService.addGeometry(meta3dState, gameObject, _bufferGeometryMap[bufferGeometry.uuid])
            }



            let meshStandardMaterial = _getMeshStandardMaterial(mesh)


            if (_standardMaterialMap[meshStandardMaterial.uuid] === undefined) {
                let data = pbrMaterialService.createPBRMaterial(meta3dState)
                meta3dState = data[0]
                let pbrMaterial = data[1]


                meta3dState = pbrMaterialService.setDiffuseColor(meta3dState, pbrMaterial, meshStandardMaterial.color.toArray() as any as diffuseColor
                )
                meta3dState = pbrMaterialService.setMetalness(meta3dState, pbrMaterial, meshStandardMaterial.metalness)
                meta3dState = pbrMaterialService.setRoughness(meta3dState, pbrMaterial, meshStandardMaterial.roughness)



                let mapData = _createMap(meta3dState, sceneService, _textureMap, meshStandardMaterial.map)
                meta3dState = mapData[0]
                let map = mapData[1]
                _textureMap = mapData[2]
                if (!isNullable(map)) {
                    meta3dState = pbrMaterialService.setDiffuseMap(meta3dState, pbrMaterial, getExn(map))
                }

                mapData = _createMap(meta3dState, sceneService, _textureMap, meshStandardMaterial.roughnessMap)
                meta3dState = mapData[0]
                map = mapData[1]
                _textureMap = mapData[2]
                if (!isNullable(map)) {
                    meta3dState = pbrMaterialService.setRoughnessMap(meta3dState, pbrMaterial, getExn(map))
                }

                mapData = _createMap(meta3dState, sceneService, _textureMap, meshStandardMaterial.metalnessMap)
                meta3dState = mapData[0]
                map = mapData[1]
                _textureMap = mapData[2]
                if (!isNullable(map)) {
                    meta3dState = pbrMaterialService.setMetalnessMap(meta3dState, pbrMaterial, getExn(map))
                }


                mapData = _createMap(meta3dState, sceneService, _textureMap, meshStandardMaterial.normalMap)
                meta3dState = mapData[0]
                map = mapData[1]
                _textureMap = mapData[2]
                if (!isNullable(map)) {
                    meta3dState = pbrMaterialService.setNormalMap(meta3dState, pbrMaterial, getExn(map))
                }



                meta3dState = gameObjectService.addPBRMaterial(meta3dState, gameObject, pbrMaterial)

                _standardMaterialMap[meshStandardMaterial.uuid] = pbrMaterial
            }
            else {
                meta3dState = gameObjectService.addPBRMaterial(meta3dState, gameObject, _standardMaterialMap[meshStandardMaterial.uuid])
            }
        }
        else if ((object3D as any as DirectionalLightType).isDirectionalLight) {
            let { color, intensity, position, target } = object3D as any as DirectionalLightType

            data = directionLightService.createDirectionLight(meta3dState)
            meta3dState = data[0]
            let directionLight = data[1]

            meta3dState = directionLightService.setColor(meta3dState, directionLight, color.toArray() as any as color)
            meta3dState = directionLightService.setIntensity(meta3dState, directionLight, intensity)
            meta3dState = directionLightService.setDirection(meta3dState, directionLight, target.position.sub(position).toArray())


            meta3dState = gameObjectService.addDirectionLight(meta3dState, gameObject, directionLight)
        }




        meta3dState = _import(sceneService, meta3dState,
            object3D.children
        )

        return meta3dState
    }, meta3dState)
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

let _isActuallyDisposePBRMaterial = (api: api, meta3dState: meta3dState,
    engineCoreProtocolName: string,
    material: number, gameObjects: Array<number>): boolean => {
    let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, engineCoreProtocolName)
    let engineCoreService = api.getExtensionService<engineCoreService>(
        meta3dState,
        engineCoreProtocolName
    )

    let contribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, pbrMaterialComponentName)

    return isActuallyDisposePBRMateiral(
        contribute.state as any as pbrMaterialState,
        material, gameObjects
    )
}

let _isActuallyDisposeGeometry = (api: api, meta3dState: meta3dState,
    engineCoreProtocolName: string,
    geometry: number, gameObjects: Array<number>): boolean => {
    let engineCoreState = api.getExtensionState<engineCoreState>(meta3dState, engineCoreProtocolName)
    let engineCoreService = api.getExtensionService<engineCoreService>(
        meta3dState,
        engineCoreProtocolName
    )

    let contribute = engineCoreService.unsafeGetUsedComponentContribute(engineCoreState, geometryComponentName)

    return isActuallyDisposeGeometry(
        contribute.state as any as geometryState,
        geometry, gameObjects
    )
}

export let getExtensionServiceUtils = (
    // getCameraComponentsFunc: (meta3dState: meta3dState, isDebug: boolean) => [basicCameraView, perspectiveCameraProjection],
    api: api,
    // allEventNames,
    disposeGameObjectEventName,
    [engineWholeProtocolName, engineCoreProtocolName]
): service => {
    return {
        init: (meta3dState) => {
            let eventProtocolName = "meta3d-event-protocol"

            let eventService = api.getExtensionService<eventService>(
                meta3dState,
                eventProtocolName
            )

            // let {
            //     disposeGameObjectEventName,
            //     disposeGeometryEventName,
            //     disposePBRMaterialEventName
            // } = allEventNames

            meta3dState = eventService.onCustomGlobalEvent2(meta3dState, eventProtocolName, [
                disposeGameObjectEventName, 1, (meta3dState, { userData }) => {
                    console.log("dispose gameObject")

                    let { scene } = api.getExtensionService<engineWholeService>(meta3dState, engineWholeProtocolName)
                    let gameObjectService = scene.gameObject
                    let pbrMaterialService = scene.pbrMaterial
                    let geometryService = scene.geometry

                    let gameObject = userData as any as gameObject

                    if (gameObjectService.hasDirectionLight(meta3dState, gameObject)) {
                        _disposeDirectionLightInstance(
                            gameObjectService.getDirectionLight(meta3dState, gameObject)
                        )
                    }
                    else {
                        _disposeMeshInstance(gameObject)

                        if (
                            gameObjectService.hasPBRMaterial(meta3dState, gameObject)
                        ) {
                            let material = gameObjectService.getPBRMaterial(meta3dState, gameObject)

                            if (
                                _isActuallyDisposePBRMaterial(api, meta3dState,
                                    engineCoreProtocolName,
                                    material, pbrMaterialService.getGameObjects(meta3dState, material))
                            ) {
                                _disposeStandardMaterialInstance(material)
                            }
                        }

                        if (
                            gameObjectService.hasGeometry(meta3dState, gameObject)
                        ) {
                            let geometry = gameObjectService.getGeometry(meta3dState, gameObject) as any

                            if (
                                _isActuallyDisposeGeometry(api, meta3dState,
                                    engineCoreProtocolName,
                                    geometry, geometryService.getGameObjects(meta3dState, geometry))
                            ) {
                                _disposeGeometryInstance(geometry)
                            }
                        }
                    }



                    return meta3dState
                }
            ])

            return meta3dState
        },
        convert: (meta3dState) => {
            let isDebug = true

            setMeta3dState(meta3dState)

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
            NearestMipMapNearestFilter = threeAPIService.NearestMipmapNearestFilter
            NearestMipmapLinearFilter = threeAPIService.NearestMipmapLinearFilter
            LinearFilter = threeAPIService.LinearFilter
            LinearMipmapNearestFilter = threeAPIService.LinearMipmapNearestFilter
            LinearMipmapLinearFilter = threeAPIService.LinearMipmapLinearFilter
            Vector2 = threeAPIService.Vector2
            TangentSpaceNormalMap = threeAPIService.TangentSpaceNormalMap
            ObjectSpaceNormalMap = threeAPIService.ObjectSpaceNormalMap



            let { gameObject, basicCameraView } = getEngineSceneService(meta3dState)

            let cameraView = getExn(basicCameraView.getActiveCameraView(meta3dState, isDebug))
            let cameraProjection = gameObject.getPerspectiveCameraProjection(
                meta3dState,
                getExn(
                    basicCameraView.getGameObjects(meta3dState, cameraView)[0]
                )
            )

            return {
                perspectiveCamera: new PerspectiveCamera(
                    cameraView,
                    cameraProjection
                ) as any,
                scene: new Scene() as any,
                // event: allEventNames
            }
        },
        import: (meta3dState, sceneGroup) => {
            let { scene } = api.getExtensionService<engineWholeService>(meta3dState, engineWholeProtocolName)

            return _import(scene, meta3dState, sceneGroup.children)
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
