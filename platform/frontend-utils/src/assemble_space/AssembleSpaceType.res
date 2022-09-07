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
  publishApp: publishApp,
  findPublishApp: findPublishApp,
  findAllPublishApps: findAllPublishApps,
}

type reactService = {
  useState: 'a. ('a => 'a) => ('a, ('a => 'a) => unit),
  useDispatch: useDispatch,
  useSelector: 'a. (AssembleSpaceStoreType.state => 'a) => 'a,
  useEffectOnce: (unit => (unit, option<unit => unit>)) => unit,
  useEffectOnceAsync: (unit => (Js.Promise.t<unit>, option<unit => unit>)) => unit,
}

type consoleService = {error: error}

type meta3dService = {
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
}

type service = {
  console: consoleService,
  react: reactService,
  backend: backendService,
  meta3d: meta3dService,
}

type selectedExtensionsFromShop = list<AssembleSpaceCommonType.extension>

type selectedContributesFromShop = list<AssembleSpaceCommonType.contribute>
