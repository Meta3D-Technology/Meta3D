open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open StateType

let feature = loadFeature("./test/features/get_contribute.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
  StateType.state,
  Meta3dComponentArcballcameracontrollerProtocol.Index.config,
  Meta3dComponentArcballcameracontrollerProtocol.Index.dataNameType,
  Meta3dComponentArcballcameracontrollerProtocol.Index.needDisposedComponents,
  Meta3dComponentArcballcameracontrollerProtocol.Index.batchDisposeData,
  Meta3dComponentArcballcameracontrollerProtocol.Index.cloneConfig,
  Meta3dComponentArcballcameracontrollerProtocol.Index.arcballCameraController,
>,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  

  let _createState = (~isDebug=false, ()) => {
    contribute.contents.createStateFunc(. {isDebug: isDebug})
  }

  let _getAllDirtyComponentsFunc = state => {
    contribute.contents.getAllComponentsFunc(.
      state,
    )->Meta3dCommonlib.ArraySt.filter(cameraController => {
      contribute.contents.getComponentDataFunc(.
        state,
        cameraController,
        Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.dirty,
      )
      ->Obj.magic
      ->Meta3dCommonlib.JudgeTool.isTrue
    })
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
    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state with config", () => {
      state := _createState(~isDebug=true, ())
    })

    then("the config is setted", () => {
      ConfigTool.getIsDebug(state.contents)->expect == true
    })
  })

  test(."create a arcballCameraController", ({\"when", \"and", then}) => {
    let cameraController = ref(1)

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    then("createComponentFunc should create a arcballCameraController", () => {
      let (s, c) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraController := c

      state.contents.maxIndex->expect == 1
      cameraController.contents->expect == 0
    })

    \"and"("mark the arcballCameraController dirty", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraController.contents,
        Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.dirty,
      )->expect == true
    })

    \"and"(%re("/^set the arcballCameraController's all data to default data$/")->Obj.magic, () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraController.contents,
        Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.distance,
      )->expect == 10.
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraController.contents,
        Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.minDistance,
      )->expect == 0.05
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraController.contents,
        Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.phi,
      )->expect == Js.Math._PI /. 2.
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraController.contents,
        Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.theta,
      )->expect == Js.Math._PI /. 2.
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraController.contents,
        Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.thetaMargin,
      )->expect == 0.05
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraController.contents,
        Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.target,
      )->expect == [0., 0., 0.]
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraController.contents,
        Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.moveSpeedX,
      )->expect == 1.
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraController.contents,
        Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.moveSpeedY,
      )->expect == 1.
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraController.contents,
        Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.rotateSpeed,
      )->expect == 1.
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraController.contents,
        Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.wheelSpeed,
      )->expect == 1.
    })
  })

  test(."add a arcballCameraController to a gameObject", ({given, \"when", \"and", then}) => {
    let gameObject = 10
    let cameraController = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a arcballCameraController", () => {
      let (s, c) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraController := c
    })

    \"and"("add the arcballCameraController to the gameObject", () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject, cameraController.contents)
    })

    then("get the gameObject's arcballCameraController should be the added one", () => {
      contribute.contents.getComponentFunc(. state.contents, gameObject)
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == cameraController.contents
    })
  })

  test(."add a arcballCameraController to a gameObject which alreay has one", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let gameObject = 10
    let cameraController1 = ref(Obj.magic(1))
    let cameraController2 = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create two arcballCameraControllers", () => {
      let (s, b1) = contribute.contents.createComponentFunc(. state.contents)
      let (s, b2) = contribute.contents.createComponentFunc(. s)

      state := s
      cameraController1 := b1
      cameraController2 := b2
    })

    \"and"("add the first arcballCameraController to the gameObject", () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject, cameraController1.contents)
    })

    \"and"("add the second arcballCameraController to the gameObject", () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject, cameraController2.contents)
    })

    then("get the gameObject's arcballCameraController should be the second one", () => {
      contribute.contents.getComponentFunc(. state.contents, gameObject)
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == cameraController2.contents
    })
  })

  test(."get all arcballCameraControllers", ({given, \"when", \"and", then}) => {
    let gameObject1 = 10
    let gameObject2 = 11
    let cameraController1 = ref(Obj.magic(1))
    let cameraController2 = ref(Obj.magic(1))

    given("create two gameObjects", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create two arcballCameraControllers", () => {
      let (s, b1) = contribute.contents.createComponentFunc(. state.contents)
      let (s, b2) = contribute.contents.createComponentFunc(. s)

      state := s
      cameraController1 := b1
      cameraController2 := b2
    })

    \"and"("add them to the gameObjects one by one", () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject1, cameraController1.contents)
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject2, cameraController2.contents)
    })

    then("getAllComponentsFunc should get the two arcballCameraControllers", () => {
      contribute.contents.getAllComponentsFunc(. state.contents)->expect == [
          cameraController1.contents,
          cameraController2.contents,
        ]
    })
  })

  test(."get all dirty arcballCameraControllers", ({given, \"when", \"and", then}) => {
    let gameObject1 = 10
    let gameObject2 = 11
    let cameraController1 = ref(Obj.magic(1))
    let cameraController2 = ref(Obj.magic(1))

    given("create two gameObjects", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create two arcballCameraControllers", () => {
      let (s, c1) = contribute.contents.createComponentFunc(. state.contents)
      let (s, c2) = contribute.contents.createComponentFunc(. s)

      state := s
      cameraController1 := c1
      cameraController2 := c2
    })

    \"and"("mark the first arcballCameraController not dirty", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          cameraController1.contents,
          Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.dirty,
          false->Obj.magic,
        )
    })

    \"and"("add them to the gameObjects one by one", () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject1, cameraController1.contents)
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject2, cameraController2.contents)
    })

    then(
      "get all dirty arcballCameraControllers should get [the second arcballCameraController]",
      () => {
        _getAllDirtyComponentsFunc(state.contents)->expect == [cameraController2.contents]
      },
    )
  })

  test(."clear all dirty arcballCameraControllers", ({given, \"when", \"and", then}) => {
    let gameObject1 = 10
    let gameObject2 = 11
    let cameraController1 = ref(Obj.magic(1))
    let cameraController2 = ref(Obj.magic(1))

    let _clearAllDirtyComponentsFunc = state => {
      contribute.contents.getAllComponentsFunc(.
        state,
      )->Meta3dCommonlib.ArraySt.reduceOneParam((. state, cameraController) => {
        contribute.contents.setComponentDataFunc(.
          state,
          cameraController,
          Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.dirty,
          false->Obj.magic,
        )
      }, state)
    }

    given("create two gameObjects", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create two arcballCameraControllers", () => {
      let (s, c1) = contribute.contents.createComponentFunc(. state.contents)
      let (s, c2) = contribute.contents.createComponentFunc(. s)

      state := s
      cameraController1 := c1
      cameraController2 := c2
    })

    \"and"("mark the first arcballCameraController not dirty", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          cameraController1.contents,
          Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.dirty,
          false->Obj.magic,
        )
    })

    \"and"("add them to the gameObjects one by one", () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject1, cameraController1.contents)
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject2, cameraController2.contents)
    })

    \"and"("clear all dirty arcballCameraControllers", () => {
      state := _clearAllDirtyComponentsFunc(state.contents)
    })

    then("get all dirty arcballCameraControllers should get empty", () => {
      _getAllDirtyComponentsFunc(state.contents)->expect == []
    })
  })

  test(."judge whether a gameObject has a arcballCameraController", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let gameObject = 10
    let cameraController = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a arcballCameraController", () => {
      let (s, c) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraController := c
    })

    \"and"("add the arcballCameraController to the gameObject", () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject, cameraController.contents)
    })

    then("hasComponentFunc should return true", () => {
      contribute.contents.hasComponentFunc(. state.contents, gameObject)->expect == true
    })
  })

  test(."get a arcballCameraController's gameObject", ({given, \"when", \"and", then}) => {
    let gameObject = 10
    let arcballCameraController = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a arcballCameraController", () => {
      let (s, c) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      arcballCameraController := c
    })

    \"and"("add the arcballCameraController to the gameObject", () => {
      state :=
        contribute.contents.addComponentFunc(.
          state.contents,
          gameObject,
          arcballCameraController.contents,
        )
    })

    then("getGameObjectsFunc should return [gameObject]", () => {
      contribute.contents.getGameObjectsFunc(.
        state.contents,
        arcballCameraController.contents,
      )->expect == [gameObject]
    })
  })

  test(."arcballCameraController not be added to a gameObject", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let arcballCameraController = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a arcballCameraController", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      arcballCameraController := m
    })

    then("getGameObjectsFunc should return empty", () => {
      contribute.contents.getGameObjectsFunc(.
        state.contents,
        arcballCameraController.contents,
      )->expect == []
    })
  })

  test(."get unknown data", ({\"when", \"and", then}) => {
    let cameraController = ref(Obj.magic(1))

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a arcballCameraController", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraController := m
    })

    then(
      %re("/^get arcballCameraController's unknown data should error: \"(.+)\"$/")->Obj.magic,
      arg0 => {
        expect(() => {
          contribute.contents.getComponentDataFunc(. state.contents, cameraController.contents, 100)
        })->toThrowMessage(arg0->Obj.magic)
      },
    )
  })

  test(."set unknown data", ({\"when", \"and", then}) => {
    let cameraController = ref(Obj.magic(1))

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a arcballCameraController", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraController := m
    })

    then(
      %re("/^set arcballCameraController's unknown data should error: \"(.+)\"$/")->Obj.magic,
      arg0 => {
        expect(() => {
          contribute.contents.setComponentDataFunc(.
            state.contents,
            cameraController.contents,
            100,
            -1->Obj.magic,
          )
        })->toThrowMessage(arg0->Obj.magic)
      },
    )
  })

  test(."get default distance", ({\"when", \"and", then}) => {
    let cameraController = ref(Obj.magic(1))

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a arcballCameraController", () => {
      let (s, c) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraController := c
    })

    then("get arcballCameraController's distance should return default data", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraController.contents,
        Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.distance,
      )->expect == 10.
    })
  })

  test(."set distance", ({\"when", \"and", then}) => {
    let cameraController = ref(Obj.magic(1))

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a arcballCameraController", () => {
      let (s, c) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraController := c
    })

    \"when"(%re("/^set arcballCameraController's distance to (\d+)$/")->Obj.magic, arg0 => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          cameraController.contents,
          Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.distance,
          arg0->Obj.magic,
        )
    })

    then(%re("/^get arcballCameraController's distance should return (\d+)$/")->Obj.magic, arg0 => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraController.contents,
        Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.distance,
      )->expect == arg0
    })
  })

  test(."constrain distance", ({\"when", \"and", then}) => {
    let cameraController = ref(Obj.magic(1))

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a arcballCameraController", () => {
      let (s, c) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraController := c
    })

    \"when"(%re("/^set arcballCameraController's min disntance to (\d+)$/")->Obj.magic, arg0 => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          cameraController.contents,
          Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.minDistance,
          arg0->Obj.magic,
        )
    })

    \"and"(%re("/^set arcballCameraController's distance to (\d+)$/")->Obj.magic, arg0 => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          cameraController.contents,
          Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.distance,
          arg0->Obj.magic,
        )
    })

    then(%re("/^get arcballCameraController's distance should return (\d+)$/")->Obj.magic, arg0 => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraController.contents,
        Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.distance,
      )->expect == arg0
    })
  })

  test(."operate min distance", ({\"when", \"and", then}) => {
    let cameraController = ref(Obj.magic(1))
    let minDistance = 1.5

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a arcballCameraController", () => {
      let (s, c) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraController := c
    })

    \"when"("set arcballCameraController's min distance", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          cameraController.contents,
          Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.minDistance,
          minDistance->Obj.magic,
        )
    })

    then("get arcballCameraController's min distance should return the setted data", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraController.contents,
        Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.minDistance,
      )->expect == minDistance
    })
  })

  test(."operate wheel speed", ({\"when", \"and", then}) => {
    let cameraController = ref(Obj.magic(1))
    let wheelSpeed = 1.5

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a arcballCameraController", () => {
      let (s, c) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraController := c
    })

    \"when"("set arcballCameraController's wheel speed", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          cameraController.contents,
          Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.wheelSpeed,
          wheelSpeed->Obj.magic,
        )
    })

    then("get arcballCameraController's wheel speed should return the setted data", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraController.contents,
        Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.wheelSpeed,
      )->expect == wheelSpeed
    })
  })

  test(."operate rotate speed", ({\"when", \"and", then}) => {
    let cameraController = ref(Obj.magic(1))
    let rotateSpeed = 1.5

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a arcballCameraController", () => {
      let (s, c) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraController := c
    })

    \"when"("set arcballCameraController's rotate speed", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          cameraController.contents,
          Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.rotateSpeed,
          rotateSpeed->Obj.magic,
        )
    })

    then("get arcballCameraController's rotate speed should return the setted data", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraController.contents,
        Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.rotateSpeed,
      )->expect == rotateSpeed
    })
  })

  test(."operate move speedX", ({\"when", \"and", then}) => {
    let cameraController = ref(Obj.magic(1))
    let moveSpeedX = 1.5

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a arcballCameraController", () => {
      let (s, c) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraController := c
    })

    \"when"("set arcballCameraController's move speedX", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          cameraController.contents,
          Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.moveSpeedX,
          moveSpeedX->Obj.magic,
        )
    })

    then("get arcballCameraController's move speedX should return the setted data", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraController.contents,
        Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.moveSpeedX,
      )->expect == moveSpeedX
    })
  })

  test(."operate move speedY", ({\"when", \"and", then}) => {
    let cameraController = ref(Obj.magic(1))
    let moveSpeedY = 1.5

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a arcballCameraController", () => {
      let (s, c) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraController := c
    })

    \"when"("set arcballCameraController's move speedY", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          cameraController.contents,
          Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.moveSpeedY,
          moveSpeedY->Obj.magic,
        )
    })

    then("get arcballCameraController's move speedY should return the setted data", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraController.contents,
        Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.moveSpeedY,
      )->expect == moveSpeedY
    })
  })

  test(."operate phi", ({\"when", \"and", then}) => {
    let cameraController = ref(Obj.magic(1))
    let phi = 1.5

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a arcballCameraController", () => {
      let (s, c) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraController := c
    })

    \"when"("set arcballCameraController's phi", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          cameraController.contents,
          Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.phi,
          phi->Obj.magic,
        )
    })

    then("get arcballCameraController's phi should return the setted data", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraController.contents,
        Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.phi,
      )->expect == phi
    })
  })

  test(."operate target", ({\"when", \"and", then}) => {
    let cameraController = ref(Obj.magic(1))
    let target = 1.5

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a arcballCameraController", () => {
      let (s, c) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraController := c
    })

    \"when"("set arcballCameraController's target", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          cameraController.contents,
          Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.target,
          target->Obj.magic,
        )
    })

    then("get arcballCameraController's target should return the setted data", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraController.contents,
        Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.target,
      )->expect == target
    })
  })

  test(."set theta", ({\"when", \"and", then}) => {
    let cameraController = ref(Obj.magic(1))

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a arcballCameraController", () => {
      let (s, c) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraController := c
    })

    \"when"(%re("/^set arcballCameraController's theta to (\d+)$/")->Obj.magic, arg0 => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          cameraController.contents,
          Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.theta,
          arg0->Obj.magic,
        )
    })

    then(%re("/^get arcballCameraController's theta should return (\d+)$/")->Obj.magic, arg0 => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraController.contents,
        Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.theta,
      )->expect == arg0
    })
  })

  test(."constrain theta", ({\"when", \"and", then}) => {
    let cameraController = ref(Obj.magic(1))

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a arcballCameraController", () => {
      let (s, c) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraController := c
    })

    \"when"(%re("/^set arcballCameraController's theta margin to (\d+)$/")->Obj.magic, arg0 => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          cameraController.contents,
          Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.thetaMargin,
          arg0->Obj.magic,
        )
    })

    \"and"(%re("/^set arcballCameraController's theta to (\d+)$/")->Obj.magic, arg0 => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          cameraController.contents,
          Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.theta,
          arg0->Obj.magic,
        )
    })

    then(
      %re("/^get arcballCameraController's theta should return pi - (\d+)$/")->Obj.magic,
      arg0 => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          cameraController.contents,
          Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.theta,
        )->expect == Js.Math._PI -. arg0->Obj.magic
      },
    )
  })

  test(."set theta margin", ({\"when", \"and", then}) => {
    let cameraController = ref(Obj.magic(1))

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a arcballCameraController", () => {
      let (s, c) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraController := c
    })

    \"when"(%re("/^set arcballCameraController's theta margin to (\d+)$/")->Obj.magic, arg0 => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          cameraController.contents,
          Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.thetaMargin,
          arg0->Obj.magic,
        )
    })

    then(
      %re("/^get arcballCameraController's theta margin should return (\d+)$/")->Obj.magic,
      arg0 => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          cameraController.contents,
          Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.thetaMargin,
        )->expect == arg0
      },
    )
  })

  test(."set theta margin should constrain theta", ({\"when", \"and", then}) => {
    let cameraController = ref(Obj.magic(1))

    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a arcballCameraController", () => {
      let (s, c) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraController := c
    })

    \"when"(%re("/^set arcballCameraController's theta to (\d+)$/")->Obj.magic, arg0 => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          cameraController.contents,
          Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.theta,
          arg0->Obj.magic,
        )
    })

    \"and"(%re("/^set arcballCameraController's theta margin to (\d+)$/")->Obj.magic, arg0 => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          cameraController.contents,
          Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.thetaMargin,
          arg0->Obj.magic,
        )
    })

    then(
      %re("/^get arcballCameraController's theta should return pi - (\d+)$/")->Obj.magic,
      arg0 => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          cameraController.contents,
          Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.theta,
        )->expect == Js.Math._PI -. arg0->Obj.magic
      },
    )
  })
})
