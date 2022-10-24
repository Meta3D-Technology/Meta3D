open BackendCloudbaseType

type backendService = {
  init: init,
  handleLogin: handleLogin,
  getAllPublishExtensionProtocols: getAllPublishExtensionProtocols,
  getAllPublishExtensionProtocolConfigs: getAllPublishExtensionProtocolConfigs,
  getAllPublishExtensions: getAllPublishExtensions,
}

type service = {backend: backendService}
