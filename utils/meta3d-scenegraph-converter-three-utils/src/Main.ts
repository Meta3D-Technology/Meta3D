import { service } from "meta3d-scenegraph-converter-three-protocol/src/service/ServiceType"
import { state } from "meta3d-scenegraph-converter-three-protocol/src/state/StateType"
import { state as meta3dState, getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, extensionLife, api } from "meta3d-type"
import { basicCameraView } from "meta3d-component-basiccameraview-protocol";
import type {
    Blending, Side,
    BufferAttribute as BufferAttributeType,
    CubeTexture,
    Texture,
    Color as ColorType,
    Layers as LayersType,
    // Matrix3 as Matrix3Type,
    Matrix4 as Matrix4Type,
    Sphere as SphereType,
    // Group,
    Object3D as Object3DType,
    Camera as CameraType,
    PerspectiveCamera as PerspectiveCameraType,
    Mesh as MeshType,
    TypedArray,
    BufferGeometry as BufferGeometryType,
    MeshBasicMaterial as MeshBasicMaterialType
    // Quaternion,
} from "three";
import { getExn, getWithDefault, map, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"
import { createEmptyBasicMaterialInstanceMap, createEmptyGeometryInstanceMap, createEmptyMeshInstanceMap, getEngineSceneService, getMeta3dState, setAPI, setMeta3dState, setVariables } from "./utils/GlobalUtils";
// import { componentName as basicCameraViewComponentName } from "meta3d-component-basiccameraview-protocol"
import { componentName as perspectiveCameraProjectionComponentName, perspectiveCameraProjection, pMatrix, dataName as perspectiveCameraProjectionDataName } from "meta3d-component-perspectivecameraprojection-protocol";
// import { componentName as transformComponentName } from "meta3d-component-transform-protocol"
// import { getActiveCameraView } from "meta3d-component-commonlib";
// import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
// import { state as engineCoreState } from "meta3d-engine-core-protocol/src/state/StateType"
import { gameObject } from "meta3d-gameobject-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable";
import { geometry } from "meta3d-component-geometry-protocol-common/src/Index";
import { pbrMaterial } from "meta3d-component-pbrmaterial-protocol-common/src/Index";
import { service as threeAPIService } from "meta3d-three-api-protocol/src/service/ServiceType"
import { generateUUID } from "./three/MathUtils";
import { generateId } from "./utils/IdUtils";
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { EventDispatcher } from "./three/EventDispatcher";
import { service as engineWholeService } from "meta3d-engine-whole-protocol/src/service/ServiceType"
import { localRotation } from "meta3d-component-transform-protocol";
import { scene } from "meta3d-engine-scene-protocol/src/service/ServiceType";
import { diffuseColor } from "meta3d-component-pbrmaterial-protocol";

let BufferAttribute: any, Color: any, FrontSide: any, Layers: any, Matrix3: any, Matrix4: any, NoBlending: any, Sphere: any, Vector3: any, Quaternion: any


let _globalKeyNameForMeshInstanceMap: string
let _globalKeyNameForBasicMaterialInstanceMap: string
let _globalKeyNameForGeometryInstanceMap: string


/*! for WebGLProperties->get(xxx), use the same instance
*/

let _getMeshInstanceMap = (): Array<Mesh> => {
    return (globalThis as any)[_globalKeyNameForMeshInstanceMap]
}

// let _clearMeshInstance = (gameObject: gameObject) =>  {
//     _getMeshInstanceMap()[gameObject] = undefined
// }

let _getMeshInstance = (gameObject: gameObject) => {
    if (_getMeshInstanceMap()[gameObject] === undefined) {
        _getMeshInstanceMap()[gameObject] = new Mesh(gameObject)
    }

    return _getMeshInstanceMap()[gameObject]
}

let _getBasicMaterialInstanceMap = (): Array<MeshBasicMaterial> => {
    return (globalThis as any)[_globalKeyNameForBasicMaterialInstanceMap]
}

// let _clearBasicMaterialInstance = (material: pbrMaterial) =>  {
//     _getBasicMaterialInstanceMap()[material] = undefined
// }

let _getBasicMaterialInstance = (material: pbrMaterial) => {
    if (_getBasicMaterialInstanceMap()[material] === undefined) {
        _getBasicMaterialInstanceMap()[material] = new MeshBasicMaterial(material)
    }

    return _getBasicMaterialInstanceMap()[material]
}

let _getGeometryInstanceMap = (): Array<BufferGeometry> => {
    return (globalThis as any)[_globalKeyNameForGeometryInstanceMap]
}

// let _clearGeometryInstance = (geometry: geometry) =>  {
//     _getGeometryInstanceMap()[geometry] = undefined
// }

let _getGeometryInstance = (geometry: geometry) => {
    if (_getGeometryInstanceMap()[geometry] === undefined) {
        _getGeometryInstanceMap()[geometry] = new BufferGeometry(geometry)
    }

    return _getGeometryInstanceMap()[geometry]
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


    public onBeforeRender(scene: Scene, camera: Camera, geometry: BufferGeometry, material: MeshBasicMaterial, group: any) {
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

        // TODO get light
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
        )
    }

    public get background(): nullable<ColorType | Texture | CubeTexture> {
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

    public get material(): MeshBasicMaterial {
        let meta3dState = getMeta3dState()

        let { gameObject } = getEngineSceneService(meta3dState)

        return _getBasicMaterialInstance(gameObject.getPBRMaterial(meta3dState, this.gameObject))

    }
}

// class EventDispatcher {
//     // constructor(component: number) {
//     //     this.component = component

//     //     this._listeners = []
//     // }

//     private _listeners = {}

//     protected component: number


//     // public addEventListener(eventName: string, func: any) {

//     // }

//     // public removeEventListener(type: string, func: any) {
//     // }

//     // public dispatchEvent(event) {
//     // }

//     addEventListener(type, listener) {

//         if (this._listeners === undefined) this._listeners = {};

//         const listeners = this._listeners;

//         if (listeners[type] === undefined) {

//             listeners[type] = [];

//         }

//         if (listeners[type].indexOf(listener) === - 1) {

//             listeners[type].push(listener);

//         }

//     }

//     hasEventListener(type, listener) {

//         if (this._listeners === undefined) return false;

//         const listeners = this._listeners;

//         return listeners[type] !== undefined && listeners[type].indexOf(listener) !== - 1;

//     }

//     removeEventListener(type, listener) {

//         if (this._listeners === undefined) return;

//         const listeners = this._listeners;
//         const listenerArray = listeners[type];

//         if (listenerArray !== undefined) {

//             const index = listenerArray.indexOf(listener);

//             if (index !== - 1) {

//                 listenerArray.splice(index, 1);

//             }

//         }

//     }

//     dispatchEvent(event) {

//         if (this._listeners === undefined) return;

//         const listeners = this._listeners;
//         const listenerArray = listeners[event.type];

//         if (listenerArray !== undefined) {

//             event.target = this;

//             // Make a copy, in case listeners are removed while iterating.
//             const array = listenerArray.slice(0);

//             for (let i = 0, l = array.length; i < l; i++) {

//                 array[i].call(this, event);

//             }

//             event.target = null;

//         }

//     }
// }

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

// interface MeshStandardMaterialParameters{
// color: 
// }

// interface MeshPhysicalMaterialParameters extends MeshStandardMaterialParameters{

// }

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

class MeshBasicMaterial extends Material {
    constructor(material: pbrMaterial) {
        super(material)
    }


    public get isMeshBasicMaterial(): boolean {
        return true
    }

    public get color(): ColorType {
        let meta3dState = getMeta3dState()

        let { pbrMaterial } = getEngineSceneService(meta3dState)

        let [r, g, b] = getExn(
            pbrMaterial.getDiffuseColor(meta3dState,
                this.material
            )
        )

        return new Color(r, g, b)
    }

    public get name(): string {
        return "MeshBasicMaterial"
    }

    public get type(): string {
        return "MeshBasicMaterial"
    }

    public get reflectivity(): number {
        return 1
    }

    public get refractionRatio(): number {
        return 0.98
    }

    public get fog(): boolean {
        return false
    }


    public setMaterial(material: pbrMaterial) {
        this.material = material
    }
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

let _getMeshBasicMaterial = (mesh: MeshType): MeshBasicMaterialType => {
    let material = mesh.material as MeshBasicMaterialType

    if (material.type !== "MeshBasicMaterial") {
        throw new Error("error")
    }

    return material
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

            data = geometryService.createGeometry(meta3dState)
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




            let meshBasicMaterial = _getMeshBasicMaterial(mesh)


            data = pbrMaterialService.createPBRMaterial(meta3dState)
            meta3dState = data[0]
            let pbrMaterial = data[1]


            meta3dState = pbrMaterialService.setDiffuseColor(meta3dState, pbrMaterial, meshBasicMaterial.color.toArray() as any as diffuseColor
            )


            meta3dState = gameObjectService.addPBRMaterial(meta3dState, gameObject, pbrMaterial)
        }




        meta3dState = _import(sceneService, meta3dState,
            object3D.children
        )

        return meta3dState
    }, meta3dState)
}

