open StateType

let getData = (. state, cameraController, dataName: Meta3dComponentArcballcameracontrollerProtocol.Index.dataNameType): Js.Nullable.t<'a> => {
  switch dataName {
  | dataName
    if dataName == Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.distance =>
    OperateArcballCameraControllerUtils.getDistance(state, cameraController)
    ->Meta3dCommonlib.OptionSt.toNullable
    ->Obj.magic
  | dataName
    if dataName == Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.minDistance =>
    OperateArcballCameraControllerUtils.getMinDistance(state, cameraController)
    ->Meta3dCommonlib.OptionSt.toNullable
    ->Obj.magic
  | dataName if dataName == Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.phi =>
    OperateArcballCameraControllerUtils.getPhi(state, cameraController)
    ->Meta3dCommonlib.OptionSt.toNullable
    ->Obj.magic
  | dataName if dataName == Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.theta =>
    OperateArcballCameraControllerUtils.getTheta(state, cameraController)
    ->Meta3dCommonlib.OptionSt.toNullable
    ->Obj.magic
  | dataName
    if dataName == Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.thetaMargin =>
    OperateArcballCameraControllerUtils.getThetaMargin(state, cameraController)
    ->Meta3dCommonlib.OptionSt.toNullable
    ->Obj.magic
  | dataName if dataName == Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.target =>
    OperateArcballCameraControllerUtils.getTarget(state, cameraController)
    ->Meta3dCommonlib.OptionSt.toNullable
    ->Obj.magic
  | dataName
    if dataName == Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.moveSpeedX =>
    OperateArcballCameraControllerUtils.getMoveSpeedX(state, cameraController)
    ->Meta3dCommonlib.OptionSt.toNullable
    ->Obj.magic
  | dataName
    if dataName == Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.moveSpeedY =>
    OperateArcballCameraControllerUtils.getMoveSpeedY(state, cameraController)
    ->Meta3dCommonlib.OptionSt.toNullable
    ->Obj.magic
  | dataName
    if dataName == Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.wheelSpeed =>
    OperateArcballCameraControllerUtils.getWheelSpeed(state, cameraController)
    ->Meta3dCommonlib.OptionSt.toNullable
    ->Obj.magic
  | dataName
    if dataName == Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.rotateSpeed =>
    OperateArcballCameraControllerUtils.getRotateSpeed(state, cameraController)
    ->Meta3dCommonlib.OptionSt.toNullable
    ->Obj.magic
  | dataName if dataName == Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.dirty =>
    DirtyArcballCameraControllerUtils.isDirty(state, cameraController)
    ->Obj.magic
    ->Meta3dCommonlib.OptionSt.toNullable
  | _ =>
    Meta3dCommonlib.Exception.throwErr(
      Meta3dCommonlib.Log.buildFatalMessage(
        ~title="getData",
        ~description=j`unknown dataName:${dataName->Obj.magic}`,
        ~reason="",
        ~solution=j``,
        ~params=j``,
      ),
    )
  }
}
