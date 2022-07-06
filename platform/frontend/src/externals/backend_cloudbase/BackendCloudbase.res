open FrontendUtils.BackendCloudbaseType

// @module("backend-cloudbase")
// external error: (
//   ~message: FrontendUtils.Antd__Message.message,
//   ~e: Js.Promise.error,
//   ~duration: int=?,
//   unit,
// ) => unit = ""

@module("backend-cloudbase")
external init: unit => Js.Promise.t<unit> = ""

@module("backend-cloudbase")
external checkUserName: string => Meta3dBsMostProtocol.StreamType.stream<bool> = ""

@module("backend-cloudbase")
external registerUser: (string, string) => Meta3dBsMostProtocol.StreamType.stream<unit> = ""

@module("backend-cloudbase")
external isLoginSuccess: (
  string,
  string,
) => Meta3dBsMostProtocol.StreamType.stream<(bool, Js.Nullable.t<string>)> = ""

@module("backend-cloudbase")
external getAllPublishExtensionProtocols: getAllPublishExtensionProtocols = ""

@module("backend-cloudbase")
external getAllPublishContributeProtocols: getAllPublishContributeProtocols = ""

type implement = {
  id: string,
  file: Js.Typed_array.ArrayBuffer.t,
}

type implements = array<implement>

@module("backend-cloudbase")
external getAllPublishExtensions: (
  string,
  string,
) => Meta3dBsMostProtocol.StreamType.stream<implements> = ""

@module("backend-cloudbase")
external getAllPublishContributes: (
  string,
  string,
) => Meta3dBsMostProtocol.StreamType.stream<implements> = ""

let buildService = (): FrontendUtils.AssembleSpaceType.service => {
{
  error:(. e, durationOpt) =>  FrontendUtils.ErrorUtils.error(e, durationOpt),
  getAllPublishExtensionProtocols: getAllPublishExtensionProtocols->Obj.magic,
}
}