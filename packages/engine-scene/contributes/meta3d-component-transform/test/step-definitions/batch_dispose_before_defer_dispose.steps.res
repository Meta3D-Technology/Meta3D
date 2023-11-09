open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/batch_dispose_before_defer_dispose.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
      StateType.state,
      Meta3dComponentTransformProtocol.Index.config,
      Meta3dComponentTransformProtocol.Index.needDisposedComponents,
      Meta3dComponentTransformProtocol.Index.batchDisposeData,
      Meta3dComponentTransformProtocol.Index.cloneConfig,
      Meta3dComponentTransformProtocol.Index.transform,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let transform = ref(Obj.magic(1))

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
      "create a transform",
      () => {
        let (s, t) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        transform := t
      },
    )

    \"when"(
      "dispose the transform",
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
              [transform.contents],
            )
            state := state_
          },
        )->toThrowMessage(arg0->Obj.magic)
      },
    )
  })
})
