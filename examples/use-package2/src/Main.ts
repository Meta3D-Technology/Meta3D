import { loadPackage, getExtensionService, getExtensionState, setExtensionState } from "meta3d-package/src/Main"

// import { service } from "meta3d-engine-whole-sceneview-protocol/src/service/ServiceType"
import { service } from "meta3d-engine-whole-protocol/src/service/ServiceType"
// import { state } from "meta3d-engine-whole-sceneview-protocol/src/state/StateType"

// import * as packageBinaryFile from "arraybuffer-loader!./packages/engine-whole_0.0.5.package"
// import * as packageBinaryFile from "arraybuffer-loader!../mine/engine-whole_0.0.6.package"
// import * as packageBinaryFile from "arraybuffer-loader!../mine/engine-whole_0.1.1.package"
// import * as packageBinaryFile from "arraybuffer-loader!./packages/engine-whole_0.0.7.package"
import * as packageBinaryFile from "arraybuffer-loader!./packages/t2_0.0.2.package"



let _loop = (
    [

        update, render,
    ],
    meta3dState,
): Promise<void> => {
    return update(meta3dState).then((meta3dState) => {
        render(meta3dState).then((meta3dState) => {
            requestAnimationFrame(() => {
                _loop(
                    [
                        update, render,
                    ],
                    meta3dState
                )
            })
        })
    })
}

// let _createCameraGameObject = (meta3dState, scene, canvasSize) => {
//     // let { gameObject, basicCameraView } = scene

//     let data = scene.gameObject.createGameObject(meta3dState)
//     meta3dState = data[0]
//     let gameObject = data[1]


//     data = scene.transform.createTransform(meta3dState)
//     meta3dState = data[0]
//     let transform = data[1]

//     meta3dState = scene.gameObject.addTransform(meta3dState, gameObject, transform)

//     data = scene.basicCameraView.createBasicCameraView(meta3dState)
//     meta3dState = data[0]
//     let cameraView = data[1]

//     meta3dState = scene.basicCameraView.active(meta3dState, cameraView)
//     meta3dState = scene.gameObject.addBasicCameraView(meta3dState, gameObject, cameraView)

//     data = scene.perspectiveCameraProjection.createPerspectiveCameraProjection(meta3dState)
//     meta3dState = data[0]
//     let cameraProjection = data[1]

//     meta3dState = scene.perspectiveCameraProjection.setFovy(meta3dState, cameraProjection, 30)
//     meta3dState = scene.perspectiveCameraProjection.setAspect(meta3dState, cameraProjection, canvasSize[0] / canvasSize[1])
//     meta3dState = scene.perspectiveCameraProjection.setNear(meta3dState, cameraProjection, 1)
//     meta3dState = scene.perspectiveCameraProjection.setFar(meta3dState, cameraProjection, 100)
//     meta3dState = scene.gameObject.addPerspectiveCameraProjection(meta3dState, gameObject, cameraProjection)


//     meta3dState = scene.transform.setLocalPosition(meta3dState, transform, [10, 10, 10])
//     meta3dState = scene.transform.lookAt(meta3dState, transform, [0, 1, 0])

//     console.log(scene.transform.getLocalPosition(meta3dState, transform))

//     return meta3dState
// }

// let _createCubeGameObject = (meta3dState, scene) => {
//     let data = scene.gameObject.createGameObject(meta3dState)
//     meta3dState = data[0]
//     let gameObject = data[1]


//     data = scene.transform.createTransform(meta3dState)
//     meta3dState = data[0]
//     let transform = data[1]

//     meta3dState = scene.gameObject.addTransform(meta3dState, gameObject, transform)

//     data = scene.geometry.createGeometry(meta3dState)
//     meta3dState = data[0]
//     let geometry = data[1]


//     let vertices = new Float32Array([
//         1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0,
//         1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0,
//         1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0,
//         -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0,
//         -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0,
//         -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0
//     ])

//     let indices = new Uint32Array([
//         0, 1, 2, 0, 2, 3,
//         4, 5, 6, 4, 6, 7,
//         8, 9, 10, 8, 10, 11,
//         12, 13, 14, 12, 14, 15,
//         16, 17, 18, 16, 18, 19,
//         20, 21, 22, 20, 22, 23
//     ])
//     meta3dState = scene.geometry.setVertices(meta3dState, geometry, vertices)
//     meta3dState = scene.geometry.setIndices(meta3dState, geometry, indices)
//     meta3dState = scene.gameObject.addGeometry(meta3dState, gameObject, geometry)


//     meta3dState = scene.gameObject.addGeometry(meta3dState, gameObject, geometry)



