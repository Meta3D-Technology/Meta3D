open FrontendUtils.BackendCloudbaseType

@module("backend-cloudbase")
external init: init = ""

@module("backend-cloudbase")
external handleLogin: handleLogin = ""

@module("backend-cloudbase")
external getAllPublishExtensionProtocols: getAllPublishExtensionProtocols = ""

@module("backend-cloudbase")
external getAllPublishExtensionProtocolConfigs: getAllPublishExtensionProtocolConfigs = ""

@module("backend-cloudbase")
external getAllPublishExtensions: getAllPublishExtensions = ""

@module("backend-cloudbase")
external getAllPublishContributeProtocols: getAllPublishContributeProtocols = ""

@module("backend-cloudbase")
external getAllPublishContributeProtocolConfigs: getAllPublishContributeProtocolConfigs = ""

@module("backend-cloudbase")
external getAllPublishContributes: getAllPublishContributes = ""

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
