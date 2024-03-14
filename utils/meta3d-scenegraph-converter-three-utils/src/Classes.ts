import { basicCameraView } from "meta3d-component-basiccameraview-protocol";
import type {
    Blending, Side,
    BufferAttribute as BufferAttributeType,
    CubeTexture,
    Texture as TextureType,
    Color as ColorType,
    Layers as LayersType, Matrix3 as Matrix3Type,
    Matrix4 as Matrix4Type,
    Sphere as SphereType,
    Box3 as Box3Type,
    Object3D as Object3DType,
    Camera as CameraType,
    PerspectiveCamera as PerspectiveCameraType,
    Mesh as MeshType,
    TypedArray,
    BufferGeometry as BufferGeometryType,
    MeshStandardMaterial as MeshStandardMaterialType,
    Source as SourceType,
    Wrapping,
    AnyMapping,
    MinificationTextureFilter,
    MagnificationTextureFilter,
    // AnyPixelFormat,
    TextureDataType, Vector2 as Vector2Type, Vector3 as Vector3Type,
    NormalMapTypes,
    WebGL1PixelFormat,
    TextureFilter,
    DirectionalLight as DirectionalLightType,
    ColorSpace,
    Quaternion as QuaternionType,
    // Quaternion,
} from "three";
import { getExn, getWithDefault, map, isNullable, bind, return_ } from "meta3d-commonlib-ts/src/NullableUtils"
import { createEmptyPhysicalMaterialInstanceMap, createEmptyGeometryInstanceMap, createEmptyMeshInstanceMap, getEngineSceneService, getMeta3dState, setAPI, setMeta3dState, setVariables, createEmptyTextureInstanceMap, createEmptyDirectionLightInstanceMap, getGetAllGameObjectsFunc } from "./utils/GlobalUtils";
// import { componentName as basicCameraViewComponentName } from "meta3d-component-basiccameraview-protocol"
import { componentName as perspectiveCameraProjectionComponentName, perspectiveCameraProjection, pMatrix, dataName as perspectiveCameraProjectionDataName } from "meta3d-component-perspectivecameraprojection-protocol";
import { gameObject } from "meta3d-gameobject-protocol"
import { nullable, strictNullable } from "meta3d-commonlib-ts/src/nullable";
import { geometry } from "meta3d-component-geometry-protocol-common/src/Index";
import { pbrMaterial } from "meta3d-component-pbrmaterial-protocol-common/src/Index";
import { service as threeAPIService } from "meta3d-three-api-protocol/src/service/ServiceType"
import { clamp, generateUUID } from "./three/MathUtils";
import { generateId } from "./utils/IdUtils";
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { EventDispatcher } from "./three/EventDispatcher";
import { filter, htmlImageElement, texture, wrap } from "meta3d-texture-basicsource-protocol/src/state/StateType";
import { color, directionLight } from "meta3d-component-directionlight-protocol";
import {
    BufferAttribute, Color, FrontSide, Layers, Matrix3, Matrix4, NoBlending, Sphere, Box3, Vector3, Quaternion, Source,
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
    NoColorSpace
} from "./SetThreeObjects";
import {
    globalKeyNameForMeshInstanceMap,
    globalKeyNameForPhysicalMaterialInstanceMap,
    globalKeyNameForTextureInstanceMap,
    globalKeyNameForGeometryInstanceMap,
    globalKeyNameForDirectionLightInstanceMap
} from "./SetVariables";
import * as Meta3DCameraController from "meta3d-gltf-extensions/src/Meta3DCameraController"
import * as Meta3DScript from "meta3d-gltf-extensions/src/Meta3DScript"
import { computeBoundingBox, computeBoundingSphere } from "./utils/BoundingUtils";

let _getEmptyGameObject = () => -1

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

/*! for WebGLProperties->get(xxx), use the same instance
*/

export let getMeshInstanceMap = (): Array<Mesh> => {
    return (globalThis as any)[globalKeyNameForMeshInstanceMap]
}

let _getOrCreateMeshInstance = (gameObject: gameObject) => {
    if (getMeshInstanceMap()[gameObject] === undefined) {
        getMeshInstanceMap()[gameObject] = new Mesh(gameObject)
    }

    return getMeshInstanceMap()[gameObject]
}

export let getPhysicalMaterialInstanceMap = (): Array<MeshPhysicalMaterial> => {
    return (globalThis as any)[globalKeyNameForPhysicalMaterialInstanceMap]
}

