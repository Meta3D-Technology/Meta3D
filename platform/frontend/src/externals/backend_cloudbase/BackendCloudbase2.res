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

let buildFrontendService = (): FrontendUtils.FrontendType.backendService => {
  {
    init: init,
    handleLogin: handleLogin,
    getAllPublishExtensionProtocols: getAllPublishExtensionProtocols,
    getAllPublishExtensionProtocolConfigs: getAllPublishExtensionProtocolConfigs,
    getAllPublishExtensions: getAllPublishExtensions,
  }
}
