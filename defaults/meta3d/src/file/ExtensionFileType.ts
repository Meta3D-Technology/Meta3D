import { contributeName, createExtensionState, extensionName, getContribute, getExtensionLife, getExtensionService } from "meta3d-type";

type dependentExtensionName = string

type dependentContributeName = string

type versionRange = string

export type extensionPackageData = {
  name: extensionName,
  protocol: {
    name: string,
    version: versionRange
  },
  dependentExtensionNameMap: Record<dependentExtensionName, {
    protocolName: string,
    protocolVersion: versionRange,
  }>,
  dependentContributeNameMap: Record<dependentContributeName, {
    protocolName: string,
    protocolVersion: versionRange,
  }>,
}

// export type extensionFuncData<
//   dependentExtensionNameMap,
//   dependentContributeNameMap,
//   extensionService,
//   extensionState
//   > = {
//     readonly getExtensionServiceFunc: getExtensionService<
//       dependentExtensionNameMap,
//       dependentContributeNameMap,
//       extensionService
//     >,
//     readonly createExtensionStateFunc: createExtensionState<extensionState>,
//     readonly getExtensionLifeFunc: getExtensionLife<extensionService>
//   };

export type extensionFuncData = Uint8Array

export type extensionFileData = {
  extensionPackageData: extensionPackageData,
  extensionFuncData: extensionFuncData
};

export type extensionProtocolData = {
  name: string,
  version: versionRange,
}



export type contributePackageData = {
  name: contributeName,
  protocol: {
    name: string,
    version: versionRange
  },
  dependentExtensionNameMap: Record<dependentExtensionName, {
    protocolName: string,
    protocolVersion: versionRange,
  }>,
  dependentContributeNameMap: Record<dependentContributeName, {
    protocolName: string,
    protocolVersion: versionRange,
  }>,
}

// export type contributeFuncData<
//   dependentExtensionNameMap,
//   dependentContributeNameMap,
//   contributeService
//   > = {
//     readonly getContributeFunc: getContribute<
//       dependentExtensionNameMap,
//       dependentContributeNameMap,
//       contributeService
//     >,
//   };

export type contributeFuncData = Uint8Array

export type contributeFileData<
  dependentExtensionNameMap,
  dependentContributeNameMap,
  contribubteService
  > = {
    contributePackageData: contributePackageData,
    contributeFuncData: contributeFuncData
  };