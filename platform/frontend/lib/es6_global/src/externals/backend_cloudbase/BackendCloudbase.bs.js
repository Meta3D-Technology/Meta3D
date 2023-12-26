

import * as BackendCloudbase from "backend-cloudbase";

function buildFrontendService(param) {
  return {
          init: BackendCloudbase.init,
          handleLoginForWeb3: BackendCloudbase.handleLoginForWeb3,
          checkUserName: BackendCloudbase.checkUserName,
          registerUser: BackendCloudbase.registerUser,
          isLoginSuccess: BackendCloudbase.isLoginSuccess,
          getAllPublishPackageEntryExtensionProtocols: BackendCloudbase.getAllPublishPackageEntryExtensionProtocols,
          getAllPublishExtensionProtocolsCount: BackendCloudbase.getAllPublishExtensionProtocolsCount,
          getAllPublishExtensionProtocols: BackendCloudbase.getAllPublishExtensionProtocols,
          getAllPublishExtensionProtocolConfigs: BackendCloudbase.getAllPublishExtensionProtocolConfigs,
          batchFindPublishExtensionProtocols: BackendCloudbase.batchFindPublishExtensionProtocols,
          batchFindPublishExtensionProtocolConfigs: BackendCloudbase.batchFindPublishExtensionProtocolConfigs,
          getAllPublishPackageInfos: BackendCloudbase.getAllPublishPackageInfos,
          getAllPublishExtensionInfos: BackendCloudbase.getAllPublishExtensionInfos,
          findPublishExtension: BackendCloudbase.findPublishExtension,
          getAllPublishContributeProtocols: BackendCloudbase.getAllPublishContributeProtocols,
          getAllPublishContributeProtocolConfigs: BackendCloudbase.getAllPublishContributeProtocolConfigs,
          batchFindPublishContributeProtocols: BackendCloudbase.batchFindPublishContributeProtocols,
          batchFindPublishContributeProtocolConfigs: BackendCloudbase.batchFindPublishContributeProtocolConfigs,
          getAllPublishContributeInfos: BackendCloudbase.getAllPublishContributeInfos,
          findPublishContribute: BackendCloudbase.findPublishContribute,
          findAllPublishApps: BackendCloudbase.findAllPublishApps,
          findAllPublishAppsByAccount: BackendCloudbase.findAllPublishAppsByAccount,
          findAllRecommendPublishApps: BackendCloudbase.findAllRecommendPublishApps,
          findPublishApp: BackendCloudbase.findPublishApp,
          findPublishPackage: BackendCloudbase.findPublishPackage,
          findNewestPublishPackage: BackendCloudbase.findNewestPublishPackage,
          findNewestPublishContribute: BackendCloudbase.findNewestPublishContribute
        };
}

function buildAssembleSpaceService(param) {
  return {
          getAllPublishExtensionProtocols: BackendCloudbase.getAllPublishExtensionProtocols,
          getAllPublishContributeProtocols: BackendCloudbase.getAllPublishContributeProtocols,
          getAllPublishContributeProtocolConfigs: BackendCloudbase.getAllPublishContributeProtocolConfigs,
          getAllPublishExtensionProtocolConfigs: BackendCloudbase.getAllPublishExtensionProtocolConfigs,
          publishApp: BackendCloudbase.publishApp,
          publishPackage: BackendCloudbase.publishPackage,
          findPublishApp: BackendCloudbase.findPublishApp,
          findAllPublishApps: BackendCloudbase.findAllPublishApps,
          findNewestPublishPackage: BackendCloudbase.findNewestPublishPackage,
          findNewestPublishExtension: BackendCloudbase.findNewestPublishExtension,
          findNewestPublishContribute: BackendCloudbase.findNewestPublishContribute
        };
}

export {
  buildFrontendService ,
  buildAssembleSpaceService ,
}
/* backend-cloudbase Not a pure module */
