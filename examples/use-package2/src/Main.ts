import { loadPackage, getExtensionService, getExtensionState, setExtensionState } from "meta3d-package"

import { service } from "meta3d-engine-whole-protocol/src/service/ServiceType"
import { state } from "meta3d-engine-whole-protocol/src/state/StateType"

import * as packageBinaryFile from "arraybuffer-loader!./packages/engine-whole_0.0.5.package"


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

let _createCameraGameObject = (meta3dState, scene, canvasSize) => {
    // let { gameObject, basicCameraView } = scene

    let data = scene.gameObject.createGameObject(meta3dState)
    meta3dState = data[0]
    let gameObject = data[1]


    data = scene.transform.createTransform(meta3dState)
    meta3dState = data[0]
    let transform = data[1]

    meta3dState = scene.gameObject.addTransform(meta3dState, gameObject, transform)

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
    meta3dState = scene.perspectiveCameraProjection.setNear(meta3dState, cameraProjection, 1)
    meta3dState = scene.perspectiveCameraProjection.setFar(meta3dState, cameraProjection, 100)
    meta3dState = scene.gameObject.addPerspectiveCameraProjection(meta3dState, gameObject, cameraProjection)


    meta3dState = scene.transform.setLocalPosition(meta3dState, transform, [10, 10, 10])
    meta3dState = scene.transform.lookAt(meta3dState, transform, [0, 1, 0])

    console.log(scene.transform.getLocalPosition(meta3dState, transform))

    return meta3dState
}

let _createCubeGameObject = (meta3dState) => {
    let data = scene.gameObject.createGameObject(meta3dState)
    meta3dState = data[0]
    let gameObject = data[1]


    data = scene.transform.createTransform(meta3dState)
    meta3dState = data[0]
    let transform = data[1]

    meta3dState = scene.gameObject.addTransform(meta3dState, gameObject, transform)

    data = scene.geometry.createGeometry(meta3dState)
    meta3dState = data[0]
    let geometry = data[1]


    let vertices = new Float32Array([
        1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0,
        1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0,
        -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0,
        -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0,
        -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0
    ])

    let indices = new Uint32Array([
        0, 1, 2, 0, 2, 3,
        4, 5, 6, 4, 6, 7,
        8, 9, 10, 8, 10, 11,
        12, 13, 14, 12, 14, 15,
        16, 17, 18, 16, 18, 19,
        20, 21, 22, 20, 22, 23
    ])
    meta3dState = scene.geometry.setVertices(meta3dState, geometry, vertices)
    meta3dState = scene.geometry.setIndices(meta3dState, geometry, indices)
    meta3dState = scene.gameObject.addGeometry(meta3dState, gameObject, geometry)


    meta3dState = scene.gameObject.addGeometry(meta3dState, gameObject, geometry)



    data = scene.pbrMaterial.createPBRMaterial(meta3dState)
    meta3dState = data[0]
    let material = data[1]
    meta3dState = scene.pbrMaterial.setDiffuseColor(meta3dState, material, [1.0, 0.0, 0.0])
    meta3dState = scene.gameObject.addPBRMaterial(meta3dState, gameObject, material)


    return meta3dState
}

let _createScene = (meta3dState, scene, canvasSize) => {
    meta3dState = _createCameraGameObject(meta3dState, scene, canvasSize)

    meta3dState = _createCubeGameObject(meta3dState)

    return meta3dState
}



// debugger

let isDebug = true

let float9Array1 = new Float32Array()
let float32Array1 = new Float32Array()
// let transformCount = 1
// let geometryCount = 1
// let geometryPointCount = 10
// let pbrMaterialCount = 1
let transformCount = 2
let geometryCount = 2
let geometryPointCount = 100
let pbrMaterialCount = 2

let canvas: HTMLCanvasElement = document.querySelector("#canvas") as HTMLCanvasElement
let canvasSize: [number, number] = [canvas.width, canvas.height]







let [meta3dState, _, entryExtensionProtocolName] = loadPackage(packageBinaryFile)

let { prepare, init, update, render, scene } = getExtensionService<service>(meta3dState, entryExtensionProtocolName)

// debugger

meta3dState = prepare(
    meta3dState,
    isDebug,
    canvasSize,
    {
        float9Array1,
        float32Array1,
        transformCount,
        geometryCount,
        geometryPointCount,
        pbrMaterialCount
    },
    canvas
)


meta3dState = _createScene(meta3dState, scene, canvasSize)



init(meta3dState,).then(meta3dState => {
    console.log("init success", meta3dState)

    _loop([update, render], meta3dState)
})
