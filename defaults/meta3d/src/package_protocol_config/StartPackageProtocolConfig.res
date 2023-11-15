let serializeLib = protocolConfigStr => {
  LibUtils.serializeLib(protocolConfigStr, "StartPackageProtocolConfig")
}

let getNeedConfigData = configLib => {
  (LibUtils.getFuncFromLib(configLib, "getNeedConfigData")->Obj.magic)(.)
}
