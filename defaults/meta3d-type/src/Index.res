type extensionService

type extensionState

type contribute

type extensionName = string

type contributeName = string

type extensionProtocolName = string

type contributeProtocolName = string

type uiControlName = string

type getContributeFuncResult

// type config

type extensionLifeHandlerData

type packageProtocolName = string

type canvasData = {
  width: int,
  height: int,
}

type configData

type startConfigData = (canvasData, configData)

type rec extensionLifeEventHandler<'extensionService> = (state, 'extensionService) => state
and extensionLifeAsyncEventHandler<'extensionService> = (
  state,
  'extensionService,
  extensionLifeHandlerData,
) => Js.Promise.t<state>
and extensionLife<'extensionService> = {
  onRegister: Js.Nullable.t<extensionLifeEventHandler<'extensionService>>,
  onRestore: Js.Nullable.t<(state, state) => state>,
  onDeepCopy: Js.Nullable.t<state => state>,
  onStart: Js.Nullable.t<(state, 'extensionService, startConfigData) => unit>,
  onInit: Js.Nullable.t<extensionLifeAsyncEventHandler<'extensionService>>,
  onUpdate: Js.Nullable.t<extensionLifeAsyncEventHandler<'extensionService>>,
}
and state = {
  extensionServiceMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    extensionProtocolName,
    extensionService,
  >,
  extensionStateMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    extensionProtocolName,
    extensionState,
  >,
  extensionLifeMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    extensionProtocolName,
    extensionLife<extensionService>,
  >,
  contributeExceptActionMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    contributeProtocolName,
    (ContributeType.contributeType, contribute),
  >,
  actionMap: Meta3dCommonlibType.ImmutableHashMapType.t<contributeProtocolName, array<contribute>>,
  packageStoreInAppMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    packageProtocolName,
    Js.Typed_array.ArrayBuffer.t,
  >,
}

type api = {
  /* ! rank2 polymorphism */
  registerExtension: 'getExtensionServiceFunc 'getLifeFunc 'extensionState. (
    . state,
    extensionProtocolName,
    'getExtensionServiceFunc,
    'getLifeFunc,
    'extensionState,
  ) => state,
  getExtensionService: 'extensionService. (. state, extensionProtocolName) => 'extensionService,
  getExtensionState: 'extensionState. (. state, extensionProtocolName) => 'extensionState,
  setExtensionState: 'extensionState. (. state, extensionProtocolName, 'extensionState) => state,
  getPackageService: 'packageService. (
    . state,
    packageProtocolName,
  ) => Js.Nullable.t<'packageService>,
  registerContribute: 'getContributeFunc. (
    . state,
    contributeProtocolName,
    'getContributeFunc,
  ) => state,
  // removeUIControlContribute: (. state, uiControlName) => state,
  getContribute: 'contribute. (. state, contributeProtocolName) => 'contribute,
  getAllContributesByType: 'contribute. (
    . state,
    ContributeType.contributeType,
  ) => array<'contribute>,
  getPackage: (. state, packageProtocolName) => Js.Nullable.t<Js.Typed_array.ArrayBuffer.t>,
  restore: (. state, state) => state,
  deepCopy: (. state) => state,
}

type getExtensionService<'extensionService> = api => 'extensionService

type createExtensionState<'extensionState> = unit => 'extensionState

type getContribute<'contribute> = // > = (api, 'config) => 'contribute
api => 'contribute

type getExtensionLife<'extensionService> = (
  api,
  extensionProtocolName,
) => extensionLife<'extensionService>
