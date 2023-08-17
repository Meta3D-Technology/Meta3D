import { contributeName, createExtensionState, extensionName, getContribute, getExtensionLife, getExtensionService } from "meta3d-type";
import { blockProtocolName, blockProtocolVersion, contributeProtocolData, extensionProtocolData } from "../file/ExtensionFileType";

type version = string

type account = string

export enum extensionType {
	Default,
	Start,
	Entry
}

export type extensionPackageData = {
	name: extensionName,
	version: version,
	account: account,
	displayName: string,
	repoLink: string,
	description: string,
	type_: extensionType,
	protocol: extensionProtocolData,
	dependentBlockProtocolNameMap: Record<blockProtocolName, blockProtocolVersion>
}

export type contributePackageData = {
	name: contributeName,
	version: version,
	account: account,
	displayName: string,
	repoLink: string,
	description: string,
	protocol: contributeProtocolData,
	dependentBlockProtocolNameMap: Record<blockProtocolName, blockProtocolVersion>
}
