open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

open Js.Promise

let feature = loadFeature("./test/features/assemble_space.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  let _prepare = (given, \"and") => {
    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    \"and"("prepare snapshot", () => {
      ReactTestTool.prepare()
    })
  }

  test(."if not loaded, show loading", ({given, \"when", \"and", then}) => {
    _prepare(given, \"and")

    \"when"("not loaded", () => {
      ()
    })

    CucumberAsync.execStep(then, "should show loading", () => {
      AssembleSpaceTool.buildAssembleSpace(
        ~sandbox,
        ~service=ServiceTool.build(
          ~sandbox,
          ~useSelector=createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(false, _),
          (),
        ),
        (),
      )
      ->ReactTestRenderer.create
      ->ReactTestTool.createSnapshotAndMatch
    })
  })
})
