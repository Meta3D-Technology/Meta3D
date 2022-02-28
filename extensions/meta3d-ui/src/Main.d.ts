import { getExtensionService as getExtensionServiceMeta3d, createExtensionState as createExtensionStateMeta3d } from "meta3d-type"
import { service } from "meta3d-ui-protocol/src/service/ServiceType"
import { dependentExtensionNameMap } from "meta3d-ui-protocol/src/service/DependentExtensionType"
import { state } from "meta3d-ui-protocol/src/state/StateType"

export let getExtensionService: getExtensionServiceMeta3d<dependentExtensionNameMap, service>

export let createExtensionState: createExtensionStateMeta3d<state>