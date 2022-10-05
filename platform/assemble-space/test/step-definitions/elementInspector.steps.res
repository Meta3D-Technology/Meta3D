open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/elementInspector.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  let _prepare = given => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()
    })
  }

  test(."show nothing", ({given, \"when", \"and", then}) => {
    _prepare(given)

    given("mark not show", () => {
      ()
    })

    \"when"("render", () => {
      ()
    })

    then("should show nothing", () => {
      ElementInspectorTool.buildUI(
        ~sandbox,
        ~service=ServiceTool.build(
          ~sandbox,
          ~useSelector=createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
            (false, list{}),
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

  test(."show current element state", ({given, \"when", \"and", then}) => {
    let useSelectorStub = ref(Obj.magic(1))

    _prepare(given)

    given("mark show", () => {
      ()
    })

    \"and"("prepare element state e1", () => {
      useSelectorStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
          (
            true,
            list{
              ElementInspectorTool.buildElementStateFieldData(
                ~name="a1",
                ~defaultValue=1,
                ~type_=#int,
                (),
              ),
            },
          ),
          _,
        )
    })

    \"when"("render", () => {
      ()
    })

    then("should show e1", () => {
      ElementInspectorTool.buildUI(
        ~sandbox,
        ~service=ServiceTool.build(~sandbox, ~useSelector=useSelectorStub.contents, ()),
        (),
      )
      ->ReactTestRenderer.create
      ->ReactTestTool.createSnapshotAndMatch
    })
  })

  test(."submit element state", ({given, \"when", \"and", then}) => {
    let values = ref(Obj.magic(1))
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given)

    given("prepare element state e1", () => {
      values :=
        {
          "fields": [
            ElementInspectorTool.buildElementStateFieldData(
              ~name="a1",
              ~defaultValue=1,
              ~type_=#int,
              (),
            ),
          ],
        }
    })

    \"when"("submit element state", () => {
      dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      ElementInspectorTool.submitElementState(dispatchStub.contents->Obj.magic, values.contents)
    })

    then("should dispatch setElementStateFields action", () => {
      dispatchStub.contents->SinonTool.getFirstArg(~callIndex=0, ~stub=_, ())->expect ==
        FrontendUtils.UIViewStoreType.SetElementStateFields(
          values.contents["fields"]->Meta3dCommonlib.ListSt.fromArray,
        )
    })
  })
})
