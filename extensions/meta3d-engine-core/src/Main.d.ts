import { api } from "meta3d-type"
import { service } from "meta3d-engine-core-protocol/src/service/ServiceType"
import { dependentExtensionNameMap } from "meta3d-engine-core-protocol/src/service/DependentExtensionType.gen"
import { state } from "meta3d-engine-core-protocol/src/state/StateType"

export function getExtensionService(api: api, dependentExtensionNameMap: dependentExtensionNameMap): service

export function createExtensionState(): state