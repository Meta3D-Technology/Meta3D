open Js.Typed_array

type eventName = string

type singleInputData

type inputData = array<singleInputData>

type eventData = {
  name: eventName,
  isOnlyRead: Js.Nullable.t<bool>,
  inputData: inputData,
}

type service = {
  parseEventData: ArrayBuffer.t => array<eventData>,
  exportEventData: array<eventData> => unit,
  generateEventDataBuffer: array<eventData> => ArrayBuffer.t,
}
