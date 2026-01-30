import { state as meta3dState, getContribute as getContributeMeta3D } from "meta3d-type"
import { language } from "meta3d-action-mod-career-add-careerfeature-protocol"
import { actionName, state } from "meta3d-action-mod-jumptocareereditor-protocol"
import { eventName, inputData } from "meta3d-action-mod-jumptocareereditor-protocol/src/EventType"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName as languageActionName, state as languageState } from "meta3d-action-mod-language-protocol"

export let getContribute: getContributeMeta3D<actionContribute<null, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState) => {
                    let isChinese = api.action.getActionState<languageState>(meta3dState, languageActionName).language == language.Chinese

                    window.open(`https://meta3d-local-9gacdhjl439cff76-1302358347.tcloudbaseapp.com/EnterApp?account=meta3d&appName=模组${isChinese ? "cn" : "en"}`, "_blank")

                    return Promise.resolve(meta3dState)
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
