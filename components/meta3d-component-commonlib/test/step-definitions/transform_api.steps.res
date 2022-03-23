open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/transform_api.feature")

defineFeature(feature, test => {
  let contribute: ref<Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute> = ref(Obj.magic(1))
  let transformComponentName = "Transform"

  test(."lookAt", ({given, \"when", \"and", then}) => {
    let transform = ref(Obj.magic(-1))

    BackgroundTool.prepare(
      given,
      \"and",
      "transform",
      transformComponentName,
      Meta3dComponentTransform.Main.getComponentContribute,
      (
        {
          isDebug: false,
          transformCount: 2,
          float9Array1: Meta3dCommonlib.Matrix3.createIdentityMatrix3(),
          float32Array1: Meta3dCommonlib.Matrix4.createIdentityMatrix4(),
        }: Meta3dComponentTransformProtocol.Index.config
      ),
    )

    \"and"("create a transform", () => {
      contribute := MainTool.unsafeGetUsedComponentContribute(transformComponentName)
      let (d, t) = MainTool.createComponent(contribute.contents)

      contribute := d
      transform := t
    })

    \"when"("look at a target", () => {
      contribute :=
        Main.lookAt(~data=contribute.contents, ~engineCoreService=MainTool.getExtensionService(), ~transform=transform.contents-> Obj.magic, ~target=(0., 0., 1.), ())
    })

    then("change localToWorld matrix", () => {
      MainTool.getComponentData(
        contribute.contents,
        transform.contents,
        Meta3dComponentTransformProtocol.Index.dataName.eulerAngles->Obj.magic,
      )
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == (180., -0., 180.)
    })
  })
})
