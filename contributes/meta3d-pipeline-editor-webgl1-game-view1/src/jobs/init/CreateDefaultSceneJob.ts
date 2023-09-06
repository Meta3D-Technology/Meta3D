import { execFunc as execFuncType } from "meta3d-engine-core-gameview-protocol/src/contribute/work/PipelineContributeType"
import { getState, setState } from "../Utils";
import { states } from "meta3d-pipeline-editor-webgl1-game-view1-protocol/src/StateType";
import { service as engineWholeService } from "meta3d-engine-whole-gameview-protocol/src/service/ServiceType"
import { state as meta3dState } from "meta3d-type"
import { gameObject } from "meta3d-gameobject-protocol/src/Index";
import { service as eventService } from "meta3d-event-protocol/src/service/ServiceType"
import { createCameraGameObject, createCubeGameObject } from "meta3d-pipeline-editor-webgl1-view1-utils/src/CreateDefaultSceneJobUtils"
import { basicCameraView } from "meta3d-component-basiccameraview-protocol";

type canvasSize = [number, number]

let _addDefaultGameObjects = (meta3dState: meta3dState, engineWholeService: engineWholeService,
    eventService: eventService,
    eventExtensionProtocolName: string,
    canvasSize: canvasSize
): [meta3dState, basicCameraView, gameObject] => {
    let data = createCameraGameObject(meta3dState, engineWholeService,
        canvasSize
    )
    meta3dState = data[0]
    let cameraView = data[1]
    let cameraGameObject = data[2]

    meta3dState = engineWholeService.scene.basicCameraView.active(meta3dState, cameraView)



    meta3dState = createCubeGameObject(meta3dState, engineWholeService)

    return [meta3dState, cameraView, cameraGameObject]
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