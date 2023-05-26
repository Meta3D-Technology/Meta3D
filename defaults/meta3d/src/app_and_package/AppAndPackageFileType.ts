import { contributeName, createExtensionState, extensionName, getContribute, getExtensionLife, getExtensionService } from "meta3d-type";
import { blockProtocolName, blockProtocolVersion } from "../file/ExtensionFileType";

export enum extensionType {
	Default,
	Start,
	Entry
}

export type extensionPackageData = {
	name: extensionName,
	type_: extensionType,
	dependentBlockProtocolNameMap: Record<blockProtocolName, blockProtocolVersion>
}

export type contributePackageData = {
	name: contributeName,
	dependentBlockProtocolNameMap: Record<blockProtocolName, blockProtocolVersion>
}
