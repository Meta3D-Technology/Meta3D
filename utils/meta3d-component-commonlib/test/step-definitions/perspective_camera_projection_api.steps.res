open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/perspective_camera_projection_api.feature")

defineFeature(feature, test => {
  let contribute: ref<Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute> = ref(
    Obj.magic(1),
  )
  let perspectiveCameraProjectionComponentName = "PerspectiveCameraProjection"
  let perspectiveCameraProjection = ref(Obj.magic(-1))

  let _prepare = (given, \"and", isDebug) => {
    given("open debug", () => {
      ()
    })

    BackgroundTool.prepare(
      given,
      \"and",
      "perspectiveCameraProjection",
      perspectiveCameraProjectionComponentName,
      Meta3dComponentPerspectivecameraprojection.Main.getContribute,
      (
        {
          isDebug: isDebug,
        }: Meta3dComponentPerspectivecameraprojectionProtocol.Index.config
      ),
    )

    \"and"("create a perspectiveCameraProjection", () => {
      contribute :=
        MainTool.unsafeGetUsedComponentContribute(perspectiveCameraProjectionComponentName)
      let (d, p) = MainTool.createComponent(contribute.contents)

      contribute := d
      perspectiveCameraProjection := p
    })

    \"and"(%re("/^set the perspectiveCameraProjection's near to (.*)$/")->Obj.magic, () => {
      let arguments =
        %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      contribute :=
        MainTool.setComponentData(
          contribute.contents,
          perspectiveCameraProjection.contents,
          Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.near->Obj.magic,
          arguments[0]->Obj.magic,
        )
    })

    \"and"(%re("/^set the perspectiveCameraProjection's far to (.*)$/")->Obj.magic, () => {
      let arguments =
        %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      contribute :=
        MainTool.setComponentData(
          contribute.contents,
          perspectiveCameraProjection.contents,
          Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.far->Obj.magic,
          arguments[0]->Obj.magic,
        )
    })

    \"and"(%re("/^set the perspectiveCameraProjection's fovy to (.*)$/")->Obj.magic, () => {
      let arguments =
        %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      contribute :=
        MainTool.setComponentData(
          contribute.contents,
          perspectiveCameraProjection.contents,
          Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.fovy->Obj.magic,
          arguments[0]->Obj.magic,
        )
    })
  }

  // test(."set aspect", ({given, \"when", \"and", then}) => {
  //   let isDebug = true

  //   _prepare(given, \"and", isDebug)

  //   \"and"(%re("/^set the perspectiveCameraProjection's aspect to (.*)$/")->Obj.magic, () => {
  //     let arguments =
  //       %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

  //     contribute :=
  //       MainTool.setComponentData(
  //         contribute.contents,
  //         perspectiveCameraProjection.contents,
  //         Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.aspect->Obj.magic,
  //         arguments[0]->Obj.magic,
  //       )
  //   })

  //   \"when"("update the perspectiveCameraProjection", () => {
  //     contribute :=
  //       Main.updatePerspectiveCameraProjection(
  //         contribute.contents,
  //         MainTool.getExtensionService(),
  //         isDebug,
  //         perspectiveCameraProjection.contents->Obj.magic,
  //         // (2, 1),
  //       )
  //   })

  //   then("the perspectiveCameraProjection's pMatrix should be builded", () => {
  //     MainTool.getComponentData(
  //       contribute.contents,
  //       perspectiveCameraProjection.contents,
  //       Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.pMatrix->Obj.magic,
  //     )
  //     ->Meta3dCommonlib.NullableTool.getExn
  //     ->expect ==
  //       Js.Typed_array.Float32Array.make([
  //         1.7320508075688776,
  //         0.,
  //         0.,
  //         0.,
  //         0.,
  //         1.7320508075688776,
  //         0.,
  //         0.,
  //         0.,
  //         0.,
  //         -1.0004000800160033,
  //         -1.,
  //         0.,
  //         0.,
  //         -0.40008001600320064,
  //         0.,
  //       ])
  //   })
  // })

  // test(."set canvas size instead of aspect", ({given, \"when", \"and", then}) => {
  //   let isDebug = true

  //   _prepare(given, \"and", isDebug)

  //   \"when"(
  //     %re("/^update the perspectiveCameraProjection with canvas size: (.*), (.*)$/")->Obj.magic,
  //     () => {
  //       let arguments =
  //         %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

  //       contribute :=
  //         Main.updatePerspectiveCameraProjection(
  //           contribute.contents,
  //           MainTool.getExtensionService(),
  //           isDebug,
  //           perspectiveCameraProjection.contents->Obj.magic,
  //           arguments->Js.Array.slice(~start=0, ~end_=2, _)->Obj.magic,
  //         )
  //     },
  //   )

  //   then("the perspectiveCameraProjection's pMatrix should be builded", () => {
  //     MainTool.getComponentData(
  //       contribute.contents,
  //       perspectiveCameraProjection.contents,
  //       Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.pMatrix->Obj.magic,
  //     )
  //     ->Meta3dCommonlib.NullableTool.getExn
  //     ->expect ==
  //       Js.Typed_array.Float32Array.make([
  //         1.7320508075688776,
  //         0.,
  //         0.,
  //         0.,
  //         0.,
  //         1.7320508075688776,
  //         0.,
  //         0.,
  //         0.,
  //         0.,
  //         -1.0004000800160033,
  //         -1.,
  //         0.,
  //         0.,
  //         -0.40008001600320064,
  //         0.,
  //       ])
  //   })
  // })
})