//     data = scene.pbrMaterial.createPBRMaterial(meta3dState)
//     meta3dState = data[0]
//     let material = data[1]
//     meta3dState = scene.pbrMaterial.setDiffuseColor(meta3dState, material, [1.0, 0.0, 0.0])
//     meta3dState = scene.gameObject.addPBRMaterial(meta3dState, gameObject, material)


//     return meta3dState
// }

let _createArcballCameraGameObject = (meta3dState, scene,
    // eventService: eventService,
    // eventExtensionProtocolName: string,
    canvasSize,
    name: string,
    distance
) => {
    let data = scene.gameObject.createGameObject(meta3dState)
    meta3dState = data[0]
    let gameObject = data[1]

    meta3dState = scene.gameObject.setGameObjectName(meta3dState, gameObject, name)

    data = scene.transform.createTransform(meta3dState)
    meta3dState = data[0]
    let transform = data[1]

    meta3dState = scene.gameObject.addTransform(meta3dState, gameObject, transform)



    data = scene.arcballCameraController.createArcballCameraController(meta3dState)
    meta3dState = data[0]
    let cameraController = data[1]

    meta3dState = scene.arcballCameraController.setDistance(meta3dState, cameraController, distance)

    // bindEvent(eventService, eventExtensionProtocolName)

    meta3dState = scene.gameObject.addArcballCameraController(meta3dState, gameObject, cameraController)




    data = scene.basicCameraView.createBasicCameraView(meta3dState)
    meta3dState = data[0]
    let cameraView = data[1]

    meta3dState = scene.basicCameraView.active(meta3dState, cameraView)
    meta3dState = scene.gameObject.addBasicCameraView(meta3dState, gameObject, cameraView)

    data = scene.perspectiveCameraProjection.createPerspectiveCameraProjection(meta3dState)
    meta3dState = data[0]
    let cameraProjection = data[1]

    meta3dState = scene.perspectiveCameraProjection.setFovy(meta3dState, cameraProjection, 30)
    meta3dState = scene.perspectiveCameraProjection.setAspect(meta3dState, cameraProjection, canvasSize[0] / canvasSize[1])
    meta3dState = scene.perspectiveCameraProjection.setNear(meta3dState, cameraProjection, 0.1)
    meta3dState = scene.perspectiveCameraProjection.setFar(meta3dState, cameraProjection, 10000)
    meta3dState = scene.gameObject.addPerspectiveCameraProjection(meta3dState, gameObject, cameraProjection)


    meta3dState = scene.transform.setLocalPosition(meta3dState, transform, [10, 10, 10])
    meta3dState = scene.transform.lookAt(meta3dState, transform, [0, 1, 0])

    return [meta3dState, cameraController, gameObject]
}

export let createCubeGameObject = (meta3dState, engineSceneService, [localPosition, diffuseColor]) => {
    let data = engineSceneService.gameObject.createGameObject(meta3dState)
    meta3dState = data[0]
    let gameObject = data[1]

    meta3dState = engineSceneService.gameObject.setGameObjectName(meta3dState, gameObject, "Cube")

    data = engineSceneService.transform.createTransform(meta3dState)
    meta3dState = data[0]
    let transform = data[1]

    meta3dState = engineSceneService.gameObject.addTransform(meta3dState, gameObject, transform)

    data = engineSceneService.geometry.createGeometry(meta3dState)
    meta3dState = data[0]
    let geometry = data[1]


    // Create a cube
    //    v6----- v5
    //   /|      /|
    //  v1------v0|
    //  | |     | |
    //  | |v7---|-|v4
    //  |/      |/
    //  v2------v3
    let vertices = new Float32Array([   // Coordinates
        1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, // v0-v1-v2-v3 front
        1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, // v0-v3-v4-v5 right
        1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, // v0-v5-v6-v1 up
        -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, // v1-v6-v7-v2 left
        -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0, // v7-v4-v3-v2 down
        1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0  // v4-v7-v6-v5 back
    ])
    let normals = new Float32Array([    // Normal
        0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,  // v0-v1-v2-v3 front
        1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,  // v0-v3-v4-v5 right
        0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,  // v0-v5-v6-v1 up
        -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,  // v1-v6-v7-v2 left
        0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,  // v7-v4-v3-v2 down
        0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0   // v4-v7-v6-v5 back
    ])
    let indices = new Uint32Array([
        0, 1, 2, 0, 2, 3,    // front
        4, 5, 6, 4, 6, 7,    // right
        8, 9, 10, 8, 10, 11,    // up
        12, 13, 14, 12, 14, 15,    // left
        16, 17, 18, 16, 18, 19,    // down
        20, 21, 22, 20, 22, 23     // back
    ])

    meta3dState = engineSceneService.geometry.setVertices(meta3dState, geometry, vertices)
    meta3dState = engineSceneService.geometry.setNormals(meta3dState, geometry, normals)
    meta3dState = engineSceneService.geometry.setIndices(meta3dState, geometry, indices)


    meta3dState = engineSceneService.gameObject.addGeometry(meta3dState, gameObject, geometry)



    data = engineSceneService.pbrMaterial.createPBRMaterial(meta3dState)
    meta3dState = data[0]
    let material = data[1]
    meta3dState = engineSceneService.pbrMaterial.setDiffuseColor(meta3dState, material, diffuseColor)
    meta3dState = engineSceneService.gameObject.addPBRMaterial(meta3dState, gameObject, material)



    meta3dState = engineSceneService.transform.setLocalPosition(meta3dState, transform, localPosition)


    return [meta3dState, gameObject]
}

