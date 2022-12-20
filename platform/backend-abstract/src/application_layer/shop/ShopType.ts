export type account = string

type version = string

export type protocolName = string

export type protocolVersion = version

export type protocolIconBase64 = string

export type implementName = string

export type implementVersion = version


type protocol = {
    name: protocolName,
    version: protocolVersion,
    account: account,
    iconBase64: protocolIconBase64,
}

export type protocols = Array<protocol>

type implementInfo = {
  id: string,
  name: implementName,
  version: implementVersion,
  account: account,
}

export type implementInfos = Array<implementInfo>