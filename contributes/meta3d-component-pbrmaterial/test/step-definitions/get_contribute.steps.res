open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/get_contribute.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreSceneviewProtocol.ComponentContributeType.componentContribute<
      StateType.state,
      Meta3dComponentPbrmaterialProtocol.Index.config,
      Meta3dComponentPbrmaterialProtocol.Index.needDisposedComponents,
      Meta3dComponentPbrmaterialProtocol.Index.batchDisposeData,
      Meta3dComponentPbrmaterialProtocol.Index.cloneConfig,
      Meta3dComponentPbrmaterialProtocol.Index.pbrMaterial,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let config: ref<Meta3dComponentPbrmaterialProtocol.Index.config> = ref(Obj.magic(1))

  let _createState = (~isDebug=false, ~pbrMaterialCount=10, ()) => {
    contribute.contents.createStateFunc(. {isDebug, pbrMaterialCount})
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
    let pbrMaterialCount = 10

    \"when"(
      "I get contribute",
      () => {
        contribute := MainTool.getContribute()
      },
    )

    \"and"(
      "create a state with config",
      () => {
        state := _createState(~isDebug=true, ~pbrMaterialCount, ())
      },
    )

    then(
      "the config is setted",
      () => {
        (
          ConfigTool.getIsDebug(state.contents),
          ConfigTool.getPBRMaterialCount(state.contents),
        )->expect == (true, pbrMaterialCount)
      },
    )
  })

  test(."create dataoriented data", ({\"when", \"and", then}) => {
    let pbrMaterialCount = 10

    \"when"(
      "I get contribute",
      () => {
        contribute := MainTool.getContribute()
      },
    )

    \"and"(
      "create a state with pbrMaterialCount",
      () => {
        state := _createState(~pbrMaterialCount, ())
      },
    )

    then(
      "dataoriented data is created based on pbrMaterialCount",
      () => {
        state.contents.diffuseColors->Js.Typed_array.Float32Array.length->expect ==
          pbrMaterialCount * 3
      },
    )
  })

  test(."create a pbrMaterial", ({\"when", \"and", then}) => {
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
      "createComponentFunc should create a pbrMaterial",
      () => {
        let (state, material) = contribute.contents.createComponentFunc(. state.contents)

        state.maxIndex->expect == 1
        material->expect == 0
      },
    )
  })

  test(."add a pbrMaterial to a gameObject", ({given, \"when", \"and", then}) => {
    let gameObject = 10
    let material = ref(Obj.magic(1))

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
      "create a pbrMaterial",
      () => {
        let (s, m) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        material := m
      },
    )

    \"and"(
      "add the pbrMaterial to the gameObject",
      () => {
        state :=
          contribute.contents.addComponentFunc(. state.contents, gameObject, material.contents)
      },
    )

    then(
      "get the gameObject's pbrMaterial should be the added one",
      () => {
        contribute.contents.getComponentFunc(. state.contents, gameObject)
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == material.contents
      },
    )
  })

  test(."add a pbrMaterial to a gameObject which alreay has one", ({
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
      "create two pbrMaterials",
      () => {
        let (s, p1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, p2) = contribute.contents.createComponentFunc(. s)

        state := s
        material1 := p1
        material2 := p2
      },
    )

    \"and"(
      "add the first pbrMaterial to the gameObject",
      () => {
        state :=
          contribute.contents.addComponentFunc(. state.contents, gameObject, material1.contents)
      },
    )

    \"and"(
      "add the second pbrMaterial to the gameObject",
      () => {
        state :=
          contribute.contents.addComponentFunc(. state.contents, gameObject, material2.contents)
      },
    )

    then(
      "get the gameObject's pbrMaterial should be the second one",
      () => {
        contribute.contents.getComponentFunc(. state.contents, gameObject)
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == material2.contents
      },
    )
  })

  test(."remove a pbrMaterial from a gameObject", ({given, \"when", \"and", then}) => {
    let gameObject = 10
    let pbrMaterial = ref(Obj.magic(1))

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
      "create a pbrMaterial",
      () => {
        let (s, m) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        pbrMaterial := m
      },
    )

    \"and"(
      "add the pbrMaterial to the gameObject",
      () => {
        state :=
          contribute.contents.addComponentFunc(. state.contents, gameObject, pbrMaterial.contents)
      },
    )

    \"and"(
      "remove the pbrMaterial from the gameObject",
      () => {
        state :=
          contribute.contents.removeComponentFunc(.
            state.contents,
            gameObject,
            pbrMaterial.contents,
          )
      },
    )

    then(
      "the gameObject shouldn't has the pbrMaterial",
      () => {
        contribute.contents.hasComponentFunc(. state.contents, gameObject)->expect == false
      },
    )
  })

  test(."remove a pbrMaterial which add to two gameObjects from a gameObject", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let gameObject1 = 10
    let gameObject2 = 11
    let pbrMaterial = ref(Obj.magic(1))

    given(
      "create two gameObject as g1, g2",
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
      "create a pbrMaterial",
      () => {
        let (s, m) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        pbrMaterial := m
      },
    )

    \"and"(
      "add the pbrMaterial to g1",
      () => {
        state :=
          contribute.contents.addComponentFunc(. state.contents, gameObject1, pbrMaterial.contents)
      },
    )

    \"and"(
      "add the pbrMaterial to g2",
      () => {
        state :=
          contribute.contents.addComponentFunc(. state.contents, gameObject2, pbrMaterial.contents)
      },
    )

    \"and"(
      "remove the pbrMaterial from g1",
      () => {
        state :=
          contribute.contents.removeComponentFunc(.
            state.contents,
            gameObject1,
            pbrMaterial.contents,
          )
      },
    )

    then(
      "g1 shouldn't has the pbrMaterial",
      () => {
        contribute.contents.hasComponentFunc(. state.contents, gameObject1)->expect == false
      },
    )

    \"and"(
      "g2 should has the pbrMaterial",
      () => {
        contribute.contents.hasComponentFunc(. state.contents, gameObject2)->expect == true
      },
    )
  })

  test(."get need disposed pbrMaterials", ({given, \"when", \"and", then}) => {
    let gameObject1 = 10
    let gameObject2 = 11

    let pbrMaterial1 = ref(Obj.magic(1))
    let pbrMaterial2 = ref(Obj.magic(1))
    let pbrMaterial3 = ref(Obj.magic(1))

    given(
      "create two gameObject as g1, g2",
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
      "create three pbrMaterials as p1, p2, p3",
      () => {
        let (s, p1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, p2) = contribute.contents.createComponentFunc(. s)
        let (s, p3) = contribute.contents.createComponentFunc(. s)

        state := s
        pbrMaterial1 := p1
        pbrMaterial2 := p2
        pbrMaterial3 := p3
      },
    )

    \"and"(
      "add p1 to g1",
      () => {
        ()
      },
    )

    \"and"(
      "add p3 to g2",
      () => {
        ()
      },
    )

    \"and"(
      "defer dispose p1 from g1",
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            (pbrMaterial1.contents, gameObject1),
          )
      },
    )

    \"and"(
      "defer dispose p1 from g1",
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            (pbrMaterial1.contents, gameObject1),
          )
      },
    )

    \"and"(
      "defer dispose p3 from g2",
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            (pbrMaterial3.contents, gameObject2),
          )
      },
    )

    then(
      "get need disposed pbrMaterials should return [[p1, g1], [p3, g2]]",
      () => {
        contribute.contents.getNeedDisposedComponentsFunc(. state.contents)->expect ==
          Meta3dCommonlib.MutableSparseMap.createEmpty()
          ->Meta3dCommonlib.MutableSparseMap.set(pbrMaterial1.contents, [gameObject1])
          ->Meta3dCommonlib.MutableSparseMap.set(pbrMaterial3.contents, [gameObject2])
      },
    )
  })

  test(."get all pbrMaterials", ({given, \"when", \"and", then}) => {
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
      "create two pbrMaterials",
      () => {
        let (s, p1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, p2) = contribute.contents.createComponentFunc(. s)

        state := s
        material1 := p1
        material2 := p2
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
      "getAllComponentsFunc should get the two pbrMaterials",
      () => {
        contribute.contents.getAllComponentsFunc(. state.contents)->expect == [
            material1.contents,
            material2.contents,
          ]
      },
    )
  })

  test(."judge whether a gameObject has a pbrMaterial", ({given, \"when", \"and", then}) => {
    let gameObject = 10
    let material = ref(Obj.magic(1))

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
      "create a pbrMaterial",
      () => {
        let (s, m) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        material := m
      },
    )

    \"and"(
      "add the pbrMaterial to the gameObject",
      () => {
        state :=
          contribute.contents.addComponentFunc(. state.contents, gameObject, material.contents)
      },
    )

    then(
      "hasComponentFunc should return true",
      () => {
        contribute.contents.hasComponentFunc(. state.contents, gameObject)->expect == true
      },
    )
  })

  test(."get a pbrMaterial's gameObjects", ({given, \"when", \"and", then}) => {
    let gameObject1 = 10
    let gameObject2 = 11
    let material = ref(Obj.magic(1))

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
      "create a pbrMaterial",
      () => {
        let (s, m) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        material := m
      },
    )

    \"and"(
      "add the pbrMaterial to the two gameObjects",
      () => {
        state :=
          contribute.contents.addComponentFunc(. state.contents, gameObject1, material.contents)
        state :=
          contribute.contents.addComponentFunc(. state.contents, gameObject2, material.contents)
      },
    )

    then(
      "getGameObjectsFunc should return the two gameObjects",
      () => {
        contribute.contents.getGameObjectsFunc(. state.contents, material.contents)->expect == [
            gameObject1,
            gameObject2,
          ]
      },
    )
  })

  test(."get default diffuseColor", ({\"when", \"and", then}) => {
    let material = ref(Obj.magic(1))

    \"when"(
      "I get contribute",
      () => {
        contribute := MainTool.getContribute()
      },
    )

    \"and"(
      "create a state",
      () => {
        state := _createState(~pbrMaterialCount=1, ())
      },
    )

    \"and"(
      "create a pbrMaterial",
      () => {
        let (s, m) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        material := m
      },
    )

    then(
      "get pbrMaterial's diffuseColor should return default data",
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          material.contents,
          Meta3dComponentPbrmaterialProtocol.Index.dataName.diffuseColor,
        )->expect == [1., 1., 1.]
      },
    )
  })

  test(."get default specular", ({\"when", \"and", then}) => {
    let material = ref(Obj.magic(1))

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
      "create a pbrMaterial",
      () => {
        let (s, m) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        material := m
      },
    )

    then(
      "get pbrMaterial\'s specular should return default data",
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          material.contents,
          Meta3dComponentPbrmaterialProtocol.Index.dataName.specular,
        )->expect == 1.
      },
    )
  })

  test(."get the data from dataoriented data may not equal to the value which is setted", ({
    \"when",
    \"and",
    then,
  }) => {
    let gameObject = 10
    let material1 = ref(Obj.magic(1))
    let material2 = ref(Obj.magic(1))

    let material = ref(Obj.magic(1))

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
      "create a pbrMaterial",
      () => {
        let (s, m) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        material := m
      },
    )

    \"when"(
      %re("/^set pbrMaterial's diffuseColor to (.*), (.*), (.*)$/")->Obj.magic,
      () => {
        let arguments =
          %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            material.contents,
            Meta3dComponentPbrmaterialProtocol.Index.dataName.diffuseColor,
            arguments->Js.Array.slice(~start=0, ~end_=3, _)->Obj.magic,
          )
      },
    )

    then(
      %re("/^get pbrMaterial's diffuseColor should return (.*), (.*), (.*)$/")->Obj.magic,
      () => {
        let arguments =
          %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

        contribute.contents.getComponentDataFunc(.
          state.contents,
          material.contents,
          Meta3dComponentPbrmaterialProtocol.Index.dataName.diffuseColor,
        )->expect == arguments->Js.Array.slice(~start=0, ~end_=3, _)
      },
    )
  })

  test(."operate diffuseColor", ({\"when", \"and", then}) => {
    let diffuseColor = [0.0, 0.5, 1.0]
    let material = ref(Obj.magic(1))

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
      "create a pbrMaterial",
      () => {
        let (s, m) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        material := m
      },
    )

    \"when"(
      "set pbrMaterial's diffuseColor",
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            material.contents,
            Meta3dComponentPbrmaterialProtocol.Index.dataName.diffuseColor,
            diffuseColor->Obj.magic,
          )
      },
    )

    then(
      "get pbrMaterial's diffuseColor should return the setted data",
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          material.contents,
          Meta3dComponentPbrmaterialProtocol.Index.dataName.diffuseColor,
        )->expect == diffuseColor
      },
    )
  })

  test(."operate specular", ({\"when", \"and", then}) => {
    let specular = 0.5
    let material = ref(Obj.magic(1))

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
      "create a pbrMaterial",
      () => {
        let (s, m) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        material := m
      },
    )

    \"when"(
      "set pbrMaterial's specular",
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            material.contents,
            Meta3dComponentPbrmaterialProtocol.Index.dataName.specular,
            specular->Obj.magic,
          )
      },
    )

    then(
      "get pbrMaterial's specular should return the setted data",
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          material.contents,
          Meta3dComponentPbrmaterialProtocol.Index.dataName.specular,
        )->expect == specular
      },
    )
  })

  test(."create too many pbrMaterials", ({given, \"when", \"and", then}) => {
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
      %re("/^create a state with pbrMaterialCount:(\d+)$/")->Obj.magic,
      arg0 => {
        let arguments =
          %external(arguments)->Meta3dCommonlib.NumberTool.getExnAndConvertArgumentsToNumber

        state := _createState(~isDebug, ~pbrMaterialCount=arguments[0]->Obj.magic, ())
      },
    )

    then(
      "create two pbrMaterials should contract error",
      () => {
        let (s, p1) = contribute.contents.createComponentFunc(. state.contents)

        expect(
          () => {
            contribute.contents.createComponentFunc(. s)
          },
        )->toThrowMessage("expect index: 1 <= maxIndex: 0")
      },
    )
  })
})
