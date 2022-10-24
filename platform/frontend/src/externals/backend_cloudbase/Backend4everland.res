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

let buildFrontendService = (): FrontendUtils.FrontendType.backendService => {
  {
    init: init,
    handleLogin: handleLogin,
    getAllPublishExtensionProtocols: getAllPublishExtensionProtocols,
    getAllPublishExtensionProtocolConfigs: getAllPublishExtensionProtocolConfigs,
    getAllPublishExtensions: getAllPublishExtensions,
  }
}
