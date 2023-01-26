open Meta3dType.Index

type versionRange = string

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
  // protocolName: extensionProtocolName,
  type_: extensionType,
  // dependentExtensionProtocolNameMap: dependentExtensionProtocolNameMap,
  // dependentContributeProtocolNameMap: dependentContributeProtocolNameMap,
  protocol: ExtensionFileType.extensionProtocolData,
  dependentExtensionProtocolNameMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    dependentExtensionProtocolNameKey,
    ExtensionFileType.dependentExtensionData,
  >,
  dependentContributeProtocolNameMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    dependentContributeProtocolNameKey,
    ExtensionFileType.dependentContributeData,
  >,
}

// type extensionFuncData = ExtensionFileType.extensionFuncData
// type extensionFuncData = Js.Typed_array.Uint8Array.t

type extensionFuncData = {
  getExtensionServiceFunc: getExtensionService<
    dependentExtensionProtocolNameMap,
    dependentContributeProtocolNameMap,
    extensionService,
  >,
  createExtensionStateFunc: createExtensionState<extensionState>,
  getExtensionLifeFunc: getExtensionLife<extensionService>,
}

type extensionFileData = {
  extensionPackageData: extensionPackageData,
  extensionFuncData: extensionFuncData,
}

type contributePackageData = {
  name: contributeName,
  // protocolName: contributeProtocolName,
  // dependentExtensionProtocolNameMap: dependentExtensionProtocolNameMap,
  // dependentContributeProtocolNameMap: dependentContributeProtocolNameMap,
  protocol: ExtensionFileType.contributeProtocolData,
  dependentExtensionProtocolNameMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    dependentExtensionProtocolNameKey,
    ExtensionFileType.dependentExtensionData,
  >,
  dependentContributeProtocolNameMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    dependentContributeProtocolNameKey,
    ExtensionFileType.dependentContributeData,
  >,
}

// type contributeFuncData = ExtensionFileType.contributeFuncData
// type contributeFuncData = Js.Typed_array.Uint8Array.t
type contributeFuncData = {
  getContributeFunc: getContribute<
    dependentExtensionProtocolNameMap,
    dependentContributeProtocolNameMap,
    contribute,
  >,
}

type contributeFileData = {
  contributePackageData: contributePackageData,
  contributeFuncData: contributeFuncData,
}
