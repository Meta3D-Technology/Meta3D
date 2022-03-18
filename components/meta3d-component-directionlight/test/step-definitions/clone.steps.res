open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/clone.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
      StateType.state,
      Meta3dComponentDirectionlightProtocol.Index.config,
      Meta3dComponentDirectionlightProtocol.Index.dataNameType,
      Meta3dComponentDirectionlightProtocol.Index.needDisposedComponents,
      Meta3dComponentDirectionlightProtocol.Index.batchDisposeData,
      Meta3dComponentDirectionlightProtocol.Index.cloneConfig,
      Meta3dComponentDirectionlightProtocol.Index.directionLight,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let cloneConfig = ()
  let clonedDirectionLights = ref([])

  let _getContributeAndCreateAState = ((\"when", \"and")) => {
    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := StateTool.createState(~contribute=contribute.contents, ())
    })
  }

  test(."clone specific count of directionLights", ({given, \"when", \"and", then}) => {
    let directionLight = ref(Obj.magic(1))

    _getContributeAndCreateAState((\"when", \"and"))

    given("create a directionLight", () => {
      let (s, t) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      directionLight := t
    })

    \"when"("clone 2 directionLights", () => {
      let (s, c) = contribute.contents.cloneComponentFunc(.
        state.contents,
        Meta3dCommonlib.CloneTool.buildCountRange(2),
        cloneConfig,
        directionLight.contents,
      )

      state := s
      clonedDirectionLights := c
    })

    then("get 2 cloned directionLights", () => {
      clonedDirectionLights.contents->Js.Array.length->expect == 2
    })
  })

  test(."set cloned directionLight's color by source directionLight's color", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let directionLight = ref(Obj.magic(1))
    let c1 = [1., 2., 3.]

    _getContributeAndCreateAState((\"when", \"and"))

    given("create a directionLight", () => {
      let (s, t) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      directionLight := t
    })

    \"and"("set the directionLight's color to c1", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          directionLight.contents,
          Meta3dComponentDirectionlightProtocol.Index.dataName.color,
          c1->Obj.magic,
        )
    })

    \"when"("clone 2 directionLights", () => {
      let (s, c) = contribute.contents.cloneComponentFunc(.
        state.contents,
        Meta3dCommonlib.CloneTool.buildCountRange(2),
        cloneConfig,
        directionLight.contents,
      )

      state := s
      clonedDirectionLights := c
    })

    then("get 2 cloned directionLights' color should return c1, c1", () => {
      (
        contribute.contents.getComponentDataFunc(.
          state.contents,
          clonedDirectionLights.contents[0],
          Meta3dComponentDirectionlightProtocol.Index.dataName.color,
        )->Meta3dCommonlib.NullableTool.getExn,
        contribute.contents.getComponentDataFunc(.
          state.contents,
          clonedDirectionLights.contents[1],
          Meta3dComponentDirectionlightProtocol.Index.dataName.color,
        )->Meta3dCommonlib.NullableTool.getExn,
      )->expect == (c1, c1)
    })
  })

  test(."set cloned directionLight's intensity by source directionLight's intensity", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let directionLight = ref(Obj.magic(1))
    let i1 = 2.

    _getContributeAndCreateAState((\"when", \"and"))

    given("create a directionLight", () => {
      let (s, t) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      directionLight := t
    })

    \"and"("set the directionLight's intensity to i1", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          directionLight.contents,
          Meta3dComponentDirectionlightProtocol.Index.dataName.intensity,
          i1->Obj.magic,
        )
    })

    \"when"("clone 2 directionLights", () => {
      let (s, c) = contribute.contents.cloneComponentFunc(.
        state.contents,
        Meta3dCommonlib.CloneTool.buildCountRange(2),
        cloneConfig,
        directionLight.contents,
      )

      state := s
      clonedDirectionLights := c
    })

    then("get 2 cloned directionLights' intensity should return i1, i1", () => {
      (
        contribute.contents.getComponentDataFunc(.
          state.contents,
          clonedDirectionLights.contents[0],
          Meta3dComponentDirectionlightProtocol.Index.dataName.intensity,
        )->Meta3dCommonlib.NullableTool.getExn,
        contribute.contents.getComponentDataFunc(.
          state.contents,
          clonedDirectionLights.contents[1],
          Meta3dComponentDirectionlightProtocol.Index.dataName.intensity,
        )->Meta3dCommonlib.NullableTool.getExn,
      )->expect == (i1, i1)
    })
  })
})
