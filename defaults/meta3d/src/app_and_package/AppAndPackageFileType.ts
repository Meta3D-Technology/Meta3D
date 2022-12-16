import { contributeName, createExtensionState, dependentContributeNameMap, dependentExtensionNameMap, extensionName, getContribute, getExtensionLife, getExtensionService } from "meta3d-type";

export enum extensionType {
	Default,
	Start,
	Entry
}

export type extensionPackageData = {
	name: extensionName,
	type_: extensionType,
	dependentExtensionNameMap: dependentExtensionNameMap,
	dependentContributeNameMap: dependentContributeNameMap,
}

export type contributePackageData = {
	name: contributeName,
	dependentExtensionNameMap: dependentExtensionNameMap,
	dependentContributeNameMap: dependentContributeNameMap,
}
