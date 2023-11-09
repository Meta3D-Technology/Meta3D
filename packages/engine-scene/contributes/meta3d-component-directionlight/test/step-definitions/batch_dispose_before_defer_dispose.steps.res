open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/batch_dispose_before_defer_dispose.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
      StateType.state,
      Meta3dComponentDirectionlightProtocol.Index.config,
      Meta3dComponentDirectionlightProtocol.Index.needDisposedComponents,
      Meta3dComponentDirectionlightProtocol.Index.batchDisposeData,
      Meta3dComponentDirectionlightProtocol.Index.cloneConfig,
      Meta3dComponentDirectionlightProtocol.Index.directionLight,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let directionLight = ref(Obj.magic(1))

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
      "create a directionLight",
      () => {
        let (s, t) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        directionLight := t
      },
    )

    \"when"(
      "dispose the directionLight",
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
              [directionLight.contents],
            )
            state := state_
          },
        )->toThrowMessage(arg0->Obj.magic)
      },
    )
  })
})
