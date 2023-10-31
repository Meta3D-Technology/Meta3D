import { service as engineWholeService } from "meta3d-engine-whole-sceneview-protocol/src/service/ServiceType"
import { service as engineWholeGameViewService } from "meta3d-engine-whole-gameview-protocol/src/service/ServiceType"
import { state as meta3dState } from "meta3d-type"
import { gameObject } from "meta3d-gameobject-protocol/src/Index"
// import { basicCameraView } from "meta3d-component-basiccameraview-protocol"
// import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { arcballCameraController, distance, target } from "meta3d-component-arcballcameracontroller-protocol/src/Index"
// import { localPosition } from "meta3d-component-transform-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { bind } from "meta3d-commonlib-ts/src/NullableUtils"
import { createCubeGameObject } from "meta3d-primitive-utils/src/CubeUtils"
import { basicCameraView } from "meta3d-component-basiccameraview-protocol"

// type canvasSize = [number, number]

let _createCameraGameObject = (meta3dState: meta3dState, { scene }: engineWholeService,
    // canvasSize: canvasSize,
    distance: distance
): [meta3dState, basicCameraView, gameObject] => {
    let data = scene.gameObject.createGameObject(meta3dState)
    meta3dState = data[0]
    let gameObject = data[1]

    meta3dState = scene.gameObject.setGameObjectName(meta3dState, gameObject, "Camera")


    data = scene.transform.createTransform(meta3dState)
    meta3dState = data[0]
    let transform = data[1]

    meta3dState = scene.gameObject.addTransform(meta3dState, gameObject, transform)



    data = scene.basicCameraView.createBasicCameraView(meta3dState)
    meta3dState = data[0]
    let cameraView = data[1]

    // meta3dState = scene.basicCameraView.active(meta3dState, cameraView)
    meta3dState = scene.gameObject.addBasicCameraView(meta3dState, gameObject, cameraView)

    data = scene.perspectiveCameraProjection.createPerspectiveCameraProjection(meta3dState)
    meta3dState = data[0]
    let cameraProjection = data[1]

    meta3dState = scene.perspectiveCameraProjection.setFovy(meta3dState, cameraProjection, 30)
    // meta3dState = scene.perspectiveCameraProjection.setAspect(meta3dState, cameraProjection, canvasSize[0] / canvasSize[1])
    meta3dState = scene.perspectiveCameraProjection.setNear(meta3dState, cameraProjection, 1)
    meta3dState = scene.perspectiveCameraProjection.setFar(meta3dState, cameraProjection, 100)
    meta3dState = scene.gameObject.addPerspectiveCameraProjection(meta3dState, gameObject, cameraProjection)


    meta3dState = scene.transform.setLocalPosition(meta3dState, transform, [distance, distance, distance])
    meta3dState = scene.transform.lookAt(meta3dState, transform, [0, 1, 0])

    return [meta3dState, cameraView, gameObject]
}

// let _createCubeGameObject = (meta3dState: meta3dState, { scene }: engineWholeService) => {
//     createCubeGameObject()
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


//     // Create a cube
//     //    v6----- v5
//     //   /|      /|
//     //  v1------v0|
//     //  | |     | |
//     //  | |v7---|-|v4
//     //  |/      |/
//     //  v2------v3
//     let vertices = new Float32Array([   // Coordinates
//         1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, // v0-v1-v2-v3 front
//         1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, // v0-v3-v4-v5 right
//         1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, // v0-v5-v6-v1 up
//         -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, // v1-v6-v7-v2 left
//         -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0, // v7-v4-v3-v2 down
//         1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0  // v4-v7-v6-v5 back
//     ])
//     let normals = new Float32Array([    // Normal
//         0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,  // v0-v1-v2-v3 front
//         1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,  // v0-v3-v4-v5 right
//         0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,  // v0-v5-v6-v1 up
//         -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0,  // v1-v6-v7-v2 left
//         0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,  // v7-v4-v3-v2 down
//         0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0   // v4-v7-v6-v5 back
//     ])
//     let indices = new Uint32Array([
//         0, 1, 2, 0, 2, 3,    // front
//         4, 5, 6, 4, 6, 7,    // right
//         8, 9, 10, 8, 10, 11,    // up
//         12, 13, 14, 12, 14, 15,    // left
//         16, 17, 18, 16, 18, 19,    // down
//         20, 21, 22, 20, 22, 23     // back
//     ])

//     meta3dState = scene.geometry.setVertices(meta3dState, geometry, vertices)
//     meta3dState = scene.geometry.setNormals(meta3dState, geometry, normals)
//     meta3dState = scene.geometry.setIndices(meta3dState, geometry, indices)


//     meta3dState = scene.gameObject.addGeometry(meta3dState, gameObject, geometry)



//     data = scene.pbrMaterial.createPBRMaterial(meta3dState)
//     meta3dState = data[0]
//     let material = data[1]
//     meta3dState = scene.pbrMaterial.setDiffuseColor(meta3dState, material, [1.0, 0.0, 0.0])
//     meta3dState = scene.gameObject.addPBRMaterial(meta3dState, gameObject, material)



