import { nullable } from "meta3d-commonlib-ts/src/nullable"

export type rect = {
  x: number,
  y: number,
  width: number,
  height: number,
}

export type supportedEventName = "click"

export type actionName = nullable<string>

export type versionRange = string

export type skinProtocolData = {
  protocolName: string,
  protocolVersion: versionRange,
}

export type getSkinProtocolData = () => skinProtocolData

export type generateUIControlDataStr = (rect: string, skin: string) => string

export type getUIControlSupportedEventNames = () => Array<supportedEventName>

export type generateHandleUIControlEventStr = (actionNames: Array<actionName>) => string

