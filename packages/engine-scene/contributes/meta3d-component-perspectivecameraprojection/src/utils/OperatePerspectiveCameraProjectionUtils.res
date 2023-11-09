open StateType

let getName = (state, cameraProjection) =>
  state.names->Meta3dCommonlib.ImmutableSparseMap.getNullable(cameraProjection)

let setName = (state, cameraProjection, name) => {
  let {names} = state

  {
    ...state,
    names: names->Meta3dCommonlib.ImmutableSparseMap.set(cameraProjection, name),
  }
}

let getPMatrix = (state, cameraProjection) =>
  state.pMatrixMap->Meta3dCommonlib.ImmutableSparseMap.get(cameraProjection)

let setPMatrix = (state, cameraProjection, pMatrix) => {
  let {pMatrixMap} = state

  {
    ...state,
    pMatrixMap: pMatrixMap->Meta3dCommonlib.ImmutableSparseMap.set(cameraProjection, pMatrix),
  }
}

let getFovy = (state, cameraProjection) =>
  state.fovyMap->Meta3dCommonlib.ImmutableSparseMap.get(cameraProjection)

let setFovy = (state, cameraProjection, fovy) => {
  let {fovyMap} = state

  {
    ...state,
    fovyMap: fovyMap->Meta3dCommonlib.ImmutableSparseMap.set(cameraProjection, fovy),
  }
}

let getAspect = (state, cameraProjection) =>
  state.aspectMap->Meta3dCommonlib.ImmutableSparseMap.get(cameraProjection)

let setAspect = (state, cameraProjection, aspect) => {
  let {aspectMap} = state

  {
    ...state,
    aspectMap: aspectMap->Meta3dCommonlib.ImmutableSparseMap.set(cameraProjection, aspect),
  }
}

let getFar = (state, cameraProjection) =>
  state.farMap->Meta3dCommonlib.ImmutableSparseMap.get(cameraProjection)

let setFar = (state, cameraProjection, far) => {
  let {farMap} = state

  {
    ...state,
    farMap: farMap->Meta3dCommonlib.ImmutableSparseMap.set(cameraProjection, far),
  }
}

let getNear = (state, cameraProjection) =>
  state.nearMap->Meta3dCommonlib.ImmutableSparseMap.get(cameraProjection)

let setNear = (state, cameraProjection, near) => {
  let {nearMap} = state

  {
    ...state,
    nearMap: nearMap->Meta3dCommonlib.ImmutableSparseMap.set(cameraProjection, near),
  }
}
