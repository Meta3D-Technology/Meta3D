let buildProtocolConfigStr = () => {
  `
window.StartExtensionProtocolConfig = {
    getNeedConfigData: () => {
        return [
        {
            name: "c1",
            type_: "bool"
        }
    ]
    }
}
`
}
