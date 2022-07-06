open BackendCloudbaseType

type errorFunc = Js.Exn.t => unit

// type error = (. Antd__Message.error, errorFunc, Js.Exn.t, option<int>) => unit
type error = (. Js.Exn.t, option<int>) => unit

type service = {
  error: error,
  getAllPublishExtensionProtocols: getAllPublishExtensionProtocols,
}

type id = string

type extension = {
  id: id,
  data: Meta3d.ExtensionFileType.extensionFileData,
}

type selectedExtensions = list<extension>
