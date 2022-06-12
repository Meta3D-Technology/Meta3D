open Meta3dType.Index

type extensionProtocolData = {
  name: string,
  version: string,
}

type dependentExtensionName = extensionName

type dependentExtensionData = {
  protocolName: string,
  protocolVersion: string,
}

type dependentContributeName = contributeName

type dependentContributeData = {
  protocolName: string,
  protocolVersion: string,
}

type extensionPackageData = {
  name: extensionName,
  protocol: extensionProtocolData,
  dependentExtensionNameMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    dependentExtensionName,
    dependentExtensionData,
  >,
  dependentContributeNameMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    dependentContributeName,
    dependentContributeData,
  >,
}

type extensionFuncData = {
  getExtensionServiceFunc: getExtensionService<
    dependentExtensionNameMap,
    dependentContributeNameMap,
    extensionService,
  >,
  createExtensionStateFunc: createExtensionState<extensionState>,
  getExtensionLifeFunc: getExtensionLife<extensionService>,
}

type extensionFileData = {
  extensionPackageData: extensionPackageData,
  extensionFuncData: extensionFuncData,
}

type contributeProtocolData = {
  name: string,
  version: string,
}

type contributePackageData = {
  name: contributeName,
  protocol: contributeProtocolData,
  dependentExtensionNameMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    dependentExtensionName,
    dependentExtensionData,
  >,
  dependentContributeNameMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    dependentContributeName,
    dependentContributeData,
  >,
}

type contributeFuncData = {
  getContributeFunc: getContribute<
    dependentExtensionNameMap,
    dependentContributeNameMap,
    contribute,
  >,
}

type contributeFileData = {
  contributePackageData: contributePackageData,
  contributeFuncData: contributeFuncData,
}
