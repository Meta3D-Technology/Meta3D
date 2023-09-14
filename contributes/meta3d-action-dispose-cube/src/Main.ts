import { getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { service as engineWholeService } from "meta3d-engine-whole-sceneview-protocol/src/service/ServiceType"
import { service as engineWholeGameViewService } from "meta3d-engine-whole-gameview-protocol/src/service/ServiceType"
import { state as meta3dState } from "meta3d-type"
import { clickUIData } from "meta3d-ui-control-button-protocol"
import { actionName, state } from "meta3d-action-dispose-cube-protocol"
import { service as runEngineGameViewService } from "meta3d-editor-run-engine-gameview-protocol/src/service/ServiceType"

let _disposeCubeGameObject = (meta3dState: meta3dState, { scene }: engineWholeService) => {
    let gameObjects = scene.gameObject.getAllGameObjects(meta3dState).filter(gameObject => {
        return !scene.gameObject.hasBasicCameraView(meta3dState, gameObject)
    })

    if (gameObjects.length > 0) {
        meta3dState = scene.gameObject.disposeGameObjects(meta3dState, [gameObjects[0]])
    }

    return meta3dState
}

export let getContribute: getContributeMeta3D<actionContribute<clickUIData, state>> = (api) => {
    return {
        actionName: actionName,
        handler: (meta3dState, uiData) => {
            console.log("dispose cube")

            let engineWholeService = api.getExtensionService<engineWholeService>(meta3dState, "meta3d-engine-whole-sceneview-protocol")
            let engineWholeGameViewService = api.getExtensionService<engineWholeGameViewService>(meta3dState, "meta3d-engine-whole-gameview-protocol")

            meta3dState = _disposeCubeGameObject(meta3dState, engineWholeService)
            meta3dState = _disposeCubeGameObject(meta3dState, engineWholeGameViewService)

            return api.getExtensionService<runEngineGameViewService>(meta3dState, "meta3d-editor-run-engine-gameview-protocol").loopEngineWhenStop(meta3dState)
        },
        createState: () => null
    }
}
