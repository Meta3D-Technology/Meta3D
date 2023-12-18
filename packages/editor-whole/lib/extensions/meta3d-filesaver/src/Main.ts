import { service } from "meta3d-filesaver-protocol/src/service/ServiceType"
import { state } from "meta3d-filesaver-protocol/src/state/StateType"
import { state as meta3dState, getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getLifeMeta3D, api } from "meta3d-type"
import { saveAs } from "file-saver";

export let getExtensionService: getExtensionServiceMeta3D<service> = (api) => {
    return {
        saveAs: (content, name) => {
            saveAs(content, name)
        },
    }
}

export let createExtensionState: createExtensionStateMeta3D<state> = () => {
    return null
}

export let getExtensionLife: getLifeMeta3D<service> = (api, extensionProtocolName) => {
    return {
    }
}
