open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/fix_extension_bug.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  let _prepare = (given, \"and", initialState, store) => {
    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    \"and"("prepare snapshot", () => {
      ReactTestTool.prepare()
    })

    \"and"("init store", () => {
      store := initialState
    })
  }

  test(."fix \"multiple selected extension of the same protocol will affect each other\" bug", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let store = ref(Obj.magic(1))
    let a: FrontendUtils.BackendCloudbaseType.protocol = {
      name: "a",
      version: "1.0.1",
      iconBase64: "i1",
    }
    let a1 = ExtensionTool.buildSelectedExtension(
      ~protocolName=a.name,
      ~protocolVersion=">= 1.0.0",
      (),
    )
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given, \"and", AssembleSpaceStore.initialState, store)

    given("select extension a1 for protocol a in Extensions", () => {
      //   dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      store :=
        ExtensionsTool.selectExtension(
          ~dispatch=ReduxTool.buildDispatch(AssembleSpaceStore.reducer, store.contents),
          ~iconBase64=a.iconBase64,
          ~extension=a1,
        )
    })

    \"and"("select extension a1 for protocol a in Extensions", () => {
      //   ExtensionsTool.selectExtension(
      //     ~dispatch=dispatchStub.contents,
      //     ~iconBase64=a.iconBase64,
      //     ~extension=a1,
      //   )
      store :=
        ExtensionsTool.selectExtension(
          ~dispatch=ReduxTool.buildDispatch(AssembleSpaceStore.reducer, store.contents),
          ~iconBase64=a.iconBase64,
          ~extension=a1,
        )
    })

    \"and"("select the first extension in SelectedExtensions", () => {
      store :=
        SelectedExtensionsTool.selectExtension(
          ~dispatch=ReduxTool.buildDispatch(AssembleSpaceStore.reducer, store.contents),
          ~id=(SelectedExtensionsTool.useSelector(store.contents)->ListTool.getHeadExn).id,
        )
    })

    \"and"("start it", () => {
      store :=
        InspectorTool.startExtension(
          ~dispatch=ReduxTool.buildDispatch(AssembleSpaceStore.reducer, store.contents),
          ~inspectorCurrentExtension=InspectorTool.useSelector(store.contents)
          ->InspectorTool.getInspectorCurrentExtension
          ->Meta3dCommonlib.OptionSt.getExn,
        )
    })

    \"and"("set new name", () => {
      store :=
        InspectorTool.setExtensionNewName(
          ~dispatch=ReduxTool.buildDispatch(AssembleSpaceStore.reducer, store.contents),
          ~inspectorCurrentExtension=InspectorTool.useSelector(store.contents)
          ->InspectorTool.getInspectorCurrentExtension
          ->Meta3dCommonlib.OptionSt.getExn,
          ~newName="new1",
        )
    })

    \"when"("select the second extension in SelectedExtensions", () => {
      store :=
        SelectedExtensionsTool.selectExtension(
          ~dispatch=ReduxTool.buildDispatch(AssembleSpaceStore.reducer, store.contents),
          ~id=(SelectedExtensionsTool.useSelector(store.contents)->ListTool.getNthExn(1)).id,
        )
    })

    \"and"("render Inspector", () => {
      ()
    })

    then("should show start button", () => {
      ()
    })

    \"and"("set new name input's default name should be old name", () => {
      InspectorTool.buildUI(
        ~sandbox,
        ~service=ServiceTool.build(
          ~sandbox,
          ~useSelector=ReduxTool.useSelector(store.contents),
          (),
        ),
        (),
      )
      ->ReactTestRenderer.create
      ->ReactTestTool.createSnapshotAndMatch
    })
  })
})
