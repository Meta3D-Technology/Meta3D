import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
// import { language } from "meta3d-action-mod-unit-add-careerfeature-protocol"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-mod-unit-quicktest-protocol"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { eventName, inputData } from "meta3d-action-mod-unit-quicktest-protocol/src/EventType"
import { publish, checkModData } from "meta3d-action-mod-unit-publish-utils/src/Main"
import { getLanguageTextData } from "meta3d-language-utils/src/Main"
import { languageKey } from "meta3d-language-utils/src/Type"

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState) => {
                    if (checkModData(api, [getLanguageTextData, languageKey], meta3dState, api.action.getActionState<initState>(meta3dState, initActionName))
                    ) {
                        return Promise.resolve(meta3dState)
                    }

                    api.flow.deferExec(api, (meta3dState) => {
                        let author = "tempUser"
                        let name = `temp_unit`
                        return publish(api, meta3dState, name, author,
                            "test1",
                            "test1",
                            "",
                            false,
                            ""
                        ).then(meta3dState => {
                            // TODO restore
                            // window.open("https://www.gts-play.cn?quicktest", "_blank")
                            window.open("http://localhost:8093/?quicktest", "_blank")

                            return meta3dState
                        })
                    })

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
        createState: () => {
            return null
        }
    }
}
