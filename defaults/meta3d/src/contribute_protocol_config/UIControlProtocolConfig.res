let serializeLib = protocolConfigStr => {
  LibUtils.serializeLib(protocolConfigStr, "UIControlProtocolConfig")
}

let getSkinProtocolData = configLib => {
  (LibUtils.getFuncFromLib(configLib, "getSkinProtocolData")->Obj.magic)(.)
}

let generateUIControlDataStr = (configLib, rect, skin) => {
  (LibUtils.getFuncFromLib(configLib, "generateUIControlDataStr")->Obj.magic)(. rect, skin)
}

let getUIControlSupportedEventNames = configLib => {
  (LibUtils.getFuncFromLib(configLib, "getUIControlSupportedEventNames")->Obj.magic)(.)
}

let generateHandleUIControlEventStr = (configLib, actionNames) => {
  (LibUtils.getFuncFromLib(configLib, "generateHandleUIControlEventStr")->Obj.magic)(. actionNames)
}
