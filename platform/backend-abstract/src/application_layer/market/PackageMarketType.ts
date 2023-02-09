import { account, protocolName, protocolVersion, protocolIconBase64, implementName, implementVersion, description } from "./MarketType"

type entryExtensionProtocolName = protocolName

type entryExtensionProtocolVersion = protocolVersion

type entryExtensionProtocolIconBase64 = protocolIconBase64

type entryExtensionName = string

type packageImplementInfo = {
    id: string,
    entryExtensionProtocolName: entryExtensionProtocolName,
    entryExtensionProtocolVersion: entryExtensionProtocolVersion,
    entryExtensionProtocolIconBase64: entryExtensionProtocolIconBase64,
    entryExtensionName: entryExtensionName,
    name: implementName,
    version: implementVersion,
    desciption: description,
    account: account,

}

export type packageImplementInfos = Array<packageImplementInfo>