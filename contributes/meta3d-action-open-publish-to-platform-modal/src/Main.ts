import { state as meta3dState, api, getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-open-publish-to-platform-modal-protocol"
import { actionName as closeCurrentModalActionName, state as closeCurrentModalActionState } from "meta3d-action-close-current-modal-protocol"
import { actionName as setAppNameActionName, state as setAppNameActionState } from "meta3d-action-set-appname-protocol"
import { actionName as loadAppPreviewActionName, state as loadAppPreviewActionState } from "meta3d-action-load-apppreview-protocol"
import { eventName, inputData } from "meta3d-action-open-publish-to-platform-modal-protocol/src/EventType"

let _getPublishToPlatformModalLabel = () => "发布到平台模态框"

let _resetValues = (api: api, meta3dState: meta3dState) => {
    let setAppNameActionState = api.nullable.getExn(api.action.getActionState<setAppNameActionState>(meta3dState, setAppNameActionName))
    meta3dState = api.action.setActionState(meta3dState, setAppNameActionName, {
        ...setAppNameActionState,
        appName: null
    })

    let loadAppPreviewActionState = api.nullable.getExn(api.action.getActionState<loadAppPreviewActionState>(meta3dState, loadAppPreviewActionName))
    meta3dState = api.action.setActionState(meta3dState, loadAppPreviewActionName, {
        ...loadAppPreviewActionState,
        appPreview: null
    })

    return meta3dState
}

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, label) => {
                    let editorWholeService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))

                    meta3dState = _resetValues(api, meta3dState)

                    meta3dState = editorWholeService.ui(meta3dState).openModal(meta3dState, label)

                    let state = api.nullable.getExn(api.action.getActionState<closeCurrentModalActionState>(meta3dState, closeCurrentModalActionName))
                    meta3dState = api.action.setActionState(meta3dState, closeCurrentModalActionName, {
                        ...state,
                        allModalLabels: state.allModalLabels.push(label),
                    })

                    return Promise.resolve(meta3dState)
                }, (meta3dState) => {
                    let editorWholeService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))

                    meta3dState = editorWholeService.ui(meta3dState).closeCurrentModal(meta3dState)

                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            return new Promise<meta3dState>((resolve, reject) => {
                let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    inputData: [
                        _getPublishToPlatformModalLabel()
                    ]
                }))
            })
        },
        createState: (meta3dState) => {
            return null
        }
    }
}
