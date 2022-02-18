type extensionService

type extensionState

type extensionName = string

type state = {
  // extensionServiceMap: Meta3dCommonlib.ImmutableHashMap.t<extensionName, extensionService>,
  extensionServiceMap: Meta3dCommonlib.ImmutableHashMap.t<extensionName, extensionService>,
  // extensionStateMap: Meta3dCommonlib.ImmutableHashMap.t<extensionName, extensionState>,
  extensionStateMap: Meta3dCommonlib.ImmutableHashMap.t<extensionName, extensionState>,
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
