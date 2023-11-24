open BackendCloudbaseType

open Meta3d.AppAndPackageFileType

type selectedPackagesFromMarket = list<AssembleSpaceCommonType.packageData>

type selectedExtensionsFromMarket = list<AssembleSpaceCommonType.extensionData>

type selectedContributesFromMarket = list<AssembleSpaceCommonType.contributeData>

type selectedElementsFromMarket = list<elementAssembleData>

type customInputsFromMarket = list<AssembleSpaceCommonType.customInput>

type customActionsFromMarket = list<AssembleSpaceCommonType.customAction>

type dispatch = AssembleSpaceStoreType.action => unit

type useDispatch = unit => dispatch

// type useSelector = 'a. (AssembleSpaceStoreType.state => 'a) => 'a

// type errorFunc = Js.Exn.t => unit

// type error = (. Antd__Message.error, errorFunc, Js.Exn.t, option<int>) => unit
type error = (. string, option<int>) => unit

type errorWithExn = (. Js.Exn.t, option<int>) => unit

type backendService = {
  // getAllPublishPackageEntryExtensionProtocols: getAllPublishPackageEntryExtensionProtocols,
  getAllPublishExtensionProtocols: getAllPublishExtensionProtocols,
  getAllPublishContributeProtocols: getAllPublishContributeProtocols,
  getAllPublishContributeProtocolConfigs: getAllPublishContributeProtocolConfigs,
  getAllPublishExtensionProtocolConfigs: getAllPublishExtensionProtocolConfigs,
  getAllPublishNewestExtensions: getAllPublishNewestExtensions,
  publishApp: publishApp,
  publishPackage: publishPackage,
  findPublishApp: findPublishApp,
  findAllPublishApps: findAllPublishApps,
  publishElementContribute: publishElementContribute,
  publishElementAssembleData: publishElementAssembleData,
  getElementAssembleData: getElementAssembleData,
  findNewestPublishPackage: findNewestPublishPackage,
  findNewestPublishExtension: findNewestPublishExtension,
  findNewestPublishContribute: findNewestPublishContribute,
  findNewestPublishElementAssembleData: findNewestPublishElementAssembleData,
}

type callback1Func<'a> = unit => 'a

type reactService = {
  useCallback1: 'a. (. callback1Func<'a>, array<'a>) => callback1Func<'a>,
  useState: 'a. ('a => 'a) => ('a, ('a => 'a) => unit),
  useRef: 'a. 'a => React.ref<'a>,
  useDispatch: useDispatch,
  useSelector: 'a. (. AssembleSpaceStoreType.state => 'a) => 'a,
  useEffect1: 'a. (. unit => option<unit => unit>, array<'a>) => unit,
  useEffectOnce: (unit => (unit, option<unit => unit>)) => unit,
  useEffectOnceAsync: (unit => (Js.Promise.t<unit>, option<unit => unit>)) => unit,
}

type consoleService = {error: error, errorWithExn: errorWithExn}

type convertAllFileDataForApp = (
  . array<Meta3d.ExtensionFileType.contributeFileData>,
) => array<(contributePackageData, Meta3d.ExtensionFileType.contributeFuncData)>

type convertAllFileDataForPackage = (
  . array<Meta3d.ExtensionFileType.extensionFileData>,
  array<Meta3d.ExtensionFileType.contributeFileData>,
  array<Meta3dType.Index.extensionName>,
) => (
  array<(extensionPackageData, Meta3d.ExtensionFileType.extensionFuncData)>,
  array<(contributePackageData, Meta3d.ExtensionFileType.contributeFuncData)>,
)

type addGeneratedContributeFunc = (
  array<Meta3d.AppAndPackageFileType.contributeFileData>,
  Meta3d.AppAndPackageFileType.selectedElements,
) => array<Meta3d.AppAndPackageFileType.contributeFileData>

