open BackendCloudbaseType

type dispatch = AssembleSpaceStoreType.action => unit

type useDispatch = unit => dispatch

// type useSelector = 'a. (AssembleSpaceStoreType.state => 'a) => 'a

type errorFunc = Js.Exn.t => unit

// type error = (. Antd__Message.error, errorFunc, Js.Exn.t, option<int>) => unit
type error = (. Js.Exn.t, option<int>) => unit

type backendService = {
  getAllPublishExtensionProtocols: getAllPublishExtensionProtocols,
  getAllPublishContributeProtocols: getAllPublishContributeProtocols,
}

type reactService = {
  useDispatch: useDispatch,
  useSelector: 'a. (AssembleSpaceStoreType.state => 'a) => 'a,
  useEffectOnce: (unit => (unit, option<unit => unit>)) => unit,
  useEffectOnceAsync: (unit => (Js.Promise.t<unit>, option<unit => unit>)) => unit,
}

type consoleService = {error: error}

type service = {
  console: consoleService,
  react: reactService,
  backend: backendService,
}

type selectedExtensionsFromShop = list<AssembleSpaceCommonType.extension>

type selectedContributesFromShop = list<AssembleSpaceCommonType.contribute>
