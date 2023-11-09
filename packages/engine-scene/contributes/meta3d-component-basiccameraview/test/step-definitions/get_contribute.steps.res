open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open StateType

let feature = loadFeature("./test/features/get_contribute.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
      Meta3dComponentBasiccameraview.StateType.state,
  Meta3dComponentBasiccameraviewProtocol.Index.config,
  
  Meta3dComponentBasiccameraviewProtocol.Index.needDisposedComponents,
  Meta3dComponentBasiccameraviewProtocol.Index.batchDisposeData,
  Meta3dComponentBasiccameraviewProtocol.Index.cloneConfig,
  Meta3dComponentBasiccameraviewProtocol.Index.basicCameraView,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  

  let _createState = (~isDebug=false, ()) => {
    contribute.contents.createStateFunc(. {isDebug: isDebug})
  }

  test(."componentName", ({\"when", then}) => {
    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    then(%re("/^componentName should be \"(.*)\"$/")->Obj.magic, arg0 => {
      contribute.contents.componentName->expect == arg0
    })
  })

  test(."set config", ({\"when", \"and", then}) => {
    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state with config", () => {
      state := _createState(~isDebug=true, ())
    })

    then("the config is setted", () => {
      ConfigTool.getIsDebug(state.contents)->expect == true
    })
  })

  test(."create a basicCameraView", ({\"when", \"and", then}) => {
    let cameraView = ref(1)

    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    then("createComponentFunc should create a basicCameraView", () => {
      let (s, c) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraView := c

      state.contents.maxIndex->expect == 1
      cameraView.contents->expect == 0
    })
  })

  test(."add a basicCameraView to a gameObject", ({given, \"when", \"and", then}) => {
    let gameObject = 10
    let cameraView = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a basicCameraView", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraView := m
    })

    \"and"("add the basicCameraView to the gameObject", () => {
      state := contribute.contents.addComponentFunc(. state.contents, gameObject, cameraView.contents)
    })

    then("get the gameObject's basicCameraView should be the added one", () => {
      contribute.contents.getComponentFunc(. state.contents, gameObject)
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == cameraView.contents
    })
  })

  test(."add a basicCameraView to a gameObject which alreay has one", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let gameObject = 10
    let cameraView1 = ref(Obj.magic(1))
    let cameraView2 = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create two basicCameraViews", () => {
      let (s, b1) = contribute.contents.createComponentFunc(. state.contents)
      let (s, b2) = contribute.contents.createComponentFunc(. s)

      state := s
      cameraView1 := b1
      cameraView2 := b2
    })

    \"and"("add the first basicCameraView to the gameObject", () => {
      state := contribute.contents.addComponentFunc(. state.contents, gameObject, cameraView1.contents)
    })

    \"and"("add the second basicCameraView to the gameObject", () => {
      state := contribute.contents.addComponentFunc(. state.contents, gameObject, cameraView2.contents)
    })

    then("get the gameObject's basicCameraView should be the second one", () => {
      contribute.contents.getComponentFunc(. state.contents, gameObject)
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == cameraView2.contents
    })
  })

  test(."remove a basicCameraView from a gameObject", ({given, \"when", \"and", then}) => {
    let gameObject = 10
    let basicCameraView = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a basicCameraView", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      basicCameraView := m
    })

    \"and"("add the basicCameraView to the gameObject", () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject, basicCameraView.contents)
    })

    \"and"("remove the basicCameraView from the gameObject", () => {
      state :=
        contribute.contents.removeComponentFunc(. state.contents, gameObject, basicCameraView.contents)
    })

    then("the gameObject shouldn't has the basicCameraView", () => {
      contribute.contents.hasComponentFunc(. state.contents, gameObject)->expect == false
    })
  })

  test(."get need disposed basicCameraViews", ({given, \"when", \"and", then}) => {
    let basicCameraView1 = ref(Obj.magic(1))
    let basicCameraView2 = ref(Obj.magic(1))
    let basicCameraView3 = ref(Obj.magic(1))

    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create three basicCameraViews as t1, t2, t3", () => {
      let (s, m1) = contribute.contents.createComponentFunc(. state.contents)
      let (s, m2) = contribute.contents.createComponentFunc(. s)
      let (s, m3) = contribute.contents.createComponentFunc(. s)

      state := s
      basicCameraView1 := m1
      basicCameraView2 := m2
      basicCameraView3 := m3
    })

    \"and"("defer dispose t1", () => {
      state :=
        contribute.contents.deferDisposeComponentFunc(.
          state.contents,
          Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData(basicCameraView1.contents),
        )
    })

    \"and"("defer dispose t1", () => {
      state :=
        contribute.contents.deferDisposeComponentFunc(.
          state.contents,
          Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData(basicCameraView1.contents),
        )
    })

    \"and"("defer dispose t3", () => {
      state :=
        contribute.contents.deferDisposeComponentFunc(.
          state.contents,
          Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData(basicCameraView3.contents),
        )
    })

    then("get need disposed basicCameraViews should return [t1, t3]", () => {
      contribute.contents.getNeedDisposedComponentsFunc(. state.contents)->expect == [
          basicCameraView1.contents,
          basicCameraView3.contents,
        ]
    })
  })

  test(."get all basicCameraViews", ({given, \"when", \"and", then}) => {
    let gameObject1 = 10
    let gameObject2 = 11
    let cameraView1 = ref(Obj.magic(1))
    let cameraView2 = ref(Obj.magic(1))

    given("create two gameObjects", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create two basicCameraViews", () => {
      let (s, b1) = contribute.contents.createComponentFunc(. state.contents)
      let (s, b2) = contribute.contents.createComponentFunc(. s)

      state := s
      cameraView1 := b1
      cameraView2 := b2
    })

    \"and"("add them to the gameObjects one by one", () => {
      state := contribute.contents.addComponentFunc(. state.contents, gameObject1, cameraView1.contents)
      state := contribute.contents.addComponentFunc(. state.contents, gameObject2, cameraView2.contents)
    })

    then("getAllComponentsFunc should get the two basicCameraViews", () => {
      contribute.contents.getAllComponentsFunc(. state.contents)->expect == [
          cameraView1.contents,
          cameraView2.contents,
        ]
    })
  })

  test(."judge whether a gameObject has a basicCameraView", ({given, \"when", \"and", then}) => {
    let gameObject = 10
    let cameraView = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a basicCameraView", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraView := m
    })

    \"and"("add the basicCameraView to the gameObject", () => {
      state := contribute.contents.addComponentFunc(. state.contents, gameObject, cameraView.contents)
    })

    then("hasComponentFunc should return true", () => {
      contribute.contents.hasComponentFunc(. state.contents, gameObject)->expect == true
    })
  })

  test(."get a basicCameraView's gameObject", ({given, \"when", \"and", then}) => {
    let gameObject = 10
    let basicCameraView = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a basicCameraView", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      basicCameraView := m
    })

    \"and"("add the basicCameraView to the gameObject", () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject, basicCameraView.contents)
    })

    then("getGameObjectsFunc should return [gameObject]", () => {
      contribute.contents.getGameObjectsFunc(. state.contents, basicCameraView.contents)->expect == [
          gameObject,
        ]
    })
  })

  test(."basicCameraView not be added to a gameObject", ({given, \"when", \"and", then}) => {
    let basicCameraView = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a basicCameraView", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      basicCameraView := m
    })

    then("getGameObjectsFunc should return empty", () => {
      contribute.contents.getGameObjectsFunc(. state.contents, basicCameraView.contents)->expect == []
    })
  })

  test(."get unknown data", ({\"when", \"and", then}) => {
    let cameraView = ref(Obj.magic(1))

    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a basicCameraView", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraView := m
    })

    then(%re("/^get basicCameraView's unknown data should error: \"(.+)\"$/")->Obj.magic, arg0 => {
      expect(() => {
        contribute.contents.getComponentDataFunc(. state.contents, cameraView.contents, 10)
      })->toThrowMessage(arg0->Obj.magic)
    })
  })

  test(."set unknown data", ({\"when", \"and", then}) => {
    let cameraView = ref(Obj.magic(1))

    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a basicCameraView", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraView := m
    })

    then(%re("/^set basicCameraView's unknown data should error: \"(.+)\"$/")->Obj.magic, arg0 => {
      expect(() => {
        contribute.contents.setComponentDataFunc(. state.contents, cameraView.contents, 10, -1->Obj.magic)
      })->toThrowMessage(arg0->Obj.magic)
    })
  })

  test(."is active", ({\"when", \"and", then}) => {
    let cameraView = ref(Obj.magic(1))

    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a basicCameraView", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraView := m
    })

    \"and"("set basicCameraView's active to false", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          cameraView.contents,
          Meta3dComponentBasiccameraviewProtocol.Index.dataName.isActive,
          false->Obj.magic,
        )
    })

    then("get basicCameraView's active should return false", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraView.contents,
        Meta3dComponentBasiccameraviewProtocol.Index.dataName.isActive,
      )->expect == false
    })
  })

  test(."should only has one active basicCameraView", ({\"when", \"and", then}) => {
    let cameraView1 = ref(Obj.magic(1))
    let cameraView2 = ref(Obj.magic(1))
    let cameraView3 = ref(Obj.magic(1))

    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"when"(
      %re(
        "/^create three basicCameraViews as cameraView(\d+), cameraView(\d+), cameraView(\d+)$/"
      )->Obj.magic,
      () => {
        let (s, b1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, b2) = contribute.contents.createComponentFunc(. s)
        let (s, b3) = contribute.contents.createComponentFunc(. s)

        state := s
        cameraView1 := b1
        cameraView2 := b2
        cameraView3 := b3
      },
    )

    \"and"(%re("/^set cameraView(\d+)'s active to true$/")->Obj.magic, arg0 => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          cameraView1.contents,
          Meta3dComponentBasiccameraviewProtocol.Index.dataName.isActive,
          true->Obj.magic,
        )
    })

    \"and"(%re("/^set cameraView(\d+)'s active to true$/")->Obj.magic, arg0 => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          cameraView2.contents,
          Meta3dComponentBasiccameraviewProtocol.Index.dataName.isActive,
          true->Obj.magic,
        )
    })

    \"and"(%re("/^set cameraView(\d+)'s active to true$/")->Obj.magic, arg0 => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          cameraView3.contents,
          Meta3dComponentBasiccameraviewProtocol.Index.dataName.isActive,
          true->Obj.magic,
        )
    })

    then(%re("/^get cameraView(\d+)'s active should return false$/")->Obj.magic, arg0 => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraView1.contents,
        Meta3dComponentBasiccameraviewProtocol.Index.dataName.isActive,
      )->expect == false
    })

    then(%re("/^get cameraView(\d+)'s active should return false$/")->Obj.magic, arg0 => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraView2.contents,
        Meta3dComponentBasiccameraviewProtocol.Index.dataName.isActive,
      )->expect == false
    })

    then(%re("/^get cameraView(\d+)'s active should return true$/")->Obj.magic, arg0 => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraView3.contents,
        Meta3dComponentBasiccameraviewProtocol.Index.dataName.isActive,
      )->expect == true
    })
  })

  test(."unactive one should not affect other ones", ({\"when", \"and", then}) => {
    let cameraView1 = ref(Obj.magic(1))
    let cameraView2 = ref(Obj.magic(1))

    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"when"(
      %re("/^create two basicCameraViews as cameraView(\d+), cameraView(\d+)$/")->Obj.magic,
      () => {
        let (s, b1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, b2) = contribute.contents.createComponentFunc(. s)

        state := s
        cameraView1 := b1
        cameraView2 := b2
      },
    )

    \"and"(%re("/^set cameraView(\d+)'s active to true$/")->Obj.magic, arg0 => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          cameraView1.contents,
          Meta3dComponentBasiccameraviewProtocol.Index.dataName.isActive,
          true->Obj.magic,
        )
    })

    \"and"(%re("/^set cameraView(\d+)'s active to false$/")->Obj.magic, arg0 => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          cameraView2.contents,
          Meta3dComponentBasiccameraviewProtocol.Index.dataName.isActive,
          false->Obj.magic,
        )
    })

    then(%re("/^get cameraView(\d+)'s active should return true$/")->Obj.magic, arg0 => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraView1.contents,
        Meta3dComponentBasiccameraviewProtocol.Index.dataName.isActive,
      )->expect == true
    })

    then(%re("/^get cameraView(\d+)'s active should return false$/")->Obj.magic, arg0 => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraView2.contents,
        Meta3dComponentBasiccameraviewProtocol.Index.dataName.isActive,
      )->expect == false
    })
  })
})
