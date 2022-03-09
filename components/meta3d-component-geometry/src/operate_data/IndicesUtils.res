open Meta3dComponentGeometryProtocol.Index

open Js.Typed_array

open ReallocatedPointsGeometryUtils

open Meta3dCommonlib.TypeArrayUtils

let setIndices = (state, geometry, data) => {
  let {indices, indicesInfos, indicesOffset} = state

  state.indicesOffset = setUint32PointData(
    (
      Meta3dComponentWorkerUtils.BufferGeometryUtils.getInfoIndex(geometry),
      indicesInfos,
      indicesOffset,
      Uint32Array.length(data),
    ),
    ConfigUtils.getIsDebug(state),
    fillUint32ArrayWithOffset(indices, data),
  )

  state
}
