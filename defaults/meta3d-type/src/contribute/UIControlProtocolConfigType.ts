import { nullable } from "meta3d-commonlib-ts/src/nullable"
import { state } from "../Index"

export type rect = {
  x: number,
  y: number,
  width: number,
  height: number,
}

export type childrenFunc = (state: state) => state

export type supportedEventName = "button_click" | "run" | "stop" | "click1" | "click2" | "select_asset" | "drop_asset" | "select_tree_node" | "drag_tree_node" | "input_change" | "checkbox_select" | "popup_select" | "codeedit_submit" | "list_select" | "list_remove"

export type actionName = nullable<string>

export type versionRange = string

type uiControlSpecicFieldType = "string" | "imageBase64" | "menuItems" | "bool" | "select" | "number" | "textarea"

type uiControlSpecicFieldValue = any

type uiControlSpecicFieldData = {
  name: string,
  type_: uiControlSpecicFieldType,
  value: uiControlSpecicFieldValue,
}

type uiControlSpecificDataFields = Array<uiControlSpecicFieldData>

export type getUIControlSpecificDataFields = () => uiControlSpecificDataFields

export type hasChildren = () => boolean

export type getUIControlSupportedEventNames = () => Array<supportedEventName>
// export type eventName = string
// export type actionProtocolName = string
// export type getUIControlSupportedEventNames = () => Array<[eventName, actionProtocolName]>

export type generateHandleUIControlEventStr = (actionNames: Array<actionName>) => string

