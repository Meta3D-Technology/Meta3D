

import * as BackendEverland from "backend-4everland";

function buildFrontendService(param) {
  return {
          init: BackendEverland.init,
          handleLoginForWeb3: BackendEverland.handleLoginForWeb3,
          checkUserName: 1,
          registerUser: 1,
          isLoginSuccess: 1,
          getAllPublishPackageEntryExtensionProtocols: BackendEverland.getAllPublishPackageEntryExtensionProtocols,
          getAllPublishExtensionProtocolsCount: 1,
          getAllPublishExtensionProtocols: BackendEverland.getAllPublishExtensionProtocols,
          getAllPublishExtensionProtocolConfigs: BackendEverland.getAllPublishExtensionProtocolConfigs,
          batchFindPublishExtensionProtocols: BackendEverland.batchFindPublishExtensionProtocols,
          batchFindPublishExtensionProtocolConfigs: BackendEverland.batchFindPublishExtensionProtocolConfigs,
          getAllPublishPackageInfos: BackendEverland.getAllPublishPackageInfos,
          getAllPublishExtensionInfos: BackendEverland.getAllPublishExtensionInfos,
          findPublishExtension: BackendEverland.findPublishExtension,
          getAllPublishContributeProtocols: BackendEverland.getAllPublishContributeProtocols,
          getAllPublishContributeProtocolConfigs: BackendEverland.getAllPublishContributeProtocolConfigs,
          batchFindPublishContributeProtocols: BackendEverland.batchFindPublishContributeProtocols,
          batchFindPublishContributeProtocolConfigs: BackendEverland.batchFindPublishContributeProtocolConfigs,
          getAllPublishContributeInfos: BackendEverland.getAllPublishContributeInfos,
          findPublishContribute: BackendEverland.findPublishContribute,
          findAllPublishApps: BackendEverland.findAllPublishApps,
          findAllPublishAppsByAccount: BackendEverland.findAllPublishAppsByAccount,
          findAllRecommendPublishApps: BackendEverland.findAllRecommendPublishApps,
          findPublishApp: BackendEverland.findPublishApp,
          findPublishPackage: BackendEverland.findPublishPackage,
          findNewestPublishPackage: BackendEverland.findNewestPublishPackage,
          findNewestPublishContribute: BackendEverland.findNewestPublishContribute
        };
}

function buildAssembleSpaceService(param) {
  return {
          getAllPublishExtensionProtocols: BackendEverland.getAllPublishExtensionProtocols,
          getAllPublishContributeProtocols: BackendEverland.getAllPublishContributeProtocols,
          getAllPublishContributeProtocolConfigs: BackendEverland.getAllPublishContributeProtocolConfigs,
          getAllPublishExtensionProtocolConfigs: BackendEverland.getAllPublishExtensionProtocolConfigs,
          publishApp: BackendEverland.publishApp,
          publishPackage: BackendEverland.publishPackage,
          findPublishApp: BackendEverland.findPublishApp,
          findAllPublishApps: BackendEverland.findAllPublishApps,
          findNewestPublishPackage: BackendEverland.findNewestPublishPackage,
          findNewestPublishExtension: BackendEverland.findNewestPublishExtension,
          findNewestPublishContribute: BackendEverland.findNewestPublishContribute
        };
}

export {
  buildFrontendService ,
  buildAssembleSpaceService ,
}
/* backend-4everland Not a pure module */
