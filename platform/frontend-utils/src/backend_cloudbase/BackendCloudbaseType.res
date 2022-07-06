// TODO refactor: move type out
type protocol = {
  name: string,
  version: string,
  iconBase64: string,
}

type protocols = array<protocol>

type getAllPublishExtensionProtocols =  unit => Meta3dBsMostProtocol.StreamType.stream<
  protocols,
>

type getAllPublishContributeProtocols =  getAllPublishExtensionProtocols