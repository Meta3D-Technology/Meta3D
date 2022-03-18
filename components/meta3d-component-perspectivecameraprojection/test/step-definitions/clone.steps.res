open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/clone.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
      StateType.state,
      Meta3dComponentPerspectivecameraprojectionProtocol.Index.config,
      Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataNameType,
      Meta3dComponentPerspectivecameraprojectionProtocol.Index.needDisposedComponents,
      Meta3dComponentPerspectivecameraprojectionProtocol.Index.batchDisposeData,
      Meta3dComponentPerspectivecameraprojectionProtocol.Index.cloneConfig,
      Meta3dComponentPerspectivecameraprojectionProtocol.Index.perspectiveCameraProjection,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let cloneConfig = ()
  let clonedPerspectiveCameraProjections = ref([])
  let perspectiveCameraProjection = ref(Obj.magic(1))

  let _getContributeAndCreateAState = ((\"when", \"and")) => {
    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := StateTool.createState(~contribute=contribute.contents, ())
    })
  }

  let _setDefaultData = \"and" => {
    \"and"("set the perspectiveCameraProjection's default data", () => {
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          perspectiveCameraProjection.contents,
          Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.near,
          0.1->Obj.magic,
        )
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          perspectiveCameraProjection.contents,
          Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.far,
          1000.->Obj.magic,
        )
      state :=
        contribute.contents.setComponentDataFunc(.
          state.contents,
          perspectiveCameraProjection.contents,
          Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.fovy,
          1.->Obj.magic,
        )
    })
  }

  test(."clone specific count of perspectiveCameraProjections", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    _getContributeAndCreateAState((\"when", \"and"))

    given("create a perspectiveCameraProjection", () => {
      let (s, t) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      perspectiveCameraProjection := t
    })

    _setDefaultData(\"and")

    \"when"("clone 2 perspectiveCameraProjections", () => {
      let (s, c) = contribute.contents.cloneComponentFunc(.
        state.contents,
        Meta3dCommonlib.CloneTool.buildCountRange(2),
        cloneConfig,
        perspectiveCameraProjection.contents,
      )

      state := s
      clonedPerspectiveCameraProjections := c
    })

    then("get 2 cloned perspectiveCameraProjections", () => {
      clonedPerspectiveCameraProjections.contents->Js.Array.length->expect == 2
    })
  })

  test(.
    "set cloned perspectiveCameraProjection's near by source perspectiveCameraProjection's near",
    ({given, \"when", \"and", then}) => {
      let n1 = 0.1

      _getContributeAndCreateAState((\"when", \"and"))

      given("create a perspectiveCameraProjection", () => {
        let (s, t) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        perspectiveCameraProjection := t
      })

      _setDefaultData(\"and")

      \"and"("set the perspectiveCameraProjection's near to n1", () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            perspectiveCameraProjection.contents,
            Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.near,
            n1->Obj.magic,
          )
      })

      \"when"("clone 2 perspectiveCameraProjections", () => {
        let (s, c) = contribute.contents.cloneComponentFunc(.
          state.contents,
          Meta3dCommonlib.CloneTool.buildCountRange(2),
          cloneConfig,
          perspectiveCameraProjection.contents,
        )

        state := s
        clonedPerspectiveCameraProjections := c
      })

      then("get 2 cloned perspectiveCameraProjections' near should return n1, n1", () => {
        (
          contribute.contents.getComponentDataFunc(.
            state.contents,
            clonedPerspectiveCameraProjections.contents[0],
            Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.near,
          )->Meta3dCommonlib.NullableTool.getExn,
          contribute.contents.getComponentDataFunc(.
            state.contents,
            clonedPerspectiveCameraProjections.contents[1],
            Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.near,
          )->Meta3dCommonlib.NullableTool.getExn,
        )->expect == (n1, n1)
      })
    },
  )

  test(.
    "if source perspectiveCameraProjection not has aspect, not set cloned perspectiveCameraProjection's aspect",
    ({given, \"when", \"and", then}) => {
      let n1 = 0.1

      _getContributeAndCreateAState((\"when", \"and"))

      given("create a perspectiveCameraProjection", () => {
        let (s, t) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        perspectiveCameraProjection := t
      })

      _setDefaultData(\"and")

      \"when"("clone 2 perspectiveCameraProjections", () => {
        let (s, c) = contribute.contents.cloneComponentFunc(.
          state.contents,
          Meta3dCommonlib.CloneTool.buildCountRange(2),
          cloneConfig,
          perspectiveCameraProjection.contents,
        )

        state := s
        clonedPerspectiveCameraProjections := c
      })

      then("get 2 cloned perspectiveCameraProjections' aspect should return empty", () => {
        (
          contribute.contents.getComponentDataFunc(.
            state.contents,
            clonedPerspectiveCameraProjections.contents[0],
            Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.aspect,
          ),
          contribute.contents.getComponentDataFunc(.
            state.contents,
            clonedPerspectiveCameraProjections.contents[1],
            Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.aspect,
          ),
        )->expect == (Js.Nullable.undefined, Js.Nullable.undefined)
      })
    },
  )

  test(."mark cloned perspectiveCameraProjection dirty", ({given, \"when", \"and", then}) => {
    _getContributeAndCreateAState((\"when", \"and"))

    given("create a perspectiveCameraProjection", () => {
      let (s, t) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      perspectiveCameraProjection := t
    })

    _setDefaultData(\"and")

    \"when"("clone 2 perspectiveCameraProjections", () => {
      let (s, c) = contribute.contents.cloneComponentFunc(.
        state.contents,
        Meta3dCommonlib.CloneTool.buildCountRange(2),
        cloneConfig,
        perspectiveCameraProjection.contents,
      )

      state := s
      clonedPerspectiveCameraProjections := c
    })

    then("get 2 cloned perspectiveCameraProjections' isDirty should return true, true", () => {
      (
        contribute.contents.getComponentDataFunc(.
          state.contents,
          clonedPerspectiveCameraProjections.contents[0],
          Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.dirty,
        )->Meta3dCommonlib.NullableTool.getExn,
        contribute.contents.getComponentDataFunc(.
          state.contents,
          clonedPerspectiveCameraProjections.contents[1],
          Meta3dComponentPerspectivecameraprojectionProtocol.Index.dataName.dirty,
        )->Meta3dCommonlib.NullableTool.getExn,
      )->expect == (true, true)
    })
  })
})
