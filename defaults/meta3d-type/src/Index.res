type extensionService

type extensionState

type contribute

type dependentExtensionNameMap

type dependentContributeNameMap

type extensionName = string

type contributeName = string

type state = {
  extensionServiceMap: Meta3dCommonlibType.ImmutableHashMapType.t<extensionName, extensionService>,
  extensionStateMap: Meta3dCommonlibType.ImmutableHashMapType.t<extensionName, extensionState>,
  contributeMap: Meta3dCommonlibType.ImmutableHashMapType.t<contributeName, contribute>,
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
  registerContribute: 'getContributeFunc 'dependentExtensionNameMap 'dependentContributeNameMap. (
    . state,
    contributeName,
    'getContributeFunc,
    ('dependentExtensionNameMap, 'dependentContributeNameMap),
  ) => state,
  getContribute: 'contribute. (. state, contributeName) => 'contribute,
}

type getExtensionService<
  'dependentExtensionNameMap,
  'dependentContributeNameMap,
  'extensionService,
> = (api, ('dependentExtensionNameMap, 'dependentContributeNameMap)) => 'extensionService

type createExtensionState<'extensionState> = unit => 'extensionState

type getContribute<'dependentExtensionNameMap, 'dependentContributeNameMap, 'contribute> = (
  api,
  ('dependentExtensionNameMap, 'dependentContributeNameMap),
) => 'contribute
