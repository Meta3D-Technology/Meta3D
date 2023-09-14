open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open StateType

let feature = loadFeature("./test/features/get_contribute.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreSceneviewProtocol.ComponentContributeType.componentContribute<
      Meta3dComponentPerspectivecameraprojection.StateType.state,
      Meta3dComponentPerspectivecameraprojectionProtocol.Index.config,
      
      Meta3dComponentPerspectivecameraprojectionProtocol.Index.needDisposedComponents,
      Meta3dComponentPerspectivecameraprojectionProtocol.Index.batchDisposeData,
      Meta3dComponentPerspectivecameraprojectionProtocol.Index.cloneConfig,
      Meta3dComponentPerspectivecameraprojectionProtocol.Index.perspectiveCameraProjection,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))

  let _createState = (~isDebug=false, ()) => {
    contribute.contents.createStateFunc(. {isDebug: isDebug})
  }

  let _getAllDirtyComponentsFunc = state => {
    contribute.contents.getAllComponentsFunc(.
      state,
    )->Meta3dCommonlib.ArraySt.filter(cameraProjection => {
      contribute.contents.getComponentDataFunc(.
        state,
        cameraProjection,
        Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.dirty,
      )
      ->Obj.magic
      ->Meta3dCommonlib.JudgeTool.isTrue
    })
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

  test(."create a perspectiveCameraProjection", ({\"when", \"and", then}) => {
    let cameraProjection = ref(1)

    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    then("createComponentFunc should create a perspectiveCameraProjection", () => {
      let (s, c) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraProjection := c

      state.contents.maxIndex->expect == 1
      cameraProjection.contents->expect == 0
    })

    \"and"("mark the perspectiveCameraProjection dirty", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraProjection.contents,
        Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.dirty,
      )->expect == true
    })

    \"and"(
      %re("/^set the perspectiveCameraProjection's pMatrix to identiy matrix(\d+)$/")->Obj.magic,
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          cameraProjection.contents,
          Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.pMatrix,
        )->expect == Meta3dCommonlib.Matrix4.createIdentityMatrix4()
      },
    )
  })

  test(."add a perspectiveCameraProjection to a gameObject", ({given, \"when", \"and", then}) => {
    let gameObject = 10
    let cameraProjection = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a perspectiveCameraProjection", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraProjection := m
    })

    \"and"("add the perspectiveCameraProjection to the gameObject", () => {
      state :=
        contribute.contents.addComponentFunc(.
          state.contents,
          gameObject,
          cameraProjection.contents,
        )
    })

    then("get the gameObject's perspectiveCameraProjection should be the added one", () => {
      contribute.contents.getComponentFunc(. state.contents, gameObject)
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == cameraProjection.contents
    })
  })

  test(."add a perspectiveCameraProjection to a gameObject which alreay has one", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let gameObject = 10
    let cameraProjection1 = ref(Obj.magic(1))
    let cameraProjection2 = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create two perspectiveCameraProjections", () => {
      let (s, m1) = contribute.contents.createComponentFunc(. state.contents)
      let (s, m2) = contribute.contents.createComponentFunc(. s)

      state := s
      cameraProjection1 := m1
      cameraProjection2 := m2
    })

    \"and"("add the first perspectiveCameraProjection to the gameObject", () => {
      state :=
        contribute.contents.addComponentFunc(.
          state.contents,
          gameObject,
          cameraProjection1.contents,
        )
    })

    \"and"("add the second perspectiveCameraProjection to the gameObject", () => {
      state :=
        contribute.contents.addComponentFunc(.
          state.contents,
          gameObject,
          cameraProjection2.contents,
        )
    })

    then("get the gameObject's perspectiveCameraProjection should be the second one", () => {
      contribute.contents.getComponentFunc(. state.contents, gameObject)
      ->Meta3dCommonlib.NullableTool.getExn
      ->expect == cameraProjection2.contents
    })
  })

  test(."remove a perspectiveCameraProjection from a gameObject", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let gameObject = 10
    let perspectiveCameraProjection = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a perspectiveCameraProjection", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      perspectiveCameraProjection := m
    })

    \"and"("add the perspectiveCameraProjection to the gameObject", () => {
      state :=
        contribute.contents.addComponentFunc(.
          state.contents,
          gameObject,
          perspectiveCameraProjection.contents,
        )
    })

    \"and"("remove the perspectiveCameraProjection from the gameObject", () => {
      state :=
        contribute.contents.removeComponentFunc(.
          state.contents,
          gameObject,
          perspectiveCameraProjection.contents,
        )
    })

    then("the gameObject shouldn't has the perspectiveCameraProjection", () => {
      contribute.contents.hasComponentFunc(. state.contents, gameObject)->expect == false
    })
  })

  test(."get need disposed perspectiveCameraProjections", ({given, \"when", \"and", then}) => {
    let perspectiveCameraProjection1 = ref(Obj.magic(1))
    let perspectiveCameraProjection2 = ref(Obj.magic(1))
    let perspectiveCameraProjection3 = ref(Obj.magic(1))

    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create three perspectiveCameraProjections as t1, t2, t3", () => {
      let (s, m1) = contribute.contents.createComponentFunc(. state.contents)
      let (s, m2) = contribute.contents.createComponentFunc(. s)
      let (s, m3) = contribute.contents.createComponentFunc(. s)

      state := s
      perspectiveCameraProjection1 := m1
      perspectiveCameraProjection2 := m2
      perspectiveCameraProjection3 := m3
    })

    \"and"("defer dispose t1", () => {
      state :=
        contribute.contents.deferDisposeComponentFunc(.
          state.contents,
          Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData(
            perspectiveCameraProjection1.contents,
          ),
        )
    })

    \"and"("defer dispose t1", () => {
      state :=
        contribute.contents.deferDisposeComponentFunc(.
          state.contents,
          Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData(
            perspectiveCameraProjection1.contents,
          ),
        )
    })

    \"and"("defer dispose t3", () => {
      state :=
        contribute.contents.deferDisposeComponentFunc(.
          state.contents,
          Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData(
            perspectiveCameraProjection3.contents,
          ),
        )
    })

    then("get need disposed perspectiveCameraProjections should return [t1, t3]", () => {
      contribute.contents.getNeedDisposedComponentsFunc(. state.contents)->expect == [
          perspectiveCameraProjection1.contents,
          perspectiveCameraProjection3.contents,
        ]
    })
  })

  test(."get all perspectiveCameraProjections", ({given, \"when", \"and", then}) => {
    let gameObject1 = 10
    let gameObject2 = 11
    let cameraProjection1 = ref(Obj.magic(1))
    let cameraProjection2 = ref(Obj.magic(1))

    given("create two gameObjects", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create two perspectiveCameraProjections", () => {
      let (s, m1) = contribute.contents.createComponentFunc(. state.contents)
      let (s, m2) = contribute.contents.createComponentFunc(. s)

      state := s
      cameraProjection1 := m1
      cameraProjection2 := m2
    })

    \"and"("add them to the gameObjects one by one", () => {
      state :=
        contribute.contents.addComponentFunc(.
          state.contents,
          gameObject1,
          cameraProjection1.contents,
        )
      state :=
        contribute.contents.addComponentFunc(.
          state.contents,
          gameObject2,
          cameraProjection2.contents,
        )
    })

    then("getAllComponentsFunc should get the two perspectiveCameraProjections", () => {
      contribute.contents.getAllComponentsFunc(. state.contents)->expect == [
          cameraProjection1.contents,
          cameraProjection2.contents,
        ]
    })
  })

  test(."get all dirty perspectiveCameraProjections", ({given, \"when", \"and", then}) => {
    let gameObject1 = 10
    let gameObject2 = 11
    let cameraProjection1 = ref(Obj.magic(1))
    let cameraProjection2 = ref(Obj.magic(1))

    given("create two gameObjects", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create two perspectiveCameraProjections", () => {
      let (s, m1) = contribute.contents.createComponentFunc(. state.contents)
      let (s, m2) = contribute.contents.createComponentFunc(. s)

      state := s
      cameraProjection1 := m1
      cameraProjection2 := m2
    })

    \"and"("mark the first perspectiveCameraProjection not dirty", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          cameraProjection1.contents,
          Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.dirty,
          false->Obj.magic,
        )
    })

    \"and"("add them to the gameObjects one by one", () => {
      state :=
        contribute.contents.addComponentFunc(.
          state.contents,
          gameObject1,
          cameraProjection1.contents,
        )
      state :=
        contribute.contents.addComponentFunc(.
          state.contents,
          gameObject2,
          cameraProjection2.contents,
        )
    })

    then(
      "get all dirty perspectiveCameraProjections should get [the second perspectiveCameraProjection]",
      () => {
        _getAllDirtyComponentsFunc(state.contents)->expect == [cameraProjection2.contents]
      },
    )
  })

  test(."judge whether a gameObject has a perspectiveCameraProjection", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let gameObject = 10
    let cameraProjection = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a perspectiveCameraProjection", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraProjection := m
    })

    \"and"("add the perspectiveCameraProjection to the gameObject", () => {
      state :=
        contribute.contents.addComponentFunc(.
          state.contents,
          gameObject,
          cameraProjection.contents,
        )
    })

    then("hasComponentFunc should return true", () => {
      contribute.contents.hasComponentFunc(. state.contents, gameObject)->expect == true
    })
  })

  test(."get a perspectiveCameraProjection's gameObject", ({given, \"when", \"and", then}) => {
    let gameObject = 10
    let perspectiveCameraProjection = ref(Obj.magic(1))

    given("create a gameObject", () => {
      ()
    })

    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a perspectiveCameraProjection", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      perspectiveCameraProjection := m
    })

    \"and"("add the perspectiveCameraProjection to the gameObject", () => {
      state :=
        contribute.contents.addComponentFunc(.
          state.contents,
          gameObject,
          perspectiveCameraProjection.contents,
        )
    })

    then("getGameObjectsFunc should return [gameObject]", () => {
      contribute.contents.getGameObjectsFunc(.
        state.contents,
        perspectiveCameraProjection.contents,
      )->expect == [gameObject]
    })
  })

  test(."get default pMatrix", ({\"when", \"and", then}) => {
    let cameraProjection = ref(Obj.magic(1))

    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a perspectiveCameraProjection", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraProjection := m
    })

    then("get perspectiveCameraProjection's pMatrix should return default data", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraProjection.contents,
        Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.pMatrix,
      )->expect == Meta3dCommonlib.Matrix4.createIdentityMatrix4()
    })
  })

  test(."operate pMatrix", ({\"when", \"and", then}) => {
    let pMatrix = [0.0, 0.5, 1.0]
    let cameraProjection = ref(Obj.magic(1))

    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a perspectiveCameraProjection", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraProjection := m
    })

    \"when"("set perspectiveCameraProjection's pMatrix", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          cameraProjection.contents,
          Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.pMatrix,
          pMatrix->Obj.magic,
        )
    })

    then("get perspectiveCameraProjection's pMatrix should return the setted data", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraProjection.contents,
        Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.pMatrix,
      )->expect == pMatrix
    })
  })

  test(."operate fovy", ({\"when", \"and", then}) => {
    let fovy = 0.5
    let cameraProjection = ref(Obj.magic(1))

    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a perspectiveCameraProjection", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraProjection := m
    })

    \"when"("set perspectiveCameraProjection's fovy", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          cameraProjection.contents,
          Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.fovy,
          fovy->Obj.magic,
        )
    })

    then("get perspectiveCameraProjection's fovy should return the setted data", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraProjection.contents,
        Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.fovy,
      )->expect == fovy
    })
  })

  test(."operate aspect", ({\"when", \"and", then}) => {
    let aspect = 0.5
    let cameraProjection = ref(Obj.magic(1))

    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a perspectiveCameraProjection", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraProjection := m
    })

    \"when"("set perspectiveCameraProjection's aspect", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          cameraProjection.contents,
          Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.aspect,
          aspect->Obj.magic,
        )
    })

    then("get perspectiveCameraProjection's aspect should return the setted data", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraProjection.contents,
        Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.aspect,
      )->expect == aspect
    })
  })

  test(."operate far", ({\"when", \"and", then}) => {
    let far = 0.5
    let cameraProjection = ref(Obj.magic(1))

    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a perspectiveCameraProjection", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraProjection := m
    })

    \"when"("set perspectiveCameraProjection's far", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          cameraProjection.contents,
          Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.far,
          far->Obj.magic,
        )
    })

    then("get perspectiveCameraProjection's far should return the setted data", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraProjection.contents,
        Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.far,
      )->expect == far
    })
  })

  test(."operate near", ({\"when", \"and", then}) => {
    let near = 0.5
    let cameraProjection = ref(Obj.magic(1))

    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := _createState()
    })

    \"and"("create a perspectiveCameraProjection", () => {
      let (s, m) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      cameraProjection := m
    })

    \"when"("set perspectiveCameraProjection's near", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          cameraProjection.contents,
          Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.near,
          near->Obj.magic,
        )
    })

    then("get perspectiveCameraProjection's near should return the setted data", () => {
      contribute.contents.getComponentDataFunc(.
        state.contents,
        cameraProjection.contents,
        Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.near,
      )->expect == near
    })
  })
})
