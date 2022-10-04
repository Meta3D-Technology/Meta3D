open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/uiControlInspector.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  let _prepare = (given, \"and") => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()
    })
  }

  test(."show nothing", ({given, \"when", \"and", then}) => {
    _prepare(given, \"and")

    \"when"("render", () => {
      ()
    })

    then("should show nothing", () => {
      UIControlInspectorTool.buildUI(
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
    })
  })

  test(."show default data", ({given, \"when", \"and", then}) => {
    let useSelectorStub = ref(Obj.magic(1))
    let id = "d1"

    _prepare(given, \"and")

    given("set inspector current selected ui control data to d1", () => {
      useSelectorStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
          (
            id->Some,
            list{UIControlInspectorTool.buildSelectedUIControlInspectorData(~id, ~y=10, ())},
          ),
          _,
        )
    })

    \"when"("render", () => {
      ()
    })

    then("should show default data", () => {
      UIControlInspectorTool.buildUI(
        ~sandbox,
        ~service=ServiceTool.build(~sandbox, ~useSelector=useSelectorStub.contents, ()),
        (),
      )
      ->ReactTestRenderer.create
      ->ReactTestTool.createSnapshotAndMatch
    })
  })

  test(."set rect", ({given, \"when", \"and", then}) => {
    let id = "1"
    let rect: FrontendUtils.UIViewStoreType.rect = {
      x: 1,
      y: 2,
      width: 3,
      height: 4,
    }
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    \"when"("set rect", () => {
      dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      UIControlInspectorTool.setRect(dispatchStub.contents->Obj.magic, id, rect)
    })

    then("should dispatch setRect action", () => {
      dispatchStub.contents->SinonTool.getFirstArg(~callIndex=0, ~stub=_, ())->expect ==
        FrontendUtils.UIViewStoreType.SetRect(id, rect)
    })
  })
})
