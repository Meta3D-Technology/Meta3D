import { createExtensionState, extensionName, getContribute, getExtensionLife, getExtensionService } from "meta3d-type";

type dependentExtensionName = string

type dependentContributeName = string

export type extensionPackageData = {
  name: extensionName,
  protocol: {
    name: string,
    version: string
  },
  dependentExtensionNameMap: Record<dependentExtensionName, {
    protocolName: string,
    protocolVersion: string,
  }>,
  dependentContributeNameMap: Record<dependentContributeName, {
    protocolName: string,
    protocolVersion: string,
  }>,
}

export type extensionFuncData<
  dependentExtensionNameMap,
  dependentContributeNameMap,
  extensionService,
  extensionState
  > = {
    readonly getExtensionServiceFunc: getExtensionService<
      dependentExtensionNameMap,
      dependentContributeNameMap,
      extensionService
    >,
    readonly createExtensionStateFunc: createExtensionState<extensionState>,
    readonly getExtensionLifeFunc: getExtensionLife<extensionService>
  };


export type extensionFileData<
  dependentExtensionNameMap,
  dependentContributeNameMap,
  extensionService,
  extensionState
  > = {
    extensionPackageData: extensionPackageData,
    extensionFuncData: extensionFuncData<
      dependentExtensionNameMap,
      dependentContributeNameMap,
      extensionService,
      extensionState
    >
  };

export type contributeFileData<
  dependentExtensionNameMap,
  dependentContributeNameMap,
  contributeService,
  > = {
    readonly contributeName: string;
    readonly getContributeFunc: getContribute<
      dependentExtensionNameMap,
      dependentContributeNameMap,
      contributeService
    >,
  };
