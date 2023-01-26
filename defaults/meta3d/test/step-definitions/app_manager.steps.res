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
  //                 version: "0.4.1",
  //               },
  //               dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
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
  //               dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
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
  //                 version: "0.4.1",
  //               },
  //               dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
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
  //               dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
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
  //                 version: "0.4.1",
  //               },
  //               dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
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
  //                 version: "0.4.1",
  //               },
  //               dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
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
  //               dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
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

  test(."convert allExtensionFileData and allContributeFileData", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let firstExtension = ref(Obj.magic(1))
    let secondExtension = ref(Obj.magic(1))
    let firstContribute = ref(Obj.magic(1))
    let firstExtensionFileData = ref(Obj.magic(1))
    let secondExtensionFileData = ref(Obj.magic(1))
    let firstContributeFileData = ref(Obj.magic(1))
    // let firstPackageEntryExtensionProtocolData = ref(Obj.magic(1))
    // let allExtensionNewNames = ref(Obj.magic(1))
    // let allContributeNewNames = ref(Obj.magic(1))
    let startExtensionNames = ref(Obj.magic(1))

    _prepare(given)

    given(
      "generate two extensions that the seond is started",
      () => {
        firstExtension :=
          Main.generateExtension(
            (
              {
                name: "first-extension",
                protocol: {
                  name: "first-extension-protocol",
                  version: "0.4.1",
                },
                dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                  "second-extension",
                  (
                    {
                      protocolName: "second-extension-protocol",
                      protocolVersion: ">=0.4.1 < 1.0.0",
                    }: ExtensionFileType.dependentData
                  ),
                ),
                dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                  "first-contribute",
                  (
                    {
                      protocolName: "first-contribute-protocol",
                      protocolVersion: "^0.5.2",
                    }: ExtensionFileType.dependentData
                  ),
                ),
              }: ExtensionFileType.extensionPackageData
            ),
            AppManagerTool.buildEmptyExtensionFileStrWithOnStart(1),
          )
        secondExtension :=
          Main.generateExtension(
            (
              {
                name: "second-extension",
                protocol: {
                  name: "second-extension-protocol",
                  version: "0.5.2",
                },
                dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                  "first-package-entry-extension",
                  (
                    {
                      protocolName: "first-package-entry-extension-protocol",
                      protocolVersion: ">=0.4.1 < 1.0.0",
                    }: ExtensionFileType.dependentData
                  ),
                ),
                dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                  "first-contribute",
                  (
                    {
                      protocolName: "first-contribute-protocol",
                      protocolVersion: "^0.5.2",
                    }: ExtensionFileType.dependentData
                  ),
                ),
              }: ExtensionFileType.extensionPackageData
            ),
            AppManagerTool.buildEmptyExtensionFileStrWithOnStart(2),
          )

        startExtensionNames := ["second-extension"]
      },
    )

    \"and"(
      "generate one contribute",
      () => {
        firstContribute :=
          Main.generateContribute(
            (
              {
                name: "first-contribute",
                protocol: {
                  name: "first-contribute-protocol",
                  version: "0.5.3",
                },
                dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              }: ExtensionFileType.contributePackageData
            ),
            AppManagerTool.buildEmptyContributeFileStr(),
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
        firstExtensionFileData := Main.loadExtension(firstExtension.contents)
        secondExtensionFileData := Main.loadExtension(secondExtension.contents)
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
        let (allExtensionFileData, allContributeFileData) = Main.convertAllFileDataForApp(
          [firstExtensionFileData.contents, secondExtensionFileData.contents],
          [firstContributeFileData.contents],
          // [firstPackageEntryExtensionProtocolData.contents],
          startExtensionNames.contents,
        )

        (
          allExtensionFileData->Meta3dCommonlib.ArraySt.map(Meta3dCommonlib.Tuple2.getFirst),
          allContributeFileData->Meta3dCommonlib.ArraySt.map(Meta3dCommonlib.Tuple2.getFirst),
        )->expect ==
          (
            [
              (
                {
                  name: "first-extension",
                  protocol: {
                    name: "first-extension-protocol",
                    version: "0.4.1",
                  },
                  type_: Default,
                  dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                    "second-extension",
                    (
                      {
                        protocolName: "second-extension-protocol",
                        protocolVersion: ">=0.4.1 < 1.0.0",
                      }: ExtensionFileType.dependentExtensionData
                    ),
                  ),
                  dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                    "first-contribute",
                    (
                      {
                        protocolName: "first-contribute-protocol",
                        protocolVersion: "^0.5.2",
                      }: ExtensionFileType.dependentContributeData
                    ),
                  ),
                }: AppAndPackageFileType.extensionPackageData
              ),
              (
                {
                  name: "second-extension",
                  protocol: {
                    name: "second-extension-protocol",
                    version: "0.5.2",
                  },
                  type_: Start,
                  dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                    "first-package-entry-extension",
                    (
                      {
                        protocolName: "first-package-entry-extension-protocol",
                        protocolVersion: ">=0.4.1 < 1.0.0",
                      }: ExtensionFileType.dependentExtensionData
                    ),
                  ),
                  dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                    "first-contribute",
                    (
                      {
                        protocolName: "first-contribute-protocol",
                        protocolVersion: "^0.5.2",
                      }: ExtensionFileType.dependentContributeData
                    ),
                  ),
                }: AppAndPackageFileType.extensionPackageData
              ),
            ],
            [
              (
                {
                  name: "first-contribute",
                  protocol: {
                    name: "first-contribute-protocol",
                    version: "0.5.3",
                  },
                  dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                  dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                }: AppAndPackageFileType.contributePackageData
              ),
            ],
          )
      },
    )
  })

  let _prepareFlag = given => {
    given("prepare flag", () => {
      AppManagerTool.prepareStartFlag()
    })
  }

  test(."version not match case1", ({given, \"when", \"and", then}) => {
    let firstExtension = ref(Obj.magic(1))
    let secondExtension = ref(Obj.magic(1))
    let c1 = ref(Obj.magic(1))
    // let startExtensionName = ref(Obj.magic(1))
    let state = ref(Obj.magic(1))

    _prepare(given)

    _prepareFlag(given)

    given(
      "generate two extensions that version not match",
      () => {
        firstExtension :=
          Main.generateExtension(
            (
              {
                name: "first-extension",
                protocol: {
                  name: "first-extension-protocol",
                  version: "0.4.1",
                },
                dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                  "second-extension",
                  (
                    {
                      protocolName: "second-extension-protocol",
                      protocolVersion: ">=0.4.1 < 1.0.0",
                    }: ExtensionFileType.dependentData
                  ),
                ),
                dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              }: ExtensionFileType.extensionPackageData
            ),
            AppManagerTool.buildEmptyExtensionFileStrWithOnStart(1),
          )

        secondExtension :=
          Main.generateExtension(
            (
              {
                name: "second-extension",
                protocol: {
                  name: "second-extension-protocol",
                  version: "1.0.2",
                },
                dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              }: ExtensionFileType.extensionPackageData
            ),
            AppManagerTool.buildEmptyExtensionFileStrWithOnStart(2),
          )
      },
    )

    // \"and"(
    //   "start the second extension",
    //   () => {
    //     startExtensionName := "second-extension"
    //   },
    // )

    \"and"(
      "load them and convert as c1",
      () => {
        let firstExtensionFileData = Main.loadExtension(firstExtension.contents)
        let secondExtensionFileData = Main.loadExtension(secondExtension.contents)

        c1 :=
          Main.convertAllFileDataForApp(
            [firstExtensionFileData, secondExtensionFileData],
            [],
            // [startExtensionName.contents],
            [],
          )
      },
    )

    \"when"(
      "generate app with c1 and load it",
      () => {
        ()
      },
    )

    then(
      "error",
      () => {
        expect(
          () => {
            let (s, allExtensionDataArr, _) =
              Main.generateApp(c1.contents, [], Js.Nullable.null)->Main.loadApp
          },
        )->toThrowMessage("version not match")
      },
    )
  })

  test(."version not match case2", ({given, \"when", \"and", then}) => {
    let firstExtension = ref(Obj.magic(1))
    let firstContribute = ref(Obj.magic(1))
    let c1 = ref(Obj.magic(1))
    // let startExtensionName = ref(Obj.magic(1))
    let state = ref(Obj.magic(1))

    _prepare(given)

    _prepareFlag(given)

    given(
      "generate one extension",
      () => {
        firstExtension :=
          Main.generateExtension(
            (
              {
                name: "first-extension",
                protocol: {
                  name: "first-extension-protocol",
                  version: "0.4.1",
                },
                dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                  "first-contribute",
                  (
                    {
                      protocolName: "first-contribute-protocol",
                      protocolVersion: ">=0.4.1 < 1.0.0",
                    }: ExtensionFileType.dependentData
                  ),
                ),
              }: ExtensionFileType.extensionPackageData
            ),
            AppManagerTool.buildEmptyExtensionFileStrWithOnStart(1),
          )
      },
    )

    \"and"(
      "generate one contribute that version not match",
      () => {
        firstContribute :=
          Main.generateContribute(
            (
              {
                name: "first-contribute",
                protocol: {
                  name: "first-contribute-protocol",
                  version: ">=0.1.0 < 0.5.0",
                },
                dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              }: ExtensionFileType.contributePackageData
            ),
            AppManagerTool.buildEmptyContributeFileStr(),
          )
      },
    )

    // \"and"(
    //   "start the first extension",
    //   () => {
    //     startExtensionName := "first-extension"
    //   },
    // )

    \"and"(
      "load them and convert as c1",
      () => {
        let firstExtensionFileData = Main.loadExtension(firstExtension.contents)
        let firstContributeFileData = Main.loadContribute(firstContribute.contents)

        c1 :=
          Main.convertAllFileDataForApp(
            [firstExtensionFileData],
            [firstContributeFileData],
            // [startExtensionName.contents],
            [],
          )
      },
    )

    \"when"(
      "generate app with c1 and load it",
      () => {
        ()
      },
    )

    then(
      "error",
      () => {
        expect(
          () => {
            let (s, allExtensionDataArr, _) =
              Main.generateApp(c1.contents, [], Js.Nullable.null)->Main.loadApp
          },
        )->toThrowMessage("version not match")
      },
    )
  })

  test(."version not match case3", ({given, \"when", \"and", then}) => {
    let firstExtension = ref(Obj.magic(1))
    let p1 = ref(Obj.magic(1))
    let c1 = ref(Obj.magic(1))
    let state = ref(Obj.magic(1))

    _prepare(given)

    _prepareFlag(given)

    given(
      "generate one extension",
      () => {
        firstExtension :=
          Main.generateExtension(
            (
              {
                name: "first-extension",
                protocol: {
                  name: "first-extension-protocol",
                  version: "0.4.1",
                },
                dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                  "package-first-extension",
                  (
                    {
                      protocolName: "package-first-extension-protocol",
                      protocolVersion: ">1.0.0",
                    }: ExtensionFileType.dependentData
                  ),
                ),
                dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              }: ExtensionFileType.extensionPackageData
            ),
            AppManagerTool.buildEmptyExtensionFileStrWithOnStart(1),
          )
      },
    )

    \"and"(
      "generate one package as p1 with one extension that not match",
      () => {
        let extension = Main.generateExtension(
          (
            {
              name: "package-first-extension",
              protocol: {
                name: "package-first-extension-protocol",
                version: "0.4.1",
              },
              dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            }: ExtensionFileType.extensionPackageData
          ),
          AppManagerTool.buildEmptyExtensionFileStr(),
        )

        let extensionFileData = Main.loadExtension(extension)

        p1 :=
          Main.generatePackage(Main.convertAllFileDataForPackage([extensionFileData], [], []), [])
      },
    )

    \"and"(
      "load them and convert as c1",
      () => {
        let firstExtensionFileData = Main.loadExtension(firstExtension.contents)

        c1 := Main.convertAllFileDataForApp([firstExtensionFileData], [], [])
      },
    )

    \"when"(
      "generate app with c1, p1 and load it",
      () => {
        ()
      },
    )

    then(
      "error",
      () => {
        expect(
          () => {
            let (s, allExtensionDataArr, _) =
              Main.generateApp(c1.contents, [p1.contents], Js.Nullable.null)->Main.loadApp
          },
        )->toThrowMessage("version not match")
      },
    )
  })

  test(."version match case1", ({given, \"when", \"and", then}) => {
    let firstExtension = ref(Obj.magic(1))
    let p1 = ref(Obj.magic(1))
    let c1 = ref(Obj.magic(1))
    let state = ref(Obj.magic(1))

    _prepare(given)

    _prepareFlag(given)

    given(
      "generate one extension",
      () => {
        firstExtension :=
          Main.generateExtension(
            (
              {
                name: "first-extension",
                protocol: {
                  name: "first-extension-protocol",
                  version: "0.4.1",
                },
                dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                  "package-first-extension",
                  (
                    {
                      protocolName: "package-first-extension-protocol",
                      // protocolVersion: ">1.0.0",
                      protocolVersion: ">0.4.0",
                    }: ExtensionFileType.dependentData
                  ),
                ),
                dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              }: ExtensionFileType.extensionPackageData
            ),
            AppManagerTool.buildEmptyExtensionFileStrWithOnStart(1),
          )
      },
    )

    \"and"(
      "generate one package as p1 with one extension that match",
      () => {
        let extension = Main.generateExtension(
          (
            {
              name: "package-first-extension",
              protocol: {
                name: "package-first-extension-protocol",
                version: "0.4.1",
              },
              dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            }: ExtensionFileType.extensionPackageData
          ),
          AppManagerTool.buildEmptyExtensionFileStr(),
        )

        let extensionFileData = Main.loadExtension(extension)

        p1 :=
          Main.generatePackage(Main.convertAllFileDataForPackage([extensionFileData], [], []), [])
      },
    )

    \"and"(
      "load them and convert as c1",
      () => {
        let firstExtensionFileData = Main.loadExtension(firstExtension.contents)

        c1 := Main.convertAllFileDataForApp([firstExtensionFileData], [], [])
      },
    )

    \"when"(
      "generate app with c1, p1 and load it",
      () => {
        ()
      },
    )

    then(
      "not error",
      () => {
        expect(
          () => {
            let (s, allExtensionDataArr, _) =
              Main.generateApp(c1.contents, [p1.contents], Js.Nullable.null)->Main.loadApp
          },
        )->toNotThrow
      },
    )
  })

  test(."load and start generated app", ({given, \"when", \"and", then}) => {
    let firstExtension = ref(Obj.magic(1))
    let secondExtension = ref(Obj.magic(1))
    let firstContribute = ref(Obj.magic(1))
    let firstPackage = ref(Obj.magic(1))
    let firstPackageEntryExtensionProtocolData = ref(Obj.magic(1))
    let p1 = ref(Obj.magic(1))
    let c1 = ref(Obj.magic(1))
    // let allExtensionNewNames = ref(Obj.magic(1))
    // let allContributeNewNames = ref(Obj.magic(1))
    let startExtensionName = ref(Obj.magic(1))
    let configData = ref(Obj.magic(1))
    let configDataResult = ref(Obj.magic(1))
    let state = ref(Obj.magic(1))

    _prepare(given)

    _prepareFlag(given)

    given(
      "generate two extensions",
      () => {
        firstExtension :=
          Main.generateExtension(
            (
              {
                name: "first-extension",
                protocol: {
                  name: "first-extension-protocol",
                  version: "0.4.1",
                },
                dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()
                ->Meta3dCommonlib.ImmutableHashMap.set(
                  "package-first-extension",
                  (
                    {
                      protocolName: "package-first-extension-protocol",
                      protocolVersion: ">=0.4.1 < 1.0.0",
                    }: ExtensionFileType.dependentData
                  ),
                )
                ->Meta3dCommonlib.ImmutableHashMap.set(
                  "second-extension",
                  (
                    {
                      protocolName: "second-extension-protocol",
                      protocolVersion: ">=0.4.1 < 1.0.0",
                    }: ExtensionFileType.dependentData
                  ),
                ),
                dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                  "first-contribute",
                  (
                    {
                      protocolName: "first-contribute-protocol",
                      protocolVersion: "^0.5.2",
                    }: ExtensionFileType.dependentData
                  ),
                ),
              }: ExtensionFileType.extensionPackageData
            ),
            AppManagerTool.buildEmptyExtensionFileStrWithOnStart(1),
          )
        secondExtension :=
          Main.generateExtension(
            (
              {
                name: "second-extension",
                protocol: {
                  name: "second-extension-protocol",
                  version: "0.5.2",
                },
                dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                  "first-contribute",
                  (
                    {
                      protocolName: "first-contribute-protocol",
                      protocolVersion: "^0.5.2",
                    }: ExtensionFileType.dependentData
                  ),
                ),
              }: ExtensionFileType.extensionPackageData
            ),
            AppManagerTool.buildEmptyExtensionFileStrWithOnStart(2),
          )
      },
    )

    \"and"(
      "generate one contribute",
      () => {
        firstContribute :=
          Main.generateContribute(
            (
              {
                name: "first-contribute",
                protocol: {
                  name: "first-contribute-protocol",
                  version: "0.5.3",
                },
                dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              }: ExtensionFileType.contributePackageData
            ),
            AppManagerTool.buildEmptyContributeFileStr(),
          )
      },
    )

    \"and"(
      "generate one package as p1 with one extension and one contribute",
      () => {
        let extension = Main.generateExtension(
          (
            {
              name: "package-first-extension",
              protocol: {
                name: "package-first-extension-protocol",
                version: "0.4.1",
              },
              dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            }: ExtensionFileType.extensionPackageData
          ),
          AppManagerTool.buildEmptyExtensionFileStr(),
        )

        let contribute = Main.generateContribute(
          (
            {
              name: "package-first-contribute",
              protocol: {
                name: "package-first-contribute-protocol",
                version: "0.5.3",
              },
              dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            }: ExtensionFileType.contributePackageData
          ),
          AppManagerTool.buildEmptyContributeFileStr(),
        )

        let extensionFileData = Main.loadExtension(extension)
        let contributeFileData = Main.loadContribute(contribute)

        // allExtensionNewNames := ["first-extension", "second-new-extension"]
        // allContributeNewNames := ["first-new-contribute"]

        startExtensionName := "second-extension"

        p1 :=
          Main.generatePackage(
            Main.convertAllFileDataForPackage(
              [extensionFileData],
              [contributeFileData],
              ["package-first-extension"],
            ),
            [],
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
      "start the second extension",
      () => {
        // allExtensionNewNames := ["first-extension", "second-new-extension"]
        // allContributeNewNames := ["first-new-contribute"]

        startExtensionName := "second-extension"
      },
    )

    \"and"(
      "load them and convert as c1",
      () => {
        let firstExtensionFileData = Main.loadExtension(firstExtension.contents)
        let secondExtensionFileData = Main.loadExtension(secondExtension.contents)
        let firstContributeFileData = Main.loadContribute(firstContribute.contents)

        c1 :=
          Main.convertAllFileDataForApp(
            [firstExtensionFileData, secondExtensionFileData],
            [firstContributeFileData],
            // [firstPackageEntryExtensionProtocolData.contents],
            [startExtensionName.contents],
          )
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
        let (s, allExtensionDataArr, configDataResult_) =
          Main.generateApp(
            c1.contents,
            [p1.contents],
            configData.contents->Obj.magic->Meta3dCommonlib.NullableSt.return,
          )->Main.loadApp

        configDataResult := configDataResult_

        state := s

        Main.startApp((s, allExtensionDataArr, configDataResult.contents))
      },
    )

    then(
      "the three extensions should be registered",
      () => {
        (
          ExtensionManagerTool.hasExtension(state.contents, "first-extension-protocol"),
          ExtensionManagerTool.hasExtension(state.contents, "second-extension-protocol"),
          ExtensionManagerTool.hasExtension(state.contents, "package-first-extension-protocol"),
        )->expect == (true, true, true)
      },
    )

    \"and"(
      "the two contributes should be registered",
      () => {
        (
          ExtensionManagerTool.hasContribute(state.contents, "first-contribute-protocol"),
          ExtensionManagerTool.hasContribute(state.contents, "package-first-contribute-protocol"),
        )->expect == (true, true)
      },
    )

    \"and"(
      "load result should has correct config data",
      () => {
        configDataResult.contents->expect == configData.contents
      },
    )

    \"and"(
      "the second extension should be started",
      () => {
        AppManagerTool.getStartFlag()->expect == 4
      },
    )
  })

  test(."if two extension need start, error", ({given, \"when", \"and", then}) => {
    let firstExtension = ref(Obj.magic(1))
    let secondExtension = ref(Obj.magic(1))
    // let firstContribute = ref(Obj.magic(1))
    let c1 = ref(Obj.magic(1))
    // let allExtensionNewNames = ref(Obj.magic(1))
    // let allContributeNewNames = ref(Obj.magic(1))
    let startExtensionNames = ref(Obj.magic(1))
    let loadData = ref(Obj.magic(1))

    _prepare(given)

    _prepareFlag(given)

    \"and"(
      "generate two extensions",
      () => {
        firstExtension :=
          Main.generateExtension(
            (
              {
                name: "first-extension",
                protocol: {
                  name: "first-extension-protocol",
                  version: "0.4.1",
                },
                dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              }: ExtensionFileType.extensionPackageData
            ),
            AppManagerTool.buildEmptyExtensionFileStrWithOnStart(1),
          )
        secondExtension :=
          Main.generateExtension(
            (
              {
                name: "second-extension",
                protocol: {
                  name: "second-extension-protocol",
                  version: "0.5.2",
                },
                dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              }: ExtensionFileType.extensionPackageData
            ),
            AppManagerTool.buildEmptyExtensionFileStrWithOnStart(2),
          )
      },
    )

    \"and"(
      "start them",
      () => {
        // allExtensionNewNames := ["first-extension", "second-extension"]
        startExtensionNames := ["first-extension", "second-extension"]
      },
    )

    \"and"(
      "load them and convert as c1",
      () => {
        let firstExtensionFileData = Main.loadExtension(firstExtension.contents)
        let secondExtensionFileData = Main.loadExtension(secondExtension.contents)

        c1 :=
          Main.convertAllFileDataForApp(
            [firstExtensionFileData, secondExtensionFileData],
            [],
            // [],
            startExtensionNames.contents,
          )
      },
    )

    \"when"(
      "generate app with c1 and load it",
      () => {
        loadData := Main.generateApp(c1.contents, [], Js.Nullable.null)->Main.loadApp
      },
    )

    then(
      "start it should error",
      () => {
        expect(
          () => {
            Main.startApp(loadData.contents)
          },
        )->toThrowMessage("should only has one type extension")
      },
    )
  })

  let _prepareForLoadAndHandleGeneratedApp = (
    given,
    \"and",
    (prepareFlag, buildEmptyExtensionFileStrWithLifeHandle),
  ) => {
    given("prepare flag", () => {
      prepareFlag()
    })

    given("generate two extensions", () => {
      firstExtension :=
        Main.generateExtension(
          (
            {
              name: "first-extension",
              protocol: {
                name: "first-extension-protocol",
                version: "0.4.1",
              },
              dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            }: ExtensionFileType.extensionPackageData
          ),
          buildEmptyExtensionFileStrWithLifeHandle(1),
        )
      secondExtension :=
        Main.generateExtension(
          (
            {
              name: "second-extension",
              protocol: {
                name: "second-extension-protocol",
                version: "0.5.2",
              },
              dependentExtensionProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            }: ExtensionFileType.extensionPackageData
          ),
          buildEmptyExtensionFileStrWithLifeHandle(2),
        )
    })

    // \"and"("prepare new names", () => {
    //   allExtensionNewNames := ["first-extension", "second-new-extension"]
    // })

    \"and"("load them and convert as c1", () => {
      let firstExtensionFileData = Main.loadExtension(firstExtension.contents)
      let secondExtensionFileData = Main.loadExtension(secondExtension.contents)

      c1 := Main.convertAllFileDataForApp([firstExtensionFileData, secondExtensionFileData], [], [])
    })
  }

  test(."load and init generated app", ({given, \"when", \"and", then}) => {
    let state = ref(Obj.magic(1))

    _prepare(given)

    _prepareForLoadAndHandleGeneratedApp(
      given,
      \"and",
      (AppManagerTool.prepareInitFlag, AppManagerTool.buildEmptyExtensionFileStrWithOnInit),
    )

    CucumberAsync.execStep(
      \"when",
      "generate app with c1 and load it and init the first extension",
      () => {
        let (s, allExtensionDataArr, _) =
          Main.generateApp(c1.contents, [], Js.Nullable.null)->Main.loadApp

        state := s

        Main.initExtension(s, "first-extension-protocol", 10->Obj.magic)->Js.Promise.then_(
          s => {
            state := s

            Js.Promise.resolve()
          },
          _,
        )
      },
    )

    then(
      "the first extension should be inited",
      () => {
        AppManagerTool.getInitFlag()->expect == 11
      },
    )
  })

  test(."load and update generated app", ({given, \"when", \"and", then}) => {
    let state = ref(Obj.magic(1))

    _prepare(given)

    _prepareForLoadAndHandleGeneratedApp(
      given,
      \"and",
      (AppManagerTool.prepareUpdateFlag, AppManagerTool.buildEmptyExtensionFileStrWithOnUpdate),
    )

    CucumberAsync.execStep(
      \"when",
      "generate app with c1 and load it and update the second extension",
      () => {
        let (s, allExtensionDataArr, _) =
          Main.generateApp(c1.contents, [], Js.Nullable.null)->Main.loadApp

        state := s

        Main.updateExtension(s, "second-extension-protocol", 20->Obj.magic)->Js.Promise.then_(
          s => {
            state := s

            Js.Promise.resolve()
          },
          _,
        )
      },
    )

    then(
      "the second extension should be updated",
      () => {
        AppManagerTool.getUpdateFlag()->expect == 22
      },
    )
  })
})
