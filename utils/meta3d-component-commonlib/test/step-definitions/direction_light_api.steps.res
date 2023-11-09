open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/direction_light_api.feature")

defineFeature(feature, test => {
  let transformData: ref<
    Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute,
  > = ref(Obj.magic(1))
  let directionLightData: ref<
    Meta3dEngineCoreProtocol.RegisterComponentType.usedComponentContribute,
  > = ref(Obj.magic(1))
  let transformComponentName = "Transform"
  let directionLightComponentName = "DirectionLight"
  let transform = ref(Obj.magic(1))
  let directionLight = ref(Obj.magic(1))
  let direction1 = ref(Obj.magic(1))

  let _prepare = (given, \"and") => {
    open Meta3dEngineCoreSceneview

    let gameObject = 1

    given("prepare register", () => {
      CreateState.createState()->StateContainer.setState
    })

    \"and"({j`register transform contribute`}, () => {
      RegisterComponentTool.registerComponent(Meta3dComponentTransform.Main.getContribute)
    })

    \"and"({j`register directionLight contribute`}, () => {
      RegisterComponentTool.registerComponent(Meta3dComponentDirectionlight.Main.getContribute)
    })

    \"and"("create and set all component states", () => {
      StateContainer.unsafeGetState()
      ->DirectorForJs.createAndSetComponentState(
        directionLightComponentName,
        (
          {
            isDebug: false,
            directionLightCount: 2,
          }: Meta3dComponentDirectionlightProtocol.Index.config
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
      directionLightData := MainTool.unsafeGetUsedComponentContribute(directionLightComponentName)
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

    \"and"("create a directionLight", () => {
      let (d, l) = MainTool.createComponent(directionLightData.contents)

      directionLightData := d
      directionLight := l
    })

    \"and"("add the directionLight to the gameObject", () => {
      directionLightData :=
        MainTool.addComponent(
          directionLightData.contents,
          gameObject->Obj.magic,
          directionLight.contents,
        )
    })
  }

  let _prepareGetDirection = (given, \"when") => {
    open Meta3dEngineCoreSceneview

    given(%re("/^set the transform's local euler angles to (.*), (.*), (.*)$/")->Obj.magic, () => {
      let arguments =
        %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

      transformData :=
        MainTool.setComponentData(
          transformData.contents,
          transform.contents,
          Meta3dComponentTransformProtocol.Index.dataName.localEulerAngles->Obj.magic,
          arguments->Js.Array.slice(~start=0, ~end_=3, _)->Obj.magic,
        )
    })

    \"when"("get the directionLight's direction as d1", () => {
      direction1 :=
        Meta3dComponentCommonlib.Main.getDirection(
          directionLightData.contents,
          MainTool.getExtensionService(),
          transformData.contents,
          directionLight.contents->Obj.magic,
        )->Meta3dCommonlib.NullableTool.getExn
    })
  }

  test(."direction shouldn't affected by scale if scale is always postive", ({
    given,
    \"and",
    \"when",
    then,
  }) => {
    let light = ref(Obj.magic(-1))
    let direction2 = ref(Obj.magic(1))

    _prepare(given, \"and")

    _prepareGetDirection(given, \"when")

    \"when"(
      %re("/^set the transform's local scale to (.*), (.*), (.*)$/")->Obj.magic,
      () => {
        let arguments =
          %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

        transformData :=
          MainTool.setComponentData(
            transformData.contents,
            transform.contents,
            Meta3dComponentTransformProtocol.Index.dataName.localScale->Obj.magic,
            arguments->Js.Array.slice(~start=0, ~end_=3, _)->Obj.magic,
          )
      },
    )

    \"and"(
      %re("/^get the directionLight's direction as d(\d+)$/")->Obj.magic,
      arg0 => {
        direction2 :=
          Main.getDirection(
            directionLightData.contents,
            MainTool.getExtensionService(),
            transformData.contents,
            directionLight.contents->Obj.magic,
          )->Meta3dCommonlib.NullableTool.getExn
      },
    )

    then(
      %re("/^d(\d+) should equal d(\d+)$/")->Obj.magic,
      () => {
        direction1.contents->Meta3dCommonlib.Vector3Tool.truncate->expect ==
          direction2.contents->Meta3dCommonlib.Vector3Tool.truncate
      },
    )
  })

  test(."direction should be affected by scale if scale change to negative from positive", ({
    given,
    \"and",
    \"when",
    then,
  }) => {
    let light = ref(Obj.magic(-1))
    let direction2 = ref(Obj.magic(1))

    _prepare(given, \"and")

    _prepareGetDirection(given, \"when")

    \"when"(
      %re("/^set the transform's local scale to (.*), (.*), (.*)$/")->Obj.magic,
      () => {
        let arguments =
          %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

        transformData :=
          MainTool.setComponentData(
            transformData.contents,
            transform.contents,
            Meta3dComponentTransformProtocol.Index.dataName.localScale->Obj.magic,
            arguments->Js.Array.slice(~start=0, ~end_=3, _)->Obj.magic,
          )
      },
    )

    \"and"(
      %re("/^get the directionLight's direction as d(\d+)$/")->Obj.magic,
      arg0 => {
        direction2 :=
          Main.getDirection(
            directionLightData.contents,
            MainTool.getExtensionService(),
            transformData.contents,
            directionLight.contents->Obj.magic,
          )->Meta3dCommonlib.NullableTool.getExn
      },
    )

    then(
      %re("/^d(\d+) should not equal d(\d+)$/")->Obj.magic,
      () => {
        direction1.contents
        ->Meta3dCommonlib.Vector3Tool.truncate
        ->expect
        ->toNotEqual(direction2.contents->Meta3dCommonlib.Vector3Tool.truncate)
      },
    )
  })

  test(."get direction after set direction should equal", ({given, \"and", \"when", then}) => {
    let light = ref(Obj.magic(-1))
    let direction2 = ref(Obj.magic(1))

    _prepare(given, \"and")

    \"and"(
      "set the directionLight's direction to d1",
      () => {
        direction1 := (0.5, 0.5, 1.0)->Meta3dCommonlib.Vector3.normalize
        // direction1 := (0., 0., -.1.0)->Meta3dCommonlib.Vector3.normalize

        transformData :=
          Main.setDirection(
            directionLightData.contents,
            MainTool.getExtensionService(),
            transformData.contents,
            directionLight.contents->Obj.magic,
            direction1.contents,
          )
      },
    )

    \"and"(
      "get the directionLight's direction as d2",
      () => {
        direction2 :=
          Main.getDirection(
            directionLightData.contents,
            MainTool.getExtensionService(),
            transformData.contents,
            directionLight.contents->Obj.magic,
          )->Meta3dCommonlib.NullableTool.getExn
      },
    )

    then(
      "d2 should equal d1",
      () => {
        direction2.contents
        ->Meta3dCommonlib.Vector3Tool.truncate
        ->expect
        ->toEqualFunc(direction1.contents->Meta3dCommonlib.Vector3Tool.truncate)
      },
    )
  })
})
