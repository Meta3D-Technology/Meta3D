open Js.Typed_array

let getUint8_1 = (index: int, typeArray: Uint8Array.t) => Uint8Array.unsafe_get(typeArray, index)