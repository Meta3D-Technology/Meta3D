let buildButtonContributeProtocolConfigStr = () => {
  `
window.UIControlProtocolConfig = {
    getUIControlSpecificDataFields: () => [],
    getUIControlSupportedEventNames: () => ["button_click"],
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
