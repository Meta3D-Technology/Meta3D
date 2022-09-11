open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/clone.feature")

defineFeature(feature, test => {
  let contribute: ref<
    Meta3dEngineCoreProtocol.ComponentContributeType.componentContribute<
      StateType.state,
      Meta3dComponentBasiccameraviewProtocol.Index.config,
      
      Meta3dComponentBasiccameraviewProtocol.Index.needDisposedComponents,
      Meta3dComponentBasiccameraviewProtocol.Index.batchDisposeData,
      Meta3dComponentBasiccameraviewProtocol.Index.cloneConfig,
      Meta3dComponentBasiccameraviewProtocol.Index.basicCameraView,
    >,
  > = ref(Obj.magic(1))
  let state = ref(Obj.magic(1))
  let cloneConfig = ()
  let clonedBasicCameraViews = ref([])

  let _getContributeAndCreateAState = ((\"when", \"and")) => {
    \"when"("I get contribute", () => {
      contribute := MainTool.getContribute()
    })

    \"and"("create a state", () => {
      state := StateTool.createState(~contribute=contribute.contents, ())
    })
  }

  test(."clone specific count of basicCameraViews", ({given, \"when", \"and", then}) => {
    let basicCameraView = ref(Obj.magic(1))

    _getContributeAndCreateAState((\"when", \"and"))

    given("create a basicCameraView", () => {
      let (s, t) = contribute.contents.createComponentFunc(. state.contents)

      state := s
      basicCameraView := t
    })

    \"when"("clone 2 basicCameraViews", () => {
      let (s, c) = contribute.contents.cloneComponentFunc(.
        state.contents,
        Meta3dCommonlib.CloneTool.buildCountRange(2),
        cloneConfig,
        basicCameraView.contents,
      )

      state := s
      clonedBasicCameraViews := c
    })

    then("get 2 cloned basicCameraViews", () => {
      clonedBasicCameraViews.contents->Js.Array.length->expect == 2
    })
  })

  test(.
    "set cloned basicCameraView's isActive to false",
    ({given, \"when", \"and", then}) => {
      let basicCameraView = ref(Obj.magic(1))

      _getContributeAndCreateAState((\"when", \"and"))

      given("create a basicCameraView", () => {
        let (s, t) = contribute.contents.createComponentFunc(. state.contents)

        state := s
        basicCameraView := t
      })

      \"and"("set the basicCameraView's isActive to true", () => {
        state :=
          contribute.contents.setComponentDataFunc(.
            state.contents,
            basicCameraView.contents,
            Meta3dComponentBasiccameraviewProtocol.Index.dataName.isActive,
            true->Obj.magic,
          )
      })

      \"when"("clone 2 basicCameraViews", () => {
        let (s, c) = contribute.contents.cloneComponentFunc(.
          state.contents,
          Meta3dCommonlib.CloneTool.buildCountRange(2),
          cloneConfig,
          basicCameraView.contents,
        )

        state := s
        clonedBasicCameraViews := c
      })

      then("get 2 cloned basicCameraViews' isActive should return false, false", () => {
        (
          contribute.contents.getComponentDataFunc(.
            state.contents,
            clonedBasicCameraViews.contents[0],
            Meta3dComponentBasiccameraviewProtocol.Index.dataName.isActive,
          )->Meta3dCommonlib.NullableTool.getExn,
          contribute.contents.getComponentDataFunc(.
            state.contents,
            clonedBasicCameraViews.contents[1],
            Meta3dComponentBasiccameraviewProtocol.Index.dataName.isActive,
          )->Meta3dCommonlib.NullableTool.getExn,
        )->expect == (false, false)
      })
    },
  )
})
