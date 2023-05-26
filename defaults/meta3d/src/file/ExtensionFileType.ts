import { contributeName, createExtensionState, extensionName, getContribute, getExtensionLife, getExtensionService } from "meta3d-type";

export type blockProtocolName = string

export type blockProtocolVersion = versionRange

type versionRange = string

export type extensionPackageData = {
  name: extensionName,
  protocol: {
    name: string,
    version: versionRange
  },
  displayName: string,
  repoLink: string,
  description: string,
  dependentBlockProtocolNameMap: Record<
    blockProtocolName,
    blockProtocolVersion
  >
}

// export type extensionFuncData<
//   dependentExtensionProtocolNameMap,
//   dependentContributeProtocolNameMap,
//   extensionService,
//   extensionState
//   > = {
//     readonly getExtensionServiceFunc: getExtensionService<
//       dependentExtensionProtocolNameMap,
//       dependentContributeProtocolNameMap,
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
  displayName: string,
  repoLink: string,
  description: string,
  dependentBlockProtocolNameMap: Record<
    blockProtocolName,
    blockProtocolVersion
  >
}

// export type contributeFuncData<
//   dependentExtensionProtocolNameMap,
//   dependentContributeProtocolNameMap,
//   contributeService
//   > = {
//     readonly getContributeFunc: getContribute<
//       dependentExtensionProtocolNameMap,
//       dependentContributeProtocolNameMap,
//       contributeService
//     >,
//   };

export type contributeFuncData = Uint8Array

export type contributeFileData = {
  contributePackageData: contributePackageData,
  contributeFuncData: contributeFuncData
};