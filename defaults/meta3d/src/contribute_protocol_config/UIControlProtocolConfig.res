let serializeLib = protocolConfigStr => {
  LibUtils.serializeLib(protocolConfigStr, "UIControlProtocolConfig")
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

let generateHandleUIControlEventStr = (configLib, actionNames, actionParams) => {
  // (LibUtils.getFuncFromLib(configLib, "generateHandleUIControlEventStr")->Obj.magic)(. actionNames, actionParams->Obj.magic->Js.Json.stringify)
  (LibUtils.getFuncFromLib(configLib, "generateHandleUIControlEventStr")->Obj.magic)(. actionNames, actionParams)
}
