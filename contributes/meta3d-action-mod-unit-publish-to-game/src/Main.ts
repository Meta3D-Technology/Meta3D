import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
// import { language } from "meta3d-action-mod-unit-add-careerfeature-protocol"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-mod-unit-publish-to-game-protocol"
import { eventName, inputData } from "meta3d-action-mod-unit-publish-to-game-protocol/src/EventType"
import { publish } from "meta3d-action-mod-unit-publish-utils/src/Main"


export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            // meta3dState = _initAuthor(api, meta3dState)

            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState) => {
                    // let characterType_ = api.action.getActionState<selectCharacterTypeState>(meta3dState, selectCharacterTypeActionName).characterType
                    // let features = api.action.getActionState<addCareerFeatureState>(meta3dState, addCareerFeatureActionName).allSelectedCareerFeatureData.filter(d => {
                    //     return _isCharacterTypeEqual(d.characterType, characterType_)
                    // })

                    // let assetIconBase64 = api.nullable.getWithDefault(
                    //     api.action.getActionState<loadModPreviewState>(meta3dState, loadModPreviewActionName).preview,
                    //     ""
                    // )
                    // let careerIconBase64 = api.nullable.getWithDefault(
                    //     api.action.getActionState<loadCareerPreviewState>(meta3dState, loadCareerPreviewActionName).preview,
                    //     ""
                    // )

                    // let isChinese = api.action.getActionState<languageState>(meta3dState, languageActionName).language == language.Chinese

                    // if (_check(api, api.action.getActionState<state>(meta3dState, actionName), isChinese, features)) {
                    //     return Promise.resolve(meta3dState)
                    // }

                    console.log("publish mod")


                    // meta3dState = api.action.setActionState<state>(meta3dState, actionName, {
                    //     ...api.action.getActionState<state>(meta3dState, actionName),
                    //     isShowModal: false
                    // })
                    // meta3dState = api.action.setActionState<infoState>(meta3dState, infoActionName, {
                    //     ...api.action.getActionState<infoState>(meta3dState, infoActionName),
                    //     info: isChinese ? api.nullable.return("正在发布中...") : api.nullable.return("Publishing...")
                    // })
                    api.flow.deferExec(api, (meta3dState) => {
                        let author =  "Official"
                        let name = `unit-test1`
                        return publish(api, meta3dState, name, author)
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
