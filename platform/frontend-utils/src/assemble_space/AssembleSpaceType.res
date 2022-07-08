open BackendCloudbaseType

type dispatch = AssembleSpaceStoreType.action => unit

type useDispatch = unit => dispatch

// type useSelector = 'a. (AssembleSpaceStoreType.state => 'a) => 'a

type errorFunc = Js.Exn.t => unit

// type error = (. Antd__Message.error, errorFunc, Js.Exn.t, option<int>) => unit
type error = (. Js.Exn.t, option<int>) => unit

type backendService = {getAllPublishExtensionProtocols: getAllPublishExtensionProtocols}

type reactService = {
  useDispatch: useDispatch,
  useSelector: 'a. (AssembleSpaceStoreType.state => 'a) => 'a,
  useEffectOnce: (unit => (Js.Promise.t<unit>, option<unit => unit>)) => unit,
}

type consoleService = {error: error}

type service = {
  console: consoleService,
  react: reactService,
  backend: backendService,
}

type id = string

type extension = {
  id: id,
  data: Meta3d.ExtensionFileType.extensionFileData,
}

type selectedExtensionsFromShop = list<extension>
