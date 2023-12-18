import { service } from "meta3d-jszip-protocol/src/service/ServiceType"
import { state } from "meta3d-jszip-protocol/src/state/StateType"
import { state as meta3dState, getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, api } from "meta3d-type"
import * as JSZip from "jszip"

export let getExtensionService: getExtensionServiceMeta3D<service> = (api) => {
    return {
        createZip: () => {
            return new JSZip.default() as JSZip
        },
        file: (zip, filePath, file, option = undefined) => {
            return zip.file(filePath, file, option)
        },
        generateAsync: (zip, option) => {
            return zip.generateAsync(option)
        }
    }
}

export let createExtensionState: createExtensionStateMeta3D<state> = () => {
    return null
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
    return {
    }
}

