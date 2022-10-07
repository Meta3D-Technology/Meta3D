let serializeLib = protocolConfigStr => {
  LibUtils.serializeLib(protocolConfigStr, "ActionProtocolConfig")
}

let getActions = configLib => {
  (LibUtils.getFuncFromLib(configLib, "getActions")->Obj.magic)(.)
}