open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/get_contribute.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
      Meta3dComponentTransform.StateType.state,
      Meta3dComponentTransform.StateType.config,
      Meta3dComponentTransformProtocol.Index.dataNameType,
      Meta3dComponentTransform.StateType.transform,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))

  let _createState = (
    ~isDebug=false,
    ~transformCount=10,
    ~float9Array1=Js.Typed_array.Float32Array.make([]),
    ~float32Array1=Js.Typed_array.Float32Array.make([]),
    (),
  ) => {
    StateTool.createState(
      ~contribute=contribute.contents,
      ~isDebug,
      ~transformCount,
      ~float9Array1,
      ~float32Array1,
      (),
    )
  }

  test(."componentName", ({\"when", then}) => {
    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    then(%re("/^componentName should be \"(.*)\"$/")->Obj.magic, arg0 => {
      contribute.contents.componentName->expect == arg0
    })
  })

  test(."set config", ({\"when", \"and", then}) => {
    let transformCount = 10
    let float9Array1 = Js.Typed_array.Float32Array.make([1.0])
    let float32Array1 = Js.Typed_array.Float32Array.make([1.0, 0.0])

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state with config", () => {
      state := _createState(~isDebug=true, ~transformCount, ~float9Array1, ~float32Array1, ())
    })

    then("the config is setted", () => {
      (
        ConfigTool.getIsDebug(state.contents),
        ConfigTool.getTransformCount(state.contents),
        ConfigTool.getFloat9Array1(state.contents),
        ConfigTool.getFloat32Array1(state.contents),
      )->expect == (true, transformCount, float9Array1, float32Array1)
    })
  })

  test(."create dataoriented contribute", ({\"when", \"and", then}) => {
    let transformCount = 10

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state with transformCount", () => {
      state := _createState(~transformCount, ())
    })

    then("dataoriented contribute is created based on transformCount", () => {
      state.contents.localPositions->Js.Typed_array.Float32Array.length->expect ==
        transformCount * 3
    })
  })

  test(."create a transform", ({\"when", \"and", then}) => {
    let transform = ref(Obj.magic(1))

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    then("createComponentFunc should create a transform", () => {
      let (state, t) = contribute.contents.createComponentFunc(. state.contents)

      transform := t

      state.maxIndex->expect == 1
      transform.contents->expect == 0
    })

    \"and"("mark the transform dirty", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        transform.contents,
        Meta3dComponentTransformProtocol.Index.dataName.dirty,
      )->expect == true
    })

    \"and"("set the transform's children to empty", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        transform.contents,
        Meta3dComponentTransformProtocol.Index.dataName.children,
      )->expect == []
    })
  })

  test(."add a transform to a gameObject", ({given, \"when", \"and", then}) => {
    let gameObject = 10->GameObjectTypeConvertUtils.intToGameObject
    let transform = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a transform", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      transform := m
    })

    \"and"("add the transform to the gameObject", () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject, transform.contents)
    })

    then("get the gameObject's transform should be the added one", () => {
      contribute.contents.getComponentFunc(. state.contents, gameObject)
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == transform.contents
    })
  })

  test(."add a transform to a gameObject which alreay has one", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let gameObject = 10->GameObjectTypeConvertUtils.intToGameObject
    let transform1 = ref(Obj.magic(1))
    let transform2 = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create two transforms", () => {
      let (s, m1) = contribute.contents.createComponentFunc(. state.contents)
      let (s, m2) = contribute.contents.createComponentFunc(. s)

      state := s
      transform1 := m1
      transform2 := m2
    })

    \"and"("add the first transform to the gameObject", () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject, transform1.contents)
    })

    \"and"("add the second transform to the gameObject", () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject, transform2.contents)
    })

    then("get the gameObject's transform should be the second one", () => {
      contribute.contents.getComponentFunc(. state.contents, gameObject)
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == transform2.contents
    })
  })

  test(."get all transforms", ({given, \"when", \"and", then}) => {
    let gameObject1 = 10->GameObjectTypeConvertUtils.intToGameObject
    let gameObject2 = 11->GameObjectTypeConvertUtils.intToGameObject
    let transform1 = ref(Obj.magic(1))
    let transform2 = ref(Obj.magic(1))

    given("create two gameObjects", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create two transforms", () => {
      let (s, m1) = contribute.contents.createComponentFunc(. state.contents)
      let (s, m2) = contribute.contents.createComponentFunc(. s)

      state := s
      transform1 := m1
      transform2 := m2
    })

    \"and"("add them to the gameObjects one by one", () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject1, transform1.contents)
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject2, transform2.contents)
    })

    then("getAllComponentsFunc should get the two transforms", () => {
      contribute.contents.getAllComponentsFunc(. state.contents)->expect == [
          transform1.contents,
          transform2.contents,
        ]
    })
  })

  test(."judge whether a gameObject has a transform", ({given, \"when", \"and", then}) => {
    let gameObject = 10->GameObjectTypeConvertUtils.intToGameObject
    let transform = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a transform", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      transform := m
    })

    \"and"("add the transform to the gameObject", () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject, transform.contents)
    })

    then("hasComponentFunc should return true", () => {
      contribute.contents.hasComponentFunc(. state.contents, gameObject)->expect == true
    })
  })

  test(."get a transform's gameObject", ({given, \"when", \"and", then}) => {
    let gameObject = 10->GameObjectTypeConvertUtils.intToGameObject
    let transform = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a transform", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      transform := m
    })

    \"and"("add the transform to the gameObject", () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject, transform.contents)
    })

    then("getGameObjectsFunc should return [gameObject]", () => {
      contribute.contents.getGameObjectsFunc(. state.contents, transform.contents)->expect == [
          gameObject,
        ]
    })
  })

  test(."get default position", ({\"when", \"and", then}) => {
    let transform = ref(Obj.magic(1))

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a transform", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      transform := m
    })

    then("get transform's position should return default data", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        transform.contents,
        Meta3dComponentTransformProtocol.Index.dataName.position,
      )->expect == [0., 0., 0.]
    })
  })

  test(."get default rotation", ({\"when", \"and", then}) => {
    let transform = ref(Obj.magic(1))

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a transform", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      transform := m
    })

    then("get transform's rotation should return default data", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        transform.contents,
        Meta3dComponentTransformProtocol.Index.dataName.rotation,
      )->expect == [0., 0., 0., 1.]
    })
  })

  test(."get default scale", ({\"when", \"and", then}) => {
    let transform = ref(Obj.magic(1))

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a transform", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      transform := m
    })

    then("get transform's scale should return default data", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        transform.contents,
        Meta3dComponentTransformProtocol.Index.dataName.scale,
      )->expect == [1., 1., 1.]
    })
  })

  test(."get default euler angles", ({\"when", \"and", then}) => {
    let transform = ref(Obj.magic(1))

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a transform", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      transform := m
    })

    then("get transform's euler angles should return default data", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        transform.contents,
        Meta3dComponentTransformProtocol.Index.dataName.eulerAngles,
      )->expect == [0., -0., 0.]
    })
  })
})