let _getOrCreatePhysicalMaterialInstance = (material: pbrMaterial) => {
    if (getPhysicalMaterialInstanceMap()[material] === undefined) {
        getPhysicalMaterialInstanceMap()[material] = new MeshPhysicalMaterial(material)
    }

    return getPhysicalMaterialInstanceMap()[material]
}



export let getTextureInstanceMap = (): Array<Texture> => {
    return (globalThis as any)[globalKeyNameForTextureInstanceMap]
}

let _getOrCreateTextureInstance = (texture: texture) => {
    if (getTextureInstanceMap()[texture] === undefined) {
        getTextureInstanceMap()[texture] = new Texture(texture)
    }

    return getTextureInstanceMap()[texture]
}


export let getGeometryInstanceMap = (): Array<BufferGeometry> => {
    return (globalThis as any)[globalKeyNameForGeometryInstanceMap]
}

let _getOrCreateGeometryInstance = (geometry: geometry) => {
    if (getGeometryInstanceMap()[geometry] === undefined) {
        getGeometryInstanceMap()[geometry] = new BufferGeometry(geometry)
    }

    return getGeometryInstanceMap()[geometry]
}


export let getDirectionLightInstanceMap = (): Array<DirectionLight> => {
    return (globalThis as any)[globalKeyNameForDirectionLightInstanceMap]
}

let _getOrCreateDirectionLightInstance = (directionLight: directionLight, gameObject: gameObject) => {
    if (getDirectionLightInstanceMap()[directionLight] === undefined) {
        getDirectionLightInstanceMap()[directionLight] = new DirectionLight(directionLight, gameObject)
    }

    return getDirectionLightInstanceMap()[directionLight]
}

export class Object3D {
    constructor(gameObject: gameObject) {
        this.gameObject = gameObject

        this.uuid = generateUUID()
        this.id = generateId()

        this._visible = true
    }

    private _visible: boolean

    protected gameObject: gameObject

