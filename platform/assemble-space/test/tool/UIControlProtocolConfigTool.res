let buildButtonContributeProtocolConfigStr = () => {
  `
window.UIControlProtocolConfig = {
    getSkinProtocolData: () => {
        return {
            protocolName: "meta3d-skin-button-protocol",
            protocolVersion: "^0.6.0",
        }
    },
    generateUIControlCommonDataStr: (rect, skin) => {
        return "{rect: " + rect + ", skin: " + skin + "}"
    },
    getUIControlSpecificDataFields: () => [],
    getUIControlSupportedEventNames: () => ["click"],
    generateHandleUIControlEventStr: ([clickActionName]) => {
        if (clickActionName !== null && clickActionName !== undefined) {
            return "handle click event code..."
        }

        return ""
    }
}
`
}

let buildWindowContributeProtocolConfigStr = () => {
  `
window.UIControlProtocolConfig = {
    getSkinProtocolData: () => {
        return {
            protocolName: "meta3d-skin-button-protocol",
            protocolVersion: "^0.6.0",
        }
    },
    generateUIControlCommonDataStr: (rect, skin) => {
        return "{rect: " + rect + ", skin: " + skin + "}"
    },
    getUIControlSpecificDataFields: () => [
    {
        name: "label",
        type_: "string",
        value: "Window"
    }
],
    getUIControlSupportedEventNames: () => [],
    generateHandleUIControlEventStr: ([]) => {
        return ""
    }
}
`
}
