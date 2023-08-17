export type account = string

type version = string

export type protocolName = string

export type protocolDisplayName = string

export type protocolVersion = version

export type protocolIconBase64 = string

export type config = string

export type implementName = string

export type implementDisplayName = string

export type implementVersion = version

export type repoLink = string

export type description = string


type protocol = {
  name: protocolName,
  version: protocolVersion,
  account: account,
  iconBase64: protocolIconBase64,
  displayName: protocolDisplayName,
  repoLink: repoLink,
  description: description,
}

export type protocols = Array<protocol>

type protocolConfig = {
  name: protocolName,
  version: protocolVersion,
  account: account,
  configStr:config,
}

export type protocolConfigs = Array<protocolConfig>

type implementInfo = {
  id: string,
  name: implementName,
  version: implementVersion,
  account: account,
  displayName: implementDisplayName,
  repoLink: repoLink,
  description: description,
}

export type implementInfos = Array<implementInfo>