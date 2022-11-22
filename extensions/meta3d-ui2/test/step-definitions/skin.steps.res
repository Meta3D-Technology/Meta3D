open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

let feature = loadFeature("./test/features/skin.feature")

defineFeature(feature, test => {
  test(."register skin", ({\"when", then}) => {
    let state: ref<Meta3dUi2Protocol.StateType.state> = ref(Obj.magic(1))
    let skinName = "s1"
    let skin = Obj.magic(5)

    \"when"("register a skin", () => {
      state := MainTool.registerSkin(~skinName, ~skin, ())
    })

    then("get skin should return it", () => {
      MainTool.getSkin(state.contents, skinName)->expect ==
        MainTool.buildSkinContribute(skinName, skin)->Meta3dCommonlib.NullableSt.return
    })
  })
})
