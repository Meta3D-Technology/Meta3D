let serializeLib = protocolConfigStr => {
  LibUtils.serializeLib(protocolConfigStr, "UIControlProtocolConfig")
}

let getSkinProtocolData = configLib => {
  (LibUtils.getFuncFromLib(configLib, "getSkinProtocolData")->Obj.magic)(.)
}

let generateUIControlCommonDataStr = (configLib, rect, skin) => {
  (LibUtils.getFuncFromLib(configLib, "generateUIControlCommonDataStr")->Obj.magic)(. rect, skin)
}

let getUIControlSpecificDataFields = configLib => {
  (LibUtils.getFuncFromLib(configLib, "getUIControlSpecificDataFields")->Obj.magic)()
}

let hasChildren = configLib => {
  (LibUtils.getFuncFromLib(configLib, "hasChildren")->Obj.magic)(.)
}

let getUIControlSupportedEventNames = configLib => {
  (LibUtils.getFuncFromLib(configLib, "getUIControlSupportedEventNames")->Obj.magic)(.)
}

let generateHandleUIControlEventStr = (configLib, actionNames) => {
  (LibUtils.getFuncFromLib(configLib, "generateHandleUIControlEventStr")->Obj.magic)(. actionNames)
}
