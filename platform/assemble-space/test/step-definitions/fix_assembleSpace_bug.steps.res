open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/fix_assembleSpace_bug.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  let _prepare = (given, \"and", initialState, store) => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()
    })

    \"and"("init store", () => {
      store := initialState
    })
  }

  test(."fix \"enter AssembleSpace should reset\" bug", ({given, \"when", \"and", then}) => {
    let store = ref(Obj.magic(1))
    let a: FrontendUtils.BackendCloudbaseType.protocol = {
      name: "a",
      version: "1.0.1",
      iconBase64: "i1",
      username: "meta3d",
    }
    let a1 = ExtensionTool.buildSelectedExtension(
      ~protocolName=a.name,
      ~protocolVersion=">= 1.0.0",
      (),
    )
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given, \"and", AssembleSpaceStore.initialState, store)

    given("select extension a1 for protocol a in Extensions", () => {
      store :=
        ExtensionsTool.selectExtension(
          ~dispatch=ReduxTool.ApView.buildDispatch(AssembleSpaceStore.reducer, store.contents),
          ~iconBase64=a.iconBase64,
          ~extension=a1,
        )
    })

    \"when"("enter AssembleSpace", () => {
      store := AssembleSpaceTool.reset(~dispatch=AssembleSpaceStore.reducer(store.contents))
    })

    \"and"("render SelectedExtensions", () => {
      ()
    })

    then("should reset store", () => {
      let {selectedExtensions, inspectorCurrentExtensionId} = store.contents.apViewState

      (selectedExtensions, inspectorCurrentExtensionId)->expect == (list{}, None)
    })

    \"and"("should show nothing", () => {
      SelectedExtensionsTool.buildUI(
        ~sandbox,
        ~service=ServiceTool.build(
          ~sandbox,
          ~useSelector=ReduxTool.ApView.useSelector(store.contents),
          (),
        ),
        (),
      )
      ->ReactTestRenderer.create
      ->ReactTestTool.createSnapshotAndMatch
    })
  })
})
