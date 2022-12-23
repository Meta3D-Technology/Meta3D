open Meta3dType.Index

type versionRange = string

type dependentExtensionData = {
  protocolName: string,
  protocolVersion: versionRange,
}

// type dependentContributeName = contributeProtocolName

type dependentContributeData = {
  protocolName: string,
  protocolVersion: versionRange,
}

type extensionType =
  | Default
  | Start
  | Entry

type extensionPackageData = {
  protocolName: extensionProtocolName,
  type_: extensionType,
  dependentExtensionNameMap: dependentExtensionNameMap,
  dependentContributeNameMap: dependentContributeNameMap,
}

// type extensionFuncData = ExtensionFileType.extensionFuncData
// type extensionFuncData = Js.Typed_array.Uint8Array.t

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

type contributePackageData = {
  protocolName: contributeProtocolName,
  dependentExtensionNameMap: dependentExtensionNameMap,
  dependentContributeNameMap: dependentContributeNameMap,
}

// type contributeFuncData = ExtensionFileType.contributeFuncData
// type contributeFuncData = Js.Typed_array.Uint8Array.t
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
