open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/clone.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
      StateType.state,
      Meta3dComponentGeometryProtocol.Index.config,
      
      Meta3dComponentGeometryProtocol.Index.needDisposedComponents,
      Meta3dComponentGeometryProtocol.Index.batchDisposeData,
      Meta3dComponentGeometryProtocol.Index.cloneConfig,
      Meta3dComponentGeometryProtocol.Index.geometry,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let clonedGeometrys = ref([])
  let cloneConfig = ()

  let _getContributeAndCreateAState = ((\"when", \"and")) => {
    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := StateTool.createState(~contribute=contribute.contents, ())
    })
  }

  test(."cloned one is source one", ({given, \"when", \"and", then}) => {
    let geometry = ref(Obj.magic(1))

    _getContributeAndCreateAState((\"when", \"and"))

    given("create a geometry", () => {
      let (s, t) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      geometry := t
    })

    \"when"("clone 2 geometrys", () => {
      let (s, c) = contribute.contents.cloneComponentFunc(.
        state.contents,
        Meta3dCommonlib.CloneTool.buildCountRange(2),
        cloneConfig,
        geometry.contents,
      )

      state := s
      clonedGeometrys := c
    })

    then("get 2 cloned geometrys should be source one", () => {
      clonedGeometrys.contents->expect == [geometry.contents, geometry.contents]
    })
  })
})
