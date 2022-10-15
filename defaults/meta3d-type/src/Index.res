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

type extensionLifeHandlerData

type rec extensionLifeEventHandler<'extensionService> = (state, 'extensionService) => state
and extensionLifeAsyncEventHandler<'extensionService> = (
  state,
  'extensionService,
  extensionLifeHandlerData,
) => Js.Promise.t<state>
and extensionLife<'extensionService> = {
  onRegister: Js.Nullable.t<extensionLifeEventHandler<'extensionService>>,
  onStart: Js.Nullable.t<(state, 'extensionService) => unit>,
  onInit: Js.Nullable.t<extensionLifeAsyncEventHandler<'extensionService>>,
  onUpdate: Js.Nullable.t<extensionLifeAsyncEventHandler<'extensionService>>,
}
and state = {
  extensionServiceMap: Meta3dCommonlibType.ImmutableHashMapType.t<extensionName, extensionService>,
  extensionStateMap: Meta3dCommonlibType.ImmutableHashMapType.t<extensionName, extensionState>,
  extensionLifeMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    extensionName,
    extensionLife<extensionService>,
  >,
  contributeMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    contributeName,
    (ContributeType.contributeType, contribute),
  >,
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
  getAllContributesByType: 'contribute. (
    . state,
    ContributeType.contributeType,
  ) => array<'contribute>,
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

/* !contribute protocol config */

type eventName = [#click]

/* ! ui control protocol config */

type rect = {
  x: int,
  y: int,
  width: int,
  height: int,
}

type uiControlName = string

type supportedEventName = [#click]

type actionName = Js.Nullable.t<string>

type versionRange = string

type skinProtocolData = {
  protocolName: string,
  protocolVersion: versionRange,
}

type getSkinProtocolData = unit => skinProtocolData

type generateUIControlDataStr = (string, string) => string

type generateUIControlName = unit => uiControlName

type getUIControlSupportedEventNames = unit => array<supportedEventName>

type generateHandleUIControlEventStr = array<actionName> => string

/* ! action protocol config */

type action = {
  name: string,
  role: string,
}

type actionNameForAction = string

type actions = array<action>

type getActionName = unit => actionNameForAction

type getActions = unit => actions

/* ! skin protocol config */

type skinName = string

type getSkinName = unit => skinName
