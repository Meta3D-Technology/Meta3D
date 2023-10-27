type rect = {
  x: int,
  y: int,
  width: int,
  height: int,
}

type childrenFunc = (. Index.state) => Index.state

type supportedEventName = [
  | #button_click
  | #run
  | #stop
]

type actionName = Js.Nullable.t<string>

type versionRange = string

type generateUIControlCommonDataStr = string => string

type uiControlSpecicFieldType = [#string]

type uiControlSpecicFieldValue

type uiControlSpecicFieldData = {
  name: string,
  type_: uiControlSpecicFieldType,
  value: uiControlSpecicFieldValue,
}

type uiControlSpecificDataFields = array<uiControlSpecicFieldData>

type getUIControlSpecificDataFields = unit => uiControlSpecificDataFields

type hasChildren = unit => bool

// type eventName = string
// type actionProtocolName = string
type getUIControlSupportedEventNames = unit => array<supportedEventName>
// type getUIControlSupportedEventNames = unit => array<(eventName, actionProtocolName)>

type generateHandleUIControlEventStr = array<actionName> => string
