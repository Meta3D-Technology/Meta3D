import { service } from "meta3d-redo-undo-history-protocol/src/service/ServiceType"
import { state } from "meta3d-redo-undo-history-protocol/src/state/StateType"
import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D } from "meta3d-type"
import { Stack } from "immutable"
import { getExn, isNullable } from "meta3d-commonlib-ts/src/NullableUtils"

export let getExtensionService: getExtensionServiceMeta3D<service> = (api) => {
    return {
        push: (currentMeta3dState) => {
            let state = api.getExtensionState<state>(currentMeta3dState, "meta3d-redo-undo-history-protocol")

            return api.setExtensionState<state>(currentMeta3dState, "meta3d-redo-undo-history-protocol",
                {
                    ...state,
                    undoStack: state.undoStack.push(
                        api.deepCopy(currentMeta3dState)
                    ),
                    redoStack: Stack()
                }
            )
        },
        undo: (currentMeta3dState) => {
            let state = api.getExtensionState<state>(currentMeta3dState, "meta3d-redo-undo-history-protocol")


            let previousMeta3dState = state.undoStack.first()

            if (isNullable(previousMeta3dState)) {
                return currentMeta3dState
            }

            previousMeta3dState = getExn(previousMeta3dState)

            let undoStack = state.undoStack.pop()

            let redoStack = state.redoStack.push(
                api.deepCopy(currentMeta3dState)
            )


            let targetMeta3dState = api.restore(currentMeta3dState, previousMeta3dState)

            return api.setExtensionState<state>(targetMeta3dState, "meta3d-redo-undo-history-protocol",
                {
                    ...state,
                    undoStack,
                    redoStack
                }
            )
        },
        redo: (currentMeta3dState) => {
            let state = api.getExtensionState<state>(currentMeta3dState, "meta3d-redo-undo-history-protocol")


            let nextMeta3dState = state.redoStack.first()

            if (isNullable(nextMeta3dState)) {
                return currentMeta3dState
            }

            nextMeta3dState = getExn(nextMeta3dState)

            let redoStack = state.redoStack.pop()

            let undoStack = state.undoStack.push(
                api.deepCopy(currentMeta3dState)
            )


            let targetMeta3dState = api.restore(currentMeta3dState, nextMeta3dState)

            return api.setExtensionState<state>(targetMeta3dState, "meta3d-redo-undo-history-protocol",
                {
                    ...state,
                    undoStack,
                    redoStack
                }
            )

        }
    }
}

export let createExtensionState: createExtensionStateMeta3D<state> = () => {
    return {
        undoStack: Stack(),
        redoStack: Stack()
    }
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
    return {
    }
}
