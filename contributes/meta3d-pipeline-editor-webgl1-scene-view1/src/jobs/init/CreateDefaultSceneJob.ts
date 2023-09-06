import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { getState, setState } from "../Utils";
import { states } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/StateType";
import { service as engineWholeService } from "meta3d-engine-whole-protocol/src/service/ServiceType"
import { state as meta3dState } from "meta3d-type"
import { gameObject } from "meta3d-gameobject-protocol/src/Index";
import { bindEvent } from "meta3d-pipeline-utils/src/ArcballCameraControllerEventUtils";
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { arcballCameraController } from "meta3d-component-arcballcameracontroller-protocol/src/Index";
import { createCameraGameObject,createCubeGameObject } from "meta3d-pipeline-editor-webgl1-view1-utils/src/CreateDefaultSceneJobUtils"

type canvasSize = [number, number]

let _createArcballCameraGameObject = (meta3dState: meta3dState, { scene }: engineWholeService,
    eventService: eventService,
    eventExtensionProtocolName: string,
    canvasSize: canvasSize
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

    meta3dState = scene.arcballCameraController.setDistance(meta3dState, cameraController, 30)

    bindEvent(eventService, eventExtensionProtocolName)

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
    meta3dState = scene.perspectiveCameraProjection.setNear(meta3dState, cameraProjection, 1)
    meta3dState = scene.perspectiveCameraProjection.setFar(meta3dState, cameraProjection, 100)
    meta3dState = scene.gameObject.addPerspectiveCameraProjection(meta3dState, gameObject, cameraProjection)


    meta3dState = scene.transform.setLocalPosition(meta3dState, transform, [10, 10, 10])
    meta3dState = scene.transform.lookAt(meta3dState, transform, [0, 1, 0])

    console.log(scene.transform.getLocalPosition(meta3dState, transform))

    return [meta3dState, cameraController, gameObject]
}

let _addDefaultGameObjects = (meta3dState: meta3dState, engineWholeService: engineWholeService,
    eventService: eventService,
    eventExtensionProtocolName: string,
    canvasSize: canvasSize
): [meta3dState, arcballCameraController, gameObject] => {
    let data = createCameraGameObject(meta3dState, engineWholeService,
        canvasSize
    )
    meta3dState = data[0]


    data = _createArcballCameraGameObject(meta3dState, engineWholeService,
        eventService, eventExtensionProtocolName,
        canvasSize
    )
    meta3dState = data[0]
    let cameraController = data[1]
    let cameraGameObject = data[2]

    meta3dState = createCubeGameObject(meta3dState, engineWholeService)

    return [meta3dState, cameraController, cameraGameObject]
}

export let execFunc: execFuncType = (meta3dState, { api, getStatesFunc, setStatesFunc }) => {
    let states = getStatesFunc<states>(meta3dState)
    let {
        mostService,
        engineWholeService,
        eventService,
        canvas
    } = getState(states)

    return mostService.callFunc(() => {
        console.log("update job");


        let data = _addDefaultGameObjects(meta3dState, engineWholeService,
            eventService,
            "meta3d-event-protocol",
            [canvas.width, canvas.height]
        )
        meta3dState = data[0]

        return meta3dState
    })
}