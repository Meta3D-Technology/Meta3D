open Meta3dType.Index

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
  isStart: bool,
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
  name: contributeName,
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
