// let deleteBySwapAndResetFloat32TypeArr = (.
//   (sourceIndex, targetIndex),
//   typeArr,
//   length,
//   defaultValueArr,
// ) => {
//   open Js.Typed_array
//   for i in 0 to length - 1 {
//     Float32Array.unsafe_set(
//       typeArr,
//       sourceIndex + i,
//       Float32Array.unsafe_get(typeArr, targetIndex + i),
//     )
//     Float32Array.unsafe_set(typeArr, targetIndex + i, defaultValueArr[i])
//   }
//   typeArr
// }

// let deleteSingleValueBySwapAndResetFloat32TypeArr = (.
//   (sourceIndex, targetIndex),
//   typeArr,
//   length: int,
//   defaultValue,
// ) => {
//   open Js.Typed_array
//   Float32Array.unsafe_set(typeArr, sourceIndex, Float32Array.unsafe_get(typeArr, targetIndex))
//   Float32Array.unsafe_set(typeArr, targetIndex, defaultValue)
//   typeArr
// }

// let deleteSingleValueBySwapUint32TypeArr = (sourceIndex, lastIndex, typeArr) => {
//   open Js.Typed_array
//   Uint32Array.unsafe_set(typeArr, sourceIndex, Uint32Array.unsafe_get(typeArr, lastIndex))
//   typeArr
// }

let deleteAndResetFloat32TypeArr = (. typeArr, sourceIndex, length, defaultValueArr, ) => {
  open Js.Typed_array
  for i in 0 to length - 1 {
    Float32Array.unsafe_set(typeArr, sourceIndex + i, defaultValueArr[i])
  }
  typeArr
}

// let deleteAndResetFloat32TypeArr = (. sourceIndex, length, (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15), typeArr) => {
//   open Js.Typed_array
//   for i in 0 to length - 1 {
//     Float32Array.unsafe_set(typeArr, sourceIndex + i, defaultValueArr[i])
//   }
//   typeArr

//   Float32Array.unsafe_set(typeArray, sourceIndex + 0, a0)
//   Float32Array.unsafe_set(typeArray, sourceIndex + 1, a1)
//   Float32Array.unsafe_set(typeArray, sourceIndex + 2, a2)
//   Float32Array.unsafe_set(typeArray, sourceIndex + 3, a3)
//   Float32Array.unsafe_set(typeArray, sourceIndex + 4, a4)
//   Float32Array.unsafe_set(typeArray, sourceIndex + 5, a5)
//   Float32Array.unsafe_set(typeArray, sourceIndex + 6, a6)
//   Float32Array.unsafe_set(typeArray, sourceIndex + 7, a7)
//   Float32Array.unsafe_set(typeArray, sourceIndex + 8, a8)
//   Float32Array.unsafe_set(typeArray, sourceIndex + 9, a9)
//   Float32Array.unsafe_set(typeArray, sourceIndex + 10, a10)
//   Float32Array.unsafe_set(typeArray, sourceIndex + 11, a11)
//   Float32Array.unsafe_set(typeArray, sourceIndex + 12, a12)
//   Float32Array.unsafe_set(typeArray, sourceIndex + 13, a13)
//   Float32Array.unsafe_set(typeArray, sourceIndex + 14, a14)
//   Float32Array.unsafe_set(typeArray, sourceIndex + 15, a15)

// typeArr
// }

let deleteAndResetFloat32 = (. typeArr, sourceIndex, defaultValue) => {
  open Js.Typed_array
  Float32Array.unsafe_set(typeArr, sourceIndex, defaultValue)
  typeArr
}

// let deleteAndResetUint32 = (. sourceIndex, defaultValue, typeArr) => {
//   open Js.Typed_array
//   Uint32Array.unsafe_set(typeArr, sourceIndex, defaultValue)
//   typeArr
// }

// let deleteAndResetUint8 = (. sourceIndex, defaultValue, typeArr) => {
//   open Js.Typed_array
//   Uint8Array.unsafe_set(typeArr, sourceIndex, defaultValue)
//   typeArr
// }

// let deleteAndResetUint16 = (. sourceIndex, defaultValue, typeArr) => {
//   open Js.Typed_array
//   Uint16Array.unsafe_set(typeArr, sourceIndex, defaultValue)
//   typeArr
// }
