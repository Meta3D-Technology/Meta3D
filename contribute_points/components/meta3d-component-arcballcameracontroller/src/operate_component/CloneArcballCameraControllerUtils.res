open StateType

let _setData = (
  state,
  clonedArcballCameraController,
  (
    distance,
    minDistance,
    phi,
    theta,
    thetaMargin,
    target,
    moveSpeedX,
    moveSpeedY,
    rotateSpeed,
    wheelSpeed,
  ),
) => {
  state
  ->OperateArcballCameraControllerUtils.setDistance(clonedArcballCameraController, distance)
  ->OperateArcballCameraControllerUtils.setMinDistance(clonedArcballCameraController, minDistance)
  ->OperateArcballCameraControllerUtils.setPhi(clonedArcballCameraController, phi)
  ->OperateArcballCameraControllerUtils.setTheta(clonedArcballCameraController, theta)
  ->OperateArcballCameraControllerUtils.setThetaMargin(clonedArcballCameraController, thetaMargin)
  ->OperateArcballCameraControllerUtils.setTarget(clonedArcballCameraController, target)
  ->OperateArcballCameraControllerUtils.setMoveSpeedX(clonedArcballCameraController, moveSpeedY)
  ->OperateArcballCameraControllerUtils.setMoveSpeedY(clonedArcballCameraController, moveSpeedY)
  ->OperateArcballCameraControllerUtils.setRotateSpeed(clonedArcballCameraController, rotateSpeed)
  ->OperateArcballCameraControllerUtils.setWheelSpeed(clonedArcballCameraController, wheelSpeed)
}

let _getData = (state, sourceArcballCameraController) => {
  (
    OperateArcballCameraControllerUtils.getDistance(
      state,
      sourceArcballCameraController,
    )->Meta3dCommonlib.OptionSt.getExn,
    OperateArcballCameraControllerUtils.getMinDistance(
      state,
      sourceArcballCameraController,
    )->Meta3dCommonlib.OptionSt.getExn,
    OperateArcballCameraControllerUtils.getPhi(
      state,
      sourceArcballCameraController,
    )->Meta3dCommonlib.OptionSt.getExn,
    OperateArcballCameraControllerUtils.getTheta(
      state,
      sourceArcballCameraController,
    )->Meta3dCommonlib.OptionSt.getExn,
    OperateArcballCameraControllerUtils.getThetaMargin(
      state,
      sourceArcballCameraController,
    )->Meta3dCommonlib.OptionSt.getExn,
    OperateArcballCameraControllerUtils.getTarget(
      state,
      sourceArcballCameraController,
    )->Meta3dCommonlib.OptionSt.getExn,
    OperateArcballCameraControllerUtils.getMoveSpeedX(
      state,
      sourceArcballCameraController,
    )->Meta3dCommonlib.OptionSt.getExn,
    OperateArcballCameraControllerUtils.getMoveSpeedY(
      state,
      sourceArcballCameraController,
    )->Meta3dCommonlib.OptionSt.getExn,
    OperateArcballCameraControllerUtils.getRotateSpeed(
      state,
      sourceArcballCameraController,
    )->Meta3dCommonlib.OptionSt.getExn,
    OperateArcballCameraControllerUtils.getWheelSpeed(
      state,
      sourceArcballCameraController,
    )->Meta3dCommonlib.OptionSt.getExn,
  )
}

let clone = (state, countRange, sourceArcballCameraController) => {
  Meta3dCommonlib.CloneUtils.clone(
    state,
    (CreateArcballCameraControllerUtils.create, _getData, _setData),
    countRange,
    sourceArcballCameraController,
  )
}
