open Meta3dType.Index

type version = string

type account = string

// type versionRange = string

// type dependentExtensionData = {
//   protocolName: string,
//   protocolVersion: versionRange,
// }

// type dependentContributeProtocolName = contributeProtocolName

// type dependentContributeData = {
//   protocolName: string,
//   protocolVersion: versionRange,
// }

type extensionType =
  | Default
  | Start
  | Entry

type extensionPackageData = {
  name: extensionName,
  version: version,
  account: account,
  displayName: string,
  repoLink: string,
  description: string,
  // protocolName: extensionProtocolName,
  type_: extensionType,
  // dependentExtensionProtocolNameMap: dependentExtensionProtocolNameMap,
  // dependentContributeProtocolNameMap: dependentContributeProtocolNameMap,
  protocol: ExtensionFileType.extensionProtocolData,
  dependentBlockProtocolNameMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    ExtensionFileType.blockProtocolName,
    ExtensionFileType.blockProtocolVersion,
  >,
  // dependentExtensionProtocolNameMap: Meta3dCommonlibType.ImmutableHashMapType.t<
  //   ExtensionFileType.dependentExtensionProtocolNameKey,
  //   ExtensionFileType.dependentExtensionData,
  // >,
  // dependentContributeProtocolNameMap: Meta3dCommonlibType.ImmutableHashMapType.t<
  //   ExtensionFileType.dependentContributeProtocolNameKey,
  //   ExtensionFileType.dependentContributeData,
  // >,
}

// type extensionFuncData = ExtensionFileType.extensionFuncData
// type extensionFuncData = Js.Typed_array.Uint8Array.t

type extensionFuncData = {
  getExtensionServiceFunc: getExtensionService<extensionService>,
  createExtensionStateFunc: createExtensionState<extensionState>,
  getExtensionLifeFunc: getExtensionLife<extensionService>,
}

type extensionFileData = {
  extensionPackageData: extensionPackageData,
  extensionFuncData: extensionFuncData,
}

type contributePackageData = {
  name: contributeName,
  version: version,
  account: account,
  displayName: string,
  repoLink: string,
  description: string,
  // protocolName: contributeProtocolName,
  // dependentExtensionProtocolNameMap: dependentExtensionProtocolNameMap,
  // dependentContributeProtocolNameMap: dependentContributeProtocolNameMap,
  protocol: ExtensionFileType.contributeProtocolData,
  // dependentExtensionProtocolNameMap: Meta3dCommonlibType.ImmutableHashMapType.t<
  //   ExtensionFileType.dependentExtensionProtocolNameKey,
  //   ExtensionFileType.dependentExtensionData,
  // >,
  // dependentContributeProtocolNameMap: Meta3dCommonlibType.ImmutableHashMapType.t<
  //   ExtensionFileType.dependentContributeProtocolNameKey,
  //   ExtensionFileType.dependentContributeData,
  // >,
  dependentBlockProtocolNameMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    ExtensionFileType.blockProtocolName,
    ExtensionFileType.blockProtocolVersion,
  >,
}

// type contributeFuncData = ExtensionFileType.contributeFuncData
// type contributeFuncData = Js.Typed_array.Uint8Array.t
type contributeFuncData = {getContributeFunc: getContribute<contribute>}

type contributeFileData = {
  contributePackageData: contributePackageData,
  contributeFuncData: contributeFuncData,
}
