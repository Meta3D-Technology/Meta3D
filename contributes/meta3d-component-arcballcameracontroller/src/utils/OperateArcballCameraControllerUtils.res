open StateType

let getDistance = (state, cameraController) =>
  state.distanceMap->Meta3dCommonlib.ImmutableSparseMap.get(cameraController)

let setDistance = (state, cameraController, distance) => {
  let {distanceMap} = state

  {
    ...state,
    distanceMap: distanceMap->Meta3dCommonlib.ImmutableSparseMap.set(
      cameraController,
      distance,
    ),
  }
}

let getMinDistance = (state, cameraController) =>
  state.minDistanceMap->Meta3dCommonlib.ImmutableSparseMap.get(cameraController)

let setMinDistance = (state, cameraController, minDistance) => {
  let {minDistanceMap} = state

  {
    ...state,
    minDistanceMap: minDistanceMap->Meta3dCommonlib.ImmutableSparseMap.set(
      cameraController,
      minDistance,
    ),
  }
}

let getWheelSpeed = (state, cameraController) =>
  state.wheelSpeedMap->Meta3dCommonlib.ImmutableSparseMap.get(cameraController)

let setWheelSpeed = (state, cameraController, wheelSpeed) => {
  let {wheelSpeedMap} = state

  {
    ...state,
    wheelSpeedMap: wheelSpeedMap->Meta3dCommonlib.ImmutableSparseMap.set(
      cameraController,
      wheelSpeed,
    ),
  }
}

let getPhi = (state, cameraController) =>
  state.phiMap->Meta3dCommonlib.ImmutableSparseMap.get(cameraController)

let setPhi = (state, cameraController, phi) => {
  let {phiMap} = state

  {
    ...state,
    phiMap: phiMap->Meta3dCommonlib.ImmutableSparseMap.set(cameraController, phi),
  }
}

let getTheta = (state, cameraController) =>
  state.thetaMap->Meta3dCommonlib.ImmutableSparseMap.get(cameraController)

let setTheta = (state, cameraController, theta) => {
  let {thetaMap} = state

  {
    ...state,
    thetaMap: thetaMap->Meta3dCommonlib.ImmutableSparseMap.set(cameraController, theta),
  }
}

let getThetaMargin = (state, cameraController) =>
  state.thetaMarginMap->Meta3dCommonlib.ImmutableSparseMap.get(cameraController)

let setThetaMargin = (state, cameraController, thetaMargin) => {
  let {thetaMarginMap} = state

  {
    ...state,
    thetaMarginMap: thetaMarginMap->Meta3dCommonlib.ImmutableSparseMap.set(
      cameraController,
      thetaMargin,
    ),
  }
}

let getTarget = (state, cameraController) =>
  state.targetMap->Meta3dCommonlib.ImmutableSparseMap.get(cameraController)

let setTarget = (state, cameraController, target) => {
  let {targetMap} = state

  {
    ...state,
    targetMap: targetMap->Meta3dCommonlib.ImmutableSparseMap.set(cameraController, target),
  }
}

let getMoveSpeedX = (state, cameraController) =>
  state.moveSpeedXMap->Meta3dCommonlib.ImmutableSparseMap.get(cameraController)

let setMoveSpeedX = (state, cameraController, moveSppedX) => {
  let {moveSpeedXMap} = state

  {
    ...state,
    moveSpeedXMap: moveSpeedXMap->Meta3dCommonlib.ImmutableSparseMap.set(
      cameraController,
      moveSppedX,
    ),
  }
}

let getMoveSpeedY = (state, cameraController) =>
  state.moveSpeedYMap->Meta3dCommonlib.ImmutableSparseMap.get(cameraController)

let setMoveSpeedY = (state, cameraController, moveSppedY) => {
  let {moveSpeedYMap} = state

  {
    ...state,
    moveSpeedYMap: moveSpeedYMap->Meta3dCommonlib.ImmutableSparseMap.set(
      cameraController,
      moveSppedY,
    ),
  }
}

let getRotateSpeed = (state, cameraController) =>
  state.rotateSpeedMap->Meta3dCommonlib.ImmutableSparseMap.get(cameraController)

let setRotateSpeed = (state, cameraController, rotateSpeed) => {
  let {rotateSpeedMap} = state

  {
    ...state,
    rotateSpeedMap: rotateSpeedMap->Meta3dCommonlib.ImmutableSparseMap.set(
      cameraController,
      rotateSpeed,
    ),
  }
}
