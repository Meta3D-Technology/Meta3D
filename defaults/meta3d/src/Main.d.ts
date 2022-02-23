// TODO unify .d.ts, .ts!

import { extensionName, getExtensionService, state, api } from "meta3d-type"

export function prepare(): state

export function registerExtension<extensionService, dependentExtensionNameMap, extensionState>(state: state, extensionName: extensionName, getExtensionService: getExtensionService<dependentExtensionNameMap, extensionService>,
    dependentExtensionNameMap: dependentExtensionNameMap,
    extensionState: extensionState
): state

export function getServiceExn<extensionService>(
    state: state,
    extensionName: extensionName
): extensionService

export function setExtensionState<extensionState>(
    state: state,
    extensionName: extensionName,
    extensionState: extensionState
): state

export function getExtensionStateExn<extensionState>(
    state: state,
    extensionName: extensionName,
): extensionState

export function buildAPI(): api