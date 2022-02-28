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
  registerExtension: 'getExtensionServiceFunc 'dependentExtensionNameMap 'extensionState. (
    . state,
    extensionName,
    'getExtensionServiceFunc,
    'dependentExtensionNameMap,
    'extensionState,
  ) => state,
  getExtensionService: 'extensionService. (. state, extensionName) => 'extensionService,
  getExtensionState: 'extensionState. (. state, extensionName) => 'extensionState,
  setExtensionState: 'extensionState. (. state, extensionName, 'extensionState) => state,
}

type getExtensionService<'dependentExtensionNameMap, 'extensionService> = (
  api,
  'dependentExtensionNameMap,
) => 'extensionService

type createExtensionState<'extensionState> = unit => 'extensionState
