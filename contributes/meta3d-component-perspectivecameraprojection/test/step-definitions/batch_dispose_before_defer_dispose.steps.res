open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/batch_dispose_before_defer_dispose.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreSceneviewProtocol.ComponentContributeType.componentContribute<
      StateType.state,
      Meta3dComponentPerspectivecameraprojectionProtocol.Index.config,
      
      Meta3dComponentPerspectivecameraprojectionProtocol.Index.needDisposedComponents,
      Meta3dComponentPerspectivecameraprojectionProtocol.Index.batchDisposeData,
      Meta3dComponentPerspectivecameraprojectionProtocol.Index.cloneConfig,
      Meta3dComponentPerspectivecameraprojectionProtocol.Index.perspectiveCameraProjection,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let perspectiveCameraProjection = ref(Obj.magic(1))

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

    given("create a perspectiveCameraProjection", () => {
      let (s, t) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      perspectiveCameraProjection := t
    })

    \"when"("dispose the perspectiveCameraProjection", () => {
      ()
    })

    then(%re("/^should contract error: \"(.*)\"$/")->Obj.magic, arg0 => {
      expect(() => {
        let (state_, _) = contribute.contents.disposeComponentsFunc(.
          state.contents,
            [perspectiveCameraProjection.contents],
        )
        state := state_

      })->toThrowMessage(arg0->Obj.magic)
    })
  })
})
