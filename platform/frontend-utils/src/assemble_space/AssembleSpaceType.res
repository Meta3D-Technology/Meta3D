open BackendCloudbaseType

open Meta3d.AppFileType

type dispatch = AssembleSpaceStoreType.action => unit

type useDispatch = unit => dispatch

// type useSelector = 'a. (AssembleSpaceStoreType.state => 'a) => 'a

type errorFunc = Js.Exn.t => unit

// type error = (. Antd__Message.error, errorFunc, Js.Exn.t, option<int>) => unit
type error = (. string, option<int>) => unit

type backendService = {
  getAllPublishExtensionProtocols: getAllPublishExtensionProtocols,
  getAllPublishContributeProtocols: getAllPublishContributeProtocols,
  getAllPublishExtensions: getAllPublishExtensions,
  publishApp: publishApp,
  findPublishApp: findPublishApp,
  findAllPublishApps: findAllPublishApps,
}

type reactService = {
  useState: 'a. ('a => 'a) => ('a, ('a => 'a) => unit),
  useDispatch: useDispatch,
  useSelector: 'a. (AssembleSpaceStoreType.state => 'a) => 'a,
  useEffect1: 'a. (. unit => option<unit => unit>, array<'a>) => unit,
  useEffectOnce: (unit => (unit, option<unit => unit>)) => unit,
  useEffectOnceAsync: (unit => (Js.Promise.t<unit>, option<unit => unit>)) => unit,
}

type consoleService = {error: error}

type meta3dService = {
  generateExtension: (. extensionPackageData, string) => Js.Typed_array.ArrayBuffer.t,
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
  ) => (Meta3dType.Index.state, array<Meta3d.AppFileType.extensionFileData>),
}

type otherService = {random: unit => float}

type service = {
  console: consoleService,
  react: reactService,
  backend: backendService,
  meta3d: meta3dService,
  other: otherService,
}

type selectedExtensionsFromShop = list<AssembleSpaceCommonType.extension>

type selectedContributesFromShop = list<AssembleSpaceCommonType.contribute>
