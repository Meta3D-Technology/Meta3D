open FrontendUtils.BackendCloudbaseType

@module("backend-4everland")
external init: init = ""

@module("backend-4everland")
external handleLogin: handleLogin = ""

@module("backend-4everland")
external getAllPublishExtensionProtocols: getAllPublishExtensionProtocols = ""

@module("backend-4everland")
external getAllPublishExtensionProtocolConfigs: getAllPublishExtensionProtocolConfigs = ""

@module("backend-4everland")
external getAllPublishExtensions: getAllPublishExtensions = ""

@module("backend-4everland")
external getAllPublishContributeProtocols: getAllPublishContributeProtocols = ""

@module("backend-4everland")
external getAllPublishContributeProtocolConfigs: getAllPublishContributeProtocolConfigs = ""

@module("backend-4everland")
external getAllPublishContributes: getAllPublishContributes = ""

@module("backend-4everland")
external publishApp: publishApp = ""

@module("backend-4everland")
external findPublishApp: findPublishApp = ""

@module("backend-4everland")
external findAllPublishApps: findAllPublishApps = ""

@module("backend-4everland")
external publishElementContribute: publishElementContribute = ""

@module("backend-4everland")
external publishElementAssembleData: publishElementAssembleData = ""

@module("backend-4everland")
external publishApp: publishApp = ""

@module("backend-4everland")
external getAllPublishNewestExtensions: getAllPublishNewestExtensions = ""

@module("backend-4everland")
external getElementAssembleData: getElementAssembleData = ""

let buildFrontendService = (): FrontendUtils.FrontendType.backendService => {
  {
    init: init,
    handleLogin: handleLogin,
    getAllPublishExtensionProtocols: getAllPublishExtensionProtocols,
    getAllPublishExtensionProtocolConfigs: getAllPublishExtensionProtocolConfigs,
    getAllPublishExtensions: getAllPublishExtensions,
    getAllPublishContributeProtocols: getAllPublishContributeProtocols,
    getAllPublishContributeProtocolConfigs: getAllPublishContributeProtocolConfigs,
    getAllPublishContributes: getAllPublishContributes,
  }
}

let buildAssembleSpaceService = (): FrontendUtils.AssembleSpaceType.backendService => {
  {
    getAllPublishExtensionProtocols: getAllPublishExtensionProtocols->Obj.magic,
    getAllPublishContributeProtocols: getAllPublishContributeProtocols->Obj.magic,
    getAllPublishContributeProtocolConfigs: getAllPublishContributeProtocolConfigs->Obj.magic,
    getAllPublishExtensionProtocolConfigs: getAllPublishExtensionProtocolConfigs->Obj.magic,
    getAllPublishExtensions: getAllPublishExtensions->Obj.magic,
    getAllPublishNewestExtensions: getAllPublishNewestExtensions->Obj.magic,
    publishApp: publishApp,
    findPublishApp: findPublishApp,
    findAllPublishApps: findAllPublishApps,
    publishElementContribute: publishElementContribute,
    publishElementAssembleData: publishElementAssembleData,
    getElementAssembleData: getElementAssembleData,
  }
}
