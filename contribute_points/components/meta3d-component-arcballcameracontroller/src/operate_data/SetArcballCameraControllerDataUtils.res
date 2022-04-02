open StateType

let _constrainTheta = (isDebug, theta, thetaMargin) =>
  Meta3dCommonlib.NumberUtils.clamp(isDebug, theta, thetaMargin, Js.Math._PI -. thetaMargin)

let setData = (.
  state,
  cameraController,
  dataName: Meta3dEngineCoreProtocol.ComponentContributeType.dataName,
  dataValue: Meta3dEngineCoreProtocol.ComponentContributeType.dataValue,
): StateType.state => {
  switch dataName {
  | dataName
    if dataName == Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.distance =>
    OperateArcballCameraControllerUtils.setDistance(
      state,
      cameraController,
      Meta3dCommonlib.NumberUtils.bigThan(
        dataValue->Obj.magic,
        OperateArcballCameraControllerUtils.getMinDistance(
          state,
          cameraController,
        )->Meta3dCommonlib.OptionSt.getExn,
      ),
    )->DirtyArcballCameraControllerUtils.mark(cameraController, true)
  | dataName
    if dataName == Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.minDistance =>
    OperateArcballCameraControllerUtils.setMinDistance(
      state,
      cameraController,
      dataValue->Obj.magic,
    )->DirtyArcballCameraControllerUtils.mark(cameraController, true)
  | dataName
    if dataName == Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.wheelSpeed =>
    OperateArcballCameraControllerUtils.setWheelSpeed(
      state,
      cameraController,
      dataValue->Obj.magic,
    )->DirtyArcballCameraControllerUtils.mark(cameraController, true)
  | dataName if dataName == Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.phi =>
    OperateArcballCameraControllerUtils.setPhi(
      state,
      cameraController,
      dataValue->Obj.magic,
    )->DirtyArcballCameraControllerUtils.mark(cameraController, true)
  | dataName if dataName == Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.theta =>
    OperateArcballCameraControllerUtils.setTheta(
      state,
      cameraController,
      _constrainTheta(
        ConfigUtils.getIsDebug(state),
        dataValue->Obj.magic,
        OperateArcballCameraControllerUtils.getThetaMargin(
          state,
          cameraController,
        )->Meta3dCommonlib.OptionSt.getExn,
      ),
    )->DirtyArcballCameraControllerUtils.mark(cameraController, true)
  | dataName
    if dataName == Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.thetaMargin =>
    let thetaMargin = dataValue->Obj.magic

    let state = OperateArcballCameraControllerUtils.setThetaMargin(
      state,
      cameraController,
      thetaMargin,
    )

    OperateArcballCameraControllerUtils.setTheta(
      state,
      cameraController,
      _constrainTheta(
        ConfigUtils.getIsDebug(state),
        OperateArcballCameraControllerUtils.getTheta(
          state,
          cameraController,
        )->Meta3dCommonlib.OptionSt.getExn,
        thetaMargin,
      ),
    )->DirtyArcballCameraControllerUtils.mark(cameraController, true)
  | dataName if dataName == Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.target =>
    OperateArcballCameraControllerUtils.setTarget(
      state,
      cameraController,
      dataValue->Obj.magic,
    )->DirtyArcballCameraControllerUtils.mark(cameraController, true)
  | dataName
    if dataName == Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.moveSpeedX =>
    OperateArcballCameraControllerUtils.setMoveSpeedX(
      state,
      cameraController,
      dataValue->Obj.magic,
    )->DirtyArcballCameraControllerUtils.mark(cameraController, true)
  | dataName
    if dataName == Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.moveSpeedY =>
    OperateArcballCameraControllerUtils.setMoveSpeedY(
      state,
      cameraController,
      dataValue->Obj.magic,
    )->DirtyArcballCameraControllerUtils.mark(cameraController, true)
  | dataName
    if dataName == Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.rotateSpeed =>
    OperateArcballCameraControllerUtils.setRotateSpeed(
      state,
      cameraController,
      dataValue->Obj.magic,
    )->DirtyArcballCameraControllerUtils.mark(cameraController, true)
  | dataName if dataName == Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.dirty =>
    DirtyArcballCameraControllerUtils.mark(state, cameraController, dataValue->Obj.magic)
  | _ =>
    Meta3dCommonlib.Exception.throwErr(
      Meta3dCommonlib.Log.buildFatalMessage(
        ~title="setData",
        ~description=j`unknown dataName:${dataName->Obj.magic}`,
        ~reason="",
        ~solution=j``,
        ~params=j``,
      ),
    )
  }
}
