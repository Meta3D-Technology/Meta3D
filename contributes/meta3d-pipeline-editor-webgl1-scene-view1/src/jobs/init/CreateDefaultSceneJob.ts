import { execFunc as execFuncType } from "meta3d-engine-core-protocol/src/contribute/work/PipelineContributeType"
import { getState, setState } from "../Utils";
import { states } from "meta3d-pipeline-editor-webgl1-scene-view1-protocol/src/StateType";
import { service as engineWholeService } from "meta3d-engine-whole-protocol/src/service/ServiceType"
import { state as meta3dState } from "meta3d-type"
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { activeCameraForSceneView, addDefaultGameObjects, addGameObjectsForSceneView } from "meta3d-pipeline-editor-webgl1-view1-utils/src/CreateDefaultSceneJobUtils"

type canvasSize = [number, number]

let _addDefaultGameObjects = (meta3dState: meta3dState, engineWholeService: engineWholeService,
    eventService: eventService,
    eventExtensionProtocolName: string,
    canvasSize: canvasSize
): meta3dState => {
    let data = addDefaultGameObjects(meta3dState, engineWholeService, canvasSize)
    meta3dState = data[0]

    data = addGameObjectsForSceneView(meta3dState, engineWholeService,
        eventService, eventExtensionProtocolName,
        canvasSize)
    meta3dState = data[0]
    let cameraController = data[1]
    let cameraGameObject = data[2]


    meta3dState = activeCameraForSceneView(meta3dState, engineWholeService, cameraGameObject)

    return meta3dState
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


        meta3dState = _addDefaultGameObjects(meta3dState, engineWholeService,
            eventService,
            "meta3d-event-protocol",
            [canvas.width, canvas.height]
        )

        return meta3dState
    })
}