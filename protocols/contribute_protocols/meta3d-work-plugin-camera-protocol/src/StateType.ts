import { service as mostService } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { service as engineCoreService } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { extensionProtocolName } from "meta3d-type/src/Index"

export const workPluginName = "Camera"

export type state = {
    mostService: mostService,
    engineCoreService: engineCoreService,
    meta3dUIExtensionProtocolName: extensionProtocolName,
    isDebug: boolean
}

export type states = {
    [workPluginName]: state
}
