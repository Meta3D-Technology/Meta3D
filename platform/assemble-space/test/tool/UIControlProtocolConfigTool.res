let buildButtonContributeProtocolConfigStr = () => {
  `
window.UIControlProtocolConfig = {
    getSkinProtocolData: () => {
        return {
            protocolName: "meta3d-skin-button-protocol",
            protocolVersion: "^0.5.0",
        }
    },
    generateUIControlDataStr: (rect, skin) => {
        return "{rect: " + rect + ", skin: " + skin + "}"
    },
    generateUIControlName: () => "Button",
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
