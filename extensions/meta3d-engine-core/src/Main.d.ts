import { getExtensionService as getExtensionServiceMeta3D, createExtensionState as createExtensionStateMeta3D, getExtensionLife as getExtensionLifeMeta3D } from "meta3d-type"
import { service } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { dependentExtensionNameMap, dependentContributeNameMap } from "meta3d-engine-core-protocol/src/service/DependentMapType.gen"
import { state } from "meta3d-engine-core-protocol/src/state/StateType"

export let getExtensionService: getExtensionServiceMeta3D<dependentExtensionNameMap, dependentContributeNameMap, service>

export let createExtensionState: createExtensionStateMeta3D<state>

export let getExtensionLife: getExtensionLifeMeta3D<service>