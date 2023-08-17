open Meta3dType.Index

type account = string

type version = string

type versionRange = string

type extensionProtocolData = {
  name: string,
  version: versionRange,
}

type blockProtocolName = string

type blockProtocolVersion = versionRange

// type dependentExtensionProtocolNameKey = string

// type dependentContributeProtocolNameKey = string

// type dependentData = {
//   protocolName: string,
//   protocolVersion: versionRange,
// }

// type dependentExtensionData = dependentData

// type dependentContributeData = dependentData

type extensionPackageData = {
  name: extensionName,
  version: version,
  account: account,
  protocol: extensionProtocolData,
  displayName: string,
  repoLink: string,
  description: string,
  dependentBlockProtocolNameMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    blockProtocolName,
    blockProtocolVersion,
  >,
}

// type extensionFuncData = {
//   getExtensionServiceFunc: getExtensionService<
//     dependentExtensionProtocolNameMap,
//     dependentContributeProtocolNameMap,
//     extensionService,
//   >,
//   createExtensionStateFunc: createExtensionState<extensionState>,
//   getExtensionLifeFunc: getExtensionLife<extensionService>,
// }

type extensionFuncData = Js.Typed_array.Uint8Array.t

type extensionFileData = {
  extensionPackageData: extensionPackageData,
  extensionFuncData: extensionFuncData,
}

type contributeProtocolData = extensionProtocolData

type contributePackageData = {
  name: contributeName,
  version: version,
  account: account,
  protocol: contributeProtocolData,
  displayName: string,
  repoLink: string,
  description: string,
  dependentBlockProtocolNameMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    blockProtocolName,
    blockProtocolVersion,
  >,
}

// type contributeFuncData = {
//   getContributeFunc: getContribute<
//     dependentExtensionProtocolNameMap,
//     dependentContributeProtocolNameMap,
//     contribute,
//   >,
// }
type contributeFuncData = Js.Typed_array.Uint8Array.t

type contributeFileData = {
  contributePackageData: contributePackageData,
  contributeFuncData: contributeFuncData,
}
