open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/update_selected_extension.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  let f1 = Js.Typed_array.Uint8Array.make([10, 2, 3])
  let f1Str = "\n\u0002\u0003"

  let _prepare = given => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()
      TestTool.prepare()

      FileTool.buildFakeTextDecoder(FileTool.convertUint8ArrayToBuffer)
    })
  }

  test(."show selected extension's extension string", ({given, \"when", \"and", then}) => {
    let setInspectorCurrentExtensionStub = ref(Obj.magic(1))
    let setExtensionStrStub = ref(Obj.magic(1))
    let a1 = ref(Obj.magic(1))
    let id = "a1"

    _prepare(given)

    given(
      "select extension a1 in Extensions whose extensionFuncData is f1",
      () => {
        setInspectorCurrentExtensionStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
        setExtensionStrStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        a1 :=
          SelectedExtensionsTool.buildSelectedExtension(
            ~id,
            ~data=ExtensionTool.buildExtensionData(
              ~extensionFuncData=f1,
              ~extensionPackageData=ExtensionTool.buildExtensionPackageData(~name=id, ()),
              (),
            ),
            (),
          )
      },
    )

    \"when"(
      "set inspector current extension to a1",
      () => {
        ExtensionInspectorTool.useEffectOnce(
          (setInspectorCurrentExtensionStub.contents, setExtensionStrStub.contents),
          ServiceTool.build(
            ~sandbox,
            ~getExtensionFuncDataStr=(. extensionFuncData) =>
              Meta3d.Main.getExtensionFuncDataStr(extensionFuncData),
            (),
          ),
          (id->Some, list{a1.contents}),
        )
      },
    )

    then(
      "should show f1 as string",
      () => {
        ReactHookTool.getValue(
          ~setLocalValueStub=setExtensionStrStub.contents->Obj.magic,
          (),
        )->expect == f1Str
      },
    )
  })

  test(."update selected extension by change extension string", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let store = ref(Obj.magic(1))
    let dispatchStub = ref(Obj.magic(1))
    let id = ref(Obj.magic(1))
    let f2Str = "\u0002\u0003"
    let f2 = Js.Typed_array.Uint8Array.make([2, 3])

    _prepare(given)

    given(
      "init store",
      () => {
        store := AssembleSpaceStore.initialState

        FileTool.buildFakeTextEncoder()
      },
    )

    \"and"(
      "select extension a1 in Extensions whose extensionFuncData is f1",
      () => {
        let (a1, _) = ExtensionTool.buildSelectedExtension(~extensionFuncData=f1, ())

        store :=
          ExtensionsTool.selectExtension(
            ~dispatch=ReduxTool.ApAssemble.buildDispatch(
              AssembleSpaceStore.reducer,
              store.contents,
            ),
            ~extension=a1,
            ~protocolConfigStr=None,
            (),
          )

        id :=
          (
            store.contents.apAssembleState.selectedExtensions
            ->Meta3dCommonlib.ListSt.head
            ->Meta3dCommonlib.OptionSt.getExn
          ).id
      },
    )

    \"when"(
      "update a1 by change f1 string to f2 string",
      () => {
        store := {
            ...store.contents,
            apAssembleState: ExtensionInspectorTool.updateSelectedExtension(
              ApAssembleStore.reducer(store.contents.apAssembleState),
              ServiceTool.build(
                ~sandbox,
                ~loadExtension=(. extensionBinaryFile) =>
                  Meta3d.Main.loadExtension(extensionBinaryFile),
                ~generateExtension=(. packageData, fileStr) =>
                  Meta3d.Main.generateExtension(packageData, fileStr),
                (),
              ),
              id.contents,
              ExtensionTool.buildExtensionPackageData(),
              f2Str,
            ),
          }
      },
    )

    then(
      "a1's extensionFuncData should be f2",
      () => {
        let {selectedExtensions} = store.contents.apAssembleState

        (
          selectedExtensions->Meta3dCommonlib.ListSt.head->Meta3dCommonlib.OptionSt.getExn
        ).data.extensionFuncData->expect == f2
      },
    )
  })
})
