import { getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { service as editorEngineWholeService } from "meta3d-editor-engine-whole-protocol/src/service/ServiceType"
import { state as meta3dState } from "meta3d-type"
import { actionData } from "meta3d-action-button-click-protocol"

let _disposeRandomCubeGameObject = (meta3dState: meta3dState, { scene }: editorEngineWholeService) => {
    let gameObjects = scene.gameObject.getAllGameObjects(meta3dState).filter(gameObject => {
        return !scene.gameObject.hasBasicCameraView(meta3dState, gameObject)
    })

    if (gameObjects.length > 0) {
        meta3dState = scene.gameObject.disposeGameObjects(meta3dState, [gameObjects[Math.floor(Math.random() * gameObjects.length)]])
    }

    return meta3dState
}

export let getContribute: getContributeMeta3D<actionContribute<actionData>> = (api) => {
    return {
        actionName: "DisposeCube",
        handler: (meta3dState, actionData) => {
            console.log("dispose cube")

            let editorEngineWholeService = api.getExtensionService<editorEngineWholeService>(meta3dState, "meta3d-editor-engine-whole-protocol")

            meta3dState = _disposeRandomCubeGameObject(meta3dState, editorEngineWholeService)

            return new Promise((resolve) => {
                resolve(meta3dState)
            })
        }
    }
}
