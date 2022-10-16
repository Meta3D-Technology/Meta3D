type rect = {
  x: int,
  y: int,
  width: int,
  height: int,
}

type supportedEventName = [#click]

type actionName = Js.Nullable.t<string>

type versionRange = string

type skinProtocolData = {
  protocolName: string,
  protocolVersion: versionRange,
}

type getSkinProtocolData = unit => skinProtocolData

type generateUIControlDataStr = (string, string) => string

type getUIControlSupportedEventNames = unit => array<supportedEventName>

type generateHandleUIControlEventStr = array<actionName> => string
