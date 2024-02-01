open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/batch_dispose_after_defer_dispose.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
      StateType.state,
      Meta3dComponentScriptProtocol.Index.config,
      Meta3dComponentScriptProtocol.Index.needDisposedComponents,
      Meta3dComponentScriptProtocol.Index.batchDisposeData,
      Meta3dComponentScriptProtocol.Index.cloneConfig,
      Meta3dComponentScriptProtocol.Index.script,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let script1 = ref(Obj.magic(1))
  let script2 = ref(Obj.magic(2))

  let _getContributeAndCreateAState = ((given, \"and")) => {
    given("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := StateTool.createState(~contribute=contribute.contents, ())
    })
  }

  test(."remove from attributeMap, eventFileStrMap", ({given, \"and", \"when", then}) => {
    let script3 = ref(Obj.magic(3))
    let eventFileStr = {j`{}`}

    _getContributeAndCreateAState((given, \"and"))

    \"and"(
      %re("/^create three scripts as script(\d+), script(\d+), script(\d+)$/")->Obj.magic,
      () => {
        let (s, t1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, t2) = contribute.contents.createComponentFunc(. s)
        let (s, t3) = contribute.contents.createComponentFunc(. s)

        state := s
        script1 := t1
        script2 := t2
        script3 := t3
      },
    )

    \"and"(
      "set script1's attribute, eventFileStr",
      () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            script1.contents,
            Meta3dComponentScriptProtocol.Index.dataName.attribute,
            0.1->Obj.magic,
          )
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            script1.contents,
            Meta3dComponentScriptProtocol.Index.dataName.eventFileStr,
            eventFileStr->Obj.magic,
          )
      },
    )

    \"and"(
      %re("/^defer dispose script(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            script1.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
          )
      },
    )

    \"when"(
      "dispose the need disposed scripts",
      () => {
        let (state_, _) = contribute.contents.disposeComponentsFunc(.
          state.contents,
          [script1.contents],
        )
        state := state_
      },
    )

    then(
      "should remove script1 from attributeMap, eventFileStrMap",
      () => {
        let {attributeMap, eventFileStrMap} = state.contents

        (
          attributeMap->Meta3dCommonlib.MutableSparseMap.has(script1.contents),
          eventFileStrMap->Meta3dCommonlib.MutableSparseMap.has(script1.contents),
        )->expect == (false, false)
      },
    )
  })

  test(."remove from gameObjectMap, gameObjectScriptMap", ({given, \"and", \"when", then}) => {
    let gameObject1 = 10
    let script1 = ref(Obj.magic(1))
    let d1 = [0.5, 1.0, 1.0]

    _getContributeAndCreateAState((given, \"and"))

    given(
      "create a gameObject",
      () => {
        ()
      },
    )

    \"and"(
      "create a script",
      () => {
        let (s, m) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        script1 := m
      },
    )

    \"and"(
      "add the script to the gameObject",
      () => {
        state :=
          contribute.contents.addComponentFunc(. state.contents, gameObject1, script1.contents)
      },
    )

    \"and"(
      "defer dispose the script from the gameObject",
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            (script1.contents, gameObject1),
          )
      },
    )

    \"when"(
      "dispose the need disposed scripts",
      () => {
        let (state_, _) = contribute.contents.disposeComponentsFunc(.
          state.contents,
          contribute.contents.getNeedDisposedComponentsFunc(. state.contents),
        )
        state := state_
      },
    )

    then(
      "get the script's gameObjects should return []",
      () => {
        contribute.contents.getGameObjectsFunc(. state.contents, script1.contents)->expect == []
      },
    )

    \"and"(
      "get the gameObject's script should return empty",
      () => {
        contribute.contents.getComponentFunc(. state.contents, gameObject1)->expect ==
          Js.Nullable.null
      },
    )
  })

  test(."if has disposed one, use disposed index as new index", ({
    given,
    \"and",
    \"when",
    then,
  }) => {
    let script3 = ref(Obj.magic(1))
    let script4 = ref(Obj.magic(2))

    _getContributeAndCreateAState((given, \"and"))

    given(
      %re("/^create two scripts as script(\d+), script(\d+)$/")->Obj.magic,
      () => {
        let (s, t1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, t2) = contribute.contents.createComponentFunc(. s)

        state := s
        script1 := t1
        script2 := t2
      },
    )

    \"and"(
      %re("/^defer dispose script(\d+), script(\d+)$/")->Obj.magic,
      () => {
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            script1.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
          )
        state :=
          contribute.contents.deferDisposeComponentFunc(.
            state.contents,
            script2.contents->Meta3dCommonlib.DeferDisposeTool.buildDeferDisposeData,
          )
      },
    )

    \"and"(
      %re("/^dispose script(\d+), script(\d+)$/")->Obj.magic,
      () => {
        let (state_, _) = contribute.contents.disposeComponentsFunc(.
          state.contents,
          [script1.contents, script2.contents],
        )
        state := state_
      },
    )

    \"when"(
      %re("/^create two scripts as script(\d+), script(\d+)$/")->Obj.magic,
      () => {
        let (s, t1) = contribute.contents.createComponentFunc(. state.contents)
        let (s, t2) = contribute.contents.createComponentFunc(. s)

        state := s
        script3 := t1
        script4 := t2
      },
    )

    then(
      %re("/^script(\d+) should equal to script(\d+)$/")->Obj.magic,
      () => {
        script3->expect == script2
      },
    )

    \"and"(
      %re("/^script(\d+) should equal to script(\d+)$/")->Obj.magic,
      () => {
        script4->expect == script1
      },
    )
  })
})