let _setVariables = (
    engineSceneProtocolName, globalKeyNameForMeta3dState, globalKeyNameForAPI, globalKeyNameForMeshInstanceMap, globalKeyNameForBasicMaterialInstanceMap, globalKeyNameForGeometryInstanceMap
) => {
    setVariables(
        engineSceneProtocolName, globalKeyNameForMeta3dState, globalKeyNameForAPI, globalKeyNameForMeshInstanceMap, globalKeyNameForBasicMaterialInstanceMap, globalKeyNameForGeometryInstanceMap
    )

    _globalKeyNameForMeshInstanceMap = globalKeyNameForMeshInstanceMap
    _globalKeyNameForBasicMaterialInstanceMap = globalKeyNameForBasicMaterialInstanceMap
    _globalKeyNameForGeometryInstanceMap = globalKeyNameForGeometryInstanceMap
}

export let getExtensionServiceUtils = (
    // getCameraComponentsFunc: (meta3dState: meta3dState, isDebug: boolean) => [basicCameraView, perspectiveCameraProjection],
    api: api,
    allEventNames,
    {
        engineSceneProtocolName, globalKeyNameForMeta3dState, globalKeyNameForAPI, globalKeyNameForMeshInstanceMap, globalKeyNameForBasicMaterialInstanceMap, globalKeyNameForGeometryInstanceMap
    },
    engineWholeProtocolName
): service => {
    return {
        init: (meta3dState) => {
            _setVariables(
                engineSceneProtocolName, globalKeyNameForMeta3dState, globalKeyNameForAPI, globalKeyNameForMeshInstanceMap, globalKeyNameForBasicMaterialInstanceMap, globalKeyNameForGeometryInstanceMap
            )

            let eventProtocolName = "meta3d-event-protocol"

            let eventService = api.getExtensionService<eventService>(
                meta3dState,
                eventProtocolName
            )

            let {
                disposeGameObjectEventName,
                disposeGeometryEventName,
                disposePBRMaterialEventName
            } = allEventNames

            meta3dState = eventService.onCustomGlobalEvent2(meta3dState, eventProtocolName, [
                disposeGameObjectEventName, 1, (meta3dState, { userData }) => {
                    console.log("dispose gameObject")
                    // _clearMeshInstance(userData as any as gameObject)

                    _getMeshInstanceMap()[userData as any as gameObject] = undefined

                    return meta3dState
                }
            ])
            meta3dState = eventService.onCustomGlobalEvent2(meta3dState, eventProtocolName, [
                disposeGeometryEventName, 1, (meta3dState, { userData }) => {
                    // _clearGeometryInstance(userData as any as geometry)


                    _getGeometryInstanceMap()[userData as any as geometry].dispose()

                    _getGeometryInstanceMap()[userData as any as geometry] = undefined

                    return meta3dState
                }
            ])
            meta3dState = eventService.onCustomGlobalEvent2(meta3dState, eventProtocolName, [
                disposePBRMaterialEventName, 1, (meta3dState, { userData }) => {
                    // _clearBasicMaterialInstance(userData as any as pbrMaterial)


                    _getBasicMaterialInstanceMap()[userData as any as pbrMaterial].dispose()

                    _getBasicMaterialInstanceMap()[userData as any as pbrMaterial] = undefined

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
                // TODO refactor: remove
                event: allEventNames
            }
        },
        import: (meta3dState, sceneGroup) => {
            let { scene } = api.getExtensionService<engineWholeService>(meta3dState, engineWholeProtocolName)

            return _import(scene, meta3dState, sceneGroup.children)
        }
    }
}

export let createExtensionStateUtils = (
    allEventNames
): state => {
    return {
        perspectiveCamera: null,
        scene: null,
        event: allEventNames
    }
}

export let getExtensionLifeUtils = (api: api): extensionLife<service> => {
    return {
        onRegister: (meta3dState, service) => {
            setAPI(api)

            createEmptyMeshInstanceMap()
            createEmptyBasicMaterialInstanceMap()
            createEmptyGeometryInstanceMap()

            return meta3dState
        }
    }
}
