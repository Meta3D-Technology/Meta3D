type extensionService

type extensionState

type dependentExtensionNameMap

type extensionName = string

type state = {
  extensionServiceMap: Meta3dCommonlibType.ImmutableHashMapType.t<extensionName, extensionService>,
  extensionStateMap: Meta3dCommonlibType.ImmutableHashMapType.t<extensionName, extensionState>,
}

type api = {
  /* ! rank2 polymorphism */
  getServiceExn: 'extensionService. (state, extensionName) => 'extensionService,
  getExtensionStateExn: 'extensionState. (state, extensionName) => 'extensionState,
  setExtensionState: 'extensionState. (state, extensionName, 'extensionState) => state,
}

type getService<'dependentExtensionNameMap, 'service> = (
  api,
  'dependentExtensionNameMap,
) => 'service

type createState<'state> = unit => 'state
