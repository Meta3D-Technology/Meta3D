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
  findAllPublishApps: findAllPublishApps,
  findPublishApp: findPublishApp,
  findPublishPackage: findPublishPackage,
  loadExtension: loadExtension,
  loadContribute: loadContribute,
}

type service = {backend: backendService}

type version = string

type publishExtension = {
  protocolName: string,
  protocolVersion: version,
  protocolIconBase64: string,
  info: implementInfo,
}

type publishContribute = publishExtension
