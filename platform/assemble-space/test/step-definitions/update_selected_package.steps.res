open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/update_selected_package.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  let f1 = Js.Typed_array.Uint8Array.make([10, 2, 3])
  let f1Str = "\n\u0002\u0003"

  let _prepare = given => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()

      FileTool.buildFakeTextDecoder(FileTool.convertUint8ArrayToBuffer)
      FileTool.buildFakeTextEncoder()
    })
  }

  test(."show selected package's all extensions' func data string", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let setInspectorCurrentPackageStub = ref(Obj.magic(1))
    let setExtensionsStub = ref(Obj.magic(1))
    let setContributesStub = ref(Obj.magic(1))
    let p1 = ref(Obj.magic(1))
    let id = "p1"

    _prepare(given)

    given(
      "select package p1 with extension e1 whose func data is f1",
      () => {
        setInspectorCurrentPackageStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
        setExtensionsStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
        setContributesStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        let e1 = ExtensionTool.generateExtension(
          ~name="e1",
          ~protocolName="e1-protocol",
          ~fileStr=f1Str,
          (),
        )
        let e1FileData = Meta3d.Main.loadExtension(e1)

        p1 :=
          PackageSelectedPackagesTool.buildSelectedPackage(
            ~id,
            ~name="p1",
            ~binaryFile=Meta3d.Main.generatePackage(
              Meta3d.Main.convertAllFileDataForPackage([e1FileData], [], ["e1"]),
              [],
            ),
            (),
          )
      },
    )

    \"when"(
      "set inspector current package to p1",
      () => {
        PackageInspectorTool.useEffectOnce(
          (
            setInspectorCurrentPackageStub.contents,
            setExtensionsStub.contents,
            setContributesStub.contents,
          ),
          ServiceTool.build(
            ~sandbox,
            ~getAllExtensionAndContributeFileDataOfPackage=(. package) =>
              Meta3d.Main.getAllExtensionAndContributeFileDataOfPackage(package),
            ~getExtensionFuncDataStr=(. extensionFuncData) =>
              Meta3d.Main.getExtensionFuncDataStr(extensionFuncData),
            (),
          ),
          (id->Some, list{p1.contents}),
        )
      },
    )

    then(
      "should show f1 as string",
      () => {
        ReactHookTool.getValue(~setLocalValueStub=setExtensionsStub.contents->Obj.magic, ())[0]
        ->Meta3dCommonlib.Tuple2.getLast
        ->expect == f1Str
      },
    )
  })

  test(."update selected package by change its extension's func data string", ({
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

    let _buildExtensionPackageData = (
      ~name,
      ~protocolName,
    ): Meta3d.AppAndPackageFileType.extensionPackageData => {
      {
        name,
        type_: Meta3d.AppAndPackageFileType.Entry,
        protocol: {
          name: protocolName,
          version: "^0.0.1",
        },
        dependentBlockProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
      }
    }

    _prepare(given)

    given(
      "init store",
      () => {
        store := AssembleSpaceStore.initialState
      },
    )

    \"and"(
      "select package p1 with extension e1 whose func data is f1",
      () => {
        let e1 = ExtensionTool.generateExtension(
          ~name="e1",
          ~protocolName="e1-protocol",
          ~fileStr=f1Str,
          (),
        )
        let e1FileData = Meta3d.Main.loadExtension(e1)

        let p1 = PackageSelectedPackagesTool.buildSelectedPackage(
          ~name="p1",
          ~binaryFile=Meta3d.Main.generatePackage(
            Meta3d.Main.convertAllFileDataForPackage([e1FileData], [], ["e1"]),
            [],
          ),
          (),
        )

        store :=
          PackagesTool.selectPackage(
            ~dispatch=ReduxTool.ApAssemble.buildDispatch(
              AssembleSpaceStore.reducer,
              store.contents,
            ),
            ~package=p1,
          )

        id :=
          (
            store.contents.apAssembleState.selectedPackages
            ->Meta3dCommonlib.ListSt.head
            ->Meta3dCommonlib.OptionSt.getExn
          ).id
      },
    )

    \"when"(
      "update p1 by change f1 string to f2 string",
      () => {
        store := {
            ...store.contents,
            apAssembleState: PackageInspectorTool.updateSelectedPackage(
              ApAssembleStore.reducer(store.contents.apAssembleState),
              ServiceTool.build(
                ~sandbox,
                ~getExtensionFuncData=(. extensionFuncDataStr) =>
                  Meta3d.Main.getExtensionFuncData(extensionFuncDataStr),
                ~generatePackage=(.
                  (allExtensionFileData, allContributeFileData),
                  allPackageBinaryFiles,
                ) =>
                  Meta3d.Main.generatePackage(
                    (allExtensionFileData, allContributeFileData),
                    allPackageBinaryFiles,
                  ),
                (),
              ),
              id.contents,
              [(_buildExtensionPackageData(~name="e1", ~protocolName="e1-protocol"), f2Str)],
              [],
            ),
          }
      },
    )

    then(
      "p1's e1's extensionFuncData should be f2",
      () => {
        let {selectedPackages} = store.contents.apAssembleState

        Meta3d.Main.getAllExtensionAndContributeFileDataOfPackage(
          (
            selectedPackages->Meta3dCommonlib.ListSt.head->Meta3dCommonlib.OptionSt.getExn
          ).binaryFile,
        )
        ->Meta3dCommonlib.Tuple2.getFirst
        ->Meta3dCommonlib.ArraySt.unsafeGetFirst
        ->Meta3dCommonlib.Tuple2.getLast
        ->expect == f2
      },
    )
  })
})
