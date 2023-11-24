open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/custom.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  let _prepare = given => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()

      TextareaTool.markNotShowTextareaForTest()
    })
  }

  test(."get input name from input file str", ({given, \"when", \"and", then}) => {
    let defaultInputFileStr = ref(Obj.magic(1))

    _prepare(given)

    given(
      "build default input file str",
      () => {
        defaultInputFileStr := CustomTool.buildDefaultInputFileStr()
      },
    )

    \"when"(
      "get input name from it",
      () => {
        ()
      },
    )

    then(
      "should get default input name",
      () => {
        CustomTool.getInputName(defaultInputFileStr.contents)->expect == "xxx-input-xxx"
      },
    )
  })
})
