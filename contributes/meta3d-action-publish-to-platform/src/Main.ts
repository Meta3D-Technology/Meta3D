import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { uiData, actionName, state } from "meta3d-action-publish-to-platform-protocol"
import { actionName as runActionName, state as runState } from "meta3d-action-run-protocol"
import { eventName, inputData } from "meta3d-action-publish-to-platform-protocol/src/EventType"
import { actionName as setAppNameActionName, state as setAppNameActionState } from "meta3d-action-set-appname-protocol"
import { actionName as loadAppPreviewActionName, state as loadAppPreviewActionState } from "meta3d-action-load-apppreview-protocol"
import { actionName as closeCurrentModalActionName } from "meta3d-action-close-current-modal-protocol"
import { nullable, strictNullable } from "meta3d-commonlib-ts/src/nullable"
import { message } from "meta3d-message-utils/src/Main"
import { readAccount, isAdmin } from "meta3d-user-utils"

let _isRecommend = (account: string) => {
    return isAdmin(account)
}

let _checkAndGetValues = (api: api, meta3dState: meta3dState): nullable<[string, string, string, string, boolean]> => {
    let setAppNameActionState = api.nullable.getExn(api.action.getActionState<setAppNameActionState>(meta3dState, setAppNameActionName))
    let loadAppPreviewActionState = api.nullable.getExn(api.action.getActionState<loadAppPreviewActionState>(meta3dState, loadAppPreviewActionName))

    if (api.nullable.isNullable(setAppNameActionState.appName)) {
        message(`name 不能为空`)

        return api.nullable.getEmpty()
    }

    let appName = api.nullable.getExn(setAppNameActionState.appName)
    let account = api.nullable.getExn(readAccount())
    let preview: strictNullable<string> = loadAppPreviewActionState.appPreview
    let isRecommend = _isRecommend(account)

    // TODO get description from action
    let description = ""

    return api.nullable.return(
        [
            appName, preview, description, account, isRecommend
        ]
    )
}

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState,) => {
                    let values = _checkAndGetValues(api, meta3dState)

                    if (api.nullable.isNullable(values)) {
                        return (new Promise((resolve) => {
                            resolve(meta3dState)
                        }))
                    }

                    let [appName, preview, description, account, isRecommend] = api.nullable.getExn(values)

                    if (api.nullable.getWithDefault(api.nullable.map(runState => runState.isRun, api.action.getActionState<runState>(meta3dState, runActionName)), false)) {
                        console.warn("can't publish when run")

                        return (new Promise((resolve) => {
                            resolve(meta3dState)
                        }))
                    }

                    return (new Promise((resolve, reject) => {
                        return api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).exportScene([(glb: ArrayBuffer) => {
                            resolve(glb)
                        }, (err) => {
                            throw err
                        }], meta3dState)
                    }) as Promise<ArrayBuffer>).then((sceneGLB) => {
                        return api.backend.publishFinalApp(
                            console.log,
                            sceneGLB,
                            appName,
                            account,
                            description,
                            preview,
                            isRecommend
                        ).then(() => {
                            let { trigger } = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState)

                            return trigger(meta3dState, "meta3d-event-protocol", closeCurrentModalActionName, null).then(meta3dState => [meta3dState, null])
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
