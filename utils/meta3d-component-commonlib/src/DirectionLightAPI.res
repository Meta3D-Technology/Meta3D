open Meta3dEngineCoreProtocol.ServiceType

let getDirection = (
  usedDirectionLightContribute,
  {getComponentGameObjects, getComponent, getComponentData},
  usedTransformContribute,
  light: Meta3dComponentDirectionlightProtocol.Index.directionLight,
): Js.Nullable.t<(float, float, float)> =>
  getComponentGameObjects(
    usedDirectionLightContribute,
    light->VOTypeConvert.directionLightToComponent,
  )
  ->Meta3dCommonlib.ArraySt.getFirst
  ->Meta3dCommonlib.OptionSt.bind(gameObject =>
    getComponent(usedTransformContribute, gameObject)
    ->Meta3dCommonlib.OptionSt.fromNullable
    ->Meta3dCommonlib.OptionSt.map(transform =>
      getComponentData(
        usedTransformContribute,
        transform,
        Meta3dComponentTransformProtocol.Index.dataName.eulerAngles->Obj.magic,
      )
      ->Obj.magic
      ->Meta3dCommonlib.Quaternion.setFromEulerAngles
      ->Meta3dCommonlib.Vector3.transformQuat((0., 0., 1.))
    )
  )
  ->Meta3dCommonlib.OptionSt.toNullable

let setDirection = (
  usedDirectionLightContribute,
  {getComponentGameObjects, getComponent, getComponentData} as engineCoreService,
  usedTransformContribute,
  light: Meta3dComponentDirectionlightProtocol.Index.directionLight,
  direction: (float, float, float),
) => {
  let (x, y, z) = direction

  getComponentGameObjects(
    usedDirectionLightContribute,
    light->VOTypeConvert.directionLightToComponent,
  )
  ->Meta3dCommonlib.ArraySt.getFirst
  ->Meta3dCommonlib.OptionSt.bind(gameObject =>
    getComponent(usedTransformContribute, gameObject)
    ->Meta3dCommonlib.OptionSt.fromNullable
    ->Meta3dCommonlib.OptionSt.map(transform =>
      TransformAPI.lookAt(
        ~data=usedTransformContribute,
        ~engineCoreService,
        ~transform=transform->Obj.magic,
        ~target=(-.x, -.y, -.z),
        ~up=(0., 1., 0.),
        (),
      )
    )
  )
  ->Meta3dCommonlib.OptionSt.getWithDefault(usedTransformContribute)
}
