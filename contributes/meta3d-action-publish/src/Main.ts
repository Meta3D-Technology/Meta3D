import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { uiData, actionName, state } from "meta3d-action-publish-protocol"
import { actionName as runActionName, state as runState } from "meta3d-action-run-protocol"
import { eventName, inputData } from "meta3d-action-publish-protocol/src/EventType"
import { getContent } from "meta3d-action-publish-utils/src/Main"

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState) => {
                    let editorWholeService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol"))

                    if (api.nullable.getWithDefault(api.nullable.map(runState => runState.isRun, api.action.getActionState<runState>(meta3dState, runActionName)), false)) {
                        console.warn("can't publish when run")

                        return (new Promise((resolve) => {
                            resolve(meta3dState)
                        }))
                    }

                    return getContent(api, meta3dState, "blob")
                        .then(content => {
                            let { filesave } = editorWholeService.lib(meta3dState)
                            let filesaveService = filesave(meta3dState)

                            // TODO get zipname from user
                            filesaveService.saveAs(content, "publish.zip")

                            return meta3dState
                        })
                }, (meta3dState) => {
                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            //console.log("publish")

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
