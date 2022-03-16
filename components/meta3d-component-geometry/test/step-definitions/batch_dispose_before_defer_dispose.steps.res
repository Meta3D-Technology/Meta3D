open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/batch_dispose_before_defer_dispose.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
      StateType.state,
      Meta3dComponentGeometryProtocol.Index.config,
      Meta3dComponentGeometryProtocol.Index.dataNameType,
      Meta3dComponentGeometryProtocol.Index.needDisposedComponents,
      Meta3dComponentGeometryProtocol.Index.batchDisposeData,
      Meta3dComponentGeometryProtocol.Index.cloneConfig,
      Meta3dComponentGeometryProtocol.Index.geometry,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let geometry = ref(Obj.magic(1))

  let _getContributeAndCreateAState = ((\"when", \"and")) => {
    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state and open debug", () => {
      state := StateTool.createState(~contribute=contribute.contents, ~isDebug=true, ())
    })
  }

  test(."if dispose before defer dispose, contract error", ({given, \"when", \"and", then}) => {
    let gameObject1 = 10
    let geometry1 = ref(Obj.magic(1))

    _getContributeAndCreateAState((given, \"and"))

    given("create a gameObject", () => {
      ()
    })

    \"and"("create a geometry", () => {
      let (s, t) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      geometry := t
    })

    \"and"("add the geometry to the gameObject", () => {
      state :=
        contribute.contents.addComponentFunc(. state.contents, gameObject1, geometry1.contents)
    })

    \"when"("dispose the geometry from the gameObject", () => {
      ()
    })

    then(%re("/^should contract error: \"(.*)\"$/")->Obj.magic, arg0 => {
      expect(() => {
        state :=
          contribute.contents.disposeComponentsFunc(.
            state.contents,
            Meta3dCommonlib.MutableSparseMap.createEmpty()->Meta3dCommonlib.MutableSparseMap.set(
              geometry1.contents,
              [gameObject1],
            ),
          )
      })->toThrowMessage(arg0->Obj.magic)
    })
  })
})
