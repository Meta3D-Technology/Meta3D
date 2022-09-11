open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/batch_dispose_before_defer_dispose.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
      StateType.state,
      Meta3dComponentPbrmaterialProtocol.Index.config,
      
      Meta3dComponentPbrmaterialProtocol.Index.needDisposedComponents,
      Meta3dComponentPbrmaterialProtocol.Index.batchDisposeData,
      Meta3dComponentPbrmaterialProtocol.Index.cloneConfig,
      Meta3dComponentPbrmaterialProtocol.Index.pbrMaterial,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let pbrMaterial = ref(Obj.magic(1))

  let _getContributeAndCreateAState = ((\"when", \"and")) => {
    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state and open debug", () => {
      state := StateTool.createState(~contribute=contribute.contents, ~isDebug=true, ())
    })
  }

  test(."if dispose before defer dispose, contract error", ({given, \"when", \"and", then}) => {
    let gameObject1 = 10
    let pbrMaterial1 = ref(Obj.magic(1))

    _getContributeAndCreateAState((given, \"and"))

    given("create a gameObject", () => {
      ()
    })

    \"and"("create a pbrMaterial", () => {
      let (s, t) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      pbrMaterial := t
    })

    \"and"("add the pbrMaterial to the gameObject", () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject1, pbrMaterial1.contents)
    })

    \"when"("dispose the pbrMaterial from the gameObject", () => {
      ()
    })

    then(%re("/^should contract error: \"(.*)\"$/")->Obj.magic, arg0 => {
      expect(() => {
        state :=
          contribute.contents.disposeComponentsFunc(.
            state.contents,
            Meta3dCommonlib.MutableSparseMap.createEmpty()->Meta3dCommonlib.MutableSparseMap.set(
              pbrMaterial1.contents,
              [gameObject1],
            ),
          )
      })->toThrowMessage(arg0->Obj.magic)
    })
  })
})
