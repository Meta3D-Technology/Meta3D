open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/batch_dispose_before_defer_dispose.feature")

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
  let script = ref(Obj.magic(1))

  let _getContributeAndCreateAState = ((\"when", \"and")) => {
    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state and open debug", () => {
      state := StateTool.createState(~contribute=contribute.contents, ~isDebug=true, ())
    })
  }

  test(."if dispose before defer dispose, contract error", ({given, \"when", \"and", then}) => {
    _getContributeAndCreateAState((given, \"and"))

    given(
      "create a script",
      () => {
        let (s, t) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        script := t
      },
    )

    \"when"(
      "dispose the script",
      () => {
        ()
      },
    )

    then(
      %re("/^should contract error: \"(.*)\"$/")->Obj.magic,
      arg0 => {
        expect(
          () => {
            let (state_, _) = contribute.contents.disposeComponentsFunc(.
              state.contents,
              [script.contents],
            )
            state := state_
          },
        )->toThrowMessage(arg0->Obj.magic)
      },
    )
  })
})