let _createDirectionLightGameObject = (meta3dState, scene) => {
    let data = scene.gameObject.createGameObject(meta3dState)
    meta3dState = data[0]
    let gameObject = data[1]

    meta3dState = scene.gameObject.setGameObjectName(meta3dState, gameObject, "DirectionLight")


    data = scene.transform.createTransform(meta3dState)
    meta3dState = data[0]
    let transform = data[1]

    // meta3dState = scene.transform.lookAt(meta3dState, transform, [0, 0, -1])
    // meta3dState = scene.transform.lookAt(meta3dState, transform, [0, 0, 1])
    // meta3dState = scene.transform.lookAt(meta3dState, transform, [0, 1, 1])
    // meta3dState = scene.transform.lookAt(meta3dState, transform, [1, 0.1, 1])
    // meta3dState = scene.transform.lookAt(meta3dState, transform, [-0.2, -0.1, -1])
    meta3dState = scene.transform.lookAt(meta3dState, transform, [-0.2, -0.1, -0.2])
    // meta3dState = scene.transform.lookAt(meta3dState, transform, [0.2, 0.1, 1])



    meta3dState = scene.gameObject.addTransform(meta3dState, gameObject, transform)


    data = scene.directionLight.createDirectionLight(meta3dState)
    meta3dState = data[0]
    let directionLight = data[1]
    meta3dState = scene.directionLight.setColor(meta3dState, directionLight, [1.0, 1.0, 1.0])
    meta3dState = scene.directionLight.setIntensity(meta3dState, directionLight, 5)
    meta3dState = scene.gameObject.addDirectionLight(meta3dState, gameObject, directionLight)


    return meta3dState
}

let _createScene = (meta3dState, scene, canvasSize) => {
    // meta3dState = _createCameraGameObject(meta3dState, scene, canvasSize)
    let data1 = _createArcballCameraGameObject(meta3dState, scene,
        canvasSize,
        "Arcball Camera1",
        40
    )
    meta3dState = data1[0]
    let cameraController1 = data1[1]
    let cameraGameObject1 = data1[2]


    // meta3dState = _createCubeGameObject(meta3dState, scene)
    let data3 = createCubeGameObject(meta3dState, scene, [[-2, 2, 0], [1.0, 0.0, 0.0]])
    meta3dState = data3[0]

    meta3dState = _createDirectionLightGameObject(meta3dState, scene)

    return meta3dState
}



// debugger

let isDebug = true

let float9Array1 = new Float32Array()
let float32Array1 = new Float32Array()
// let transformCount = 2
// let geometryCount = 1
// let geometryPointCount = 100
// let pbrMaterialCount = 1
let transformCount = 10
let geometryCount = 10
let geometryPointCount = 100
let pbrMaterialCount = 1


let canvas: HTMLCanvasElement = document.querySelector("#canvas") as HTMLCanvasElement
let canvasSize: [number, number] = [canvas.width, canvas.height]







let [meta3dState, _, entryExtensionProtocolName] = loadPackage(packageBinaryFile)

let { prepare, init, update, render, scene } = getExtensionService<service>(meta3dState, entryExtensionProtocolName)

// debugger

meta3dState = prepare(
    meta3dState,
    isDebug,
    {
        float9Array1,
        float32Array1,
        transformCount,
        geometryCount,
        geometryPointCount,
        pbrMaterialCount
    },
    // null,
    // canvas
)


meta3dState = _createScene(meta3dState, scene(meta3dState), canvasSize)



init(meta3dState, canvas).then(meta3dState => {
    console.log("init success", meta3dState)

    _loop([update, render], meta3dState)
})
