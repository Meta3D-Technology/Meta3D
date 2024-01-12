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
  contributeExceptInputMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    contributeProtocolName,
    (ContributeType.contributeType, contribute),
  >,
  inputMap: Meta3dCommonlibType.ImmutableHashMapType.t<contributeProtocolName, array<contribute>>,
  packageStoreInAppMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    packageProtocolName,
    Js.Typed_array.ArrayBuffer.t,
  >,
}

type nullableAPI = {
  getExn: 'data. (. Js.Nullable.t<'data>) => 'data,
  isNullable: 'data. (. Js.Nullable.t<'data>) => bool,
  return: 'data. (. 'data) => Js.Nullable.t<'data>,
  getWithDefault: 'data. (. Js.Nullable.t<'data>, 'data) => 'data,
  map: 'data1 'data2. (. (. 'data1) => 'data2, Js.Nullable.t<'data1>) => Js.Nullable.t<'data2>,
  bind: 'data1 'data2. (
    . (. 'data1) => Js.Nullable.t<'data2>,
    Js.Nullable.t<'data1>,
  ) => Js.Nullable.t<'data2>,
  getEmpty: 'data. unit => Js.Nullable.t<'data>,
}

type env = [#local | #production]

type onUploadProgressFunc = int => unit

type appName = string

type account = string

type description = string

type previewBase64 = string

type isRecommend = bool

type init = (. env) => Js.Promise.t<unit>

type publishFinalApp = (
  . onUploadProgressFunc,
  Js.Typed_array.ArrayBuffer.t,
  // Js.Typed_array.ArrayBuffer.t,
  appName,
  account,
  description,
  Js.Nullable.t<previewBase64>,
  // useCount,
  isRecommend,
) => // ) => Meta3dBsMostDefault.Most.stream<unit>
Js.Promise.t<unit>

type backendAPI = {
  init: init,
  publishFinalApp: publishFinalApp,
}

type message = string

type success = (. message) => unit

type warn = (. message) => unit

type error = (. message) => unit

type messageAPI = {
  success: success,
  warn: warn,
  error: error,
}

type list

type arrayData

type map

type dictData

type immutableAPI = {
  // createList: (. state) => list,
  // createListOfData: (. state, arrayData) => list,
  // createMap: (. state) => map,
  // createMapOfData: (. state, dictData) => map,

  createList: unit => list,
  createListOfData: (. arrayData) => list,
  createMap: unit => map,
  createMapOfData: (. dictData) => map,
}

type actionName = string

type actionAPI = {
  getActionState: 'actionState. (. state, actionName) => Js.Nullable.t<'actionState>,
  setActionState: 'actionState. (. state, actionName, 'actionState) => state,
}

type uiControlAPI = {
  getUIControlState: 'uiControlState. (. state, uiControlName) => Js.Nullable.t<'uiControlState>,
  setUIControlState: 'uiControlState. (. state, uiControlName, 'uiControlState) => state,
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
  nullable: nullableAPI,
  immutable: immutableAPI,
  action: actionAPI,
  uiControl: uiControlAPI,
  backend: backendAPI,
  message: messageAPI,
}

type getExtensionService<'extensionService> = api => 'extensionService

type createExtensionState<'extensionState> = (. state, api) => 'extensionState

type getContribute<'contribute> = // > = (api, 'config) => 'contribute
api => 'contribute

type getExtensionLife<'extensionService> = (
  api,
  extensionProtocolName,
) => extensionLife<'extensionService>
