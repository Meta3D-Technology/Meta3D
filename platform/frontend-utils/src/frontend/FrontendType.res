open BackendCloudbaseType

type backendService = {
  init: init,
  handleLogin: handleLogin,
  getAllPublishPackageEntryExtensionProtocols: getAllPublishPackageEntryExtensionProtocols,
  getAllPublishExtensionProtocols: getAllPublishExtensionProtocols,
  getAllPublishExtensionProtocolConfigs: getAllPublishExtensionProtocolConfigs,
  getAllPublishPackageInfos: getAllPublishPackageInfos,
  getAllPublishExtensionInfos: getAllPublishExtensionInfos,
  findPublishExtension: findPublishExtension,
  getAllPublishContributeProtocols: getAllPublishContributeProtocols,
  getAllPublishContributeProtocolConfigs: getAllPublishContributeProtocolConfigs,
  getAllPublishContributeInfos: getAllPublishContributeInfos,
  findPublishContribute: findPublishContribute,
  findAllPublishAppsByAccount: findAllPublishAppsByAccount,
  findPublishApp: findPublishApp,
  findPublishPackage: findPublishPackage,
}

type error = (. string, option<int>) => unit

type errorWithExn = (. Js.Exn.t, option<int>) => unit

type consoleService = {error: error, errorWithExn: errorWithExn}

type service = {backend: backendService, console: consoleService}

type version = string

type publishExtension = {
  protocolName: string,
  protocolVersion: version,
  protocolIconBase64: string,
  info: implementInfo,
}

type publishContribute = publishExtension
