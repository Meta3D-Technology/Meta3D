open TextEncoderType

open Js.Typed_array

@new external newTextEncoder: unit => textEncoder = "TextEncoder"

@bs.send.pipe(: textEncoder)
external encodeUint8Array: string => Uint8Array.t = "encode"
