open BackendCloudbaseType

type backendService = {
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

type service = {backend: backendService}
