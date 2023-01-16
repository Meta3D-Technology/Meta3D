import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/WorkPluginContributeType"
import { getState, getTextureID, getViewRect, setState } from "../Utils";
import { states } from "meta3d-work-plugin-editor-webgl1-scene-view-protocol/src/StateType";
// import { service as webgl1Service, webgl1Context, fbo, texture } from "meta3d-webgl1-protocol/src/service/ServiceType"
import { service as engineWholeService } from "meta3d-engine-whole-protocol/src/service/ServiceType"
// import { pipe } from "meta3d-fp/src/Pipe";
import { state as meta3dState } from "meta3d-type"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils";
import { state as uiState } from "meta3d-ui-protocol/src/state/StateType"
import { gameObject } from "meta3d-gameobject-protocol/src/Index";

type canvasSize = [number, number]

let _createCameraGameObject = (meta3dState: meta3dState, { scene }: engineWholeService, canvasSize: canvasSize): [meta3dState, gameObject] => {
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

    return [meta3dState, gameObject]
}

let _createCubeGameObject = (meta3dState: meta3dState, { scene }: engineWholeService) => {
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

let _addDefaultGameObjects = (meta3dState: meta3dState, engineWholeService: engineWholeService, canvasSize: canvasSize): [meta3dState, gameObject] => {
    let data = _createCameraGameObject(meta3dState, engineWholeService, canvasSize)
    meta3dState = data[0]
    let cameraGameObject = data[1]

    meta3dState = _createCubeGameObject(meta3dState, engineWholeService)

    return [meta3dState, cameraGameObject]
}

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let {
        mostService,
        uiService,
        engineWholeService,
        meta3dUIExtensionProtocolName,
        cameraGameObject,
    } = getState(states)

    return mostService.callFunc(() => {
        console.log("update job");

        let uiState = api.getExtensionState<uiState>(meta3dState, meta3dUIExtensionProtocolName)


        if (isNullable(cameraGameObject)) {
            let viewRect = getViewRect(uiService, uiState)

            if (!isNullable(viewRect)) {
                viewRect = getExn(viewRect)

                let canvasSize: canvasSize = [viewRect.width, viewRect.height]

                let data = _addDefaultGameObjects(meta3dState, engineWholeService, canvasSize)
                meta3dState = data[0]
                let cameraGameObject = data[1]


                return setStatesFunc<states>(
                    meta3dState,
                    setState(states,
                        {
                            ...getState(states),
                            cameraGameObject: cameraGameObject
                        }
                    )
                )
            }
        }

        return meta3dState
    })
}