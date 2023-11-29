import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-load-glb-protocol"
import { eventName, inputData } from "meta3d-action-load-glb-protocol/src/EventType"
import { importFile } from "meta3d-file-ts-utils/src/ImportFileUtils"

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, glb, glbId, glbName) => {
                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))
                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        addedGLBIds: state.addedGLBIds.push(glbId)
                    })

                    meta3dState = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).asset(meta3dState).addGLBAsset(meta3dState, glb, glbId, glbName)

                    return Promise.resolve(meta3dState)
                }, (meta3dState) => {
                    let {
                        addedGLBIds
                    } = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    meta3dState = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).asset(meta3dState).removeGLBAsset(meta3dState, api.nullable.getExn(addedGLBIds.last()))

                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))
                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        addedGLBIds: state.addedGLBIds.pop()
                    })

                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            return new Promise<meta3dState>((resolve, reject) => {
                let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

                importFile((file: any, result: any) => {
                    if (!file.name.includes(".glb")) {
                        reject(new Error("文件后缀名应该是.glb"))
                    }

                    resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                        name: eventName,
                        inputData: [result as ArrayBuffer, eventSourcingService.generateOutsideImmutableDataId(meta3dState), file.name.slice(0, -4)]
                    }))
                }, (event: Event, file: any) => {
                    reject(new Error(`读取${file.name}错误`))
                }, (loaded: number, total: number) => {
                    // TODO show progress message
                    console.log(`loading ${loaded / total} %`)
                }, () => {
                    resolve(meta3dState)
                })
            })
        },
        createState: (meta3dState) => {
            return {
                addedGLBIds: api.immutable.createList(),
            }
        }
    }
}
