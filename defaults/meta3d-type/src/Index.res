type extensionService

type extensionState

type contribute

type extensionName = string

type contributeName = string

type dependentExtensionNameKey = string

type dependentExtensionNameValue = extensionName

type dependentContributeNameKey = string

type dependentContributeNameValue = contributeName

type dependentExtensionNameMap = Meta3dCommonlibType.ImmutableHashMapType.t<
  dependentExtensionNameKey,
  dependentExtensionNameValue,
>

type dependentContributeNameMap = Meta3dCommonlibType.ImmutableHashMapType.t<
  dependentContributeNameKey,
  dependentContributeNameValue,
>

// type config

type rec extensionLifeEventHandler<'extensionService> = (state, 'extensionService) => state
and extensionLife<'extensionService> = {
  onRegister: Js.Nullable.t<extensionLifeEventHandler<'extensionService>>,
  onStart: Js.Nullable.t<(state, 'extensionService) => unit>,
}
and state = {
  extensionServiceMap: Meta3dCommonlibType.ImmutableHashMapType.t<extensionName, extensionService>,
  extensionStateMap: Meta3dCommonlibType.ImmutableHashMapType.t<extensionName, extensionState>,
  extensionLifeMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    extensionName,
    extensionLife<extensionService>,
  >,
  contributeMap: Meta3dCommonlibType.ImmutableHashMapType.t<contributeName, contribute>,
}

type api = {
  /* ! rank2 polymorphism */
  registerExtension: 'getExtensionServiceFunc 'getLifeFunc 'dependentExtensionNameMap 'extensionState. (
    . state,
    extensionName,
    'getExtensionServiceFunc,
    'getLifeFunc,
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

type getContribute<
  'dependentExtensionNameMap,
  'dependentContributeNameMap,
  // 'config,
  'contribute,
> = // > = (api, ('dependentExtensionNameMap, 'dependentContributeNameMap), 'config) => 'contribute
(api, ('dependentExtensionNameMap, 'dependentContributeNameMap)) => 'contribute

type getExtensionLife<'extensionService> = (api, extensionName) => extensionLife<'extensionService>
