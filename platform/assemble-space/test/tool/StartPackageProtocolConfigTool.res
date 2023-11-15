let buildProtocolConfigStr = () => {
  `
window.StartPackageProtocolConfig = {
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
