import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D } from "meta3d-type"
import { service } from "meta3d-bs-most-protocol/src/service/ServiceType"
import { dependentExtensionNameMap } from "meta3d-bs-most-protocol/src/service/DependentExtensionType"
import { state } from "meta3d-bs-most-protocol/src/state/StateType"

export let getExtensionService: getExtensionServiceMeta3D<dependentExtensionNameMap, service>

export let createExtensionState: createExtensionStateMeta3D<state>