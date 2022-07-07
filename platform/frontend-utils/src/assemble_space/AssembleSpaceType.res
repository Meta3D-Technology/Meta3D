open BackendCloudbaseType

type dispatch = AssembleSpaceStoreType.action => unit

type useDispatch = unit => dispatch

// type useSelector = 'a. (AssembleSpaceStoreType.state => 'a) => 'a

type errorFunc = Js.Exn.t => unit

// type error = (. Antd__Message.error, errorFunc, Js.Exn.t, option<int>) => unit
type error = (. Js.Exn.t, option<int>) => unit

type service = {
  useDispatch: useDispatch,
  useSelector: 'a. (AssembleSpaceStoreType.state => 'a) => 'a,
  error: error,
  getAllPublishExtensionProtocols: getAllPublishExtensionProtocols,
}

type id = string

type extension = {
  id: id,
  data: Meta3d.ExtensionFileType.extensionFileData,
}

type selectedExtensionsFromShop = list<extension>
