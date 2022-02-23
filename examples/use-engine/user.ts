import { prepare, init } from "wonder-engine-ts/src/DirectorAPI"
import { createGameObject, getAllGameObjects } from "wonder-engine-ts/src/GameObjectAPI"

function _createScene(state: any) {
    let data = createGameObject(state)
    state = data[0]
    let gameObject1 = data[1]

    data = createGameObject(state)
    state = data[0]
    let gameObject2 = data[1]

    console.log(getAllGameObjects(state))

    return state
}

let isDebug = true

let state = prepare({
    isDebug: isDebug,
    float9Array1: new Float32Array(),
    float32Array1: new Float32Array(),
    transformCount: 10
})

let canvas = document.querySelector("#canvas") as HTMLCanvasElement;
canvas.style.width = canvas.width + " px";
canvas.style.height = canvas.height + " px";

state = _createScene(state)

init(state).then((state) => {
    console.log("finish init")
})