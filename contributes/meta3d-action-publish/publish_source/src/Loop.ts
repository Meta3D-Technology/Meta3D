// import "meta3d/webpack_output/static/js/main.js"
import * as Meta3d from "meta3d";

let _loop = (
    [

        update, render,
    ]: [any, any],
    meta3dState,
) => {
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

export let load = (setPercentFunc): Promise<[ArrayBuffer, ArrayBuffer]> => {
    return fetch("./Engine.arraybuffer")
        .then(response => response.arrayBuffer())
        .then(enginePackageBinaryFile => {
            setPercentFunc(_ => 50)

            return fetch("./Scene.glb")
                .then(response => response.arrayBuffer())
                .then(sceneGlb => {
                    setPercentFunc(_ => 100)
                    // _removeLoadingUI()

                    return [enginePackageBinaryFile, sceneGlb]
                })
        })
}

export let startLoop = ([enginePackageBinaryFile, sceneGlb]) => {
    // let Meta3d = (globalThis as any).Meta3d

    let isDebug = true

    let float9Array1 = new Float32Array(9)
    let float32Array1 = new Float32Array(32)
    let transformCount = 100000
    let geometryCount = 100000
    let geometryPointCount = 10000000
    let pbrMaterialCount = 100000

    let canvas = document.querySelector("#canvas")

    let [meta3dState, _, entryExtensionProtocolName] = Meta3d.loadPackage(enginePackageBinaryFile)

    if (entryExtensionProtocolName !== "meta3d-engine-whole-protocol") {
        throw new Error(
            `entryExtensionProtocolName: ${entryExtensionProtocolName} should be meta3d-engine-whole-protocol`
        )
    }


    let { loadScene, prepare, init, update, render, scene } = Meta3d.getExtensionService<any>(meta3dState, entryExtensionProtocolName)

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
        }
    )

    return loadScene(meta3dState, sceneGlb).then(meta3dState => {
        return init(meta3dState, canvas).then(meta3dState => {
            console.log("init success", meta3dState)

            _loop([update, render], meta3dState)
        })
    }).catch(error => {
        console.error(error)
    })
}