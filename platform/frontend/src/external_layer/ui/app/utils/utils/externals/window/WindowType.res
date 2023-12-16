type openResult = {focus: unit => unit}

type fetchResult = {
  text: (. unit) => string,
  json: (. unit) => Js.Json.t,
}
