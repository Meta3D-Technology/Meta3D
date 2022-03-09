open Meta3dComponentGeometryProtocol.Index

open Js.Typed_array

open ReallocatedPointsGeometryUtils

open Meta3dCommonlib.TypeArrayUtils

let setNormals = (state, geometry, data) => {
  let {normals, normalsInfos, normalsOffset} = state

  state.normalsOffset = setFloat32PointData(
    (
      Meta3dComponentWorkerUtils.BufferGeometryUtils.getInfoIndex(geometry),
      normalsInfos,
      normalsOffset,
      Float32Array.length(data),
    ),
    ConfigUtils.getIsDebug(state),
    fillFloat32ArrayWithOffset(normals, data),
  )

  state
}
