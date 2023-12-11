open BackendCloudbaseType

type backendService = {
  init: init,
  handleLoginForWeb3: handleLoginForWeb3,
  checkUserName: checkUserName,
  registerUser: registerUser,
  isLoginSuccess: isLoginSuccess,
  getAllPublishPackageEntryExtensionProtocols: getAllPublishPackageEntryExtensionProtocols,
  getAllPublishExtensionProtocolsCount: getAllPublishExtensionProtocolsCount,
  getAllPublishExtensionProtocols: getAllPublishExtensionProtocols,
  getAllPublishExtensionProtocolConfigs: getAllPublishExtensionProtocolConfigs,
  batchFindPublishExtensionProtocols: batchFindPublishExtensionProtocols,
  batchFindPublishExtensionProtocolConfigs: batchFindPublishExtensionProtocolConfigs,
  getAllPublishPackageInfos: getAllPublishPackageInfos,
  getAllPublishExtensionInfos: getAllPublishExtensionInfos,
  findPublishExtension: findPublishExtension,
  getAllPublishContributeProtocols: getAllPublishContributeProtocols,
  getAllPublishContributeProtocolConfigs: getAllPublishContributeProtocolConfigs,
  batchFindPublishContributeProtocols: batchFindPublishContributeProtocols,
  batchFindPublishContributeProtocolConfigs: batchFindPublishContributeProtocolConfigs,
  getAllPublishContributeInfos: getAllPublishContributeInfos,
  findPublishContribute: findPublishContribute,
  findAllPublishApps: findAllPublishApps,
  findPublishApp: findPublishApp,
  findPublishPackage: findPublishPackage,
  findAllElementAssembleData: findAllElementAssembleData,
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
  protocolDisplayName: string,
  protocolRepoLink: string,
  protocolDescription: string,
  info: implementInfo,
}

type publishContribute = publishExtension
