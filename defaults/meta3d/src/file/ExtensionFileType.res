open Meta3dType.Index

@genType
type extensionFileData = {
  extensionName: string,
  getExtensionServiceFunc: getExtensionService<
    dependentExtensionNameMap,
    dependentContributeNameMap,
    extensionService,
  >,
  createExtensionStateFunc: createExtensionState<extensionState>,
  getExtensionLifeFunc: getExtensionLife<extensionService>,
}

// type contributeFileData = {
//   contributeName: string,
//   getContributeFunc: getContributeFunc,
// }
