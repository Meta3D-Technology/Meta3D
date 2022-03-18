open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/batch_dispose_before_defer_dispose.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
      StateType.state,
      Meta3dComponentArcballcameracontrollerProtocol.Index.config,
      Meta3dComponentArcballcameracontrollerProtocol.Index.dataNameType,
      Meta3dComponentArcballcameracontrollerProtocol.Index.needDisposedComponents,
      Meta3dComponentArcballcameracontrollerProtocol.Index.batchDisposeData,
      Meta3dComponentArcballcameracontrollerProtocol.Index.cloneConfig,
      Meta3dComponentArcballcameracontrollerProtocol.Index.arcballCameraController,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let arcballCameraController = ref(Obj.magic(1))

  let _getContributeAndCreateAState = ((\"when", \"and")) => {
    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state and open debug", () => {
      state := StateTool.createState(~contribute=contribute.contents, ~isDebug=true, ())
    })
  }

  test(."if dispose before defer dispose, contract error", ({given, \"when", \"and", then}) => {
    _getContributeAndCreateAState((given, \"and"))

    given("create a arcballCameraController", () => {
      let (s, t) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      arcballCameraController := t
    })

    \"when"("dispose the arcballCameraController", () => {
      ()
    })

    then(%re("/^should contract error: \"(.*)\"$/")->Obj.magic, arg0 => {
      expect(() => {
        state :=
          contribute.contents.disposeComponentsFunc(.
            state.contents,
            [arcballCameraController.contents],
          )
      })->toThrowMessage(arg0->Obj.magic)
    })
  })
})
