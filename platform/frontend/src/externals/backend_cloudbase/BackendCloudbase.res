@module("backend-cloudbase")
external error: (
  ~message: Antd__Message.message,
  ~e: Js.Promise.error,
  ~duration: int=?,
  unit,
) => unit = ""

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

type protocol = {
  name: string,
  version: string,
  iconBase64: string,
}

type protocols = array<protocol>

@module("backend-cloudbase")
external getAllPublishExtensionProtocols: unit => Meta3dBsMostProtocol.StreamType.stream<
  protocols,
> = ""

@module("backend-cloudbase")
external getAllPublishContributeProtocols: unit => Meta3dBsMostProtocol.StreamType.stream<
  protocols,
> = ""

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
