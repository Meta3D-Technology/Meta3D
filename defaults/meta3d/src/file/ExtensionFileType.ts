import { contributeName, createExtensionState, extensionName, getContribute, getExtensionLife, getExtensionService, packageProtocolName } from "meta3d-type";

export type blockProtocolName = string

export type blockProtocolVersion = versionRange

export type versionRange = string

type version = string

type account = string

export type extensionProtocolData = {
  name: string,
  version: versionRange,
}

export type contributeProtocolData = extensionProtocolData

type packageProtocolVersion = versionRange

export type extensionPackageData = {
  name: extensionName,
  version: version,
  account: account,
  protocol: extensionProtocolData,
  displayName: string,
  repoLink: string,
  description: string,
  dependentPackageStoredInAppProtocolNameMap: Record<
    packageProtocolName,
    packageProtocolVersion
  >,
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



export type contributePackageData = {
  name: contributeName,
  version: version,
  account: account,
  protocol: contributeProtocolData,
  displayName: string,
  repoLink: string,
  description: string,
  dependentPackageStoredInAppProtocolNameMap: Record<
    packageProtocolName,
    packageProtocolVersion
  >,
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