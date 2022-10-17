let buildProtocolConfigStr = () => {
  `
window.StartExtensionProtocolConfig = {
    getNeedConfigData: () => {
        return [
        {
            name: "isDebug",
            type_: "bool"
        }
    ]
    }
}
`
}
