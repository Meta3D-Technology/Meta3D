open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/customActionCodeEdit.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  let _prepare = given => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()
      TestTool.prepare()
    })
  }

  test(."get action name", ({given, \"when", \"and", then}) => {
    let actionName = "ActionName1"
    let fileStr = ref(Obj.magic(1))
    let result = ref(Obj.magic(1))

    _prepare(given)

    given(
      "build file str whose action name is string",
      () => {
        fileStr :=
          j`export var getContribute = function (api) {
    return {
        actionName: "${actionName}",`
      },
    )

    \"when"(
      "get action name",
      () => {
        result := CustomUtils.getActionName(fileStr.contents)
      },
    )

    then(
      "should get correct name",
      () => {
        result.contents->expect == actionName
      },
    )
  })

  test(."get action name come from protocol", ({given, \"when", \"and", then}) => {
    let actionName = "ActionName1"
    let fileStr = ref(Obj.magic(1))
    let result = ref(Obj.magic(1))

    _prepare(given)

    given(
      "build file str whose action name come from protocol",
      () => {
        fileStr :=
          j`var actionName = "${actionName}";

            export var getContribute = function (api) {
    return {
        actionName: actionName,`
      },
    )

    \"when"(
      "get action name",
      () => {
        result := CustomUtils.getActionName(fileStr.contents)
      },
    )

    then(
      "should get correct name",
      () => {
        result.contents->expect == actionName
      },
    )
  })
})