type meta3dService = {
  getPackageService: 'packageService. (. Meta3dType.Index.state, string) => 'packageService,
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
  generatePackage: (
    . (
      array<(extensionPackageData, Meta3d.ExtensionFileType.extensionFuncData)>,
      array<(contributePackageData, Meta3d.ExtensionFileType.contributeFuncData)>,
    ),
    array<Js.Typed_array.ArrayBuffer.t>,
    packageData,
  ) => Js.Typed_array.ArrayBuffer.t,
  generateApp: (
    . array<(contributePackageData, Meta3d.ExtensionFileType.contributeFuncData)>,
    array<Js.Typed_array.ArrayBuffer.t>,
    array<(packageData, Js.Typed_array.ArrayBuffer.t)>,
    array<elementAssembleData>,
    (array<ApAssembleStoreType.customInput>, array<ApAssembleStoreType.customAction>),
    Js.Nullable.t<Meta3dType.Index.startConfigData>,
    string,
  ) => Js.Typed_array.ArrayBuffer.t,
  convertAllFileDataForApp: convertAllFileDataForApp,
  convertAllFileDataForPackage: convertAllFileDataForPackage,
  loadApp: (
    . addGeneratedContributeFunc,
    Js.Typed_array.ArrayBuffer.t,
  ) => (Meta3dType.Index.state, string, Meta3dType.Index.startConfigData),
  getExtensionFuncDataStr: (. Js.Typed_array.Uint8Array.t) => string,
  getExtensionFuncData: (. string) => Js.Typed_array.Uint8Array.t,
  getContributeFuncDataStr: (. Js.Typed_array.Uint8Array.t) => string,
  getContributeFuncData: (. string) => Js.Typed_array.Uint8Array.t,
  getAllDataOfPackage: (
    . Js.Typed_array.ArrayBuffer.t,
  ) => (
    array<(extensionPackageData, Meta3d.ExtensionFileType.extensionFuncData)>,
    array<(contributePackageData, Meta3d.ExtensionFileType.contributeFuncData)>,
    array<Js.Typed_array.ArrayBuffer.t>,
    packageData,
  ),
  execGetContributeFunc: (
    . Js.Typed_array.Uint8Array.t,
  ) => Meta3dType.Index.getContributeFuncResult,
  serializeUIControlProtocolConfigLib: Meta3dServiceCommonType.serializeUIControlProtocolConfigLib,
  generateUIControlCommonDataStr: (. Meta3d.LibUtils.lib, string) => string,
  getUIControlSpecificDataFields: (
    . Meta3d.LibUtils.lib,
  ) => Meta3dType.UIControlProtocolConfigType.uiControlSpecificDataFields,
  hasChildren: Meta3dServiceCommonType.hasChildren,
  getUIControlSupportedEventNames: (
    . Meta3d.LibUtils.lib,
  ) => array<Meta3dType.UIControlProtocolConfigType.supportedEventName>,
  // array<(
  //   Meta3dType.UIControlProtocolConfigType.eventName,
  //   Meta3dType.UIControlProtocolConfigType.actionProtocolName,
  // )>,
  generateHandleUIControlEventStr: (
    . Meta3d.LibUtils.lib,
    array<Meta3dType.UIControlProtocolConfigType.actionName>,
  ) => string,
  // serializeActionProtocolConfigLib: (. string) => Meta3d.LibUtils.lib,
  // getActions: (. Meta3d.LibUtils.lib) => Meta3dType.ActionProtocolConfigType.actions,
  serializeStartPackageProtocolConfigLib: (. string) => Meta3d.LibUtils.lib,
  getNeedConfigData: (
    . Meta3d.LibUtils.lib,
  ) => Meta3dType.StartPackageProtocolConfigType.needConfigData,
}

type otherService = {
  random: unit => float,
  requestAnimationFirstFrame: (float => unit) => int,
  requestAnimationOtherFrame: (float => unit) => int,
  cancelAnimationFrame: int => unit,
}

type url = string

type tabService = {openUrl: (. url) => unit}

type db = IndexedDB.IDBDatabase.t

type initStream = Meta3dBsMostDefault.Most.stream<db>

type storageService = {
  initForElementVisualApp: unit => initStream,
  getElementVisualApp: (
    . initStream,
  ) => Meta3dBsMostDefault.Most.stream<Js.Typed_array.ArrayBuffer.t>,
  setElementVisualApp: (. initStream, Js.Typed_array.ArrayBuffer.t) => initStream,
}

type urlParamValue

// type urlService = {useUrl: unit => RescriptReactRouter.url}
type urlService = {getUrlParam: string => urlParamValue}

type domService = {querySelector: string => option<Dom.htmlElement>}

type uiService = {
  buildTitle: (. ~level: int, ~children: React.element, unit) => React.element,
  buildText: (. ~children: React.element, ~_type: Antd__Typography.textType, unit) => React.element,
}

type dispatchForAppStore = AppStoreType.action => unit

type dispatchForApAssembleStore = ApAssembleStoreType.action => unit

type dispatchForPackageAssembleStore = PackageAssembleStoreType.action => unit

type appService = {
  useDispatch: unit => dispatchForAppStore,
  dispatchUpdateSelectedPackagesAndExtensionsAndContributesAndElementsAction: (
    . dispatchForAppStore,
    dispatchForApAssembleStore,
    dispatchForPackageAssembleStore,
    (
      selectedPackagesFromMarket,
      selectedExtensionsFromMarket,
      selectedContributesFromMarket,
      selectedElementsFromMarket,
    ),
    (
      ApAssembleStoreType.selectedPackages,
      ApAssembleStoreType.selectedExtensions,
      ApAssembleStoreType.selectedContributes,
    ),
    (
      PackageAssembleStoreType.selectedPackages,
      PackageAssembleStoreType.selectedExtensions,
      PackageAssembleStoreType.selectedContributes,
    ),
  ) => unit,
  // dispatchStorePackageInApp: (. dispatchForAppStore, AssembleSpaceCommonType.id) => unit,
  // dispatchUnStorePackageInApp: (. dispatchForAppStore, AssembleSpaceCommonType.id) => unit,
}

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
  ui: uiService,
  app: appService,
}
