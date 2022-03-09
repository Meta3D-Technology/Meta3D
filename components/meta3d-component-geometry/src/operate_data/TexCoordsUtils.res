open Meta3dComponentGeometryProtocol.Index

open Js.Typed_array

open ReallocatedPointsGeometryUtils

open Meta3dCommonlib.TypeArrayUtils

let setTexCoords = (state, geometry, data) => {
  Meta3dCommonlib.Contract.requireCheck(() => {
    open Meta3dCommonlib.Contract
    open Operators

    test(
      Meta3dCommonlib.Log.buildAssertMessage(
        ~expect=j`texCoords in [0.0, 1.0]`,
        ~actual=j`not`,
      ),
      () =>
        data->Meta3dCommonlib.TypeArrayUtils.reduceFloat32Array(true, (. result, value) =>
          result && (\">=."(value, 0.0) && \"<=."(value, 1.0))
        ),
    )
  }, ConfigUtils.getIsDebug(state))

  let {texCoords, texCoordsInfos, texCoordsOffset} = state

  state.texCoordsOffset = setFloat32PointData(
    (
      Meta3dComponentWorkerUtils.BufferGeometryUtils.getInfoIndex(geometry),
      texCoordsInfos,
      texCoordsOffset,
      Float32Array.length(data),
    ),
    ConfigUtils.getIsDebug(state),
    fillFloat32ArrayWithOffset(texCoords, data),
  )

  state
}
