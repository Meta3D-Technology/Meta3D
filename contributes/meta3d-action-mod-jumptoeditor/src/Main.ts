import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionName, state } from "meta3d-action-mod-jumptoeditor-protocol"
import { eventName, inputData } from "meta3d-action-mod-jumptoeditor-protocol/src/EventType"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { getUserName } from "meta3d-action-mod-unit-publish-utils/src/Main"
import { isChinese } from "meta3d-language-utils/src/Main"

export let getContribute: getContributeMeta3D<actionContribute<null, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, [editorName]) => {
                    window.open(`https://meta3d-local-9gacdhjl439cff76-1302358347.tcloudbaseapp.com/EnterApp?account=meta3d&appName=${editorName}${isChinese(api, meta3dState) ? "cn" : "en"}&username=${getUserName(api)}`, "_blank")

                    return Promise.resolve(meta3dState)
                }, (meta3dState) => {
                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData, actionParams) => {
            return new Promise<meta3dState>((resolve, reject) => {
                let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

                resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                    name: eventName,
                    isOnlyRead: true,
                    inputData: [actionParams]
                }))
            })

        },
        createState: () => null
    }
}
