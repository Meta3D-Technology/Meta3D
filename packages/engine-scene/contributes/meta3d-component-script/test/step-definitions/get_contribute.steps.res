open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open StateType

let feature = loadFeature("./test/features/get_contribute.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
      Meta3dComponentScript.StateType.state,
      Meta3dComponentScriptProtocol.Index.config,
      Meta3dComponentScriptProtocol.Index.needDisposedComponents,
      Meta3dComponentScriptProtocol.Index.batchDisposeData,
      Meta3dComponentScriptProtocol.Index.cloneConfig,
      Meta3dComponentScriptProtocol.Index.script,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))

  let _createState = (~isDebug=false, ()) => {
    contribute.contents.createStateFunc(. {isDebug: isDebug})
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
    \"when"(
      "I get contribute",
      () => {
        contribute := MainTool.getContribute()
      },
    )

    \"and"(
      "create a state with config",
      () => {
        state := _createState(~isDebug=true, ())
      },
    )

    then(
      "the config is setted",
      () => {
        ConfigTool.getIsDebug(state.contents)->expect == true
      },
    )
  })

  test(."create a script", ({\"when", \"and", then}) => {
    let script = ref(1)

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
      "createComponentFunc should create a script",
      () => {
        let (s, c) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        script := c

        state.contents.maxIndex->expect == 1
        script.contents->expect == 0
      },
    )
  })

  test(."add a script to a gameObject", ({given, \"when", \"and", then}) => {
    let gameObject = 10
    let script = ref(Obj.magic(1))

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
      "create a script",
      () => {
        let (s, m) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        script := m
      },
    )

    \"and"(
      "add the script to the gameObject",
      () => {
        state := contribute.contents.addComponentFunc(. state.contents, gameObject, script.contents)
      },
    )

    then(
      "get the gameObject's script should be the added one",
      () => {
        contribute.contents.getComponentFunc(. state.contents, gameObject)
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == script.contents
      },
    )
  })

  test(."add a script to a gameObject which alreay has one", ({given, \"when", \"and", then}) => {
    let gameObject = 10
    let script1 = ref(Obj.magic(1))
    let script2 = ref(Obj.magic(1))

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
      "create two scripts",
      () => {
        let (s, m1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, m2) = contribute.contents.createComponentFunc(. s)

        state := s
        script1 := m1
        script2 := m2
      },
    )

    \"and"(
      "add the first script to the gameObject",
      () => {
        state :=
          contribute.contents.addComponentFunc(. state.contents, gameObject, script1.contents)
      },
    )

    \"and"(
      "add the second script to the gameObject",
      () => {
        state :=
          contribute.contents.addComponentFunc(. state.contents, gameObject, script2.contents)
      },
    )

    then(
      "get the gameObject's script should be the second one",
      () => {
        contribute.contents.getComponentFunc(. state.contents, gameObject)
        ->Meta3dCommonlib.NullableTool.getExn
        ->expect == script2.contents
      },
    )
  })

  test(."remove a script from a gameObject", ({given, \"when", \"and", then}) => {
    let gameObject = 10
    let script = ref(Obj.magic(1))

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
      "create a script",
      () => {
        let (s, m) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        script := m
      },
    )

    \"and"(
      "add the script to the gameObject",
      () => {
        state := contribute.contents.addComponentFunc(. state.contents, gameObject, script.contents)
      },
    )

    \"and"(
      "remove the script from the gameObject",
      () => {
        state :=
          contribute.contents.removeComponentFunc(. state.contents, gameObject, script.contents)
      },
    )

    then(
      "the gameObject shouldn't has the script",
      () => {
        contribute.contents.hasComponentFunc(. state.contents, gameObject)->expect == false
      },
    )
  })

  test(."get need disposed scripts", ({given, \"when", \"and", then}) => {
    let script1 = ref(Obj.magic(1))
    let script2 = ref(Obj.magic(1))
    let script3 = ref(Obj.magic(1))

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
      "create three scripts as t1, t2, t3",
      () => {
        let (s, m1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, m2) = contribute.contents.createComponentFunc(. s)
        let (s, m3) = contribute.contents.createComponentFunc(. s)

        state := s
        script1 := m1
        script2 := m2
        script3 := m3
      },
    )

    \"and"(
      "defer dispose t1",
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData(script1.contents),
          )
      },
    )

    \"and"(
      "defer dispose t1",
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData(script1.contents),
          )
      },
    )

    \"and"(
      "defer dispose t3",
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData(script3.contents),
          )
      },
    )

    then(
      "get need disposed scripts should return [t1, t3]",
      () => {
        contribute.contents.getNeedDisposedComponentsFunc(. state.contents)->expect == [
            script1.contents,
            script3.contents,
          ]
      },
    )
  })

  test(."get all scripts", ({given, \"when", \"and", then}) => {
    let gameObject1 = 10
    let gameObject2 = 11
    let script1 = ref(Obj.magic(1))
    let script2 = ref(Obj.magic(1))

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
      "create two scripts",
      () => {
        let (s, m1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, m2) = contribute.contents.createComponentFunc(. s)

        state := s
        script1 := m1
        script2 := m2
      },
    )

    \"and"(
      "add them to the gameObjects one by one",
      () => {
        state :=
          contribute.contents.addComponentFunc(. state.contents, gameObject1, script1.contents)
        state :=
          contribute.contents.addComponentFunc(. state.contents, gameObject2, script2.contents)
      },
    )

    then(
      "getAllComponentsFunc should get the two scripts",
      () => {
        contribute.contents.getAllComponentsFunc(. state.contents)->expect == [
            script1.contents,
            script2.contents,
          ]
      },
    )
  })

  test(."judge whether a gameObject has a script", ({given, \"when", \"and", then}) => {
    let gameObject = 10
    let script = ref(Obj.magic(1))

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
      "create a script",
      () => {
        let (s, m) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        script := m
      },
    )

    \"and"(
      "add the script to the gameObject",
      () => {
        state := contribute.contents.addComponentFunc(. state.contents, gameObject, script.contents)
      },
    )

    then(
      "hasComponentFunc should return true",
      () => {
        contribute.contents.hasComponentFunc(. state.contents, gameObject)->expect == true
      },
    )
  })

  test(."get a script's gameObject", ({given, \"when", \"and", then}) => {
    let gameObject = 10
    let script = ref(Obj.magic(1))

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
      "create a script",
      () => {
        let (s, m) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        script := m
      },
    )

    \"and"(
      "add the script to the gameObject",
      () => {
        state := contribute.contents.addComponentFunc(. state.contents, gameObject, script.contents)
      },
    )

    then(
      "getGameObjectsFunc should return [gameObject]",
      () => {
        contribute.contents.getGameObjectsFunc(. state.contents, script.contents)->expect == [
            gameObject,
          ]
      },
    )
  })

  test(."operate attribute", ({\"when", \"and", then}) => {
    let attribute = [0.0, 0.5, 1.0]
    let script = ref(Obj.magic(1))

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
      "create a script",
      () => {
        let (s, m) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        script := m
      },
    )

    \"when"(
      "set script's attribute",
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            script.contents,
            Meta3dComponentScriptProtocol.Index.dataName.attribute,
            attribute->Obj.magic,
          )
      },
    )

    then(
      "get script's attribute should return the setted data",
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          script.contents,
          Meta3dComponentScriptProtocol.Index.dataName.attribute,
        )->expect == attribute
      },
    )
  })

  test(."operate allAssetData", ({\"when", \"and", then}) => {
    let allAssetData = {j`{}`}
    let script = ref(Obj.magic(1))

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
      "create a script",
      () => {
        let (s, m) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        script := m
      },
    )

    \"when"(
      "set script's allAssetData",
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            script.contents,
            Meta3dComponentScriptProtocol.Index.dataName.allAssetData,
            allAssetData->Obj.magic,
          )
      },
    )

    then(
      "get script's allAssetData should return the setted data",
      () => {
        contribute.contents.getComponentDataFunc(.
          state.contents,
          script.contents,
          Meta3dComponentScriptProtocol.Index.dataName.allAssetData,
        )->expect == allAssetData
      },
    )
  })
})
