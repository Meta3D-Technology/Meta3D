import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, uiData } from "meta3d-action-load-apppreview-protocol"
import { eventName, inputData, imageBase64 } from "meta3d-action-load-apppreview-protocol/src/EventType"
import { importImage } from "meta3d-file-ts-utils/src/ImportFileUtils"

export let getContribute: getContributeMeta3D<actionContribute<uiData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, imageBase64) => {
                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))
                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        appPreview: api.nullable.return(imageBase64)
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

                importImage((image: any, result: any) => {
                    if (!(image.name.includes(".png") || image.name.includes(".jpg") || image.name.includes(".jpeg"))) {
                        reject(new Error("文件后缀名应该是.png或者.jpg或者.jpeg"))
                    }

                    resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
                        name: eventName,
                        isOnlyRead: true,
                        inputData: [result as imageBase64]
                    }))
                }, (event: Event, image: any) => {
                    reject(new Error(`读取${image.name}错误`))
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
                appPreview: null
            }
        }
    }
}
