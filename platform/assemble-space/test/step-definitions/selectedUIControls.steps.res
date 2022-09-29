open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/selectedUIControls.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  let _prepare = (given, \"and") => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()
    })
  }

  test(."show selected uiControls", ({given, \"when", \"and", then}) => {
    let useSelectorStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    given("select uiControl u1, u2", () => {
      useSelectorStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
          list{
            SelectedUIControlsTool.buildSelectedUIControl(~name="u1", ~protocolIconBase64="i1", ()),
            SelectedUIControlsTool.buildSelectedUIControl(~name="u2", ~protocolIconBase64="i2", ()),
          },
          _,
        )
    })

    \"when"("render", () => {
      ()
    })

    then("should show u1 and u2", () => {
      SelectedUIControlsTool.buildUI(
        ~sandbox,
        ~service=ServiceTool.build(~sandbox, ~useSelector=useSelectorStub.contents, ()),
        (),
      )
      ->ReactTestRenderer.create
      ->ReactTestTool.createSnapshotAndMatch
    })
  })
})
