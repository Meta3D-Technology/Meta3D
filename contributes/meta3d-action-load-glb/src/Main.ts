import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute } from "meta3d-event-protocol/src/contribute/ActionContributeType"
import { actionName, state } from "meta3d-action-load-glb-protocol"
import { eventName, inputData } from "meta3d-action-load-glb-protocol/src/EventType"
import { service as eventSourcingService } from "meta3d-event-sourcing-protocol/src/service/ServiceType"
// import { service as loadGLBService } from "meta3d-load-glb-protocol/src/service/ServiceType"
import { importFile } from "meta3d-file-ts-utils/src/ImportFileUtils"
import { getState, setState } from "./Utils"
import { service as assetService } from "meta3d-asset-protocol/src/service/ServiceType"
import { loadGlbUIData } from "meta3d-ui-control-asset-protocol"
import { List } from "immutable"
import { getActionState, setElementStateField } from "meta3d-ui-utils/src/ElementStateUtils"
import { getExn } from "meta3d-commonlib-ts/src/NullableUtils"

export let getContribute: getContributeMeta3D<actionContribute<loadGlbUIData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            let eventSourcingService = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol")

            return new Promise((resolve, reject) => {
                resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, glb, glbId, glbName) => {
                    // let { loadGlb } = api.getExtensionService<loadGLBService>(meta3dState, "meta3d-load-glb-protocol")

                    meta3dState = setElementStateField([
                        (elementState: any) => {
                            let state = getState(elementState)

                            return {
                                ...state,
                                addedGLBIds: state.addedGLBIds.push(glbId)
                            }
                        },
                        setState
                    ], meta3dState, api)

                    meta3dState = api.getExtensionService<assetService>(meta3dState, "meta3d-asset-protocol").addGLBAsset(meta3dState, glb, glbId, glbName)

                    return Promise.resolve(meta3dState)
                }, (meta3dState) => {
                    let {
                        addedGLBIds
                    } = getActionState<state>(meta3dState, api, actionName)

                    meta3dState = api.getExtensionService<assetService>(meta3dState, "meta3d-asset-protocol").removeGLBAsset(meta3dState, getExn(addedGLBIds.last()))

                    meta3dState = setElementStateField([
                        (elementState: any) => {
                            let state = getState(elementState)

                            return {
                                ...state,
                                addedGLBIds: state.addedGLBIds.pop()
                            }
                        },
                        setState
                    ], meta3dState, api)

                    return Promise.resolve(meta3dState)
                }))
            })
        },
        handler: (meta3dState, uiData) => {
            console.log("load glb")

            return new Promise<meta3dState>((resolve, reject) => {
                let eventSourcingService = api.getExtensionService<eventSourcingService>(meta3dState, "meta3d-event-sourcing-protocol")

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
        createState: () => {
            return {
                addedGLBIds: List(),
            }
        }
    }
}
