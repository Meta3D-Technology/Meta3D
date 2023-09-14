import { service as engineWholeService } from "meta3d-engine-whole-protocol/src/service/ServiceType"
import { service as engineWholeGameViewService } from "meta3d-engine-whole-gameview-protocol/src/service/ServiceType"
import { state as meta3dState } from "meta3d-type"
import { gameObject } from "meta3d-gameobject-protocol/src/Index";
// import { basicCameraView } from "meta3d-component-basiccameraview-protocol";
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { arcballCameraController, distance, target } from "meta3d-component-arcballcameracontroller-protocol/src/Index";
import { localPosition } from "meta3d-component-transform-protocol";
import { nullable } from "meta3d-commonlib-ts/src/nullable";
import { bind } from "meta3d-commonlib-ts/src/NullableUtils";

type canvasSize = [number, number]

// let _createCameraGameObject = (meta3dState: meta3dState, { scene }: engineWholeService,
//     canvasSize: canvasSize
// ): [meta3dState, basicCameraView, gameObject] => {
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

//     // meta3dState = scene.basicCameraView.active(meta3dState, cameraView)
//     meta3dState = scene.gameObject.addBasicCameraView(meta3dState, gameObject, cameraView)

//     data = scene.perspectiveCameraProjection.createPerspectiveCameraProjection(meta3dState)
//     meta3dState = data[0]
//     let cameraProjection = data[1]

//     meta3dState = scene.perspectiveCameraProjection.setFovy(meta3dState, cameraProjection, 30)
//     meta3dState = scene.perspectiveCameraProjection.setAspect(meta3dState, cameraProjection, canvasSize[0] / canvasSize[1])
//     meta3dState = scene.perspectiveCameraProjection.setNear(meta3dState, cameraProjection, 1)
//     meta3dState = scene.perspectiveCameraProjection.setFar(meta3dState, cameraProjection, 100)
//     meta3dState = scene.gameObject.addPerspectiveCameraProjection(meta3dState, gameObject, cameraProjection)


//     meta3dState = scene.transform.setLocalPosition(meta3dState, transform, [20, 20, 20])
//     meta3dState = scene.transform.lookAt(meta3dState, transform, [0, 1, 0])

//     return [meta3dState, cameraView, gameObject]
// }

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



    meta3dState = scene.transform.setLocalPosition(meta3dState, transform, [-2, 2, 0])


    return meta3dState
}

let _createArcballCameraGameObject = (meta3dState: meta3dState, { scene }: engineWholeService,
    // eventService: eventService,
    // eventExtensionProtocolName: string,
    canvasSize: canvasSize,
    distance: distance
): [meta3dState, arcballCameraController, gameObject] => {
    let data = scene.gameObject.createGameObject(meta3dState)
    meta3dState = data[0]
    let gameObject = data[1]


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

    // meta3dState = scene.basicCameraView.active(meta3dState, cameraView)
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

    return [meta3dState, cameraController, gameObject]
}

export let addDefaultGameObjects = <engineWholeService_ extends engineWholeService>(meta3dState: meta3dState, engineWholeService: engineWholeService_,
    // eventService: eventService,
    // eventExtensionProtocolName: string,
    canvasSize: canvasSize
): [meta3dState, arcballCameraController, gameObject] => {
    // let data = _createCameraGameObject(meta3dState, engineWholeService,
    //     canvasSize
    // )
    // meta3dState = data[0]
    // let cameraView = data[1]
    // let cameraGameObject = data[2]


    let data = _createArcballCameraGameObject(meta3dState, engineWholeService,
        // eventService, eventExtensionProtocolName,
        canvasSize,
        40
    )
    meta3dState = data[0]
    let cameraController = data[1]
    let cameraGameObject = data[2]


    meta3dState = _createCubeGameObject(meta3dState, engineWholeService)

    return [meta3dState, cameraController, cameraGameObject]
}


export let addGameObjectsForSceneView = (meta3dState: meta3dState, engineWholeService: engineWholeService,
    // eventService: eventService,
    // eventExtensionProtocolName: string,
    canvasSize: canvasSize
): [meta3dState, arcballCameraController, gameObject] => {
    let data = _createArcballCameraGameObject(meta3dState, engineWholeService,
        // eventService, eventExtensionProtocolName,
        canvasSize,
        30
    )
    meta3dState = data[0]
    let cameraController = data[1]
    let cameraGameObject = data[2]

    return [meta3dState, cameraController, cameraGameObject]
}

export let getActiveArcballCameraController = (meta3dState: meta3dState,
    { scene }: engineWholeService | engineWholeGameViewService,
    isDebug: boolean
): nullable<arcballCameraController> => {
    return bind((basicCameraView) => {
        let gameObject = scene.basicCameraView.getGameObjects(meta3dState, basicCameraView)[0]

        if (scene.gameObject.hasArcballCameraController(meta3dState, gameObject)) {
            return scene.gameObject.getArcballCameraController(meta3dState, gameObject)
        }

        return null
    }, scene.basicCameraView.getActiveCameraView(meta3dState, isDebug))
}

export let activeCameraForSceneView = (meta3dState: meta3dState,
    { scene }: engineWholeService,
    arcballCameraGameObject: gameObject) => {
    return scene.basicCameraView.active(meta3dState,
        scene.gameObject.getBasicCameraView(meta3dState, arcballCameraGameObject)
    )
}

// export let activeCameraForGameView = (meta3dState: meta3dState,
//     engineWholeGameViewService: engineWholeGameViewService) => {
//     return _activeFirstBasicCameraView(meta3dState, engineWholeGameViewService)
// }


export let activeCameraForGameView = (meta3dState: meta3dState,
    engineWholeGameViewService: engineWholeGameViewService,
    arcballCameraGameObject: gameObject) => {
    return activeCameraForSceneView(meta3dState, engineWholeGameViewService, arcballCameraGameObject)
}