open Meta3dType.Index

type versionRange = string

type extensionProtocolData = {
  name: string,
  version: versionRange,
}

type dependentData = {
  protocolName: string,
  protocolVersion: versionRange,
}

type dependentExtensionData = dependentData

type dependentContributeData = dependentData

type extensionPackageData = {
  name: extensionName,
  protocol: extensionProtocolData,
  dependentExtensionNameMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    dependentExtensionNameKey,
    dependentExtensionData,
  >,
  dependentContributeNameMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    dependentContributeNameKey,
    dependentContributeData,
  >,
}

// type extensionFuncData = {
//   getExtensionServiceFunc: getExtensionService<
//     dependentExtensionNameMap,
//     dependentContributeNameMap,
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

type contributeProtocolData = {
  name: string,
  version: versionRange,
}

type contributePackageData = {
  name: contributeName,
  protocol: contributeProtocolData,
  dependentExtensionNameMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    dependentExtensionNameKey,
    dependentExtensionData,
  >,
  dependentContributeNameMap: Meta3dCommonlibType.ImmutableHashMapType.t<
    dependentContributeNameKey,
    dependentContributeData,
  >,
}

// type contributeFuncData = {
//   getContributeFunc: getContribute<
//     dependentExtensionNameMap,
//     dependentContributeNameMap,
//     contribute,
//   >,
// }
type contributeFuncData = Js.Typed_array.Uint8Array.t

type contributeFileData = {
  contributePackageData: contributePackageData,
  contributeFuncData: contributeFuncData,
}
