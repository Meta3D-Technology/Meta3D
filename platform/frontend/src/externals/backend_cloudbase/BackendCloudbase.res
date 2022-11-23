open FrontendUtils.BackendCloudbaseType

@module("backend-cloudbase")
external init: init = "init"

@module("backend-cloudbase")
external handleLogin: handleLogin = "handleLogin"

@module("backend-cloudbase")
external getAllPublishExtensionProtocols: getAllPublishExtensionProtocols = "getAllPublishExtensionProtocols"

@module("backend-cloudbase")
external getAllPublishExtensionProtocolConfigs: getAllPublishExtensionProtocolConfigs = "getAllPublishExtensionProtocolConfigs"

@module("backend-cloudbase")
external getAllPublishExtensionInfos: getAllPublishExtensionInfos = "getAllPublishExtensionInfos"

@module("backend-cloudbase")
external findPublishExtension: findPublishExtension = "findPublishExtension"

@module("backend-cloudbase")
external getAllPublishContributeProtocols: getAllPublishContributeProtocols = "getAllPublishContributeProtocols"

@module("backend-cloudbase")
external getAllPublishContributeProtocolConfigs: getAllPublishContributeProtocolConfigs = "getAllPublishContributeProtocolConfigs"

@module("backend-cloudbase")
external getAllPublishContributeInfos: getAllPublishContributeInfos = "getAllPublishContributeInfos"

@module("backend-cloudbase")
external findPublishContribute: findPublishContribute = "findPublishContribute"

@module("backend-cloudbase")
external publishApp: publishApp = "publishApp"

@module("backend-cloudbase")
external findPublishApp: findPublishApp = "findPublishApp"

@module("backend-cloudbase")
external findAllPublishApps: findAllPublishApps = "findAllPublishApps"

@module("backend-cloudbase")
external publishElementContribute: publishElementContribute = "publishElementContribute"

@module("backend-cloudbase")
external publishElementAssembleData: publishElementAssembleData = "publishElementAssembleData"

@module("backend-cloudbase")
external publishApp: publishApp = "publishApp"

@module("backend-cloudbase")
external getAllPublishNewestExtensions: getAllPublishNewestExtensions = "getAllPublishNewestExtensions"

@module("backend-cloudbase")
external getElementAssembleData: getElementAssembleData = "getElementAssembleData"

let buildFrontendService = (): FrontendUtils.FrontendType.backendService => {
  {
    init:  init,
    handleLogin: handleLogin,
    getAllPublishExtensionProtocols: getAllPublishExtensionProtocols,
    getAllPublishExtensionProtocolConfigs: getAllPublishExtensionProtocolConfigs,
    getAllPublishExtensionInfos: getAllPublishExtensionInfos,
    findPublishExtension: findPublishExtension,
    getAllPublishContributeProtocols: getAllPublishContributeProtocols,
    getAllPublishContributeProtocolConfigs: getAllPublishContributeProtocolConfigs,
    getAllPublishContributeInfos: getAllPublishContributeInfos,
    findPublishContribute: findPublishContribute,
    findAllPublishApps: findAllPublishApps,
    findPublishApp: findPublishApp,
  }
}

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
