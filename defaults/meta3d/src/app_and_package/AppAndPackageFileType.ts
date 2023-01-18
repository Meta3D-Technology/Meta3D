import { contributeName, createExtensionState, dependentContributeProtocolNameMap, dependentExtensionProtocolNameMap, extensionName, getContribute, getExtensionLife, getExtensionService } from "meta3d-type";

export enum extensionType {
	Default,
	Start,
	Entry
}

export type extensionPackageData = {
	name: extensionName,
	type_: extensionType,
	dependentExtensionProtocolNameMap: dependentExtensionProtocolNameMap,
	dependentContributeProtocolNameMap: dependentContributeProtocolNameMap,
}

export type contributePackageData = {
	name: contributeName,
	dependentExtensionProtocolNameMap: dependentExtensionProtocolNameMap,
	dependentContributeProtocolNameMap: dependentContributeProtocolNameMap,
}
