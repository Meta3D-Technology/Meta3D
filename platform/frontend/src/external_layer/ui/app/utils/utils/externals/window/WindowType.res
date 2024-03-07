type openResult = {focus: unit => unit}

type fetchResult = {
  text: (. unit) => string,
  json: (. unit) => Js.Json.t,
  arrayBuffer: (. unit) => Js.Typed_array.ArrayBuffer.t,
}
