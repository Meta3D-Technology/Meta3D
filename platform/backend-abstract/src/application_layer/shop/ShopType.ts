type account = string

type version = string

type protocolName = string

type protocolVersion = version

type protocolIconBase64 = string

type implementName = string

type implementVersion = version


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