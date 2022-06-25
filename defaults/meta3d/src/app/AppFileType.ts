import { contributeName, createExtensionState, dependentContributeNameMap, dependentExtensionNameMap, extensionName, getContribute, getExtensionLife, getExtensionService } from "meta3d-type";

export type extensionPackageData = {
	name: extensionName,
	isStart: boolean,
	dependentExtensionNameMap: dependentExtensionNameMap,
	dependentContributeNameMap: dependentContributeNameMap,
}

export type contributePackageData = {
	name: contributeName,
	dependentExtensionNameMap: dependentExtensionNameMap,
	dependentContributeNameMap: dependentContributeNameMap,
}
