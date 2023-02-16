open FrontendUtils.BackendCloudbaseType

@module("backend-cloudbase")
external init: init = "init"

@module("backend-cloudbase")
external handleLoginForWeb3: handleLoginForWeb3 = "handleLoginForWeb3"

@module("backend-cloudbase")
external checkUserName: checkUserName = "checkUserName"

@module("backend-cloudbase")
external registerUser: registerUser = "registerUser"

@module("backend-cloudbase")
external isLoginSuccess: isLoginSuccess = "isLoginSuccess"

@module("backend-cloudbase")
external getAllPublishExtensionProtocolsCount: getAllPublishExtensionProtocolsCount =
  "getAllPublishExtensionProtocolsCount"

@module("backend-cloudbase")
external getAllPublishExtensionProtocols: getAllPublishExtensionProtocols =
  "getAllPublishExtensionProtocols"

@module("backend-cloudbase")
external getAllPublishExtensionProtocolConfigs: getAllPublishExtensionProtocolConfigs =
  "getAllPublishExtensionProtocolConfigs"

@module("backend-cloudbase")
external getAllPublishExtensionInfos: getAllPublishExtensionInfos = "getAllPublishExtensionInfos"

@module("backend-cloudbase")
external findPublishExtension: findPublishExtension = "findPublishExtension"

@module("backend-cloudbase")
external getAllPublishContributeProtocols: getAllPublishContributeProtocols =
  "getAllPublishContributeProtocols"

@module("backend-cloudbase")
external getAllPublishContributeProtocolConfigs: getAllPublishContributeProtocolConfigs =
  "getAllPublishContributeProtocolConfigs"

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
external getAllPublishNewestExtensions: getAllPublishNewestExtensions =
  "getAllPublishNewestExtensions"

@module("backend-cloudbase")
external getElementAssembleData: getElementAssembleData = "getElementAssembleData"

@module("backend-cloudbase")
external publishPackage: publishPackage = "publishPackage"

@module("backend-cloudbase")
external getAllPublishPackageEntryExtensionProtocols: getAllPublishPackageEntryExtensionProtocols =
  "getAllPublishPackageEntryExtensionProtocols"

@module("backend-cloudbase")
external getAllPublishPackageInfos: getAllPublishPackageInfos = "getAllPublishPackageInfos"

@module("backend-cloudbase")
external findPublishPackage: findPublishPackage = "findPublishPackage"

let buildFrontendService = (): FrontendUtils.FrontendType.backendService => {
  {
    init,
    handleLoginForWeb3,
    checkUserName,
    registerUser,
    isLoginSuccess,
    getAllPublishExtensionProtocolsCount: getAllPublishExtensionProtocolsCount->Obj.magic,
    getAllPublishExtensionProtocols,
    getAllPublishExtensionProtocolConfigs,
    getAllPublishExtensionInfos,
    findPublishExtension,
    getAllPublishContributeProtocols,
    getAllPublishContributeProtocolConfigs,
    getAllPublishContributeInfos,
    findPublishContribute,
    findAllPublishApps,
    findPublishApp,
    getAllPublishPackageEntryExtensionProtocols,
    getAllPublishPackageInfos,
    findPublishPackage,
  }
}

let buildAssembleSpaceService = (): FrontendUtils.AssembleSpaceType.backendService => {
  {
    getAllPublishExtensionProtocols: getAllPublishExtensionProtocols->Obj.magic,
    getAllPublishContributeProtocols: getAllPublishContributeProtocols->Obj.magic,
    getAllPublishContributeProtocolConfigs: getAllPublishContributeProtocolConfigs->Obj.magic,
    getAllPublishExtensionProtocolConfigs: getAllPublishExtensionProtocolConfigs->Obj.magic,
    getAllPublishNewestExtensions: getAllPublishNewestExtensions->Obj.magic,
    publishApp,
    publishPackage,
    findPublishApp,
    findAllPublishApps,
    publishElementContribute,
    publishElementAssembleData,
    getElementAssembleData,
  }
}
