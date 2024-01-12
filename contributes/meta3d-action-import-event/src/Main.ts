import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { events, eventSourcingService, eventDataService } from "meta3d-event-protocol/src/service/ServiceType"
import { uiData, actionName, state } from "meta3d-action-import-event-protocol"
import { eventName, inputData } from "meta3d-action-import-event-protocol/src/EventType"
import { importFile } from "meta3d-file-ts-utils/src/ImportFileUtils"
// import { requireCheck, test } from "meta3d-ts-contract-utils"
// import { service as engineSceneService } from "meta3d-engine-scene-protocol/src/service/ServiceType"
// import { service as renderService } from "meta3d-editor-sceneview-render-protocol/src/service/ServiceType"
// import { activeFirstBasicCameraView } from "meta3d-load-scene-utils/src/Main"
// import { addDefaultGameObjects, addGameObjectsForSceneView } from "meta3d-pipeline-webgl1-three-utils/src/CreateDefaultSceneJobUtils"
import { message } from "meta3d-message-utils/src/Main"

// let _checkOnlyHasImportEvent = (eventSourcingService: eventSourcingService, api: api, meta3dState: meta3dState) => {
//     requireCheck(() => {
//         test("should only has import event", () => {
//             let allEvents = eventSourcingService.getAllEvents(meta3dState)

//             return allEvents.count() == 1 && api.nullable.getExn(allEvents.last()).name == eventName
//         })
//     }, true)
// }

let _isOnlyHasImportEvent = (eventSourcingService: eventSourcingService, api: api, meta3dState: meta3dState) => {
    let allEvents = eventSourcingService.getAllEvents(meta3dState)

    return allEvents.count() == 1 && api.nullable.getExn(allEvents.last()).name == eventName
}

let _parseEventData = (eventDataService: eventDataService, api: api, eventData: ArrayBuffer): events => {
    return api.immutable.createListOfData(eventDataService.parseEventData(eventData))
}

let _removeAllReadEvents = (events: events) => {
    return events.filter((event => {
        if (!!event.isOnlyRead) {
            return false
        }

        return true
    }))
}

// let _resetScene = (
//     api: api,
//     editorWholeService: editorWholeService,
//     meta3dState: meta3dState,
// ) => {
//     meta3dState = editorWholeService.cleanScene(meta3dState)

//     let engineSceneService = api.nullable.getExn(api.getPackageService<engineSceneService>(meta3dState, "meta3d-engine-scene-protocol"))

//     let data1 = addDefaultGameObjects(meta3dState, engineSceneService)
//     meta3dState = data1[0]

//     meta3dState = activeFirstBasicCameraView(meta3dState, engineSceneService)

//     let data2 = addGameObjectsForSceneView(meta3dState, engineSceneService)
//     meta3dState = data2[0]
//     let cameraGameObject = data2[2]



//     let { setArcballCameraControllerGameObject } = api.nullable.getExn(api.getPackageService<renderService>(meta3dState, "meta3d-editor-sceneview-render-protocol"))

//     meta3dState = setArcballCameraControllerGameObject(meta3dState, cameraGameObject)


//     return meta3dState
// }

let _error = (reject: any, message: string) => {
    reject(new Error(message))
}

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, eventData) => {
                    return new Promise((resolve, reject) => {
                        // _checkOnlyHasImportEvent(eventSourcingService, api, meta3dState)

                        if (!_isOnlyHasImportEvent(eventSourcingService, api, meta3dState)) {
                            message("请刷新后再导入，不要进行任何的其它操作！")

                            resolve(meta3dState)
                            return
                        }

                        let editorWholeService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))

                        let events = _parseEventData(
                            editorWholeService.event(meta3dState).eventData(meta3dState),
                            api,
                            eventData
                        )

                        events = _removeAllReadEvents(events)

                        meta3dState = eventSourcingService.setNeedReplaceAllEvents(meta3dState, events)

                        // meta3dState = _resetScene(
                        //     api,
                        //     editorWholeService,
                        //     meta3dState,
                        // )

                        resolve(meta3dState)

                    })
                }, (meta3dState) => {
                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            return new Promise<meta3dState>((resolve, reject) => {
                let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

                importFile((file: any, result: any) => {
                    if (!file.name.includes(".arraybuffer")) {
                        return _error(reject, "文件后缀名应该是.arraybuffer")
                    }

                    resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                        name: eventName,
                        inputData: [result as ArrayBuffer]
                    }))
                }, (event: Event, file: any) => {
                    return _error(reject, `读取${file.name}错误`)
                }, (loaded: number, total: number) => {
                    // TODO show progress message
                    console.log(`loading ${loaded / total} %`)
                }, () => {
                    resolve(meta3dState)
                })
            })
        },
        createState: () => null
    }
}
