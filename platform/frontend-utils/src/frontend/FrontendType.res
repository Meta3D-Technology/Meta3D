open BackendCloudbaseType

type backendService = {
  init: init,
  handleLogin: handleLogin,
  getAllPublishExtensionProtocols: getAllPublishExtensionProtocols,
  getAllPublishExtensionProtocolConfigs: getAllPublishExtensionProtocolConfigs,
  getAllPublishExtensions: getAllPublishExtensions,
  getAllPublishContributeProtocols: getAllPublishContributeProtocols,
  getAllPublishContributeProtocolConfigs: getAllPublishContributeProtocolConfigs,
  getAllPublishContributes: getAllPublishContributes,
}

type service = {backend: backendService}
