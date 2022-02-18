// import { init as initMeta3D, registerExtension, unsafeGetExtensionService, unsafeGetExtensionState } from "meta3d"
// import { getService as getEngineCoreService, getProtocol as getEngineCoreProtocol } from "meta3d-engine-core"


// export function createGameObject() {
//     let { createGameObject } = unsafeGetExtensionService("meta3d-engine-core")

//     return createGameObject()
// }

// export async function init() {
//     let extensionState = initMeta3D()

//     let meta3DEngineCoreConfig = { isDebug: true }
//     registerExtension("meta3d-engine-core", getEngineCoreService(meta3DEngineCoreConfig), getEngineCoreProtocol())
//     registerExtension("meta3d-eventManager", ...)
//     registerExtension("meta3d-ui", ...)


//     registerExtension("meta3d-canvas", ...)

//     registerExtension("meta3d-component", ...)
//     registerExtension("meta3d-gameObject", ...)
//     registerExtension("meta3d-webgpu-render", ...)



//     let { trigger } = unsafeGetExtensionService("meta3d-eventManager")

//     await trigger("meta3d-active-extension", "all")
//     await trigger("meta3d-init")
// }


// export async function update() {
//     let { trigger } = unsafeGetExtensionService("meta3d-eventManager")

//     await trigger("meta3d-update")
// }


// export async function render() {
//     let { trigger } = unsafeGetExtensionService("meta3d-eventManager")

//     await trigger("meta3d-render")
// }