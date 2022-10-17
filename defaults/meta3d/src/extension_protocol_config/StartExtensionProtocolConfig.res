let serializeLib = protocolConfigStr => {
  LibUtils.serializeLib(protocolConfigStr, "StartExtensionProtocolConfig")
}

let getNeedConfigData = configLib => {
  (LibUtils.getFuncFromLib(configLib, "getNeedConfigData")->Obj.magic)(.)
}
