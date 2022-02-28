export const id = "RegisterExtension"

export type registerExtensionElementState = {
    x: number,
    y: number,
    width: number,
    height: number,
    text: string
}

export type meta3dEventProtocolData = {
    protocolName: "meta3d-event-protocol",
    protocolVersion: "^0.0.1",
}

export type meta3dUIProtocolData = {
    protocolName: "meta3d-ui-protocol",
    protocolVersion: "^0.0.1",
}

export type dependentExtensionProtocolMap = {
    meta3dEventProtocolData: meta3dEventProtocolData,
    meta3dUIProtocolData: meta3dUIProtocolData
}

export type dependentExtensionNameMap = {
    meta3dEventExtensionName: string,
    meta3dUIExtensionName: string
}

