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

  // test(."show selected uiControls", ({given, \"when", \"and", then}) => {
  //   let useSelectorStub = ref(Obj.magic(1))

  //   _prepare(given, \"and")

  //   given("select uiControl u1, u2", () => {
  //     useSelectorStub :=
  //       createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
  //         list{
  //           SelectedUIControlsTool.buildSelectedUIControl(
  //             ~id="u1",
  //             ~name="u1",
  //             ~protocolIconBase64="i1",
  //             (),
  //           ),
  //           SelectedUIControlsTool.buildSelectedUIControl(
  //             ~id="u2",
  //             ~name="u2",
  //             ~protocolIconBase64="i2",
  //             (),
  //           ),
  //         },
  //         _,
  //       )
  //   })

  //   \"when"("render", () => {
  //     ()
  //   })

  //   then("should show u1 and u2", () => {
  //     SelectedUIControlsTool.buildUI(
  //       ~sandbox,
  //       ~service=ServiceTool.build(~sandbox, ~useSelector=useSelectorStub.contents, ()),
  //       (),
  //     )
  //     ->ReactTestRenderer.create
  //     ->ReactTestTool.createSnapshotAndMatch
  //   })
  // })

  test(."show selected hierachy uiControls", ({given, \"when", \"and", then}) => {
    let useSelectorStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    given("select uiControl u1, u2 that u2 is child of u1", () => {
      useSelectorStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
          list{
            SelectedUIControlsTool.buildSelectedUIControl(
              ~id="u1",
              ~name="u1",
              ~protocolIconBase64="i1",
              ~children=list{
                SelectedUIControlsTool.buildSelectedUIControl(
                  ~id="u2",
                  ~name="u2",
                  ~protocolIconBase64="i2",
                  (),
                ),
              },
              (),
            ),
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
