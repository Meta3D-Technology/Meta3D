open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/custom_control.feature")

defineFeature(feature, test => {
  test(."register custom control", ({\"when", then}) => {
    let state: ref<Meta3dUi2Protocol.StateType.state> = ref(Obj.magic(1))
    let uiControlName = "c1"
    let func = Obj.magic(5)

    \"when"("register a custom control", () => {
      state := MainTool.registerUIControl(~uiControlName, ~func, ())
    })

    then("get custom control should return it", () => {
      MainTool.getUIControlExn(state.contents, uiControlName)->expect == func
    })
  })
})
