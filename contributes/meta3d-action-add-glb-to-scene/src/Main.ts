import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { clickUIData } from "meta3d-ui-control-button-protocol"
import { actionName, state } from "meta3d-action-add-glb-to-scene-protocol"
import { eventName, inputData } from "meta3d-action-add-glb-to-scene-protocol/src/EventType"
import { service as eventSourcingService } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
import { service as converterSceneViewService } from "meta3d-scenegraph-converter-three-sceneview-protocol/src/service/ServiceType"
import { service as converterGameViewService } from "meta3d-scenegraph-converter-three-gameview-protocol/src/service/ServiceType"
import { service as runEngineGameViewService } from "meta3d-editor-run-engine-gameview-protocol/src/service/ServiceType"
import { service as assetService } from "meta3d-asset-protocol/src/service/ServiceType"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"

export let getContribute: getContributeMeta3D<actionContribute<clickUIData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol")

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState) => {
                    let lastLoadedGLBAsset = api.getExtensionService<assetService>(meta3dState, "meta3d-asset-protocol").getAllGLBAssets(meta3dState).last()

                    if (isNullable(lastLoadedGLBAsset)) {
                        return Promise.resolve(meta3dState)
                    }

                    let [_, gltf] = getExn(lastLoadedGLBAsset)

                    meta3dState = api.getExtensionService<converterSceneViewService>(meta3dState, "meta3d-scenegraph-converter-three-sceneview-protocol").import(meta3dState, gltf.scene)
                    meta3dState = api.getExtensionService<converterGameViewService>(meta3dState, "meta3d-scenegraph-converter-three-gameview-protocol").import(meta3dState, gltf.scene)

                    return api.getExtensionService<runEngineGameViewService>(meta3dState, "meta3d-editor-run-engine-gameview-protocol").loopEngineWhenStop(meta3dState)
                }, (meta3dState) => {
                    // TODO implement

                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            return new Promise<meta3dState>((resolve, reject) => {
                let eventSourcingService = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol")

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    inputData: []
                }))
            })
        },
        createState: () => null
    }
}
