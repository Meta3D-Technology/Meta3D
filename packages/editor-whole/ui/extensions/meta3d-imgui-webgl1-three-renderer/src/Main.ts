import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState } from "meta3d-type"
import { service } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { state } from "meta3d-imgui-renderer-protocol/src/state/StateType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { webgl1Context } from "meta3d-webgl1-protocol/src/service/ServiceType"

let _context: nullable<webgl1Context> = null

let _notImplement = () => {
    throw new Error("not implement")
}

export let getExtensionService: getExtensionServiceMeta3D<
    service
> = (api) => {
    return {
        init: (state, isInitEvent, isDebug, canvas) => {
            _context = canvas.getContext("webgl")

            return new Promise((resolve) => {
                resolve(state)
            })
        },
        beforeExec: (state, time) => {
            return state
        },
        afterExec: () => {
        },
        clear: (clearColor) => {
        },
        render: () => {
        },
        setStyle: (state, style) => {
            return state
        },
        beginWindow: (label) => {
            _notImplement()
        },
        endWindow: () => {
            _notImplement()
        },
        beginChild: (...params) => {
            return _notImplement()
        },
        endChild: (...params) => {
            return _notImplement()
        },
        setNextWindowRect: (rect) => {
            _notImplement()
        },
        addFBOTexture: (texture, { x, y, width, height }) => {
            _notImplement()
        },
        getWindowBarHeight: () => {
            return _notImplement()
        },
        button: (label, [width, height]) => {
            return _notImplement()
        },
        setCursorPos: ([x, y]) => {
            _notImplement()
        },
        loadImage: (...params) => {
            return _notImplement()
        },
        asset: (...params) => {
            return _notImplement()
        },
        handleDragDropTarget: (...params) => {
            return _notImplement()
        },
        menu: (...params) => {
            return _notImplement()
        },
        sceneTree: (...params) => {
            return _notImplement()
        },
        inspector: (...params) => {
            return _notImplement()
        },
        switchButton: (...params) => {
            return _notImplement()
        },
        getContext: () => {
            return _context
        },
    }
}

export let createExtensionState: createExtensionStateMeta3D<
    state
> = () => {
    return {
        isDebug: false,
        style: ""
    }
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionName) => {
    return {
        onRegister: (meta3dState, service) => {
            return meta3dState
        }
    }
}
