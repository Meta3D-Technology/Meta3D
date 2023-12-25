open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/extensionInspector.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  let _prepare = given => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()
      TestTool.prepare()
    })
  }

  test(."show nothing", ({given, \"when", \"and", then}) => {
    _prepare(given)

    \"when"(
      "render",
      () => {
        ()
      },
    )

    then(
      "should show nothing",
      () => {
        ExtensionInspectorTool.buildUI(
          ~sandbox,
          ~service=ServiceTool.build(
            ~sandbox,
            ~useSelector=createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
              (None, list{}),
              _,
            ),
            (),
          ),
          (),
        )
        ->ReactTestRenderer.create
        ->ReactTestTool.createSnapshotAndMatch
      },
    )
  })

  test(."get current extension", ({given, \"when", \"and", then}) => {
    let setInspectorCurrentExtensionStub = ref(Obj.magic(1))
    let setExtensionStrStub = ref(Obj.magic(1))
    let id = "a1"
    let extension = ref(Obj.magic(1))
    let extensionStr = "a1 str"

    _prepare(given)

    given(
      "set inspector current extension to a1",
      () => {
        setInspectorCurrentExtensionStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
        setExtensionStrStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
      },
    )

    \"when"(
      "get current extension",
      () => {
        extension := SelectedExtensionsTool.buildSelectedExtension(~id, ())

        ExtensionInspectorTool.useEffectOnce(
          (setInspectorCurrentExtensionStub.contents, setExtensionStrStub.contents),
          ServiceTool.build(
            ~sandbox,
            ~getExtensionFuncDataStr=createEmptyStub(refJsObjToSandbox(sandbox.contents))
            ->returns(extensionStr, _)
            ->Obj.magic,
            (),
          ),
          (id->Some, list{extension.contents}),
        )
      },
    )

    then(
      "should get a1 and its str",
      () => {
        (
          ReactHookTool.getValue(
            ~setLocalValueStub=setInspectorCurrentExtensionStub.contents->Obj.magic,
            (),
          ),
          ReactHookTool.getValue(~setLocalValueStub=setExtensionStrStub.contents->Obj.magic, ()),
        )->expect == (extension.contents, extensionStr)
      },
    )
  })

  // test(."show start button", ({given, \"when", \"and", then}) => {
  //   let useStateStub = ref(Obj.magic(1))
  //   let id = "a1"

  //   _prepare(given)

  //   given(
  //     "set inspector current extension to a1",
  //     () => {
  //       useStateStub :=
  //         createEmptyStub(refJsObjToSandbox(sandbox.contents))
  //         ->onCall(0, _)
  //         ->returns((SelectedExtensionsTool.buildSelectedExtension(~id, ()), Obj.magic(1)), _)
  //         ->onCall(1, _)
  //         ->returns(("", Obj.magic(1)), _)
  //     },
  //   )

  //   \"when"(
  //     "render",
  //     () => {
  //       ()
  //     },
  //   )

  //   then(
  //     "should show start button",
  //     () => {
  //       ExtensionInspectorTool.buildUI(
  //         ~sandbox,
  //         ~service=ServiceTool.build(
  //           ~sandbox,
  //           ~useState=useStateStub.contents,
  //           (),
  //         ),
  //         (),
  //       )
  //       ->ReactTestRenderer.create
  //       ->ReactTestTool.createSnapshotAndMatch
  //     },
  //   )
  // })

  // test(."show unstart button", ({given, \"when", \"and", then}) => {
  //   let useSelectorStub = ref(Obj.magic(1))
  //   let id = "a1"

  //   _prepare(given)

  //   given(
  //     "set inspector current extension to a1",
  //     () => {
  //       ()
  //     },
  //   )

  //   \"and"(
  //     "start a1",
  //     () => {
  //       useSelectorStub :=
  //         createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
  //           (id->Some, list{SelectedExtensionsTool.buildSelectedExtension(~id, ~isStart=true, ())}),
  //           _,
  //         )
  //     },
  //   )

  //   \"when"(
  //     "render",
  //     () => {
  //       ()
  //     },
  //   )

  //   then(
  //     "should show unstart button",
  //     () => {
  //       ExtensionInspectorTool.buildUI(
  //         ~sandbox,
  //         ~service=ServiceTool.build(~sandbox, ~useSelector=useSelectorStub.contents, ()),
  //         (),
  //       )
  //       ->ReactTestRenderer.create
  //       ->ReactTestTool.createSnapshotAndMatch
  //     },
  //   )
  // })
})