//     meta3dState = scene.transform.setLocalPosition(meta3dState, transform, [-2, 2, 0])


//     return meta3dState
// }

let _createDirectionLightGameObject = (meta3dState: meta3dState, { scene }: engineWholeService) => {
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
    meta3dState = scene.transform.lookAt(meta3dState, transform, [-0.2, -0.1, -1])
    // meta3dState = scene.transform.lookAt(meta3dState, transform, [0.2, 0.1, 1])



    meta3dState = scene.gameObject.addTransform(meta3dState, gameObject, transform)


    data = scene.directionLight.createDirectionLight(meta3dState)
    meta3dState = data[0]
    let directionLight = data[1]
    meta3dState = scene.directionLight.setColor(meta3dState, directionLight, [1.0, 1.0, 1.0])
    meta3dState = scene.directionLight.setIntensity(meta3dState, directionLight, 1)
    meta3dState = scene.gameObject.addDirectionLight(meta3dState, gameObject, directionLight)


    return meta3dState
}

let _createArcballCameraGameObject = (meta3dState: meta3dState, { scene }: engineWholeService,
    // eventService: eventService,
    // eventExtensionProtocolName: string,
    // canvasSize: canvasSize,
    distance: distance
): [meta3dState, arcballCameraController, gameObject] => {
    let data = scene.gameObject.createGameObject(meta3dState)
    meta3dState = data[0]
    let gameObject = data[1]

    meta3dState = scene.gameObject.setGameObjectName(meta3dState, gameObject, "Arcball Camera")

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
    // meta3dState = scene.perspectiveCameraProjection.setAspect(meta3dState, cameraProjection, canvasSize[0] / canvasSize[1])
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
    // canvasSize: canvasSize
): [meta3dState, basicCameraView, gameObject] => {
    let data = _createCameraGameObject(meta3dState, engineWholeService,
        // canvasSize,
        40
    )
    meta3dState = data[0]
    let cameraView = data[1]
    let cameraGameObject = data[2]


    // let data1 = _createArcballCameraGameObject(meta3dState, engineWholeService,
    //     // eventService, eventExtensionProtocolName,
    //     canvasSize,
    //     40
    // )
    // meta3dState = data1[0]
    // let cameraController = data1[1]
    // let cameraGameObject = data1[2]


    let data2 = createCubeGameObject(meta3dState, engineWholeService, [[-2, 2, 0], [1.0, 0.0, 0.0]])
    meta3dState = data2[0]




    //     meta3dState = scene.transform.setLocalPosition(meta3dState, transform, [-2, 2, 0])

    meta3dState = _createDirectionLightGameObject(meta3dState, engineWholeService)

    return [meta3dState, cameraView, cameraGameObject]
}


export let addGameObjectsForSceneView = (meta3dState: meta3dState, engineWholeService: engineWholeService,
    // eventService: eventService,
    // eventExtensionProtocolName: string,
    // canvasSize: canvasSize
): [meta3dState, arcballCameraController, gameObject] => {
    let data = _createArcballCameraGameObject(meta3dState, engineWholeService,
        // eventService, eventExtensionProtocolName,
        // canvasSize,
        30
    )
    meta3dState = data[0]
    let cameraController = data[1]
    let cameraGameObject = data[2]

    return [meta3dState, cameraController, cameraGameObject]
}

export let createUnUseGameObjectsForGameViewForUnifyGameObject = (meta3dState: meta3dState, engineWholeGameViewService: engineWholeGameViewService,
): meta3dState => {
    let data = engineWholeGameViewService.scene.gameObject.createUnUseGameObject(meta3dState)
    meta3dState = data[0]

    return meta3dState
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

let _getAllPerspectiveCameraProjections = (meta3dState: meta3dState,
    { scene }: engineWholeService,) => {
    return scene.gameObject.getAllGameObjects(meta3dState).filter(gameObject => {
        return scene.gameObject.hasPerspectiveCameraProjection(meta3dState, gameObject)
    }).map(gameObject => {
        return scene.gameObject.getPerspectiveCameraProjection(meta3dState, gameObject)
    })
}

export let updateAllCameraAspect = (meta3dState: meta3dState,
    engineWholeService: engineWholeService,
    width: number, height: number) => {
    let aspect = width / height

    return _getAllPerspectiveCameraProjections(meta3dState, engineWholeService).reduce((meta3dState, cameraProjection) => {
        return engineWholeService.scene.perspectiveCameraProjection.setAspect(meta3dState, cameraProjection, aspect)
    }, meta3dState)
}

// export let activeCameraForGameView = (meta3dState: meta3dState,
//     engineWholeGameViewService: engineWholeGameViewService) => {
//     return _activeFirstBasicCameraView(meta3dState, engineWholeGameViewService)
// }


// export let activeCameraForGameView = (meta3dState: meta3dState,
//     engineWholeGameViewService: engineWholeGameViewService,
//     arcballCameraGameObject: gameObject) => {
//     return activeCameraForSceneView(meta3dState, engineWholeGameViewService, arcballCameraGameObject)
// }