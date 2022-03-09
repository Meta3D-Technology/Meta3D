open Js.Typed_array

open Meta3dCommonlib.TypeArrayUtils

let setInfo = (infoIndex, startIndex, endIndex, isDebug, infos) => {
  Meta3dCommonlib.Contract.requireCheck(() => {
    open Meta3dCommonlib.Contract
    open Operators
    test(
      Meta3dCommonlib.Log.buildAssertMessage(
        ~expect=j`startIndex >= 0`,
        ~actual=j`is $startIndex`,
      ),
      () => startIndex >= 0,
    )
    test(
      Meta3dCommonlib.Log.buildAssertMessage(
        ~expect=j`endIndex >= startIndex`,
        ~actual=j`is $endIndex`,
      ),
      () => endIndex >= startIndex,
    )
  }, isDebug)

  setUint32_1(infoIndex, startIndex, infos)
  setUint32_1(infoIndex + 1, endIndex, infos)
}
// ->Meta3dCommonlib.Result.bind(() =>
//   setUint32_1(infoIndex, startIndex, infos)
// )->Meta3dCommonlib.Result.bind(() => setUint32_1(infoIndex + 1, endIndex, infos))

let hasPointData = (infoIndex, isDebug, infos) => {
  let (
    startIndex,
    endIndex,
  ) = Meta3dComponentWorkerUtils.ReallocatedPointsGeometryUtils.getInfo(
    infoIndex,
    isDebug,
    infos,
  )

  endIndex > startIndex
}
// Meta3dComponentWorkerUtils.ReallocatedPointsGeometryUtils. getInfo(infoIndex, isDebug, infos)->Meta3dCommonlib.Result.mapSuccess(((startIndex, endIndex)) =>
//   endIndex > startIndex
// )

let _setPointData = ((infoIndex: int, infos, offset: int, count), isDebug, fillTypeArrayFunc) => {
  let startIndex = offset
  let newOffset = offset + count
  setInfo(infoIndex, startIndex, newOffset, isDebug, infos)

  fillTypeArrayFunc(startIndex)

  newOffset
  // ->Meta3dCommonlib.Result.bind(() => fillTypeArrayFunc(startIndex))
  // ->Meta3dCommonlib.Result.mapSuccess(() => newOffset)
}

let setFloat32PointData = (dataTuple, isDebug, fillFloat32ArrayFunc) =>
  _setPointData(dataTuple, isDebug, fillFloat32ArrayFunc)

let setUint32PointData = (dataTuple, isDebug, fillUint32ArraryFunc) =>
  _setPointData(dataTuple, isDebug, fillUint32ArraryFunc)
