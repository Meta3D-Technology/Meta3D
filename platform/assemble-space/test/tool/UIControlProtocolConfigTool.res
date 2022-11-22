let buildButtonContributeProtocolConfigStr = () => {
  `
window.UIControlProtocolConfig = {
    generateUIControlCommonDataStr: (rect) => {
        return "{rect: " + rect + "}"
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
