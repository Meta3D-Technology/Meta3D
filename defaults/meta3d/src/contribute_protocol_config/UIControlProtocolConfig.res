let serializeLib = protocolConfigStr => {
LibUtils.serializeLib(protocolConfigStr, "UIControlProtocolConfig")
}

let generateUIControlName = ( configLib ) => {
  (LibUtils.getFuncFromLib(configLib, "generateUIControlName")->Obj.magic)()
}

let generateUIControlDataStr = ( configLib, rect ) => {
  (LibUtils.getFuncFromLib(configLib, "generateUIControlDataStr")->Obj.magic)(rect)
}

let getUIControlSupportedEventNames = configLib => {
  (LibUtils.getFuncFromLib(configLib, "getUIControlSupportedEventNames")->Obj.magic)()
}

let generateHandleUIControlEventStr = ( configLib, actionNames ) => {
  (LibUtils.getFuncFromLib(configLib, "generateHandleUIControlEventStr")->Obj.magic)(actionNames)
}