open Meta3dEngineCoreProtocol.ServiceType

let getViewWorldToCameraMatrix = (
  usedBasicCameraViewContribute,
  {getComponentGameObjects, getComponent, getComponentData},
  usedTransformContribute,
  cameraView: Meta3dComponentBasiccameraviewProtocol.Index.basicCameraView,
) => {
  getComponentGameObjects(
    usedBasicCameraViewContribute,
    cameraView->VOTypeConvert.basicCameraViewToComponent,
  )
  ->Meta3dCommonlib.ArraySt.getFirst
  ->Meta3dCommonlib.OptionSt.bind(gameObject =>
    getComponent(usedTransformContribute, gameObject)->Meta3dCommonlib.OptionSt.fromNullable
  )
  ->Meta3dCommonlib.OptionSt.bind(transform =>
    getComponentData(
      usedTransformContribute,
      transform,
      Meta3dComponentTransformProtocol.Index.dataName.localToWorldMatrix->Obj.magic,
    )
    ->Obj.magic
    ->Meta3dCommonlib.OptionSt.fromNullable
    ->Meta3dCommonlib.OptionSt.map(localToWorldMatrix => {
      Meta3dCommonlib.Matrix4.createIdentityMatrix4()->Meta3dCommonlib.Matrix4.invert(
        localToWorldMatrix,
      )
    })
  )
  ->Meta3dCommonlib.OptionSt.toNullable
}

let _isActive = (usedComponentContribute, {getComponentData}, cameraView): bool => {
  getComponentData(
    usedComponentContribute,
    cameraView,
    Meta3dComponentBasiccameraviewProtocol.Index.dataName.isActive->Obj.magic,
  )
  ->Meta3dCommonlib.NullableTool.getExn
  ->Obj.magic
}

let _checkAtMostTwo = (activeCameraViews, isDebug) => {
  activeCameraViews->Meta3dCommonlib.Contract.ensureCheck(r => {
    open Meta3dCommonlib.Contract
    open Operators

    test(
      Meta3dCommonlib.Log.buildAssertMessage(
        ~expect=j`only has one active cameraView at most`,
        ~actual=j`not`,
      ),
      () => r->Meta3dCommonlib.ArraySt.length <= 1,
    )
  }, isDebug)
}

let getActiveCameraView = (
  usedComponentContribute,
  {getAllComponents} as engineCoreService,
  isDebug,
) => {
  getAllComponents(usedComponentContribute)
  ->Meta3dCommonlib.ArraySt.filter(_isActive(usedComponentContribute, engineCoreService))
  ->_checkAtMostTwo(isDebug)
  ->Meta3dCommonlib.ArraySt.getFirst
  ->Meta3dCommonlib.OptionSt.map(VOTypeConvert.componentToBasicCameraView)
  ->Meta3dCommonlib.OptionSt.toNullable
}
