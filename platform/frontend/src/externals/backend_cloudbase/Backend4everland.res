open FrontendUtils.BackendCloudbaseType

@module("backend-4everland")
external init: init = "init"

@module("backend-4everland")
external handleLogin: handleLogin = "handleLogin"

@module("backend-4everland")
external getAllPublishExtensionProtocols: getAllPublishExtensionProtocols = "getAllPublishExtensionProtocols"

@module("backend-4everland")
external getAllPublishExtensionProtocolConfigs: getAllPublishExtensionProtocolConfigs = "getAllPublishExtensionProtocolConfigs"

@module("backend-4everland")
external getAllPublishExtensionInfos: getAllPublishExtensionInfos = "getAllPublishExtensionInfos"

@module("backend-4everland")
external findPublishExtension: findPublishExtension = "findPublishExtension"

@module("backend-4everland")
external getAllPublishContributeProtocols: getAllPublishContributeProtocols = "getAllPublishContributeProtocols"

@module("backend-4everland")
external getAllPublishContributeProtocolConfigs: getAllPublishContributeProtocolConfigs = "getAllPublishContributeProtocolConfigs"

@module("backend-4everland")
external getAllPublishContributeInfos: getAllPublishContributeInfos = "getAllPublishContributeInfos"

@module("backend-4everland")
external findPublishContribute: findPublishContribute = "findPublishContribute"

@module("backend-4everland")
external publishApp: publishApp = "publishApp"

@module("backend-4everland")
external findPublishApp: findPublishApp = "findPublishApp"

@module("backend-4everland")
external findAllPublishApps: findAllPublishApps = "findAllPublishApps"

@module("backend-4everland")
external publishElementContribute: publishElementContribute = "publishElementContribute"

@module("backend-4everland")
external publishElementAssembleData: publishElementAssembleData = "publishElementAssembleData"

@module("backend-4everland")
external publishApp: publishApp = "publishApp"

@module("backend-4everland")
external publishPackage: publishPackage = "publishPackage"

@module("backend-4everland")
external getAllPublishNewestExtensions: getAllPublishNewestExtensions = "getAllPublishNewestExtensions"

@module("backend-4everland")
external getElementAssembleData: getElementAssembleData = "getElementAssembleData"

let buildFrontendService = (): FrontendUtils.FrontendType.backendService => {
  {
    init: init,
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
    publishPackage: publishPackage,
    publishApp: publishApp,
    findPublishApp: findPublishApp,
    findAllPublishApps: findAllPublishApps,
    publishElementContribute: publishElementContribute,
    publishElementAssembleData: publishElementAssembleData,
    getElementAssembleData: getElementAssembleData,
  }
}
