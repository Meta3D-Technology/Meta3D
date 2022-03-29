@genType
type meta3dBsMostExtensionProtocolData = {
  protocolName: [#"meta3d-bs-most-protocol"],
  protocolVersion: [#"^0.2.0"],
}

@genType
type dependentExtensionProtocolMap = {
  meta3dBsMostExtensionProtocol: meta3dBsMostExtensionProtocolData,
}

@genType
type dependentExtensionNameMap = {meta3dBsMostExtensionName: string}
