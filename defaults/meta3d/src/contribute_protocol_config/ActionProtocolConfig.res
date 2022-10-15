let serializeLib = protocolConfigStr => {
  LibUtils.serializeLib(protocolConfigStr, "ActionProtocolConfig")
}

let getActionName = configLib => {
  (LibUtils.getFuncFromLib(configLib, "getActionName")->Obj.magic)(.)
}

let getActions = configLib => {
  (LibUtils.getFuncFromLib(configLib, "getActions")->Obj.magic)(.)
}