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
  | #click1
  | #click2
  | #select_asset
  | #drop_asset
  | #select_tree_node
  | #drag_tree_node
  | #input_change
  | #checkbox_select
  | #popup_select
  | #codeedit_submit
  | #list_select
  | #list_remove
  | #value_change
  | #grid_select
]

type actionName = Js.Nullable.t<string>

type versionRange = string

type uiControlSpecicFieldType = [#string | #imageBase64 | #menuItems | #bool | #select | #number | #nullableNumber | #textarea |#rgba]

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

type actionParam

type generateHandleUIControlEventStr = ( array<actionName>, array<array<actionParam>>  )=> string
