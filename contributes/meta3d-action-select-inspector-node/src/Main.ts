import { state as meta3dState, getContribute as getContributeMeta3D, api } from "meta3d-type"
import { actionContribute, service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
import { actionName, state, eventData } from "meta3d-action-select-inspector-node-protocol"
import { eventName, inputData, backwardEventName } from "meta3d-action-select-inspector-node-protocol/src/EventType"

export let getContribute: getContributeMeta3D<actionContribute<eventData, state>> = (api) => {
    return {
        actionName: actionName,
        init: (meta3dState) => {
            // let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            // return new Promise((resolve, reject) => {
            //     resolve(eventSourcingService.on<inputData>(meta3dState, eventName, 0, (meta3dState, nodeData) => {
            //         let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

            //         meta3dState = api.action.setActionState(meta3dState, actionName, {
            //             ...state,
            //             allSelectedNodeData: state.allSelectedNodeData.push(nodeData),
            //             selectedNodeData: nodeData,
            //         })

            //         return Promise.resolve(meta3dState)
            //     }, (meta3dState) => {
            //         let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

            //         if (api.nullable.isNullable(state.allSelectedNodeData.last())) {
            //             return Promise.resolve(meta3dState)
            //         }

            //         meta3dState = api.action.setActionState(meta3dState, actionName, {
            //             ...state,
            //             allSelectedNodeData: state.allSelectedNodeData.pop(),
            //             selectedNodeData: api.nullable.getExn(state.allSelectedNodeData.last())
            //         })

            //         return Promise.resolve(meta3dState)
            //     }))
            // })


            let { onCustomGlobalEvent2 } = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState)

            meta3dState = onCustomGlobalEvent2(meta3dState, "meta3d-event-protocol", [
                eventName,
                0,
                (meta3dState, { userData }) => {
                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    let nodeData = api.nullable.getExn(userData as any)

                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        allSelectedNodeData: state.allSelectedNodeData.push(nodeData),
                        selectedNodeData: nodeData,
                    })

                    return meta3dState
                }
            ])
            meta3dState = onCustomGlobalEvent2(meta3dState, "meta3d-event-protocol", [
                backwardEventName,
                0,
                (meta3dState) => {
                    let state = api.nullable.getExn(api.action.getActionState<state>(meta3dState, actionName))

                    if (api.nullable.isNullable(state.allSelectedNodeData.last())) {
                        return Promise.resolve(meta3dState)
                    }

                    meta3dState = api.action.setActionState(meta3dState, actionName, {
                        ...state,
                        allSelectedNodeData: state.allSelectedNodeData.pop(),
                        selectedNodeData: api.nullable.getExn(state.allSelectedNodeData.last())
                    })

                    return meta3dState
                }
            ])

            return Promise.resolve(meta3dState)
        },
        handler: (meta3dState, eventData) => {
            // return new Promise<meta3dState>((resolve, reject) => {
            //     let eventSourcingService = api.nullable.getExn(api.getPackageService<editorWholeService>(meta3dState, "meta3d-editor-whole-protocol")).event(meta3dState).eventSourcing(meta3dState)

            //     resolve(eventSourcingService.addEvent<inputData>(meta3dState, {
            //         name: eventName,
            //         inputData: [eventData]
            //     }))
            // })
            throw new Error("error")
        },
        createState: (meta3dState) => {
            return {
                selectedNodeData: null,
                allSelectedNodeData: api.immutable.createList()
            }
        }
    }
}
