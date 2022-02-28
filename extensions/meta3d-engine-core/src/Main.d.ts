import { getExtensionService as getExtensionServiceMeta3d, createExtensionState as createExtensionStateMeta3d } from "meta3d-type"
import { service } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { dependentExtensionNameMap } from "meta3d-engine-core-protocol/src/service/DependentExtensionType.gen"
import { state } from "meta3d-engine-core-protocol/src/state/StateType"

export let getExtensionService: getExtensionServiceMeta3d<dependentExtensionNameMap, service>

export let createExtensionState: createExtensionStateMeta3d<state>