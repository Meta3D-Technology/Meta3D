type rect = {
  x: int,
  y: int,
  width: int,
  height: int,
}

type childrenFunc = (. Index.state) => Index.state

type supportedEventName = [#click]

type actionName = Js.Nullable.t<string>

type versionRange = string

type skinProtocolData = {
  protocolName: string,
  protocolVersion: versionRange,
}

type getSkinProtocolData = unit => skinProtocolData

type generateUIControlCommonDataStr = (string, string) => string

type uiControlSpecicFieldType = [#string]

type uiControlSpecicFieldValue

type uiControlSpecicFieldData = {
  name: string,
  type_: uiControlSpecicFieldType,
  value: uiControlSpecicFieldValue,
}

type uiControlSpecificDataFields = array<uiControlSpecicFieldData>

type getUIControlSpecificDataFields = unit => uiControlSpecificDataFields

type getUIControlSupportedEventNames = unit => array<supportedEventName>

type generateHandleUIControlEventStr = array<actionName> => string
