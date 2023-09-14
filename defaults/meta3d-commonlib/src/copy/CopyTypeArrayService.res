open Js.Typed_array

/* let copyFloat32Array = (typeArr: Float32Array.t) =>







   if (typeArr |> Obj.magic === Js.Undefined.empty) {







     Js.Undefined.empty |> Obj.magic;







   } else {







     Float32Array.copy(typeArr) |> Obj.magic;







   }; */

// let copyFloat32Array = (typeArr: Float32Array.t) =>
//   /* if (typeArr |> Obj.magic === Js.Undefined.empty) {
//        Js.Undefined.empty |> Obj.magic;
//      } else {
//        Float32Array.copy(typeArr) |> Obj.magic;
//      }; */
//   Float32Array.copy(typeArr);

let copyFloat32ArrayWithEndIndex = (typeArr: Float32Array.t, endIndex) =>
  Float32Array.slice(~start=0, ~end_=endIndex, typeArr)

// let copyUint8ArrayWithEndIndex = (endIndex, typeArr: Uint8Array.t) =>
//   Uint8Array.slice(~start=0, ~end_=endIndex, typeArr);

// let copyUint16ArrayWithEndIndex = (endIndex, typeArr: Uint16Array.t) =>
//   Uint16Array.slice(~start=0, ~end_=endIndex, typeArr);

let copyUint32ArrayWithEndIndex = ( typeArr: Uint32Array.t, endIndex) =>
  Uint32Array.slice(~start=0, ~end_=endIndex, typeArr);

// let copyUint16Array = (typeArr: Uint16Array.t) =>
//   if (typeArr |> Obj.magic === Js.Undefined.empty) {
//     Js.Undefined.empty |> Obj.magic;
//   } else {
//     Uint16Array.copy(typeArr) |> Obj.magic;
//   };

// let copyUint32Array = (typeArr: Uint32Array.t) =>
//   if (typeArr |> Obj.magic === Js.Undefined.empty) {
//     Js.Undefined.empty |> Obj.magic;
//   } else {
//     Uint32Array.copy(typeArr) |> Obj.magic;
//   };

// let deepCopyMutableSparseMapOfFloat32Array = (arr: array(Float32Array.t)) =>
//   arr |> Js.Array.map(typeArr => copyFloat32Array(typeArr));

// let deepCopyMutableSparseMapOfFloat32Array =
//     (arr: WonderCommonlib.MutableSparseMapService.t(Float32Array.t)) =>
//   arr
//   |> WonderCommonlib.MutableSparseMapService.mapValid((. typeArr) =>
//        copyFloat32Array(typeArr)
//      );

// /* let deepCopyUint16ArrayArray = (arr: array(Uint16Array.t)) =>
//    arr |> Js.Array.map((typeArr) => copyUint16Array(typeArr)); */
// /* let deepCopyMutableSparseMapOfArray = (arr: array(array('a))) =>
//    arr
//    |> Js.Array.map(itemArr =>
//         WonderCommonlib.MutableSparseMapService.isDeleted(itemArr) ?
//           Js.Nullable.undefined |> Obj.magic : itemArr |> Js.Array.copy
//       ); */

let deepCopyMutableSparseMapOfArray =
    // (arr: Meta3dCommonlibType.MutableSparseMapType.t<array<'a>>) =>
    (arr) =>
  arr
  -> MutableSparseMap.map((. itemArr)
       /* WonderCommonlib.MutableSparseMapService.isDeleted(itemArr) ?
          Js.Nullable.undefined : itemArr |> Js.Array.copy */
       => itemArr -> Js.Array.copy);

// /* let copyFloat32TypeArrayFromSharedArrayBuffer = (buffer) =>
//      Js.Typed_array.Float32Array.fromBuffer(WorkerType.sharedArrayBufferToArrayBuffer(buffer));

//    let copyFloat32TypeArrayFromSharedArrayBufferRange = (buffer, offset, length) =>
//      Js.Typed_array.Float32Array.fromBufferRange(
//        WorkerType.sharedArrayBufferToArrayBuffer(buffer),
//        ~offset,
//        ~length
//      );

//    let copyUint16TypeArrayFromSharedArrayBufferRange = (buffer, offset, length) =>
//      Js.Typed_array.Uint16Array.fromBufferRange(
//        WorkerType.sharedArrayBufferToArrayBuffer(buffer),
//        ~offset,
//        ~length
//      );

//    let copyUint8TypeArrayFromSharedArrayBuffer = (buffer) =>
//      Js.Typed_array.Uint8Array.fromBuffer(WorkerType.sharedArrayBufferToArrayBuffer(buffer)); */
