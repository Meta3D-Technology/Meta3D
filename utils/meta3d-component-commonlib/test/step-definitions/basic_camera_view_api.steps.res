open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/basic_camera_view_api.feature")

defineFeature(feature, test => {
  let basicCameraViewComponentName = "BasicCameraView"

  let _prepareData = (given, \"and", basicCameraViewComponentName) => {
    open Meta3dEngineCoreSceneview

    given("prepare register", () => {
      CreateState.createState()->StateContainer.setState
    })

    \"and"({j`register ${basicCameraViewComponentName} contribute`}, () => {
      RegisterComponentTool.registerComponent(Meta3dComponentBasiccameraview.Main.getContribute)
    })
  }

  test(."getViewWorldToCameraMatrix", ({given, \"when", \"and", then}) => {
    let gameObject = 1
    let basicCameraViewData: ref<
      Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute,
    > = ref(Obj.magic(1))
    let transformData: ref<
      Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute,
    > = ref(Obj.magic(1))
    let transformComponentName = "Transform"
    let basicCameraView = ref(Obj.magic(-1))
    let transform = ref(Obj.magic(1))
    let viewWorldToCameraMatrix = ref(Obj.magic(1))

    _prepareData(given, \"and", basicCameraViewComponentName)

    \"and"({j`register transform contribute`}, () => {
      RegisterComponentTool.registerComponent(Meta3dComponentTransform.Main.getContribute)
    })

    \"and"("create and set all component states", () => {
      open Meta3dEngineCoreSceneview

      StateContainer.unsafeGetState()
      ->DirectorForJs.createAndSetComponentState(
        basicCameraViewComponentName,
        (
          {
            isDebug: false,
          }: Meta3dComponentBasiccameraviewProtocol.Index.config
        )->Obj.magic,
      )
      ->StateContainer.setState
      StateContainer.unsafeGetState()
      ->DirectorForJs.createAndSetComponentState(
        transformComponentName,
        (
          {
            isDebug: false,
            transformCount: 2,
            float9Array1: Meta3dCommonlib.Matrix3.createIdentityMatrix3(),
            float32Array1: Meta3dCommonlib.Matrix4.createIdentityMatrix4(),
          }: Meta3dComponentTransformProtocol.Index.config
        )->Obj.magic,
      )
      ->StateContainer.setState

      transformData := MainTool.unsafeGetUsedComponentContribute(transformComponentName)
      basicCameraViewData := MainTool.unsafeGetUsedComponentContribute(basicCameraViewComponentName)
    })

    \"and"("create a gameObject", () => {
      ()
    })

    \"and"("create a transform", () => {
      let (d, t) = MainTool.createComponent(transformData.contents)

      transformData := d
      transform := t
    })

    \"and"("add the transform to the gameObject", () => {
      transformData :=
        MainTool.addComponent(transformData.contents, gameObject->Obj.magic, transform.contents)
    })

    \"and"(%re("/^set the transform's local position to (.*), (.*), (.*)$/")->Obj.magic, () => {
      let arguments =
        %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      transformData :=
        MainTool.setComponentData(
          transformData.contents,
          transform.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localPosition->Obj.magic,
          arguments->Js.Array.slice(~start=0, ~end_=3, _)->Obj.magic,
        )
    })

    \"and"(
      %re("/^set the transform's local rotation to (.*), (.*), (.*), (.*)$/")->Obj.magic,
      () => {
        let arguments =
          %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

        transformData :=
          MainTool.setComponentData(
            transformData.contents,
            transform.contents,
            Meta3dComponentTransformProtocol.Index.dataName.localRotation->Obj.magic,
            arguments->Js.Array.slice(~start=0, ~end_=4, _)->Obj.magic,
          )
      },
    )

    \"and"("update the transform", () => {
      transformData :=
        MainTool.setComponentData(
          transformData.contents,
          transform.contents,
          Meta3dComponentTransformProtocol.Index.dataName.update->Obj.magic,
          Js.Nullable.null->Obj.magic,
        )
    })

    \"and"("create a basicCameraView", () => {
      let (d, b) = MainTool.createComponent(basicCameraViewData.contents)

      basicCameraViewData := d
      basicCameraView := b
    })

    \"and"("add the basicCameraView to the gameObject", () => {
      basicCameraViewData :=
        MainTool.addComponent(
          basicCameraViewData.contents,
          gameObject->Obj.magic,
          basicCameraView.contents,
        )
    })

    \"when"("get the basicCameraView's viewWorldToCameraMatrix", () => {
      viewWorldToCameraMatrix :=
        Main.getViewWorldToCameraMatrix(
          basicCameraViewData.contents,
          MainTool.getExtensionService(),
          transformData.contents,
          basicCameraView.contents->Obj.magic,
        )->Meta3dCommonlib.NullableTool.getExn
    })

    then("it should be the invert of the transform's localToWorldMatrix", () => {
      viewWorldToCameraMatrix.contents->expect ==
        Js.Typed_array.Float32Array.make([
          0.048192769289016724,
          0.1325301229953766,
          0.22891566157341003,
          0.,
          0.16033364832401276,
          0.26784059405326843,
          0.43466171622276306,
          0.,
          0.21037998795509338,
          0.4439295530319214,
          0.6339203119277954,
          0.,
          -1.,
          -2.,
          -3.,
          1.,
        ])
    })
  })

  let _prepareDataForGetActiveCameraView = (
    (setDataFunc, setCameraView1Func, setCameraView2Func),
    given,
    \"and",
    basicCameraViewComponentName,
    isDebug,
  ) => {
    let contribute: ref<
      Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute,
    > = ref(Obj.magic(1))
    let gameObject1 = 1
    let gameObject2 = 2
    let cameraView1 = ref(Obj.magic(-1))
    let cameraView2 = ref(Obj.magic(-1))

    given("create and set all component states", () => {
      open Meta3dEngineCoreSceneview

      StateContainer.unsafeGetState()
      ->DirectorForJs.createAndSetComponentState(
        basicCameraViewComponentName,
        (
          {
            isDebug: isDebug,
          }: Meta3dComponentBasiccameraviewProtocol.Index.config
        )->Obj.magic,
      )
      ->StateContainer.setState
    })

    \"and"("create two gameObjects", () => {
      ()
    })

    \"and"("create two basicCameraViews as cameraView1, cameraView2", () => {
      contribute := MainTool.unsafeGetUsedComponentContribute(basicCameraViewComponentName)

      let (d, b1) = MainTool.createComponent(contribute.contents)
      let (d, b2) = MainTool.createComponent(d)

      contribute := d
      cameraView1 := b1
      cameraView2 := b2
    })

    \"and"("add them to the gameObjects one by one", () => {
      contribute :=
        MainTool.addComponent(contribute.contents, gameObject1->Obj.magic, cameraView1.contents)
      contribute :=
        MainTool.addComponent(contribute.contents, gameObject2->Obj.magic, cameraView2.contents)

      setCameraView1Func(cameraView1.contents)
      setCameraView2Func(cameraView2.contents)
      setDataFunc(contribute.contents)
    })
  }

  test(."test has none", ({given, \"when", \"and", then}) => {
    let contribute: ref<
      Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute,
    > = ref(Obj.magic(1))
    let cameraView1 = ref(Obj.magic(-1))
    let cameraView2 = ref(Obj.magic(-1))
    let activeBasicCameraView = ref(Obj.magic(1))
    let isDebug = true

    _prepareData(given, \"and", basicCameraViewComponentName)

    _prepareDataForGetActiveCameraView(
      (d => contribute := d, b1 => cameraView1 := b1, b2 => cameraView2 := b2),
      given,
      \"and",
      basicCameraViewComponentName,
      isDebug,
    )

    \"and"("set cameraView1's active to false", () => {
      contribute :=
        MainTool.setComponentData(
          contribute.contents,
          cameraView1.contents,
          Meta3dComponentBasiccameraviewProtocol.Index.dataName.isActive->Obj.magic,
          false->Obj.magic,
        )
    })

    \"and"("set cameraView2's active to false", () => {
      contribute :=
        MainTool.setComponentData(
          contribute.contents,
          cameraView2.contents,
          Meta3dComponentBasiccameraviewProtocol.Index.dataName.isActive->Obj.magic,
          false->Obj.magic,
        )
    })

    \"when"("get active basicCameraView", () => {
      activeBasicCameraView :=
        Main.getActiveCameraView(contribute.contents, MainTool.getExtensionService(), isDebug)
    })

    then("it should return null", () => {
      activeBasicCameraView.contents->Js.Nullable.isNullable->expect == true
    })
  })

  test(."test has one", ({given, \"when", \"and", then}) => {
    let contribute: ref<
      Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute,
    > = ref(Obj.magic(1))
    let cameraView1 = ref(Obj.magic(-1))
    let cameraView2 = ref(Obj.magic(-1))
    let activeBasicCameraView = ref(Obj.magic(1))
    let isDebug = false

    _prepareData(given, \"and", basicCameraViewComponentName)

    _prepareDataForGetActiveCameraView(
      (d => contribute := d, b1 => cameraView1 := b1, b2 => cameraView2 := b2),
      given,
      \"and",
      basicCameraViewComponentName,
      isDebug,
    )

    \"and"("set cameraView1's active to true", () => {
      contribute :=
        MainTool.setComponentData(
          contribute.contents,
          cameraView1.contents,
          Meta3dComponentBasiccameraviewProtocol.Index.dataName.isActive->Obj.magic,
          true->Obj.magic,
        )
    })

    \"and"("set cameraView2's active to false", () => {
      contribute :=
        MainTool.setComponentData(
          contribute.contents,
          cameraView2.contents,
          Meta3dComponentBasiccameraviewProtocol.Index.dataName.isActive->Obj.magic,
          false->Obj.magic,
        )
    })

    \"when"("get active basicCameraView", () => {
      activeBasicCameraView :=
        Main.getActiveCameraView(contribute.contents, MainTool.getExtensionService(), isDebug)
    })

    then("it should return cameraView1", () => {
      activeBasicCameraView.contents->Meta3dCommonlib.NullableTool.getExn->expect ==
        cameraView1.contents
    })
  })

  //   test(."if has >= 2, contract error", ({given, \"when", \"and", then}) => {
  //     let contribute: ref<Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute> = ref(Obj.magic(1))
  //     let cameraView1 = ref(Obj.magic(-1))
  //     let cameraView2 = ref(Obj.magic(-1))
  //     let activeBasicCameraView = ref(Obj.magic(1))
  //     let isDebug = true

  //     _prepareData(given, \"and", basicCameraViewComponentName)

  //     _prepareDataForGetActiveCameraView(
  //       (d => contribute := d, b1 => cameraView1 := b1, b2 => cameraView2 := b2),
  //       given,
  //       \"and",
  //       basicCameraViewComponentName,
  //       isDebug,
  //     )

  //     given("open debug", () => {
  //       ()
  //     })

  //     \"and"("set cameraView1's active to true", () => {
  //       contribute :=
  //         MainTool.setComponentData(
  //           contribute.contents,
  //           cameraView1.contents,
  //           Meta3dComponentBasiccameraviewProtocol.Index.dataName.isActive->Obj.magic,
  //           true->Obj.magic,
  //         )
  //     })

  //     \"and"("set cameraView2's active to true", () => {
  //       contribute :=
  //         MainTool.setComponentData(
  //           contribute.contents,
  //           cameraView2.contents,
  //           Meta3dComponentBasiccameraviewProtocol.Index.dataName.isActive->Obj.magic,
  //           true->Obj.magic,
  //         )
  //     })

  //     \"when"("get active basicCameraView", () => {
  //       ()
  //     })

  //     then(%re("/^should contract error: (.*)$/")->Obj.magic, arg0 => {
  //       expect(() => {
  //         Main.getActiveCameraView(contribute.contents, isDebug)
  //       })->toThrowMessage(arg0->Obj.magic)
  //     })
  //   })
})
