open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/custom_control.feature")

defineFeature(feature, test => {
  test(."register custom control", ({\"when", then}) => {
    let state: ref<Meta3dUiProtocol.StateType.state> = ref(Obj.magic(1))
    let customControlName = "c1"
    let func = Obj.magic(5)

    \"when"("register a custom control", () => {
      state := MainTool.registerCustomControl(~customControlName, ~func, ())
    })

    then("get custom control should return it", () => {
      MainTool.getCustomControlExn(state.contents, customControlName)->expect == func
    })
  })
})
