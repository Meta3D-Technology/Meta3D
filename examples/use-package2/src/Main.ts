import { loadPackage, getExtensionService, getExtensionState, setExtensionState } from "meta3d-package"

import { service } from "meta3d-engine-whole-protocol/src/service/ServiceType"
import { state } from "meta3d-engine-whole-protocol/src/state/StateType"

import * as packageBinaryFile from "arraybuffer-loader!./packages/engine-whole_0.0.5.package"




// debugger

let isDebug = true

let float9Array1 = new Float32Array()
let float32Array1 = new Float32Array()
let transformCount = 1
let geometryCount = 1
let geometryPointCount = 10
let pbrMaterialCount = 1

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


let data = scene.gameObject.createGameObject(meta3dState)
meta3dState = data[0]
let gameObject = data[1]

console.log(gameObject)

init(meta3dState,).then(meta3dState => {
    console.log("init success", meta3dState)
})
