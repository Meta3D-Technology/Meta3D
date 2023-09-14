open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/batch_dispose_before_defer_dispose.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreSceneviewProtocol.ComponentContributeType.componentContribute<
      StateType.state,
      Meta3dComponentBasiccameraviewProtocol.Index.config,
      
      Meta3dComponentBasiccameraviewProtocol.Index.needDisposedComponents,
      Meta3dComponentBasiccameraviewProtocol.Index.batchDisposeData,
      Meta3dComponentBasiccameraviewProtocol.Index.cloneConfig,
      Meta3dComponentBasiccameraviewProtocol.Index.basicCameraView,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let basicCameraView = ref(Obj.magic(1))

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

    given("create a basicCameraView", () => {
      let (s, t) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      basicCameraView := t
    })

    \"when"("dispose the basicCameraView", () => {
      ()
    })

    then(%re("/^should contract error: \"(.*)\"$/")->Obj.magic, arg0 => {
      expect(() => {
        state :=
          contribute.contents.disposeComponentsFunc(.
            state.contents,
            [basicCameraView.contents],
          )
      })->toThrowMessage(arg0->Obj.magic)
    })
  })
})
