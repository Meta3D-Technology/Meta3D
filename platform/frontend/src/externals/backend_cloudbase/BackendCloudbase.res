open BackendCloudbaseType

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
external batchFindPublishExtensionProtocols: batchFindPublishExtensionProtocols =
  "batchFindPublishExtensionProtocols"

@module("backend-cloudbase")
external batchFindPublishExtensionProtocolConfigs: batchFindPublishExtensionProtocolConfigs =
  "batchFindPublishExtensionProtocolConfigs"

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
external batchFindPublishContributeProtocols: batchFindPublishContributeProtocols =
  "batchFindPublishContributeProtocols"

@module("backend-cloudbase")
external batchFindPublishContributeProtocolConfigs: batchFindPublishContributeProtocolConfigs =
  "batchFindPublishContributeProtocolConfigs"

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
external findAllPublishAppsByAccount: findAllPublishAppsByAccount = "findAllPublishAppsByAccount"

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
external findAllElementAssembleData: findAllElementAssembleData = "findAllElementAssembleData"

@module("backend-cloudbase")
external publishPackage: publishPackage = "publishPackage"

@module("backend-cloudbase")
external getAllPublishPackageEntryExtensionProtocols: getAllPublishPackageEntryExtensionProtocols =
  "getAllPublishPackageEntryExtensionProtocols"

@module("backend-cloudbase")
external getAllPublishPackageInfos: getAllPublishPackageInfos = "getAllPublishPackageInfos"

@module("backend-cloudbase")
external findPublishPackage: findPublishPackage = "findPublishPackage"

@module("backend-cloudbase")
external findNewestPublishPackage: findNewestPublishPackage = "findNewestPublishPackage"

@module("backend-cloudbase")
external findNewestPublishExtension: findNewestPublishExtension = "findNewestPublishExtension"

@module("backend-cloudbase")
external findNewestPublishContribute: findNewestPublishContribute = "findNewestPublishContribute"

@module("backend-cloudbase")
external findNewestPublishElementAssembleData: findNewestPublishElementAssembleData =
  "findNewestPublishElementAssembleData"

let buildFrontendService = (): FrontendType.backendService => {
  {
    init,
    handleLoginForWeb3,
    checkUserName,
    registerUser,
    isLoginSuccess,
    getAllPublishExtensionProtocolsCount: getAllPublishExtensionProtocolsCount->Obj.magic,
    getAllPublishExtensionProtocols,
    getAllPublishExtensionProtocolConfigs,
    batchFindPublishExtensionProtocols,
    batchFindPublishExtensionProtocolConfigs,
    getAllPublishExtensionInfos,
    findPublishExtension,
    getAllPublishContributeProtocols,
    getAllPublishContributeProtocolConfigs,
    batchFindPublishContributeProtocols,
    batchFindPublishContributeProtocolConfigs,
    getAllPublishContributeInfos,
    findPublishContribute,
    findAllPublishApps,
    findAllPublishAppsByAccount,
    findPublishApp,
    getAllPublishPackageEntryExtensionProtocols,
    getAllPublishPackageInfos,
    findPublishPackage,
    findAllElementAssembleData,
    findNewestPublishPackage,
    findNewestPublishContribute,
  }
}

let buildAssembleSpaceService = (): AssembleSpaceType.backendService => {
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
    // publishElementContribute,
    // publishElementAssembleData,
    // getElementAssembleData,
    findNewestPublishPackage,
    findNewestPublishExtension,
    findNewestPublishContribute,
    // findNewestPublishElementAssembleData,
  }
}
