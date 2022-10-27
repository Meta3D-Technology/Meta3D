open FrontendUtils.BackendCloudbaseType

@module("backend-cloudbase")
external init: unit => Meta3dBsMostProtocol.StreamType.stream<unit> = ""

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

@module("backend-cloudbase")
external getAllPublishContributeProtocolConfigs: getAllPublishContributeProtocolConfigs = ""

@module("backend-cloudbase")
external getAllPublishExtensionProtocolConfigs: getAllPublishExtensionProtocolConfigs = ""

@module("backend-cloudbase")
external publishApp: publishApp = ""

@module("backend-cloudbase")
external findPublishApp: findPublishApp = ""

@module("backend-cloudbase")
external findAllPublishApps: findAllPublishApps = ""

@module("backend-cloudbase")
external publishElementContribute: publishElementContribute = ""

@module("backend-cloudbase")
external publishElementAssembleData: publishElementAssembleData = ""

@module("backend-cloudbase")
external publishApp: publishApp = ""

@module("backend-cloudbase")
external getAllPublishNewestExtensions: getAllPublishNewestExtensions = ""

@module("backend-cloudbase")
external getElementAssembleData: getElementAssembleData = ""

let buildAssembleSpaceService = (): FrontendUtils.AssembleSpaceType.backendService => {
  {
    getAllPublishExtensionProtocols: getAllPublishExtensionProtocols->Obj.magic,
    getAllPublishContributeProtocols: getAllPublishContributeProtocols->Obj.magic,
    getAllPublishContributeProtocolConfigs: getAllPublishContributeProtocolConfigs->Obj.magic,
    getAllPublishExtensionProtocolConfigs: getAllPublishExtensionProtocolConfigs->Obj.magic,
    getAllPublishNewestExtensions: getAllPublishNewestExtensions->Obj.magic,
    publishApp: publishApp,
    findPublishApp: findPublishApp,
    findAllPublishApps: findAllPublishApps,
    publishElementContribute: publishElementContribute,
    publishElementAssembleData: publishElementAssembleData,
    getElementAssembleData: getElementAssembleData,
  }
}
