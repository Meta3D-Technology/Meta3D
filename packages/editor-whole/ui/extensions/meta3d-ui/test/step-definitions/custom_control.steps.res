open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/custom_control.feature")

defineFeature(feature, test => {
  test(."register custom control", ({\"when", \"and", then}) => {
    let state: ref<Meta3dUiProtocol.StateType.state> = ref(Obj.magic(1))
    let uiControlName = "c1"
    let func = Obj.magic(5)

    \"when"(
      "register a custom control",
      () => {
        state := MainTool.registerUIControl(~uiControlName, ~func, ())
      },
    )

    then(
      "get custom control func should return it's func",
      () => {
        MainTool.getUIControlFuncExn(state.contents, uiControlName)->expect == func
      },
    )
  })

  test(."get custom control's state", ({\"when", \"and", then}) => {
    let state: ref<Meta3dUiProtocol.StateType.state> = ref(Obj.magic(1))
    let uiControlName = "c1"
    let c1State =
      Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set("a", 1)

    \"when"(
      "set custom control's state to s1",
      () => {
        state := MainTool.createState()

        state := MainTool.setUIControlState(state.contents, uiControlName, c1State->Obj.magic)
      },
    )

    \"when"(
      "get custom control's state",
      () => {
        ()
      },
    )

    then(
      "return s1",
      () => {
        MainTool.getUIControlState(state.contents, uiControlName)->expect ==
          Meta3dCommonlib.NullableSt.return(c1State)
      },
    )
  })
})
