open FrontendUtils.BackendCloudbaseType

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
  version: string,
  username:string
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

@module("backend-cloudbase")
external publishApp: publishApp = ""

@module("backend-cloudbase")
external findPublishApp: findPublishApp = ""

@module("backend-cloudbase")
external findAllPublishApps: findAllPublishApps = ""

let buildService = (): FrontendUtils.AssembleSpaceType.backendService => {
  {
    getAllPublishExtensionProtocols: getAllPublishExtensionProtocols->Obj.magic,
    getAllPublishContributeProtocols: getAllPublishContributeProtocols->Obj.magic,
    publishApp: publishApp,
    findPublishApp: findPublishApp,
    findAllPublishApps: findAllPublishApps,
  }
}
