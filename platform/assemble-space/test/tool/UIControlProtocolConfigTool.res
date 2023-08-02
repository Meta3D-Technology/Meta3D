let buildButtonContributeProtocolConfigStr = () => {
  `
window.UIControlProtocolConfig = {
    generateUIControlCommonDataStr: (rect) => {
        return "{rect: " + rect + "}"
    },
    getUIControlSpecificDataFields: () => [],
    getUIControlSupportedEventNames: () => [["click", "meta3d-action-button-click-protocol"]],
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
    generateUIControlCommonDataStr: (rect) => {
        return "{rect: " + rect + "}"
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
