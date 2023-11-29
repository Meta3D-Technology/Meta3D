import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { events, eventSourcingService, eventDataService } from "meta3d-event-protocol/src/service/ServiceType"
import { uiData, actionName, state } from "meta3d-action-import-event-protocol"
import { eventName, inputData } from "meta3d-action-import-event-protocol/src/EventType"
import { importFile } from "meta3d-file-ts-utils/src/ImportFileUtils"
import { requireCheck, test } from "meta3d-ts-contract-utils"

let _checkOnlyHasImportEvent = (eventSourcingService: eventSourcingService, api: api, meta3dState: meta3dState) => {
    requireCheck(() => {
        test("should only has import event", () => {
            let allEvents = eventSourcingService.getAllEvents(meta3dState)

            return allEvents.count() == 1 && api.nullable.getExn(allEvents.last()).name == eventName
        })
    }, true)
}

let _parseEventData = (eventDataService: eventDataService, api: api, meta3dState: meta3dState, eventData: ArrayBuffer): events => {
    return api.immutable.createListOfData(meta3dState, eventDataService.parseEventData(eventData))
}

let _removeAllReadEvents = (events: events) => {
    return events.filter((event => {
        if (!!event.isOnlyRead) {
            return false
        }

        return true
    }))
}

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, eventData) => {
                    return new Promise((resolve, reject) => {
                        _checkOnlyHasImportEvent(eventSourcingService, api, meta3dState)

                        let events = _parseEventData(
                            api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventData(meta3dState),
                            api,
                            meta3dState,
                            eventData
                        )

                        events = _removeAllReadEvents(events)

                        meta3dState = eventSourcingService.setNeedReplaceAllEvents(meta3dState, events)

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
                        reject(new Error("文件后缀名应该是.arraybuffer"))
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
                }, () => {
                    resolve(meta3dState)
                })
            })
        },
        createState: () => null
    }
}
