import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
// import { state as editorWholeState } from "meta3d-editor-whole-protocol/src/state/StateType"
import { uiData, actionName, state } from "meta3d-action-publish-to-platform-protocol"
import { actionName as runActionName, state as runState } from "meta3d-action-run-protocol"
import { eventName, inputData } from "meta3d-action-publish-to-platform-protocol/src/EventType"
import { getContent } from "meta3d-action-publish-utils/src/Main"
import { getSingleEventAllEvents } from "meta3d-action-export-single-event-utils/src/Main"
import { publishFinalApp } from "backend-cloudbase"
import { strictNullable } from "meta3d-commonlib-ts/src/nullable"

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState,) => {
                    // TODO get appName, account, description, previewBase64, isRecommend from uiData(Modal) and env

                    let appName = "test1"
                    let account = "meta3d"
                    let description = "t1"
                    let previewBase64: strictNullable<string> = null
                    let isRecommend = true
                    // let { env } = api.getExtensionState<editorWholeState>(meta3dState, "meta3d-editor-whole-protocol")

                    let editorWholeService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))

                    if (api.nullable.getWithDefault(api.nullable.map(runState => runState.isRun, api.action.getActionState<runState>(meta3dState, runActionName)), false)) {
                        console.warn("can't publish when run")

                        return (new Promise((resolve) => {
                            resolve(meta3dState)
                        }))
                    }

                    return getContent(api, meta3dState, "arraybuffer")
                        .then(contentArrayBuffer => {
                            return getSingleEventAllEvents(api, meta3dState).then(allEvents => {
                                let singleEventDataBuffer = editorWholeService.event(meta3dState).eventData(meta3dState).generateEventDataBuffer(allEvents as any)

                                return [contentArrayBuffer, singleEventDataBuffer]
                            })
                        }).then(([contentArrayBuffer, singleEventDataBuffer]) => {
                            return api.backend.publishFinalApp(
                                console.log,
                                contentArrayBuffer,
                                singleEventDataBuffer,
                                appName,
                                account,
                                description,
                                previewBase64,
                                isRecommend
                            ).then(() => {
                                return meta3dState
                            })
                        })
                }, (meta3dState) => {
                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            return new Promise<meta3dState>((resolve, reject) => {
                let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    isOnlyRead: true,
                    inputData: []
                }))
            })
        },
        createState: () => null
    }
}
