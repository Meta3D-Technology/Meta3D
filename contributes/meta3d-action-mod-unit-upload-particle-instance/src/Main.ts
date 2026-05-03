import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-mod-unit-upload-particle-instance-protocol"
import { eventName, glbName, glbData, inputData } from "meta3d-action-mod-unit-upload-particle-instance-protocol/src/EventType"
import { actionName as initActionName, state as initState } from "meta3d-action-mod-unit-init-protocol"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { importFile } from "meta3d-file-ts-utils/src/ImportFileUtils"
import { getLanguageTextData, getLanguageTextVariableData } from "meta3d-language-utils/src/Main"
import { languageKey, languageVariableKey } from "meta3d-language-utils/src/Type"

let _loadGLB = (api: api): Promise<[boolean, nullable<glbName>, nullable<glbData>]> => {
    return new Promise((resolve, reject) => {
        importFile((file: any, result: any) => {
            if (!file.name.includes(".glb")) {
                reject(new Error("文件后缀名应该是.glb"))
            }

            // resolve([true, api.nullable.return(file.name.slice(0, -3)), api.nullable.return(result as ArrayBuffer)])
            resolve([true, api.nullable.return(file.name), api.nullable.return(result as ArrayBuffer)])
        }, (event: Event, file: any) => {
            reject(new Error(`读取${file.name}错误`))
        }, (loaded: number, total: number) => {
            // TODO show progress message
            console.log(`loading ${loaded / total} %`)
        }, () => {
            resolve([false, api.nullable.getEmpty(), api.nullable.getEmpty()])
        })
    })
}

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, uiData, glbName, glbData, [selectedSkillObjectEmitterInstanceIndexFieldName]) => {
                    let initState = api.action.getActionState<initState>(meta3dState, initActionName)

                    if (glbData.byteLength > 0.5 * 1024 * 1024) {
                        api.message.warn(getLanguageTextVariableData(api, meta3dState, initState.languageTextDataByVariable, languageVariableKey.LimitFileSize)(0.5))
                        return Promise.resolve(meta3dState)
                    }


                    api.message.success(getLanguageTextData(api, meta3dState, initState.languageTextData, languageKey.Success))


                    let state = api.action.getActionState<state>(meta3dState, actionName)
                    meta3dState = api.action.setActionState<state>(meta3dState, actionName, {
                        ...state,
                        instances: state.instances.set(selectedSkillObjectEmitterInstanceIndexFieldName, api.nullable.return([glbName, glbData]))
                    })

                    meta3dState = api.action.setActionState<initState>(meta3dState, initActionName, {
                        ...initState,
                        [selectedSkillObjectEmitterInstanceIndexFieldName]: api.nullable.getEmpty()
                    })


                    return Promise.resolve(meta3dState)
                }, (meta3dState) => {
                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData, actionParams) => {
            return _loadGLB(api).then(([isSuccess, glbName, glbData]) => {
                if (!isSuccess) {
                    return meta3dState
                }

                return new Promise<meta3dState>((resolve, reject) => {
                    let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)


                    resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                        name: eventName,
                        isOnlyRead: true,
                        inputData: [
                            uiData,
                            glbName,
                            glbData,
                            actionParams
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
                instances: api.immutable.createMap()
            }
        }
    }
}