    public uuid: string
    public id: number

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
        return this._visible
    }
    public set visible(value: boolean) {
        this._visible = value
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

    // public get matrix(): Matrix4Type {
    //     return new Matrix4()
    // }
    public get matrix(): Matrix4Type {
        if (this.gameObject == _getEmptyGameObject()) {
            return new Matrix4()
        }

        return _getMatrix(
            this.gameObject
        )
    }

    public get matrixWorld(): Matrix4Type {
        if (this.gameObject == _getEmptyGameObject()) {
            return new Matrix4()
        }

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

    private _userData: Record<string, any> = {}
    public get userData() {
        let meta3dState = getMeta3dState()

        let engineSceneService = getEngineSceneService(meta3dState)

        let userData = null

        if (isNullable(this._userData[Meta3DCameraController.buildKey()]) && engineSceneService.gameObject.hasArcballCameraController(meta3dState, this.gameObject)) {
            userData = {
                ...this._userData,
                [Meta3DCameraController.buildKey()]: Meta3DCameraController.buildValue("arcball", return_(
                    Meta3DCameraController.getArcballCameraControllerValue(engineSceneService, meta3dState, this.gameObject)
                ))
            }
        }
        else if (isNullable(this._userData[Meta3DScript.buildKey()]) && engineSceneService.gameObject.hasScript(meta3dState, this.gameObject)) {
            userData = {
                ...this._userData,
                [Meta3DScript.buildKey()]: Meta3DScript.buildValue((
                    Meta3DScript.getValue(engineSceneService, meta3dState, this.gameObject)
                ))
            }
        }
        else {
            userData = this._userData
        }

        return userData
    }
    public set userData(data) {
        this._userData = data
    }

    public get children(): Array<Object3D | Mesh | PerspectiveCamera | DirectionLight> {
        let meta3dState = getMeta3dState()

        let engineSceneService = getEngineSceneService(meta3dState)

        return this.getChildren((gameObject: gameObject) => _createInstance(engineSceneService, meta3dState, gameObject))
    }


    public traverse(callback) {
        callback(this);

        const children = this.children;

        for (let i = 0, l = children.length; i < l; i++) {

            children[i].traverse(callback);

        }
    }

    public onBeforeRender(scene: Scene, camera: Camera, geometry: BufferGeometry, material: MeshPhysicalMaterial, group: any) {
    }

    public onAfterRender(scene: Scene, camera: Camera, geometry: BufferGeometry, object: Object3D, group: any) {
    }
}

export class Camera extends Object3D {
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

    public get projectionMatrixInverse(): Matrix4Type {
        return new Matrix4().copy(this.projectionMatrix).invert()
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

export class PerspectiveCamera extends Camera {
    constructor(basicCameraViewComponent: basicCameraView, perspectiveCameraProjectionComponent: perspectiveCameraProjection, gameObject: gameObject) {
        super(basicCameraViewComponent, perspectiveCameraProjectionComponent, gameObject)
    }

    public get isPerspectiveCamera(): boolean {
        return true
    }

    public get type(): string {
        return "PerspectiveCamera"
    }

    public get name(): string {
        let meta3dState = getMeta3dState()

        let { gameObject, perspectiveCameraProjection } = getEngineSceneService(meta3dState)

        return getWithDefault(perspectiveCameraProjection.getName(meta3dState, this.perspectiveCameraProjectionComponent),
            getWithDefault(gameObject.getGameObjectName(meta3dState, this.gameObject), "")
        )
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


export class Light extends Object3D {
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

export class DirectionLight extends Light {
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

        let { gameObject, directionLight } = getEngineSceneService(meta3dState)

        return getWithDefault(directionLight.getName(meta3dState, this._light),
            getWithDefault(gameObject.getGameObjectName(meta3dState, this.gameObject), "")
        )
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

export class AmbientLight extends Light {
    constructor(gameObject: gameObject) {
        super(gameObject)

        // this._light = light
    }

    // private _light: directionLight

    public get isAmbientLight(): boolean {
        return true
    }

    public get type(): string {
        return "AmbientLight"
    }


    public get children() {
        return []
    }

    public get color(): ColorType {
        // return _getExnDirectionLightValue("getColor", this._light, (v) => new Color(...v))
        return getWithDefault(globalThis["ambientLight_color"], new Color(1, 1, 1))
    }

    public get intensity(): number {
        // return _getExnDirectionLightValue("getIntensity", this._light)
        return getWithDefault(globalThis["ambientLight_intensity"], 0.0)
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

export class Scene extends Object3D {
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
        let getAllGameObjectsFunc = getGetAllGameObjectsFunc()

        let engineSceneService = getEngineSceneService(meta3dState)

        // let allGameObjects = engineSceneService.gameObject.getAllGameObjects(meta3dState)
        let allGameObjects = getAllGameObjectsFunc(meta3dState)

        return allGameObjects.filter(gameObject => {
            return isNullable(engineSceneService.transform.getParent(meta3dState, engineSceneService.gameObject.getTransform(meta3dState, gameObject)))
        }).map(gameObject => _createInstance(engineSceneService, meta3dState, gameObject)).concat([
            // TODO fix AmbientLight

            new AmbientLight(allGameObjects.filter(gameObject => {
                return isNullable(engineSceneService.transform.getParent(meta3dState, engineSceneService.gameObject.getTransform(meta3dState, gameObject)))
            })[0])
        ])

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
    public set background(value: nullable<ColorType | TextureType | CubeTexture>) {
    }

    public get overrideMaterial(): nullable<Material> {
        return null
    }
    public set overrideMaterial(value: nullable<Material>) {
    }

    public get matrixWorld(): Matrix4Type {
        return new Matrix4()
    }

    // public add(...object: Array<Object3D>) {
    // }
}

export class Mesh extends Object3D {
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
        return map(
            _getOrCreateMeshInstance,
            this.getParent()
        )
    }

    // public get children(): Array<Mesh> {
    //     let meta3dState = getMeta3dState()

    //     let engineSceneService = getEngineSceneService(meta3dState)

    //     return this.getChildren((gameObject: gameObject) => _createInstance(engineSceneService, meta3dState, gameObject))
    // }

    // public get matrix(): Matrix4Type {
    //     return _getMatrix(
    //         this.gameObject
    //     )
    // }

    public get geometry(): BufferGeometry {
        let meta3dState = getMeta3dState()

        let { gameObject } = getEngineSceneService(meta3dState)

        return _getOrCreateGeometryInstance(gameObject.getGeometry(meta3dState, this.gameObject))
    }

    public get material(): MeshPhysicalMaterial {
        let meta3dState = getMeta3dState()

        let { gameObject } = getEngineSceneService(meta3dState)

        return _getOrCreatePhysicalMaterialInstance(gameObject.getPBRMaterial(meta3dState, this.gameObject))
    }


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

export class BufferGeometry extends EventDispatcher {
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
        this.id = generateId()

        // TODO perf: get from collider component
        this._boundingSphere = computeBoundingSphere(new Sphere(), this._positionAttribute, new Vector3())
        this._boundingBox = computeBoundingBox(new Box3(), this._positionAttribute)
    }

    private _geometry: geometry
    private _positionAttribute: BufferAttributeType
    private _normalAttribute: nullable<BufferAttributeType>
    private _uvAttribute: nullable<BufferAttributeType>
    private _tangentAttribute: nullable<BufferAttributeType>
    private _indexAttribute: BufferAttributeType
    private _boundingSphere: SphereType
    private _boundingBox: Box3Type

    public uuid: string
    public id: number


    public get name(): string {
        let meta3dState = getMeta3dState()

        let { geometry } = getEngineSceneService(meta3dState)

        return getWithDefault(geometry.getName(meta3dState, this._geometry), "")
    }

    public get boundingSphere(): nullable<SphereType> {
        // return new Sphere(
        //     new Vector3(0, 0, 0),
        //     100000
        // )

        return this._boundingSphere
    }

    public get boundingBox(): nullable<Box3Type> {
        return this._boundingBox
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


export class Texture extends EventDispatcher {
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

export class Material extends EventDispatcher {
    constructor(material: pbrMaterial) {
        super()

        this.material = material

        this.uuid = generateUUID()
        this.id = generateId()
    }

    protected material: pbrMaterial

    public uuid: string
    public id: number

    public version: number = 0

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

export class MeshStandardMaterial extends Material {
    constructor(material: pbrMaterial) {
        super(material)
    }


    public get isMeshStandardMaterial(): boolean {
        return true
    }

    public get defines(): any {
        return { 'STANDARD': '' };
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

export class MeshPhysicalMaterial extends MeshStandardMaterial {
    constructor(material: pbrMaterial) {
        super(material)
    }

    public get isMeshPhysicalMaterial(): boolean {
        return true
    }

    public get type(): string {
        return "MeshPhysicalMaterial"
    }

    public get defines(): any {
        return {
            'STANDARD': '',
            'PHYSICAL': ''
        }
    }

    public get anisotropyRotation(): number {
        return 0
    }

    public get anisotropyMap(): nullable<Texture> {
        return null
    }

    public get clearcoatMap(): nullable<Texture> {
        return null
    }

    public get clearcoatRoughness(): number {
        return 0
    }

    public get clearcoatRoughnessMap(): nullable<Texture> {
        return null
    }

    public get clearcoatNormalScale(): Vector2Type {
        return new Vector2(1, 1)
    }

    public get clearcoatNormalMap(): nullable<Texture> {
        return null
    }

    public get ior(): number {
        return _getExnMaterialValue("getIOR", this.material)
    }

    public get reflectivity(): number {
        return (clamp(2.5 * (this.ior - 1) / (this.ior + 1), 0, 1))
    }

    public get iridescenceMap(): nullable<Texture> {
        return null
    }

    public get iridescenceIOR(): number {
        return 1.3
    }

    public get iridescenceThicknessRange(): [number, number] {
        return [100, 400]
    }

    public get iridescenceThicknessMap(): nullable<Texture> {
        return null
    }

    public get sheenColor(): ColorType {
        return new Color(0x000000);
    }

    public get sheenColorMap(): nullable<Texture> {
        return null
    }

    public get sheenRoughness(): number {
        return 1.0
    }

    public get sheenRoughnessMap(): nullable<Texture> {
        return null
    }

    public get transmission(): number {
        return _getExnMaterialValue("getTransmission", this.material)
    }

    public get transmissionMap(): nullable<Texture> {
        return null
    }

    public get thickness(): number {
        return 0
    }

    public get thicknessMap(): nullable<Texture> {
        return null
    }

    public get attenuationDistance(): number {
        return Infinity
    }

    public get attenuationColor(): ColorType {
        return new Color(1, 1, 1)
    }

    public get specularIntensity(): number {
        return _getExnMaterialValue("getSpecular", this.material)
    }

    public get specularIntensityMap(): nullable<Texture> {
        return null
    }

    public get specularColor(): ColorType {
        return _getExnMaterialValue("getSpecularColor", this.material, (v) => new Color(...v))
    }

    public get anisotropy(): number {
        return 0
    }

    public get clearcoat(): number {
        return 0
    }

    public get iridescence(): number {
        return 0
    }

    public get sheen(): number {
        return 0
    }
}