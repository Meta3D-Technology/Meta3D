export const elementName = "ShowExtensions"

export type extensionName = string


type extensionData = {
    extensionName: extensionName
}

export type showExtensionsElementState = {
    extensionDataArr: Array<extensionData>
}

export type meta3dEventProtocolData = {
    protocolName: "meta3d-event-protocol",
    protocolVersion: "^0.1.0",
}

export type meta3dUIProtocolData = {
    protocolName: "meta3d-ui-protocol",
    protocolVersion: "^0.1.0",
}

export type dependentExtensionProtocolMap = {
    meta3dEventProtocolData: meta3dEventProtocolData,
    meta3dUIProtocolData: meta3dUIProtocolData
}

export type dependentExtensionNameMap = {
    meta3dEventExtensionName: string,
    meta3dUIExtensionName: string
}


export const SHOWEXTENSION_REGISTER_EXTENSION = "SHOWEXTENSION_REGISTER_EXTENSION";

export type registerExtension = {
    type: typeof SHOWEXTENSION_REGISTER_EXTENSION,
    extensionName: extensionName
}

export type showRegisterAction = registerExtension