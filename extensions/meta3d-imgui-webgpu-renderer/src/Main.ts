import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, state as meta3dState } from "meta3d-type"
import { dependentExtensionProtocolNameMap, dependentContributeProtocolNameMap } from "./DependentMapType"
import { service } from "meta3d-imgui-renderer-protocol/src/service/ServiceType"
import { state } from "meta3d-imgui-renderer-protocol/src/state/StateType"
import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { context } from "meta3d-webgpu-protocol/src/service/ServiceType"
// import { service as webgpuService } from "meta3d-webgpu-protocol/src/service/ServiceType"

// TODO move to state
let _context: nullable<context> = null

let _notImplement = () => {
    throw new Error("not implement")
}

export let getExtensionService: getExtensionServiceMeta3D<
    dependentExtensionProtocolNameMap,
    dependentContributeProtocolNameMap,
    service
// > = (api, [{ meta3dWebGPUExtensionProtocolName }, _]) => {
> = (api, _) => {
    return {
        init: (state, isInitEvent, isDebug, canvas) => {
            _context = canvas.getContext("webgpu")

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
        style: "classic"
    }
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionName) => {
    return {
        onRegister: (meta3dState, service) => {
            return meta3dState
        }
    }
}
