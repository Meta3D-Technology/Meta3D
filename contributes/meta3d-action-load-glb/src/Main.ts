import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { clickUIData } from "meta3d-ui-control-button-protocol"
import { actionName, state } from "meta3d-action-load-glb-protocol"
import { eventName, inputData } from "meta3d-action-load-glb-protocol/src/EventType"
import { service as eventSourcingService } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
// import { events } from "meta3d-event-sourcing-protocol/src/state/StateType"
// import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"
// // import { List } from "immutable"
// import { service as eventDataService } from "meta3d-event-data-protocol/src/service/ServiceType"
import { service as loadGLBService } from "meta3d-load-glb-protocol/src/service/ServiceType"
import { importFile } from "meta3d-file-ts-utils/src/ImportFileUtils"
import { service as converterSceneViewService } from "meta3d-scenegraph-converter-three-sceneview-protocol/src/service/ServiceType"
import { service as converterGameViewService } from "meta3d-scenegraph-converter-three-gameview-protocol/src/service/ServiceType"

export let getContribute: getContributeMeta3D<actionContribute<clickUIData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol")

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, glb) => {
                    let { loadGlb } = api.getExtensionService<loadGLBService>(meta3dState, "meta3d-load-glb-protocol")

                    return loadGlb(meta3dState, glb)
                        .then((gltf) => {
                            meta3dState = api.getExtensionService<converterSceneViewService>(meta3dState, "meta3d-scenegraph-converter-three-sceneview-protocol").import(meta3dState, gltf.scene)
                            meta3dState = api.getExtensionService<converterGameViewService>(meta3dState, "meta3d-scenegraph-converter-three-gameview-protocol").import(meta3dState, gltf.scene)

                            return meta3dState
                        })


                    // TODO handle outside

                }, (meta3dState) => {
                    // TODO handle outside

                    // TODO implement

                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            console.log("load glb")

            return new Promise<meta3dState>((resolve, reject) => {
                let eventSourcingService = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol")

                importFile((file: any, result: any) => {
                    if (!file.name.includes(".glb")) {
                        reject(new Error("文件后缀名应该是.glb"))
                    }

                    resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                        name: eventName,
                        inputData: [result as ArrayBuffer]
                    }))
                }, (event: Event, file: any) => {
                    reject(new Error(`读取${file.name}错误`))
                }, (loaded: number, total: number) => {
                    // TODO show progress message
                    console.log(`loading ${loaded / total} %`)
                })
            })
        },
        createState: () => null
    }
}
