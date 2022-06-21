open Js.Typed_array

let alignedLength = (value: int): int =>
  switch value {
  | 0 => value
  | value =>
    let alignValue = 4
    switch mod(value, alignValue) {
    | 0 => value
    | multiple => value + (alignValue - multiple)
    }
  }

let copyUint8ArrayToArrayBuffer = (
  byteOffset,
  (emptyUint8Data, uint8ArrayAlignedByteLength, uint8Array),
  dataView,
) => {
  let resultByteOffset = byteOffset + uint8ArrayAlignedByteLength
  let byteOffset = ref(byteOffset)
  let uint8ArrayByteLength = uint8Array->Uint8Array.length

  for i in 0 to uint8ArrayAlignedByteLength - 1 {
    let value = if i >= uint8ArrayByteLength {
      emptyUint8Data
    } else {
      TypeArrayUtils.getUint8_1(i, uint8Array)
    }

    byteOffset := DataViewCommon.writeUint8_1(. byteOffset.contents, value, dataView)
  }

  resultByteOffset
}
