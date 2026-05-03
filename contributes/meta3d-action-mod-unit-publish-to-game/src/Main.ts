import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
// import { language } from "meta3d-action-mod-unit-add-careerfeature-protocol"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-mod-unit-publish-to-game-protocol"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { actionName as uploadModelFileActionName, state as uploadModelFileState } from "meta3d-action-mod-unit-upload-model-file-protocol"
import { actionName as uploadModelSnapshotActionName, state as uploadModelSnapshotState } from "meta3d-action-mod-unit-upload-model-snapshot-protocol"
import { actionName as infoActionName, state as infoState } from "meta3d-action-mod-career-info-protocol"
import { eventName, inputData } from "meta3d-action-mod-unit-publish-to-game-protocol/src/EventType"
import { publish, getUserName, checkModData, buildUniqueName } from "meta3d-action-mod-unit-publish-utils/src/Main"
import { getLanguageTextData, isChinese } from "meta3d-language-utils/src/Main"
import { languageKey } from "meta3d-language-utils/src/Type"

let _checkPublishData = (api: api, meta3dState: meta3dState, { selectedModelIndex, languageTextData, displayNameCN, displayNameEN, description, modIconBase64 }: initState, isChinese: boolean) => {
    let message = api.nullable.getEmpty<string>()

    if (isChinese && displayNameCN.length <= 0) {
        message = api.nullable.return(getLanguageTextData(api, meta3dState, languageTextData, languageKey.NeedDisplayNameCN))
    }
    else if (!isChinese && displayNameEN.length <= 0) {
        message = api.nullable.return(getLanguageTextData(api, meta3dState, languageTextData, languageKey.NeedDisplayNameEN))
    }
    else if (description.length <= 0) {
        message = api.nullable.return(getLanguageTextData(api, meta3dState, languageTextData, languageKey.NeedDescription))
    }
    // else if (api.nullable.isNullable(modIconBase64)) {
    //     message = api.nullable.return(getLanguageTextData(api, meta3dState, languageTextData, languageKey.NeedModIcon))
    // }

    if (api.nullable.isNullable(selectedModelIndex)) {
        let uploadModelFileState = api.action.getActionState<uploadModelFileState>(meta3dState, uploadModelFileActionName)
        let uploadModelSnapshotState = api.action.getActionState<uploadModelSnapshotState>(meta3dState, uploadModelSnapshotActionName)

        if (!(
            uploadModelFileState.files.has("lod1") && uploadModelFileState.files.has("lod2")
            && !api.nullable.isNullable(uploadModelSnapshotState.snapshot)
        )
        ) {
            message = api.nullable.return(getLanguageTextData(api, meta3dState, languageTextData, languageKey.NeedLOD1LOD2SnapshotModelFile))
        }
    }

    return api.nullable.getWithDefault(
        api.nullable.map((message) => {
            api.message.warn(message)
            return true
        }, message),
        false
    )
}

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            // meta3dState = _initAuthor(api, meta3dState)

            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState) => {
                    console.log("publish mod")

                    if (_checkPublishData(api, meta3dState, api.action.getActionState<initState>(meta3dState, initActionName), isChinese(api, meta3dState))
                        || checkModData(api, [getLanguageTextData, languageKey], meta3dState, api.action.getActionState<initState>(meta3dState, initActionName), false)
                    ) {
                        return Promise.resolve(meta3dState)
                    }

                    meta3dState = api.action.setActionState<infoState>(meta3dState, infoActionName, {
                        ...api.action.getActionState<infoState>(meta3dState, infoActionName),
                        info: api.nullable.return(getLanguageTextData(api, meta3dState, api.action.getActionState<initState>(meta3dState, initActionName).languageTextData, languageKey.Publishing))
                    })

                    api.flow.deferExec(api, (meta3dState) => {
                        let initState = api.action.getActionState<initState>(meta3dState, initActionName)

                        meta3dState = api.action.setActionState<initState>(meta3dState, initActionName, {
                            ...api.action.getActionState<initState>(meta3dState, initActionName),
                            isShowPublishModal: false
                        })

                        let author = getUserName(api)
                        return publish(api,
                            meta3dState,
                            buildUniqueName(author, initState.displayNameCN, initState.displayNameEN, isChinese(api, meta3dState)),
                            author,
                            initState.displayNameCN,
                            initState.displayNameEN,
                            initState.description,
                            initState.isPublic,
                            api.nullable.getWithDefault(initState.modIconBase64, "")
                        ).then(meta3dState => {
                            meta3dState = api.action.setActionState<infoState>(meta3dState, infoActionName, {
                                ...api.action.getActionState<infoState>(meta3dState, infoActionName),
                                info: api.nullable.getEmpty()
                            })

                            api.message.success(getLanguageTextData(api, meta3dState, initState.languageTextData, languageKey.Success))

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
