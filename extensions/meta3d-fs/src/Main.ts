import { dependentExtensionNameMap } from "meta3d-fs-protocol/src/service/DependentExtensionType"
import { service } from "meta3d-fs-protocol/src/service/ServiceType"
import { state } from "meta3d-fs-protocol/src/state/StateType"
import { createExtensionState as createExtensionStateMeta3D, getExtensionService as getExtensionServiceMeta3D } from "meta3d-type/src/Index"
import fs from "fs"
import path from "path"

export let getExtensionService: getExtensionServiceMeta3D<dependentExtensionNameMap, service> = (_api, _dependentExtensionNameMap) => {
    return {
        joinRootPath: (p) => {
            return path.join(process.cwd(), p)
        },
        readFileSync: (path, encode) => {
            return fs.readFileSync(path, encode)
        },
    }
}

export let createExtensionState: createExtensionStateMeta3D<state> = () => {
    return {}
}
