import { contributeName, createExtensionState, extensionName, getContribute, getExtensionLife, getExtensionService, packageProtocolName } from "meta3d-type";
import { blockProtocolName, blockProtocolVersion, contributeProtocolData, extensionProtocolData, versionRange } from "../file/ExtensionFileType";
import { nullable } from "meta3d-commonlib-ts/src/nullable";

type version = string

type account = string

type packageProtocolVersion = versionRange

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
	dependentPackageStoredInAppProtocolNameMap: Record<
		packageProtocolName,
		packageProtocolVersion
	>,
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
	dependentPackageStoredInAppProtocolNameMap: Record<
		packageProtocolName,
		packageProtocolVersion
	>,
	dependentBlockProtocolNameMap: Record<blockProtocolName, blockProtocolVersion>
}


type packageProtocol = {
	name: packageProtocolName,
	version: versionRange,
	iconBase64: string
}

type entryExtensionName = extensionName

type entryExtensionProtocolConfigStr = nullable<string>

type packageName = string

type packageVersion = version

export type packageData = [packageProtocol, entryExtensionName, packageVersion, packageName, entryExtensionProtocolConfigStr]

export type selectedElements = any