open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open StateType

let feature = loadFeature("./test/features/get_contribute.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreSceneviewProtocol.ComponentContributeType.componentContribute<
      Meta3dComponentDirectionlight.StateType.state,
      Meta3dComponentDirectionlightProtocol.Index.config,
      Meta3dComponentDirectionlightProtocol.Index.needDisposedComponents,
      Meta3dComponentDirectionlightProtocol.Index.batchDisposeData,
      Meta3dComponentDirectionlightProtocol.Index.cloneConfig,
      Meta3dComponentDirectionlightProtocol.Index.directionLight,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))

  let _createState = (~isDebug=false, ~directionLightCount=10, ()) => {
    contribute.contents.createStateFunc(. {
      isDebug,
      directionLightCount,
    })
  }

  test(."componentName", ({\"when", then}) => {
    \"when"(
      "I get contribute",
      () => {
        contribute := MainTool.getContribute()
      },
    )

    then(
      %re("/^componentName should be \"(.*)\"$/")->Obj.magic,
      arg0 => {
        contribute.contents.componentName->expect == arg0
      },
    )
  })

  test(."set config", ({\"when", \"and", then}) => {
    let directionLightCount = 10

    \"when"(
      "I get contribute",
      () => {
        contribute := MainTool.getContribute()
      },
    )

    \"and"(
      "create a state with config",
      () => {
        state := _createState(~isDebug=true, ~directionLightCount, ())
      },
    )

    then(
      "the config is setted",
      () => {
        (
          ConfigTool.getIsDebug(state.contents),
          ConfigTool.getDirectionLightCount(state.contents),
        )->expect == (true, directionLightCount)
      },
    )
  })

  test(."create dataoriented data", ({\"when", \"and", then}) => {
    let directionLightCount = 10

    \"when"(
      "I get contribute",
      () => {
        contribute := MainTool.getContribute()
      },
    )

    \"and"(
      "create a state with directionLightCount",
      () => {
        state := _createState(~directionLightCount, ())
      },
    )

    then(
      "dataoriented data is created based on directionLightCount",
      () => {
        state.contents.colors->Js.Typed_array.Float32Array.length->expect == directionLightCount * 3
      },
    )
  })

  test(."create a directionLight", ({\"when", \"and", then}) => {
    \"when"(
      "I get contribute",
      () => {
        contribute := MainTool.getContribute()
      },
    )

    \"and"(
      "create a state",
      () => {
        state := _createState()
      },
    )

    then(
      "createComponentFunc should create a directionLight",
      () => {
        let (state, light) = contribute.contents.createComponentFunc(. state.contents)

        state.maxIndex->expect == 1
        light->expect == 0
      },
    )
  })

  test(."add a directionLight to a gameObject", ({given, \"when", \"and", then}) => {
    let gameObject = 10
    let light = ref(Obj.magic(1))

    given(
      "create a gameObject",
      () => {
        ()
      },
    )

    \"when"(
      "I get contribute",
      () => {
        contribute := MainTool.getContribute()
      },
    )

    \"and"(
      "create a state",
      () => {
        state := _createState()
      },
    )

    \"and"(
      "create a directionLight",
      () => {
        let (s, m) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        light := m
      },
    )

    \"and"(
      "add the directionLight to the gameObject",
      () => {
        state := contribute.contents.addComponentFunc(. state.contents, gameObject, light.contents)
      },
    )

    then(
      "get the gameObject's directionLight should be the added one",
      () => {
        contribute.contents.getComponentFunc(. state.contents, gameObject)
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == light.contents
      },
    )
  })

  test(."add a directionLight to a gameObject which alreay has one", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let gameObject = 10
    let material1 = ref(Obj.magic(1))
    let material2 = ref(Obj.magic(1))

    given(
      "create a gameObject",
      () => {
        ()
      },
    )

    \"when"(
      "I get contribute",
      () => {
        contribute := MainTool.getContribute()
      },
    )

    \"and"(
      "create a state",
      () => {
        state := _createState()
      },
    )

    \"and"(
      "create two directionLights",
      () => {
        let (s, m1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, m2) = contribute.contents.createComponentFunc(. s)

        state := s
        material1 := m1
        material2 := m2
      },
    )

    \"and"(
      "add the first directionLight to the gameObject",
      () => {
        state :=
          contribute.contents.addComponentFunc(. state.contents, gameObject, material1.contents)
      },
    )

    \"and"(
      "add the second directionLight to the gameObject",
      () => {
        state :=
          contribute.contents.addComponentFunc(. state.contents, gameObject, material2.contents)
      },
    )

    then(
      "get the gameObject's directionLight should be the second one",
      () => {
        contribute.contents.getComponentFunc(. state.contents, gameObject)
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == material2.contents
      },
    )
  })

  test(."remove a directionLight from a gameObject", ({given, \"when", \"and", then}) => {
    let gameObject = 10
    let directionLight = ref(Obj.magic(1))

    given(
      "create a gameObject",
      () => {
        ()
      },
    )

    \"when"(
      "I get contribute",
      () => {
        contribute := MainTool.getContribute()
      },
    )

    \"and"(
      "create a state",
      () => {
        state := _createState()
      },
    )

    \"and"(
      "create a directionLight",
      () => {
        let (s, m) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        directionLight := m
      },
    )

    \"and"(
      "add the directionLight to the gameObject",
      () => {
        state :=
          contribute.contents.addComponentFunc(.
            state.contents,
            gameObject,
            directionLight.contents,
          )
      },
    )

    \"and"(
      "remove the directionLight from the gameObject",
      () => {
        state :=
          contribute.contents.removeComponentFunc(.
            state.contents,
            gameObject,
            directionLight.contents,
          )
      },
    )

    then(
      "the gameObject shouldn't has the directionLight",
      () => {
        contribute.contents.hasComponentFunc(. state.contents, gameObject)->expect == false
      },
    )
  })

  test(."get need disposed directionLights", ({given, \"when", \"and", then}) => {
    let directionLight1 = ref(Obj.magic(1))
    let directionLight2 = ref(Obj.magic(1))
    let directionLight3 = ref(Obj.magic(1))

    \"when"(
      "I get contribute",
      () => {
        contribute := MainTool.getContribute()
      },
    )

    \"and"(
      "create a state",
      () => {
        state := _createState()
      },
    )

    \"and"(
      "create three directionLights as t1, t2, t3",
      () => {
        let (s, m1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, m2) = contribute.contents.createComponentFunc(. s)
        let (s, m3) = contribute.contents.createComponentFunc(. s)

        state := s
        directionLight1 := m1
        directionLight2 := m2
        directionLight3 := m3
      },
    )

    \"and"(
      "defer dispose t1",
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData(directionLight1.contents),
          )
      },
    )

    \"and"(
      "defer dispose t1",
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData(directionLight1.contents),
          )
      },
    )

    \"and"(
      "defer dispose t3",
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData(directionLight3.contents),
          )
      },
    )

    then(
      "get need disposed directionLights should return [t1, t3]",
      () => {
        contribute.contents.getNeedDisposedComponentsFunc(. state.contents)->expect == [
            directionLight1.contents,
            directionLight3.contents,
          ]
      },
    )
  })

  test(."get all directionLights", ({given, \"when", \"and", then}) => {
    let gameObject1 = 10
    let gameObject2 = 11
    let material1 = ref(Obj.magic(1))
    let material2 = ref(Obj.magic(1))

    given(
      "create two gameObjects",
      () => {
        ()
      },
    )

    \"when"(
      "I get contribute",
      () => {
        contribute := MainTool.getContribute()
      },
    )

    \"and"(
      "create a state",
      () => {
        state := _createState()
      },
    )

    \"and"(
      "create two directionLights",
      () => {
        let (s, m1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, m2) = contribute.contents.createComponentFunc(. s)

        state := s
        material1 := m1
        material2 := m2
      },
    )

    \"and"(
      "add them to the gameObjects one by one",
      () => {
        state :=
          contribute.contents.addComponentFunc(. state.contents, gameObject1, material1.contents)
        state :=
          contribute.contents.addComponentFunc(. state.contents, gameObject2, material2.contents)
      },
    )

    then(
      "getAllComponentsFunc should get the two directionLights",
      () => {
        contribute.contents.getAllComponentsFunc(. state.contents)->expect == [
            material1.contents,
            material2.contents,
          ]
      },
    )
  })

  test(."judge whether a gameObject has a directionLight", ({given, \"when", \"and", then}) => {
    let gameObject = 10
    let light = ref(Obj.magic(1))

    given(
      "create a gameObject",
      () => {
        ()
      },
    )

    \"when"(
      "I get contribute",
      () => {
        contribute := MainTool.getContribute()
      },
    )

    \"and"(
      "create a state",
      () => {
        state := _createState()
      },
    )

    \"and"(
      "create a directionLight",
      () => {
        let (s, m) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        light := m
      },
    )

    \"and"(
      "add the directionLight to the gameObject",
      () => {
        state := contribute.contents.addComponentFunc(. state.contents, gameObject, light.contents)
      },
    )

    then(
      "hasComponentFunc should return true",
      () => {
        contribute.contents.hasComponentFunc(. state.contents, gameObject)->expect == true
      },
    )
  })

  test(."get a directionLight's gameObject", ({given, \"when", \"and", then}) => {
    let gameObject = 10
    let directionLight = ref(Obj.magic(1))

    given(
      "create a gameObject",
      () => {
        ()
      },
    )

    \"when"(
      "I get contribute",
      () => {
        contribute := MainTool.getContribute()
      },
    )

    \"and"(
      "create a state",
      () => {
        state := _createState()
      },
    )

    \"and"(
      "create a directionLight",
      () => {
        let (s, m) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        directionLight := m
      },
    )

    \"and"(
      "add the directionLight to the gameObject",
      () => {
        state :=
          contribute.contents.addComponentFunc(.
            state.contents,
            gameObject,
            directionLight.contents,
          )
      },
    )

    then(
      "getGameObjectsFunc should return [gameObject]",
      () => {
        contribute.contents.getGameObjectsFunc(.
          state.contents,
          directionLight.contents,
        )->expect == [gameObject]
      },
    )
  })

  test(."get default color", ({\"when", \"and", then}) => {
    let light = ref(Obj.magic(1))

    \"when"(
      "I get contribute",
      () => {
        contribute := MainTool.getContribute()
      },
    )

    \"and"(
      "create a state",
      () => {
        state := _createState(~directionLightCount=1, ())
      },
    )

    \"and"(
      "create a directionLight",
      () => {
        let (s, m) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        light := m
      },
    )

    then(
      "get directionLight's color should return default data",
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          light.contents,
          Meta3dComponentDirectionlightProtocol.Index.dataName.color,
        )->expect == [1., 1., 1.]
      },
    )
  })

  test(."get default intensity", ({\"when", \"and", then}) => {
    let light = ref(Obj.magic(1))

    \"when"(
      "I get contribute",
      () => {
        contribute := MainTool.getContribute()
      },
    )

    \"and"(
      "create a state",
      () => {
        state := _createState()
      },
    )

    \"and"(
      "create a directionLight",
      () => {
        let (s, m) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        light := m
      },
    )

    then(
      "get directionLight\'s intensity should return default data",
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          light.contents,
          Meta3dComponentDirectionlightProtocol.Index.dataName.intensity,
        )->expect == 1.
      },
    )
  })

  test(."operate color", ({\"when", \"and", then}) => {
    let color = [0.0, 0.5, 1.0]
    let light = ref(Obj.magic(1))

    \"when"(
      "I get contribute",
      () => {
        contribute := MainTool.getContribute()
      },
    )

    \"and"(
      "create a state",
      () => {
        state := _createState()
      },
    )

    \"and"(
      "create a directionLight",
      () => {
        let (s, m) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        light := m
      },
    )

    \"when"(
      "set directionLight's color",
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            light.contents,
            Meta3dComponentDirectionlightProtocol.Index.dataName.color,
            color->Obj.magic,
          )
      },
    )

    then(
      "get directionLight's color should return the setted data",
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          light.contents,
          Meta3dComponentDirectionlightProtocol.Index.dataName.color,
        )->expect == color
      },
    )
  })

  test(."operate intensity", ({\"when", \"and", then}) => {
    let intensity = 0.5
    let light = ref(Obj.magic(1))

    \"when"(
      "I get contribute",
      () => {
        contribute := MainTool.getContribute()
      },
    )

    \"and"(
      "create a state",
      () => {
        state := _createState()
      },
    )

    \"and"(
      "create a directionLight",
      () => {
        let (s, m) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        light := m
      },
    )

    \"when"(
      "set directionLight's intensity",
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            light.contents,
            Meta3dComponentDirectionlightProtocol.Index.dataName.intensity,
            intensity->Obj.magic,
          )
      },
    )

    then(
      "get directionLight's intensity should return the setted data",
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          light.contents,
          Meta3dComponentDirectionlightProtocol.Index.dataName.intensity,
        )->expect == intensity
      },
    )
  })

  test(."create too many directionLights", ({given, \"when", \"and", then}) => {
    let isDebug = true

    given(
      "open debug",
      () => {
        ()
      },
    )

    \"when"(
      "I get contribute",
      () => {
        contribute := MainTool.getContribute()
      },
    )

    \"and"(
      %re("/^create a state with directionLightCount:(\d+)$/")->Obj.magic,
      arg0 => {
        let arguments =
          %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

        state := _createState(~isDebug, ~directionLightCount=arguments[0]->Obj.magic, ())
      },
    )

    then(
      "create two directionLights should contract error",
      () => {
        let (s, m1) = contribute.contents.createComponentFunc(. state.contents)

        expect(
          () => {
            contribute.contents.createComponentFunc(. s)
          },
        )->toThrowMessage("expect index: 1 <= maxIndex: 0")
      },
    )
  })
})
