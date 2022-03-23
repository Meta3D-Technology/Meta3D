open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/clone.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
      StateType.state,
      Meta3dComponentArcballcameracontrollerProtocol.Index.config,
      
      Meta3dComponentArcballcameracontrollerProtocol.Index.needDisposedComponents,
      Meta3dComponentArcballcameracontrollerProtocol.Index.batchDisposeData,
      Meta3dComponentArcballcameracontrollerProtocol.Index.cloneConfig,
      Meta3dComponentArcballcameracontrollerProtocol.Index.arcballCameraController,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let cloneConfig = ()
  let clonedArcballCameraControllers = ref([])

  let _getContributeAndCreateAState = ((\"when", \"and")) => {
    \"when"("I get contribute", () => {
      contribute := Main.getComponentContribute()
    })

    \"and"("create a state", () => {
      state := StateTool.createState(~contribute=contribute.contents, ())
    })
  }

  test(."clone specific count of arcballCameraControllers", ({given, \"when", \"and", then}) => {
    let arcballCameraController = ref(Obj.magic(1))

    _getContributeAndCreateAState((\"when", \"and"))

    given("create a arcballCameraController", () => {
      let (s, t) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      arcballCameraController := t
    })

    \"when"("clone 2 arcballCameraControllers", () => {
      let (s, c) = contribute.contents.cloneComponentFunc(.
        state.contents,
        Meta3dCommonlib.CloneTool.buildCountRange(2),
        cloneConfig,
        arcballCameraController.contents,
      )

      state := s
      clonedArcballCameraControllers := c
    })

    then("get 2 cloned arcballCameraControllers", () => {
      clonedArcballCameraControllers.contents->Js.Array.length->expect == 2
    })
  })

  test(.
    "set cloned arcballCameraController's distance by source arcballCameraController's distance",
    ({given, \"when", \"and", then}) => {
      let arcballCameraController = ref(Obj.magic(1))
      let d1 = 11.

      _getContributeAndCreateAState((\"when", \"and"))

      given("create a arcballCameraController", () => {
        let (s, t) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        arcballCameraController := t
      })

      \"and"("set the arcballCameraController's distance to d1", () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            arcballCameraController.contents,
            Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.distance,
            d1->Obj.magic,
          )
      })

      \"when"("clone 2 arcballCameraControllers", () => {
        let (s, c) = contribute.contents.cloneComponentFunc(.
          state.contents,
          Meta3dCommonlib.CloneTool.buildCountRange(2),
          cloneConfig,
          arcballCameraController.contents,
        )

        state := s
        clonedArcballCameraControllers := c
      })

      then("get 2 cloned arcballCameraControllers' distance should return d1, d1", () => {
        (
          contribute.contents.getComponentDataFunc(.
            state.contents,
            clonedArcballCameraControllers.contents[0],
            Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.distance,
          )->Meta3dCommonlib.NullableTool.getExn,
          contribute.contents.getComponentDataFunc(.
            state.contents,
            clonedArcballCameraControllers.contents[1],
            Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.distance,
          )->Meta3dCommonlib.NullableTool.getExn,
        )->expect == (d1, d1)
      })
    },
  )

  test(."mark cloned arcballCameraController dirty", ({given, \"when", \"and", then}) => {
    let arcballCameraController = ref(Obj.magic(1))

    _getContributeAndCreateAState((\"when", \"and"))

    given("create a arcballCameraController", () => {
      let (s, t) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      arcballCameraController := t
    })

    \"when"("clone 2 arcballCameraControllers", () => {
      let (s, c) = contribute.contents.cloneComponentFunc(.
        state.contents,
        Meta3dCommonlib.CloneTool.buildCountRange(2),
        cloneConfig,
        arcballCameraController.contents,
      )

      state := s
      clonedArcballCameraControllers := c
    })

    then("get 2 cloned arcballCameraControllers' isDirty should return true, true", () => {
      (
        contribute.contents.getComponentDataFunc(.
          state.contents,
          clonedArcballCameraControllers.contents[0],
          Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.dirty,
        )->Meta3dCommonlib.NullableTool.getExn,
        contribute.contents.getComponentDataFunc(.
          state.contents,
          clonedArcballCameraControllers.contents[1],
          Meta3dComponentArcballcameracontrollerProtocol.Index.dataName.dirty,
        )->Meta3dCommonlib.NullableTool.getExn,
      )->expect == (true, true)
    })
  })
})
