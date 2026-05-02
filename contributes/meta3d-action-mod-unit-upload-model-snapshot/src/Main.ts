import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData, base64 } from "meta3d-action-mod-unit-upload-model-snapshot-protocol"
import { eventName, inputData } from "meta3d-action-mod-unit-upload-model-snapshot-protocol/src/EventType"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { importImage } from "meta3d-file-ts-utils/src/ImportFileUtils"
import { getLanguageTextData, getLanguageTextVariableData } from "meta3d-language-utils/src/Main"
import { languageKey, languageVariableKey } from "meta3d-language-utils/src/Type"

let _loadSnapshot = (api: api): Promise<base64> => {
    return new Promise((resolve, reject) => {
        importImage((image: any, result: any) => {
            if (!(image.name.includes(".png") || image.name.includes(".jpg") || image.name.includes(".jpeg"))) {
                reject(new Error("文件后缀名应该是.png或者.jpg或者.jpeg"))
            }

            resolve(api.nullable.return(result))
        }, (event: any, image: any) => {
            reject(new Error(`读取${image.name}错误：${event.target?.error.message}`))
        }, (loaded: number, total: number) => {
            // TODO show progress message
            console.log(`loading ${loaded / total} %`)
        }, () => {
            resolve(api.nullable.getEmpty())
        }, 1 * 1024 * 1024)
    })
}

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, uiData, snapshot) => {
                    let initState = api.action.getActionState<initState>(meta3dState, initActionName)

                    api.message.success(getLanguageTextData(api, meta3dState, initState.languageTextData, languageKey.Success))


                    let state = api.action.getActionState<state>(meta3dState, actionName)
                    meta3dState = api.action.setActionState<state>(meta3dState, actionName, {
                        ...state,
                        snapshot: api.nullable.return(snapshot),
                    })

                    return Promise.resolve(meta3dState)
                }, (meta3dState) => {
                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            return _loadSnapshot(api).then((snapshot) => {
                if (!snapshot) {
                    return meta3dState
                }

                return new Promise<meta3dState>((resolve, reject) => {
                    let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

                    resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                        name: eventName,
                        isOnlyRead: true,
                        inputData: [
                            uiData,
                            snapshot
                        ]
                    }))
                })
            }).catch((error) => {
                api.message.error(error)
                return meta3dState
            })

        },
        createState: () => {
            return {
                snapshot: api.nullable.getEmpty(),
            }
        }
    }
}
