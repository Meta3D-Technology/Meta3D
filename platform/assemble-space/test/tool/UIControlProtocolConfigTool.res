let buildButtonContributeProtocolConfigStr = () => {
  `window.UIControlProtocolConfig = {
    generateUIControlDataStr: (rect) => {
        return "{    rect: " + rect + "}"
    },
    generateUIControlName: () => "Button",
    getUIControlSupportedEventNames: () => ["click"],
    generateHandleUIControlEventStr: ([clickActionName]) => {
        if (clickActionName !== null && clickActionName !== undefined) {
            return "handle click event code..."
        }

        return ""
    }
}`
}
