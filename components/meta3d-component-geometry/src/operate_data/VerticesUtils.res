open Meta3dComponentGeometryProtocol.Index

open Js.Typed_array

open ReallocatedPointsGeometryUtils

open Meta3dCommonlib.TypeArrayUtils

let setVertices = (state, geometry, data) => {
  let {vertices, verticesInfos, verticesOffset} = state

  state.verticesOffset = setFloat32PointData(
    (
      Meta3dComponentWorkerUtils.BufferGeometryUtils.getInfoIndex(geometry),
      verticesInfos,
      verticesOffset,
      Float32Array.length(data),
    ),
    ConfigUtils.getIsDebug(state),
    fillFloat32ArrayWithOffset(vertices, data),
  )

  state
}
