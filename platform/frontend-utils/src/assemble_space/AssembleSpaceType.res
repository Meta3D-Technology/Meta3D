open BackendCloudbaseType

open Meta3d.AppFileType

type dispatch = AssembleSpaceStoreType.action => unit

type useDispatch = unit => dispatch

// type useSelector = 'a. (AssembleSpaceStoreType.state => 'a) => 'a

// type errorFunc = Js.Exn.t => unit

// type error = (. Antd__Message.error, errorFunc, Js.Exn.t, option<int>) => unit
type error = (. string, option<int>) => unit

type errorWithExn = (. Js.Exn.t, option<int>) => unit

type backendService = {
  getAllPublishExtensionProtocols: getAllPublishExtensionProtocols,
  getAllPublishContributeProtocols: getAllPublishContributeProtocols,
  getAllPublishContributeProtocolConfigs: getAllPublishContributeProtocolConfigs,
  getAllPublishExtensionProtocolConfigs: getAllPublishExtensionProtocolConfigs,
  getAllPublishNewestExtensions: getAllPublishNewestExtensions,
  publishApp: publishApp,
  findPublishApp: findPublishApp,
  findAllPublishApps: findAllPublishApps,
  publishElementContribute: publishElementContribute,
  publishElementAssembleData: publishElementAssembleData,
  getElementAssembleData: getElementAssembleData,
}

type callback1Func<'a> = unit => 'a

type reactService = {
  useCallback1: 'a. (. callback1Func<'a>, array<'a>) => callback1Func<'a>,
  useState: 'a. ('a => 'a) => ('a, ('a => 'a) => unit),
  useDispatch: useDispatch,
  useSelector: 'a. (AssembleSpaceStoreType.state => 'a) => 'a,
  useEffect1: 'a. (. unit => option<unit => unit>, array<'a>) => unit,
  useEffectOnce: (unit => (unit, option<unit => unit>)) => unit,
  useEffectOnceAsync: (unit => (Js.Promise.t<unit>, option<unit => unit>)) => unit,
}

type consoleService = {error: error, errorWithExn: errorWithExn}

type meta3dService = {
  getExtensionState: 'extensionState. (. Meta3dType.Index.state, string) => 'extensionState,
  setExtensionState: 'extensionState. (
    . Meta3dType.Index.state,
    string,
    'extensionState,
  ) => Meta3dType.Index.state,
  getExtensionService: 'extensionService. (. Meta3dType.Index.state, string) => 'extensionService,
  generateContribute: (
    . Meta3d.ExtensionFileType.contributePackageData,
    string,
  ) => Js.Typed_array.ArrayBuffer.t,
  loadContribute: (. Js.Typed_array.ArrayBuffer.t) => Meta3d.ExtensionFileType.contributeFileData,
  generateExtension: (
    . Meta3d.ExtensionFileType.extensionPackageData,
    string,
  ) => Js.Typed_array.ArrayBuffer.t,
  loadExtension: (. Js.Typed_array.ArrayBuffer.t) => Meta3d.ExtensionFileType.extensionFileData,
  initExtension: (
    . Meta3dType.Index.state,
    string,
    Meta3dType.Index.extensionLifeHandlerData,
  ) => Js.Promise.t<Meta3dType.Index.state>,
  updateExtension: (
    . Meta3dType.Index.state,
    string,
    Meta3dType.Index.extensionLifeHandlerData,
  ) => Js.Promise.t<Meta3dType.Index.state>,
  generateApp: (
    . (
      array<(extensionPackageData, Meta3d.ExtensionFileType.extensionFuncData)>,
      array<(contributePackageData, Meta3d.ExtensionFileType.contributeFuncData)>,
    ),
    Js.Nullable.t<Meta3dType.Index.startConfigData>,
  ) => Js.Typed_array.ArrayBuffer.t,
  convertAllFileData: (
    . array<Meta3d.ExtensionFileType.extensionFileData>,
    array<Meta3d.ExtensionFileType.contributeFileData>,
    (
      array<Meta3dType.Index.extensionName>,
      array<Meta3dType.Index.extensionName>,
      array<Meta3dType.Index.contributeName>,
    ),
  ) => (
    array<(extensionPackageData, Meta3d.ExtensionFileType.extensionFuncData)>,
    array<(contributePackageData, Meta3d.ExtensionFileType.contributeFuncData)>,
  ),
  loadApp: (
    . Js.Typed_array.ArrayBuffer.t,
  ) => (
    Meta3dType.Index.state,
    array<Meta3d.AppFileType.extensionFileData>,
    Meta3dType.Index.startConfigData,
  ),
  execGetContributeFunc: (
    . Js.Typed_array.Uint8Array.t,
    Meta3dCommonlibType.ImmutableHashMapType.t<string, string>,
    Meta3dCommonlibType.ImmutableHashMapType.t<string, string>,
  ) => Meta3dType.Index.getContributeFuncResult,
  serializeUIControlProtocolConfigLib: Meta3dServiceCommonType. serializeUIControlProtocolConfigLib,
  getSkinProtocolData: (
    . Meta3d.LibUtils.lib,
  ) => Meta3dType.UIControlProtocolConfigType.skinProtocolData,
  generateUIControlCommonDataStr: (. Meta3d.LibUtils.lib, string, string) => string,
  getUIControlSpecificDataFields: (
    . Meta3d.LibUtils.lib,
  ) => Meta3dType.UIControlProtocolConfigType.uiControlSpecificDataFields,
  hasChildren: Meta3dServiceCommonType.hasChildren,
  getUIControlSupportedEventNames: (
    . Meta3d.LibUtils.lib,
  ) => array<Meta3dType.UIControlProtocolConfigType.supportedEventName>,
  generateHandleUIControlEventStr: (
    . Meta3d.LibUtils.lib,
    array<Meta3dType.UIControlProtocolConfigType.actionName>,
  ) => string,
  serializeActionProtocolConfigLib: (. string) => Meta3d.LibUtils.lib,
  getActions: (. Meta3d.LibUtils.lib) => Meta3dType.ActionProtocolConfigType.actions,
  serializeStartExtensionProtocolConfigLib: (. string) => Meta3d.LibUtils.lib,
  getNeedConfigData: (
    . Meta3d.LibUtils.lib,
  ) => Meta3dType.StartExtensionProtocolConfigType.needConfigData,
}

type otherService = {
  random: unit => float,
  requestAnimationFirstFrame: (float => unit) => int,
  requestAnimationOtherFrame: (float => unit) => int,
}

type url = string

type tabService = {openUrl: (. url) => unit}

type db = IndexedDB.IDBDatabase.t

type initStream = Meta3dBsMostProtocol.StreamType.stream<db>

type storageService = {
  initForElementVisualApp: unit => initStream,
  getElementVisualApp: (
    . initStream,
  ) => Meta3dBsMostProtocol.StreamType.stream<Js.Typed_array.ArrayBuffer.t>,
  setElementVisualApp: (. initStream, Js.Typed_array.ArrayBuffer.t) => initStream,
}

type urlService = {useUrl: unit => RescriptReactRouter.url}

type domService = {querySelector: string => option<Dom.htmlElement>}

type service = {
  url: urlService,
  tab: tabService,
  storage: storageService,
  console: consoleService,
  react: reactService,
  backend: backendService,
  meta3d: meta3dService,
  other: otherService,
  dom: domService,
}

type selectedExtensionsFromShop = list<AssembleSpaceCommonType.extensionData>

type selectedContributesFromShop = list<AssembleSpaceCommonType.contributeData>
