open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/app_manager.feature")

defineFeature(feature, test => {
  let firstExtension = ref(Obj.magic(1))
  let secondExtension = ref(Obj.magic(1))
  let c1 = ref(Obj.magic(1))
  // let allExtensionNewNames = ref(Obj.magic(1))

  let _prepare = given => {
    given("prepare", () => {
      FileTool.buildFakeTextDecoder(FileTool.convertUint8ArrayToBuffer)
      FileTool.buildFakeTextEncoder(.)
    })
  }

  // test(."version not match case1", ({given, \"when", \"and", then}) => {
  //   let firstExtension = ref(Obj.magic(1))
  //   let secondExtension = ref(Obj.magic(1))
  //   let firstExtensionFileData = ref(Obj.magic(1))
  //   let secondExtensionFileData = ref(Obj.magic(1))
  //   // let allExtensionNewNames = ref(Obj.magic(1))

  //   _prepare(given)

  //   given(
  //     "generate two extensions that version not match",
  //     () => {
  //       firstExtension :=
  //         Main.generateExtension(
  //           (
  //             {
  //               name: "first-extension",
  //               protocol: {
  //                 name: "first-extension-protocol",
  //                 version: "^0.4.1",
  //               },
  //               dependentBlockProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
  //                 "second-extension",
  //                 (
  //                   {
  //                     protocolName: "second-extension-protocol",
  //                     protocolVersion: ">=0.4.1 < 1.0.0",
  //                   }: ExtensionFileType.dependentData
  //                 ),
  //               ),
  //               dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  //             }: ExtensionFileType.extensionPackageData
  //           ),
  //           AppManagerTool.buildEmptyExtensionFileStrWithOnStart(1),
  //         )

  //       secondExtension :=
  //         Main.generateExtension(
  //           (
  //             {
  //               name: "second-extension",
  //               protocol: {
  //                 name: "second-extension-protocol",
  //                 version: "1.0.2",
  //               },
  //               dependentBlockProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  //               dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  //             }: ExtensionFileType.extensionPackageData
  //           ),
  //           AppManagerTool.buildEmptyExtensionFileStrWithOnStart(2),
  //         )
  //     },
  //   )

  //   // \"and"(
  //   //   "prepare new names",
  //   //   () => {
  //   //     allExtensionNewNames := ["first-extension", "second-extension"]
  //   //   },
  //   // )

  //   \"and"(
  //     "load them as l1",
  //     () => {
  //       firstExtensionFileData := Main.loadExtension(firstExtension.contents)
  //       secondExtensionFileData := Main.loadExtension(secondExtension.contents)
  //     },
  //   )

  //   \"when"(
  //     "convert l1",
  //     () => {
  //       ()
  //     },
  //   )

  //   then(
  //     "error",
  //     () => {
  //       expect(
  //         () => {
  //           Main.convertAllFileDataForApp(
  //             [firstExtensionFileData.contents, secondExtensionFileData.contents],
  //             [],
  //             [],
  //             [],
  //           )
  //         },
  //       )->toThrowMessage("version not match")
  //     },
  //   )
  // })

  // test(."version not match case2", ({given, \"when", \"and", then}) => {
  //   let firstExtension = ref(Obj.magic(1))
  //   let firstContribute = ref(Obj.magic(1))
  //   let firstExtensionFileData = ref(Obj.magic(1))
  //   let firstContributeFileData = ref(Obj.magic(1))
  //   // let allExtensionNewNames = ref(Obj.magic(1))
  //   // let allContributeNewNames = ref(Obj.magic(1))

  //   _prepare(given)

  //   given(
  //     "generate one extension",
  //     () => {
  //       firstExtension :=
  //         Main.generateExtension(
  //           (
  //             {
  //               name: "first-extension",
  //               protocol: {
  //                 name: "first-extension-protocol",
  //                 version: "^0.4.1",
  //               },
  //               dependentBlockProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  //               dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
  //                 "first-contribute",
  //                 (
  //                   {
  //                     protocolName: "first-contribute-protocol",
  //                     protocolVersion: ">=0.4.1 < 1.0.0",
  //                   }: ExtensionFileType.dependentData
  //                 ),
  //               ),
  //             }: ExtensionFileType.extensionPackageData
  //           ),
  //           AppManagerTool.buildEmptyExtensionFileStrWithOnStart(1),
  //         )
  //     },
  //   )

  //   \"and"(
  //     "generate one contribute that version not match",
  //     () => {
  //       firstContribute :=
  //         Main.generateContribute(
  //           (
  //             {
  //               name: "first-contribute",
  //               protocol: {
  //                 name: "first-contribute-protocol",
  //                 version: ">=0.1.0 < 0.5.0",
  //               },
  //               dependentBlockProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  //               dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  //             }: ExtensionFileType.contributePackageData
  //           ),
  //           AppManagerTool.buildEmptyContributeFileStr(),
  //         )
  //     },
  //   )

  //   // \"and"(
  //   //   "prepare new names",
  //   //   () => {
  //   //     allExtensionNewNames := ["first-extension"]
  //   //     allContributeNewNames := ["first-contribute"]
  //   //   },
  //   // )

  //   \"and"(
  //     "load them as l1",
  //     () => {
  //       firstExtensionFileData := Main.loadExtension(firstExtension.contents)
  //       firstContributeFileData := Main.loadContribute(firstContribute.contents)
  //     },
  //   )

  //   \"when"(
  //     "convert l1",
  //     () => {
  //       ()
  //     },
  //   )

  //   then(
  //     "error",
  //     () => {
  //       expect(
  //         () => {
  //           Main.convertAllFileDataForApp(
  //             [firstExtensionFileData.contents],
  //             [firstContributeFileData.contents],
  //             [],
  //             [],
  //           )
  //         },
  //       )->toThrowMessage("version not match")
  //     },
  //   )
  // })

  // test(."version not match case3", ({given, \"when", \"and", then}) => {
  //   let firstExtension = ref(Obj.magic(1))
  //   let firstExtensionFileData = ref(Obj.magic(1))
  //   let firstPackageEntryExtensionProtocolData = ref(Obj.magic(1))
  //   // let allExtensionNewNames = ref(Obj.magic(1))

  //   _prepare(given)

  //   given(
  //     "generate one extension",
  //     () => {
  //       firstExtension :=
  //         Main.generateExtension(
  //           (
  //             {
  //               name: "first-extension",
  //               protocol: {
  //                 name: "first-extension-protocol",
  //                 version: "^0.4.1",
  //               },
  //               dependentBlockProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
  //                 "first-package-entry-extension",
  //                 (
  //                   {
  //                     protocolName: "first-package-entry-extension-protocol",
  //                     protocolVersion: ">=0.4.1 < 1.0.0",
  //                   }: ExtensionFileType.dependentData
  //                 ),
  //               ),
  //               dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  //             }: ExtensionFileType.extensionPackageData
  //           ),
  //           AppManagerTool.buildEmptyExtensionFileStrWithOnStart(1),
  //         )
  //     },
  //   )

  //   \"and"(
  //     "generate one package entry extension protocol data that version not match",
  //     () => {
  //       firstPackageEntryExtensionProtocolData :=
  //         (
  //           {
  //             name: "first-package-entry-extension-protocol",
  //             version: ">1.0.0",
  //           }: ExtensionFileType.extensionProtocolData
  //         )
  //     },
  //   )

  //   // \"and"(
  //   //   "prepare new names",
  //   //   () => {
  //   //     allExtensionNewNames := ["first-extension"]
  //   //     // allContributeNewNames := ["first-contribute"]
  //   //   },
  //   // )

  //   \"and"(
  //     "load them as l1",
  //     () => {
  //       firstExtensionFileData := Main.loadExtension(firstExtension.contents)
  //       // firstContributeFileData := Main.loadContribute(firstContribute.contents)
  //     },
  //   )

  //   \"when"(
  //     "convert l1",
  //     () => {
  //       ()
  //     },
  //   )

  //   then(
  //     "error",
  //     () => {
  //       expect(
  //         () => {
  //           Main.convertAllFileDataForApp(
  //             [firstExtensionFileData.contents],
  //             [],
  //             [firstPackageEntryExtensionProtocolData.contents],
  //             [],
  //           )
  //         },
  //       )->toThrowMessage("version not match")
  //     },
  //   )
  // })

  // test(."version match case1", ({given, \"when", \"and", then}) => {
  //   let firstExtension = ref(Obj.magic(1))
  //   let firstContribute = ref(Obj.magic(1))
  //   let firstExtensionFileData = ref(Obj.magic(1))
  //   let firstContributeFileData = ref(Obj.magic(1))
  //   let firstPackageEntryExtensionProtocolData = ref(Obj.magic(1))
  //   // let allExtensionNewNames = ref(Obj.magic(1))
  //   // let allContributeNewNames = ref(Obj.magic(1))

  //   _prepare(given)

  //   given(
  //     "generate one extension",
  //     () => {
  //       firstExtension :=
  //         Main.generateExtension(
  //           (
  //             {
  //               name: "first-extension",
  //               protocol: {
  //                 name: "first-extension-protocol",
  //                 version: "^0.4.1",
  //               },
  //               dependentBlockProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
  //                 "first-package-entry-extension",
  //                 (
  //                   {
  //                     protocolName: "first-package-entry-extension-protocol",
  //                     protocolVersion: ">=0.4.1 < 1.0.0",
  //                   }: ExtensionFileType.dependentData
  //                 ),
  //               ),
  //               dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
  //                 "first-contribute",
  //                 (
  //                   {
  //                     protocolName: "first-contribute-protocol",
  //                     protocolVersion: "^0.3.0",
  //                   }: ExtensionFileType.dependentData
  //                 ),
  //               ),
  //             }: ExtensionFileType.extensionPackageData
  //           ),
  //           AppManagerTool.buildEmptyExtensionFileStrWithOnStart(1),
  //         )
  //     },
  //   )

  //   \"and"(
  //     "generate one contribute that version match",
  //     () => {
  //       firstContribute :=
  //         Main.generateContribute(
  //           (
  //             {
  //               name: "first-contribute",
  //               protocol: {
  //                 name: "first-contribute-protocol",
  //                 version: "^0.3.0",
  //               },
  //               dependentBlockProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  //               dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  //             }: ExtensionFileType.contributePackageData
  //           ),
  //           AppManagerTool.buildEmptyContributeFileStr(),
  //         )
  //     },
  //   )

  //   \"and"(
  //     "generate one package entry extension protocol data that version match",
  //     () => {
  //       firstPackageEntryExtensionProtocolData :=
  //         (
  //           {
  //             name: "first-package-entry-extension-protocol",
  //             version: ">=0.4.1 < 1.0.0",
  //           }: ExtensionFileType.extensionProtocolData
  //         )
  //     },
  //   )

  //   // \"and"(
  //   //   "prepare new names",
  //   //   () => {
  //   //     allExtensionNewNames := ["first-extension"]
  //   //     allContributeNewNames := ["first-contribute"]
  //   //   },
  //   // )

  //   \"and"(
  //     "load them as l1",
  //     () => {
  //       firstExtensionFileData := Main.loadExtension(firstExtension.contents)
  //       firstContributeFileData := Main.loadContribute(firstContribute.contents)
  //     },
  //   )

  //   \"when"(
  //     "convert l1",
  //     () => {
  //       ()
  //     },
  //   )

  //   then(
  //     "not error",
  //     () => {
  //       expect(
  //         () => {
  //           Main.convertAllFileDataForApp(
  //             [firstExtensionFileData.contents],
  //             [firstContributeFileData.contents],
  //             [firstPackageEntryExtensionProtocolData.contents],
  //             [],
  //           )
  //         },
  //       )->toNotThrow
  //     },
  //   )
  // })

  test(."convert allContributeFileData", ({given, \"when", \"and", then}) => {
    // let firstExtension = ref(Obj.magic(1))
    // let secondExtension = ref(Obj.magic(1))
    let firstContribute = ref(Obj.magic(1))
    let firstExtensionFileData = ref(Obj.magic(1))
    let secondExtensionFileData = ref(Obj.magic(1))
    let firstContributeFileData = ref(Obj.magic(1))
    // let firstPackageEntryExtensionProtocolData = ref(Obj.magic(1))
    // let allExtensionNewNames = ref(Obj.magic(1))
    // let allContributeNewNames = ref(Obj.magic(1))
    let startExtensionNames = ref(Obj.magic(1))

    _prepare(given)

    // given(
    //   "generate two extensions that the seond is started",
    //   () => {
    //     firstExtension :=
    //       ExtensionFileManagerTool.generateExtension(
    //         ~name="first-extension",
    //         ~version="0.0.1",
    //         ~account="meta3d",
    //         ~protocol={
    //           name: "first-extension-protocol",
    //           version: "^0.4.1",
    //         },
    //         ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty()
    //         ->Meta3dCommonlib.ImmutableHashMap.set("second-extension-protocol", ">=0.4.1 < 1.0.0")
    //         ->Meta3dCommonlib.ImmutableHashMap.set("first-contribute-protocol", "^0.5.2"),
    //         ~fileStr=AppManagerTool.buildEmptyExtensionFileStrWithOnStart(1),
    //         (),
    //       )
    //     secondExtension :=
    //       ExtensionFileManagerTool.generateExtension(
    //         ~name="second-extension",
    //         ~version="0.0.2",
    //         ~account="meta3d",
    //         ~displayName="s2",
    //         ~repoLink="r2",
    //         ~description="d2",
    //         ~protocol={
    //           name: "second-extension-protocol",
    //           version: "^0.5.2",
    //         },
    //         ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty()
    //         ->Meta3dCommonlib.ImmutableHashMap.set(
    //           "first-package-entry-extension-protocol",
    //           ">=0.4.1 < 1.0.0",
    //         )
    //         ->Meta3dCommonlib.ImmutableHashMap.set("first-contribute-protocol", "^0.5.2"),
    //         ~fileStr=AppManagerTool.buildEmptyExtensionFileStrWithOnStart(2),
    //         (),
    //       )

    //     startExtensionNames := ["second-extension"]
    //   },
    // )

    given(
      "generate one contribute",
      () => {
        firstContribute :=
          ExtensionFileManagerTool.generateContribute(
            ~name="first-contribute",
            ~version="0.0.1",
            ~account="meta3d",
            ~protocol={
              name: "first-contribute-protocol",
              version: "^0.5.3",
            },
            ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            ~fileStr=AppManagerTool.buildEmptyContributeFileStr(),
            (),
          )
      },
    )

    // \"and"(
    //   "generate one package entry extension protocol data",
    //   () => {
    //     firstPackageEntryExtensionProtocolData :=
    //       (
    //         {
    //           name: "first-package-entry-extension-protocol",
    //           version: ">=0.4.1 < 1.0.0",
    //         }: ExtensionFileType.extensionProtocolData
    //       )
    //   },
    // )

    // \"and"(
    //   "prepare new names",
    //   () => {
    //     allExtensionNewNames := ["first-new-extension", "second-extension"]
    //     allContributeNewNames := ["first-new-contribute"]
    //   },
    // )

    \"and"(
      "load them as l1",
      () => {
        // firstExtensionFileData := Main.loadExtension(firstExtension.contents)
        // secondExtensionFileData := Main.loadExtension(secondExtension.contents)
        firstContributeFileData := Main.loadContribute(firstContribute.contents)
      },
    )

    \"when"(
      "convert l1",
      () => {
        ()
      },
    )

    then(
      "converted package data is correct",
      () => {
        let allContributeFileData = Main.convertAllFileDataForApp(// [firstExtensionFileData.contents, secondExtensionFileData.contents],
        [firstContributeFileData.contents])
        // [firstPackageEntryExtensionProtocolData.contents],
        // startExtensionNames.contents,

        allContributeFileData
        ->Meta3dCommonlib.ArraySt.map(Meta3dCommonlib.Tuple2.getFirst)
        ->expect == [
            (
              {
                name: "first-contribute",
                version: "0.0.1",
                account: "meta3d",
                displayName: "",
                repoLink: "",
                description: "",
                protocol: {
                  name: "first-contribute-protocol",
                  version: "^0.5.3",
                },
                dependentPackageStoredInAppProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                dependentBlockProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              }: AppAndPackageFileType.contributePackageData
            ),
          ]
      },
    )
  })

  let _prepareFlag = given => {
    given("prepare flag", () => {
      AppManagerTool.prepareStartFlag()
    })
  }

  // test(."version not match case1", ({given, \"when", \"and", then}) => {
  //   let firstExtension = ref(Obj.magic(1))
  //   let secondExtension = ref(Obj.magic(1))
  //   let c1 = ref(Obj.magic(1))
  //   // let startPackageProtocolName = ref(Obj.magic(1))
  //   let state = ref(Obj.magic(1))

  //   _prepare(given)

  //   _prepareFlag(given)

  //   given(
  //     "generate two extensions that version not match",
  //     () => {
  //       firstExtension :=
  //         ExtensionFileManagerTool.generateExtension(
  //           ~name="first-extension",
  //           ~protocol={
  //             name: "first-extension-protocol",
  //             version: "^0.4.1",
  //           },
  //           ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
  //             "second-extension",
  //             (
  //               {
  //                 protocolName: "second-extension-protocol",
  //                 // protocolVersion: ">=0.4.1 < 1.0.0",
  //                 protocolVersion: ">=1.1.0 < 1.2.0",
  //               }: ExtensionFileType.dependentData
  //             ),
  //           ),
  //
  //           ~fileStr=AppManagerTool.buildEmptyExtensionFileStrWithOnStart(1),
  //           (),
  //         )

  //       secondExtension :=
  //         ExtensionFileManagerTool.generateExtension(
  //           ~name="second-extension",
  //           ~protocol={
  //             name: "second-extension-protocol",
  //             version: ">=1.0.2",
  //           },
  //           ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  //
  //           ~fileStr=AppManagerTool.buildEmptyExtensionFileStrWithOnStart(2),
  //           (),
  //         )
  //     },
  //   )

  //   // \"and"(
  //   //   "start the second extension",
  //   //   () => {
  //   //     startPackageProtocolName := "second-extension"
  //   //   },
  //   // )

  //   \"and"(
  //     "load them and convert as c1",
  //     () => {
  //       let firstExtensionFileData = Main.loadExtension(firstExtension.contents)
  //       let secondExtensionFileData = Main.loadExtension(secondExtension.contents)

  //       c1 :=
  //         Main.convertAllFileDataForApp(
  //           [firstExtensionFileData, secondExtensionFileData],
  //           [],
  //           // [startPackageProtocolName.contents],
  //           [],
  //         )
  //     },
  //   )

  //   \"when"(
  //     "generate app with c1 and load it",
  //     () => {
  //       ()
  //     },
  //   )

  //   then(
  //     "error",
  //     () => {
  //       expect(
  //         () => {
  //           let (s, allExtensionDataArr, _) =
  //             Main.generateApp(c1.contents, [], Js.Nullable.null)->AppManagerTool.loadApp(~appBinaryFile=_, ())
  //         },
  //       )->toThrowMessage("version not match")
  //     },
  //   )
  // })

  // test(."version not match case2", ({given, \"when", \"and", then}) => {
  //   let firstExtension = ref(Obj.magic(1))
  //   let firstContribute = ref(Obj.magic(1))
  //   let c1 = ref(Obj.magic(1))
  //   // let startPackageProtocolName = ref(Obj.magic(1))
  //   let state = ref(Obj.magic(1))

  //   _prepare(given)

  //   _prepareFlag(given)

  //   given(
  //     "generate one extension",
  //     () => {
  //       firstExtension :=
  //         ExtensionFileManagerTool.generateExtension(
  //           ~name="first-extension",
  //           ~protocol={
  //             name: "first-extension-protocol",
  //             version: "^0.4.1",
  //           },
  //           ~dependentContributeProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
  //             "first-contribute",
  //             (
  //               {
  //                 protocolName: "first-contribute-protocol",
  //                 protocolVersion: ">=0.4.1 < 1.0.0",
  //               }: ExtensionFileType.dependentData
  //             ),
  //           ),
  //           ~fileStr=AppManagerTool.buildEmptyExtensionFileStrWithOnStart(1),
  //           (),
  //         )
  //     },
  //   )

  //   \"and"(
  //     "generate one contribute that version not match",
  //     () => {
  //       firstContribute :=
  //         ExtensionFileManagerTool.generateContribute(
  //           ~name="first-contribute",
  //           ~protocol={
  //             name: "first-contribute-protocol",
  //             version: ">=0.1.0 < 0.5.0",
  //           },
  //           ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  //
  //           ~fileStr=AppManagerTool.buildEmptyContributeFileStr(),
  //           (),
  //         )
  //     },
  //   )

  //   // \"and"(
  //   //   "start the first extension",
  //   //   () => {
  //   //     startPackageProtocolName := "first-extension"
  //   //   },
  //   // )

  //   \"and"(
  //     "load them and convert as c1",
  //     () => {
  //       let firstExtensionFileData = Main.loadExtension(firstExtension.contents)
  //       let firstContributeFileData = Main.loadContribute(firstContribute.contents)

  //       c1 :=
  //         Main.convertAllFileDataForApp(
  //           [firstExtensionFileData],
  //           [firstContributeFileData],
  //           // [startPackageProtocolName.contents],
  //           [],
  //         )
  //     },
  //   )

  //   \"when"(
  //     "generate app with c1 and load it",
  //     () => {
  //       ()
  //     },
  //   )

  //   then(
  //     "error",
  //     () => {
  //       expect(
  //         () => {
  //           let (s, allExtensionDataArr, _) =
  //             Main.generateApp(c1.contents, [], Js.Nullable.null)->AppManagerTool.loadApp(~appBinaryFile=_, ())
  //         },
  //       )->toThrowMessage("version not match")
  //     },
  //   )
  // })

  // test(."version not match case3", ({given, \"when", \"and", then}) => {
  //   let firstExtension = ref(Obj.magic(1))
  //   let p1 = ref(Obj.magic(1))
  //   let c1 = ref(Obj.magic(1))
  //   let state = ref(Obj.magic(1))

  //   _prepare(given)

  //   _prepareFlag(given)

  //   given(
  //     "generate one extension",
  //     () => {
  //       firstExtension :=
  //         ExtensionFileManagerTool.generateExtension(
  //           ~name="first-extension",
  //           ~protocol={
  //             name: "first-extension-protocol",
  //             version: "^0.4.1",
  //           },
  //           ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
  //             "package-first-extension",
  //             (
  //               {
  //                 protocolName: "package-first-extension-protocol",
  //                 protocolVersion: ">1.0.0",
  //               }: ExtensionFileType.dependentData
  //             ),
  //           ),
  //
  //           ~fileStr=AppManagerTool.buildEmptyExtensionFileStrWithOnStart(1),
  //           (),
  //         )
  //     },
  //   )

  //   \"and"(
  //     "generate one package as p1 with one extension that not match",
  //     () => {
  //       let extension = ExtensionFileManagerTool.generateExtension(
  //         ~name="package-first-extension",
  //         ~protocol={
  //           name: "package-first-extension-protocol",
  //           version: "^0.4.1",
  //         },
  //         ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  //
  //         ~fileStr=AppManagerTool.buildEmptyExtensionFileStr(),
  //         (),
  //       )

  //       let extensionFileData = Main.loadExtension(extension)

  //       p1 :=
  //         Main.generatePackage(Main.convertAllFileDataForPackage([extensionFileData], [], []), [])
  //     },
  //   )

  //   \"and"(
  //     "load them and convert as c1",
  //     () => {
  //       let firstExtensionFileData = Main.loadExtension(firstExtension.contents)

  //       c1 := Main.convertAllFileDataForApp([firstExtensionFileData], [], [])
  //     },
  //   )

  //   \"when"(
  //     "generate app with c1, p1 and load it",
  //     () => {
  //       ()
  //     },
  //   )

  //   then(
  //     "error",
  //     () => {
  //       expect(
  //         () => {
  //           let (s, allExtensionDataArr, _) =
  //             Main.generateApp(c1.contents, [p1.contents], Js.Nullable.null)->AppManagerTool.loadApp(~appBinaryFile=_, ())
  //         },
  //       )->toThrowMessage("version not match")
  //     },
  //   )
  // })

  // test(."version match case1", ({given, \"when", \"and", then}) => {
  //   let firstExtension = ref(Obj.magic(1))
  //   let p1 = ref(Obj.magic(1))
  //   let c1 = ref(Obj.magic(1))
  //   let state = ref(Obj.magic(1))

  //   _prepare(given)

  //   _prepareFlag(given)

  //   given(
  //     "generate one extension",
  //     () => {
  //       firstExtension :=
  //         ExtensionFileManagerTool.generateExtension(
  //           ~name="first-extension",
  //           ~protocol={
  //             name: "first-extension-protocol",
  //             version: "^0.4.1",
  //           },
  //           ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
  //             "package-first-extension",
  //             (
  //               {
  //                 protocolName: "package-first-extension-protocol",
  //                 // protocolVersion: ">1.0.0",
  //                 // protocolVersion: ">0.4.0",
  //                 protocolVersion: "^0.4.0",
  //               }: ExtensionFileType.dependentData
  //             ),
  //           ),
  //
  //           ~fileStr=AppManagerTool.buildEmptyExtensionFileStrWithOnStart(1),
  //           (),
  //         )
  //     },
  //   )

  //   \"and"(
  //     "generate one package as p1 with one extension that match",
  //     () => {
  //       let extension = ExtensionFileManagerTool.generateExtension(
  //         ~name="package-first-extension",
  //         ~protocol={
  //           name: "package-first-extension-protocol",
  //           // version: "^0.4.1",
  //           version: "^0.5.0",
  //         },
  //         ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  //
  //         ~fileStr=AppManagerTool.buildEmptyExtensionFileStr(),
  //         (),
  //       )

  //       let extensionFileData = Main.loadExtension(extension)

  //       p1 :=
  //         Main.generatePackage(Main.convertAllFileDataForPackage([extensionFileData], [], []), [])
  //     },
  //   )

  //   \"and"(
  //     "load them and convert as c1",
  //     () => {
  //       let firstExtensionFileData = Main.loadExtension(firstExtension.contents)

  //       c1 := Main.convertAllFileDataForApp([firstExtensionFileData], [], [])
  //     },
  //   )

  //   \"when"(
  //     "generate app with c1, p1 and load it",
  //     () => {
  //       ()
  //     },
  //   )

  //   then(
  //     "not error",
  //     () => {
  //       expect(
  //         () => {
  //           let (s, allExtensionDataArr, _) =
  //             Main.generateApp(c1.contents, [p1.contents], Js.Nullable.null)->AppManagerTool.loadApp(~appBinaryFile=_, ())
  //         },
  //       )->toNotThrow
  //     },
  //   )
  // })

  test(."load and start generated app", ({given, \"when", \"and", then}) => {
    // let firstExtension = ref(Obj.magic(1))
    // let secondExtension = ref(Obj.magic(1))
    let firstContribute = ref(Obj.magic(1))
    // let firstPackage = ref(Obj.magic(1))
    // let firstPackageEntryExtensionProtocolData = ref(Obj.magic(1))
    let e1 = ref(Obj.magic(1))
    let ct1 = ref(Obj.magic(1))
    let p1 = ref(Obj.magic(1))
    let c1 = ref(Obj.magic(1))
    // let allExtensionNewNames = ref(Obj.magic(1))
    // let allContributeNewNames = ref(Obj.magic(1))
    let startPackageProtocolName = ref(Obj.magic(1))
    let configData = ref(Obj.magic(1))
    let configDataResult = ref(Obj.magic(1))
    let state = ref(Obj.magic(1))

    _prepare(given)

    _prepareFlag(given)

    // given(
    //   "generate two extensions",
    //   () => {
    //     firstExtension :=
    //       ExtensionFileManagerTool.generateExtension(
    //         ~name="first-extension",
    //         ~protocol={
    //           name: "first-extension-protocol",
    //           version: "^0.4.1",
    //         },
    //         ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty()
    //         ->Meta3dCommonlib.ImmutableHashMap.set(
    //           "package-first-extension-protocol",
    //           ">=0.4.1 < 1.0.0",
    //         )
    //         ->Meta3dCommonlib.ImmutableHashMap.set("second-extension-protocol", ">=0.4.1 < 1.0.0")
    //         ->Meta3dCommonlib.ImmutableHashMap.set("first-contribute-protocol", "^0.5.2"),
    //         ~fileStr=AppManagerTool.buildEmptyExtensionFileStrWithOnStart(1),
    //         (),
    //       )
    //     secondExtension :=
    //       ExtensionFileManagerTool.generateExtension(
    //         ~name="second-extension",
    //         ~protocol={
    //           name: "second-extension-protocol",
    //           version: "^0.5.2",
    //         },
    //         ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
    //           "first-contribute-protocol",
    //           "^0.5.2",
    //         ),
    //         ~fileStr=AppManagerTool.buildEmptyExtensionFileStrWithOnStart(2),
    //         (),
    //       )
    //   },
    // )

    given(
      "generate one contribute",
      () => {
        firstContribute :=
          ExtensionFileManagerTool.generateContribute(
            ~name="first-contribute",
            ~protocol={
              name: "first-contribute-protocol",
              version: "^0.5.3",
            },
            ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            ~fileStr=AppManagerTool.buildEmptyContributeFileStr(),
            (),
          )
      },
    )

    given(
      "generate one package as p1 with one extension e1 and one contribute ct1",
      () => {
        e1 :=
          ExtensionFileManagerTool.generateExtension(
            ~name="package-first-extension",
            ~protocol={
              name: "package-first-extension-protocol",
              version: "^0.4.1",
            },
            ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            // ~fileStr=AppManagerTool.buildEmptyExtensionFileStr(),
            ~fileStr=AppManagerTool.buildEmptyExtensionFileStrWithOnStart(2),
            (),
          )

        ct1 :=
          ExtensionFileManagerTool.generateContribute(
            ~name="package-first-contribute",
            ~protocol={
              name: "package-first-contribute-protocol",
              version: "^0.5.3",
            },
            ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            ~fileStr=AppManagerTool.buildEmptyContributeFileStr(),
            (),
          )

        let extensionFileData = Main.loadExtension(e1.contents)
        let contributeFileData = Main.loadContribute(ct1.contents)

        p1 :=
          Main.generatePackage(
            Main.convertAllFileDataForPackage(
              [extensionFileData],
              [contributeFileData],
              ["package-first-extension"],
            ),
            [],
            AppManagerTool.buildPackageData(),
          )
      },
    )

    // \"and"(
    //   "generate one package entry extension protocol data",
    //   () => {
    //     firstPackageEntryExtensionProtocolData :=
    //       (
    //         {
    //           name: "package-first-extension-protocol",
    //           version: ">=0.4.1 < 1.0.0",
    //         }: ExtensionFileType.extensionProtocolData
    //       )
    //   },
    // )

    \"and"(
      "start p1",
      () => {
        startPackageProtocolName := "package-first-extension-protocol"
      },
    )

    \"and"(
      "load them and convert as c1",
      () => {
        // let firstExtensionFileData = Main.loadExtension(firstExtension.contents)
        // let secondExtensionFileData = Main.loadExtension(secondExtension.contents)
        let firstContributeFileData = Main.loadContribute(firstContribute.contents)

        c1 :=
          Main.convertAllFileDataForApp(// [firstExtensionFileData, secondExtensionFileData],
          // [],
          [firstContributeFileData])
        // [firstPackageEntryExtensionProtocolData.contents],
        // [startPackageProtocolName.contents],
      },
    )

    \"and"(
      "prepare config data",
      () => {
        configData :=
          (
            {
              "width": 1,
              "height": 2,
            },
            {
              "isDebug": true,
            },
          )
      },
    )

    \"when"(
      "generate app with c1, p1, config data and load it and start it",
      () => {
        let (s, startPackageProtocolName, configDataResult_) =
          Main.generateApp(
            c1.contents,
            [p1.contents],
            [],
            AppManagerTool.buildSelectedElements(),
            AppManagerTool.buildCustomData(),
            configData.contents->Obj.magic->Meta3dCommonlib.NullableSt.return,
            startPackageProtocolName.contents,
          )->AppManagerTool.loadApp(~appBinaryFile=_, ())

        configDataResult := configDataResult_

        state := s

        Main.startApp((s, startPackageProtocolName, configDataResult.contents))
      },
    )

    then(
      "e1, ct1 should be registered",
      () => {
        (
          ExtensionManagerTool.hasExtension(state.contents, "package-first-extension-protocol"),
          ExtensionManagerTool.hasContribute(state.contents, "first-contribute-protocol"),
        )->expect == (true, true)
      },
    )

    // \"and"(
    //   "the two contributes should be registered",
    //   () => {
    //     (
    //       ExtensionManagerTool.hasContribute(state.contents, "first-contribute-protocol"),
    //       ExtensionManagerTool.hasContribute(state.contents, "package-first-contribute-protocol"),
    //     )->expect == (true, true)
    //   },
    // )

    \"and"(
      "load result should has correct config data",
      () => {
        configDataResult.contents->expect == configData.contents
      },
    )

    \"and"(
      "e1 should be started",
      () => {
        AppManagerTool.getStartFlag()->expect == 4
      },
    )
  })

  // test(."if two extension need start, error", ({given, \"when", \"and", then}) => {
  //   let firstExtension = ref(Obj.magic(1))
  //   let secondExtension = ref(Obj.magic(1))
  //   // let firstContribute = ref(Obj.magic(1))
  //   let c1 = ref(Obj.magic(1))
  //   // let allExtensionNewNames = ref(Obj.magic(1))
  //   // let allContributeNewNames = ref(Obj.magic(1))
  //   let startExtensionNames = ref(Obj.magic(1))
  //   let loadData = ref(Obj.magic(1))

  //   _prepare(given)

  //   _prepareFlag(given)

  //   \"and"(
  //     "generate two extensions",
  //     () => {
  //       firstExtension :=
  //         ExtensionFileManagerTool.generateExtension(
  //           ~name="first-extension",
  //           ~protocol={
  //             name: "first-extension-protocol",
  //             version: "^0.4.1",
  //           },
  //           ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  //           ~fileStr=AppManagerTool.buildEmptyExtensionFileStrWithOnStart(1),
  //           (),
  //         )
  //       secondExtension :=
  //         ExtensionFileManagerTool.generateExtension(
  //           ~name="second-extension",
  //           ~protocol={
  //             name: "second-extension-protocol",
  //             version: "^0.5.2",
  //           },
  //           ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  //           ~fileStr=AppManagerTool.buildEmptyExtensionFileStrWithOnStart(2),
  //           (),
  //         )
  //     },
  //   )

  //   \"and"(
  //     "start them",
  //     () => {
  //       // allExtensionNewNames := ["first-extension", "second-extension"]
  //       startExtensionNames := ["first-extension", "second-extension"]
  //     },
  //   )

  //   \"and"(
  //     "load them and convert as c1",
  //     () => {
  //       let firstExtensionFileData = Main.loadExtension(firstExtension.contents)
  //       let secondExtensionFileData = Main.loadExtension(secondExtension.contents)

  //       c1 :=
  //         Main.convertAllFileDataForApp(
  //           [firstExtensionFileData, secondExtensionFileData],
  //           [],
  //           // [],
  //           startExtensionNames.contents,
  //         )
  //     },
  //   )

  //   \"when"(
  //     "generate app with c1 and load it",
  //     () => {
  //       loadData := Main.generateApp(c1.contents, [], [], Js.Nullable.null)->AppManagerTool.loadApp(~appBinaryFile=_, ())
  //     },
  //   )

  //   then(
  //     "start it should error",
  //     () => {
  //       expect(
  //         () => {
  //           Main.startApp(loadData.contents)
  //         },
  //       )->toThrowMessage("should only has one type extension")
  //     },
  //   )
  // })

  // let _prepareForLoadAndHandleGeneratedApp = (
  //   given,
  //   \"and",
  //   (prepareFlag, buildEmptyExtensionFileStrWithLifeHandle),
  // ) => {
  //   given("prepare flag", () => {
  //     prepareFlag()
  //   })

  //   given("generate two extensions", () => {
  //     firstExtension :=
  //       ExtensionFileManagerTool.generateExtension(
  //         ~name="first-extension",
  //         ~protocol={
  //           name: "first-extension-protocol",
  //           version: "^0.4.1",
  //         },
  //         ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  //         ~fileStr=buildEmptyExtensionFileStrWithLifeHandle(1),
  //         (),
  //       )
  //     secondExtension :=
  //       ExtensionFileManagerTool.generateExtension(
  //         ~name="second-extension",
  //         ~protocol={
  //           name: "second-extension-protocol",
  //           version: "^0.5.2",
  //         },
  //         ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  //         ~fileStr=buildEmptyExtensionFileStrWithLifeHandle(2),
  //         (),
  //       )
  //   })

  //   // \"and"("prepare new names", () => {
  //   //   allExtensionNewNames := ["first-extension", "second-new-extension"]
  //   // })

  //   \"and"("load them and convert as c1", () => {
  //     let firstExtensionFileData = Main.loadExtension(firstExtension.contents)
  //     let secondExtensionFileData = Main.loadExtension(secondExtension.contents)

  //     // c1 := Main.convertAllFileDataForApp([firstExtensionFileData, secondExtensionFileData], [], [])
  //     c1 := Main.convertAllFileDataForApp([])
  //   })
  // }

  // test(."load and init generated app", ({given, \"when", \"and", then}) => {
  //   let state = ref(Obj.magic(1))

  //   _prepare(given)

  //   _prepareForLoadAndHandleGeneratedApp(
  //     given,
  //     \"and",
  //     (AppManagerTool.prepareInitFlag, AppManagerTool.buildEmptyExtensionFileStrWithOnInit),
  //   )

  //   CucumberAsync.execStep(
  //     \"when",
  //     "generate app with c1 and load it and init the first extension",
  //     () => {
  //       let (s, _, _) =
  //         Main.generateApp(c1.contents, [], [], Js.Nullable.null, "")->AppManagerTool.loadApp(~appBinaryFile=_, ())

  //       state := s

  //       Main.initExtension(s, "first-extension-protocol", 10->Obj.magic)->Js.Promise.then_(
  //         s => {
  //           state := s

  //           Js.Promise.resolve()
  //         },
  //         _,
  //       )
  //     },
  //   )

  //   then(
  //     "the first extension should be inited",
  //     () => {
  //       AppManagerTool.getInitFlag()->expect == 11
  //     },
  //   )
  // })

  // test(."load and update generated app", ({given, \"when", \"and", then}) => {
  //   let state = ref(Obj.magic(1))

  //   _prepare(given)

  //   _prepareForLoadAndHandleGeneratedApp(
  //     given,
  //     \"and",
  //     (AppManagerTool.prepareUpdateFlag, AppManagerTool.buildEmptyExtensionFileStrWithOnUpdate),
  //   )

  //   CucumberAsync.execStep(
  //     \"when",
  //     "generate app with c1 and load it and update the second extension",
  //     () => {
  //       let (s, _, _) =
  //         Main.generateApp(c1.contents, [], [], Js.Nullable.null, "")->AppManagerTool.loadApp(~appBinaryFile=_, ())

  //       state := s

  //       Main.updateExtension(s, "second-extension-protocol", 20->Obj.magic)->Js.Promise.then_(
  //         s => {
  //           state := s

  //           Js.Promise.resolve()
  //         },
  //         _,
  //       )
  //     },
  //   )

  //   then(
  //     "the second extension should be updated",
  //     () => {
  //       AppManagerTool.getUpdateFlag()->expect == 22
  //     },
  //   )
  // })

  test(."load generated app with package store in app", ({given, \"when", \"and", then}) => {
    let state = ref(Obj.magic(1))
    let p1 = ref(Obj.magic(1))
    let p1ProtocolName = "p1-protocol"

    _prepare(given)

    _prepareFlag(given)

    given(
      "generate empty package p1",
      () => {
        p1 := Main.generatePackage(([], []), [], AppManagerTool.buildPackageData())
      },
    )

    \"when"(
      "generate app with p1 and load it",
      () => {
        let (s, _, _) =
          Main.generateApp(
            [],
            [],
            [
              (
                AppManagerTool.buildPackageData(~packageProtocolName=p1ProtocolName, ()),
                p1.contents,
              ),
            ],
            AppManagerTool.buildSelectedElements(),
            AppManagerTool.buildCustomData(),
            Js.Nullable.null,
            "",
          )->AppManagerTool.loadApp(~appBinaryFile=_, ())

        state := s
      },
    )

    then(
      "get pacakge of p1's protocol name should return p1",
      () => {
        AppManagerTool.getPackage(state.contents, p1ProtocolName)->expect ==
          Js.Nullable.return(p1.contents)
      },
    )
  })

  test(."get all data of app", ({given, \"when", \"and", then}) => {
    let state = ref(Obj.magic(1))
    let p1 = ref(Obj.magic(1))
    let p1ProtocolName = "p1-protocol"
    let e1 = ref(Obj.magic(1))
    let c1 = ref(Obj.magic(1))
    let a1 = ref(Obj.magic(1))
    let selectedElements = ref(Obj.magic(1))
    let customData = ref(Obj.magic(1))
    let l1 = ref(Obj.magic(1))
    let result = ref(Obj.magic(1))
    let e1Name = "e1"
    let c1Name = "c1"

    _prepare(given)

    given(
      "generate one package as p1",
      () => {
        p1 := Main.generatePackage(([], []), [], AppManagerTool.buildPackageData())
      },
    )

    // \"and"(
    //   "generate one extension as e1",
    //   () => {
    //     e1 := ExtensionFileManagerTool.generateExtension(~name=e1Name, ())
    //   },
    // )

    \"and"(
      "generate one contribute as c1",
      () => {
        c1 := ExtensionFileManagerTool.generateContribute(~name=c1Name, ())
      },
    )

    \"and"(
      "load c1 and convert as l1",
      () => {
        l1 :=
          Main.convertAllFileDataForApp(// [Main.loadExtension(e1.contents)],
          [Main.loadContribute(c1.contents)])
        // [],
      },
    )

    \"and"(
      "generate app with p1, l1, selectedElements, custom data as a1",
      () => {
        selectedElements := AppManagerTool.buildSelectedElements(~data1=2, ())
        customData := AppManagerTool.buildCustomData(~customInputs=[Obj.magic(2)], ())

        a1 :=
          Main.generateApp(
            l1.contents,
            [],
            [
              (
                AppManagerTool.buildPackageData(~packageProtocolName=p1ProtocolName, ()),
                p1.contents,
              ),
            ],
            selectedElements.contents,
            customData.contents,
            Js.Nullable.null,
            "",
          )
      },
    )

    \"when"(
      "get all data of a1",
      () => {
        result := Main.getAllDataOfApp(a1.contents)
      },
    )

    then(
      "should return parsed p1, parsed c1, selectedElements, custom data",
      () => {
        let ([parsedP1], ([], [parsedC1], _), _, selectedElements_, customData_) = result.contents

        let ((p1Protocol, _, _, _, _), _) = parsedP1
        // let (e1PackageData, _) = parsedE1
        let (c1PackageData, _) = parsedC1

        (p1Protocol.name, c1PackageData.name, selectedElements_, customData_)->expect ==
          (p1ProtocolName, c1Name, selectedElements.contents, customData.contents)
      },
    )
  })
})
