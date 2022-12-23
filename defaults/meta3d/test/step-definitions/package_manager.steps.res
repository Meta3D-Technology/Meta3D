open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/package_manager.feature")

defineFeature(feature, test => {
  let firstExtension = ref(Obj.magic(1))
  let secondExtension = ref(Obj.magic(1))
  let c1 = ref(Obj.magic(1))
  let allExtensionNewNames = ref(Obj.magic(1))

  let _prepare = given => {
    given("prepare", () => {
      FileTool.buildFakeTextDecoder(FileTool.convertUint8ArrayToBuffer)
      FileTool.buildFakeTextEncoder(.)
    })
  }

  test(."not check dependent data", ({given, \"when", \"and", then}) => {
    let firstExtension = ref(Obj.magic(1))
    let secondExtension = ref(Obj.magic(1))
    let firstExtensionFileData = ref(Obj.magic(1))
    let secondExtensionFileData = ref(Obj.magic(1))
    let allExtensionNewNames = ref(Obj.magic(1))

    _prepare(given)

    given(
      "generate two extensions that version not match",
      () => {
        firstExtension :=
          Main.generateExtension(
            (
              {
                // name: "first-extension",
                protocol: {
                  name: "first-extension-protocol",
                  version: "0.4.1",
                },
                dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                  "second-extension",
                  (
                    {
                      protocolName: "second-extension-protocol",
                      protocolVersion: ">=0.4.1 < 1.0.0",
                    }: ExtensionFileType.dependentData
                  ),
                ),
                dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              }: ExtensionFileType.extensionPackageData
            ),
            PackageManagerTool.buildEmptyExtensionFileStr(),
          )

        secondExtension :=
          Main.generateExtension(
            (
              {
                // name: "second-extension",
                protocol: {
                  name: "second-extension-protocol",
                  version: "1.0.2",
                },
                dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              }: ExtensionFileType.extensionPackageData
            ),
            PackageManagerTool.buildEmptyExtensionFileStr(),
          )
      },
    )

    \"and"(
      "prepare new names",
      () => {
        allExtensionNewNames := ["first-extension", "second-extension"]
      },
    )

    \"and"(
      "load them as l1",
      () => {
        firstExtensionFileData := Main.loadExtension(firstExtension.contents)
        secondExtensionFileData := Main.loadExtension(secondExtension.contents)
      },
    )

    \"when"(
      "convert l1",
      () => {
        ()
      },
    )

    then(
      "not error",
      () => {
        expect(
          () => {
            Main.convertAllFileDataForPackage(
              [firstExtensionFileData.contents, secondExtensionFileData.contents],
              [],
              (allExtensionNewNames.contents, [], []),
            )
          },
        )->toNotThrow
      },
    )
  })

  test(.
    "convert allExtensionFileData and allContributeFileData and empty allPackageEntryExtensionProtocolData",
    ({given, \"when", \"and", then}) => {
      let firstExtension = ref(Obj.magic(1))
      let secondExtension = ref(Obj.magic(1))
      let firstContribute = ref(Obj.magic(1))
      let firstExtensionFileData = ref(Obj.magic(1))
      let secondExtensionFileData = ref(Obj.magic(1))
      let firstContributeFileData = ref(Obj.magic(1))
      let allExtensionNewNames = ref(Obj.magic(1))
      let allContributeNewNames = ref(Obj.magic(1))
      let entryExtensionName = ref(Obj.magic(1))

      _prepare(given)

      given(
        "generate two extensions that the seond is entry",
        () => {
          firstExtension :=
            Main.generateExtension(
              (
                {
                  // name: "first-extension",
                  protocol: {
                    name: "first-extension-protocol",
                    version: "0.4.1",
                  },
                  dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                    "second-extension",
                    (
                      {
                        protocolName: "second-extension-protocol",
                        protocolVersion: ">=0.4.1 < 1.0.0",
                      }: ExtensionFileType.dependentData
                    ),
                  ),
                  dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
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
              PackageManagerTool.buildEmptyExtensionFileStr(),
            )
          secondExtension :=
            Main.generateExtension(
              (
                {
                  // name: "second-extension",
                  protocol: {
                    name: "second-extension-protocol",
                    version: "0.5.2",
                  },
                  dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                  dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                    "first-contribute",
                    (
                      {
                        protocolName: "first-contribute-protocol",
                        protocolVersion: "^0.6.2",
                      }: ExtensionFileType.dependentData
                    ),
                  ),
                }: ExtensionFileType.extensionPackageData
              ),
              PackageManagerTool.buildEmptyExtensionFileStr(),
            )

          entryExtensionName := "second-extension"
        },
      )

      \"and"(
        "generate one contribute",
        () => {
          firstContribute :=
            Main.generateContribute(
              (
                {
                  // name: "first-contribute",
                  protocol: {
                    name: "first-contribute-protocol",
                    version: "0.5.3",
                  },
                  dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                  dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                }: ExtensionFileType.contributePackageData
              ),
              PackageManagerTool.buildEmptyContributeFileStr(),
            )
        },
      )

      \"and"(
        "prepare new names",
        () => {
          allExtensionNewNames := ["first-new-extension", "second-extension"]
          allContributeNewNames := ["first-new-contribute"]
        },
      )

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
          let (allExtensionFileData, allContributeFileData) = Main.convertAllFileDataForPackage(
            [firstExtensionFileData.contents, secondExtensionFileData.contents],
            [firstContributeFileData.contents],
            (
              allExtensionNewNames.contents,
              [entryExtensionName.contents],
              allContributeNewNames.contents,
            ),
          )

          (
            allExtensionFileData->Meta3dCommonlib.ArraySt.map(Meta3dCommonlib.Tuple2.getFirst),
            allContributeFileData->Meta3dCommonlib.ArraySt.map(Meta3dCommonlib.Tuple2.getFirst),
          )->expect ==
            (
              [
                (
                  {
                    // name: "first-new-extension",
                    protocolName: "first-extension-protocol",
                    type_: Default,
                    dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                      "second-extension",
                      "second-extension-protocol",
                    ),
                    dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                      "first-contribute",
                      "first-contribute-protocol",
                    ),
                  }: AppAndPackageFileType.extensionPackageData
                ),
                (
                  {
                    // name: "second-extension",
                    protocolName: "second-extension-protocol",
                    type_: Entry,
                    dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                    dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                      "first-contribute",
                      "first-contribute-protocol",
                    ),
                  }: AppAndPackageFileType.extensionPackageData
                ),
              ],
              [
                (
                  {
                    // name: "first-new-contribute",
                    protocolName: "first-contribute-protocol",
                    dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                    dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                  }: AppAndPackageFileType.contributePackageData
                ),
              ],
            )
        },
      )
    },
  )

  // let _prepareFlag = given => {
  //   given("prepare flag", () => {
  //     // PackageManagerTool.prepareStartFlag()
  //     ()
  //   })
  // }

  test(."load generated package", ({given, \"when", \"and", then}) => {
    let firstExtension = ref(Obj.magic(1))
    let secondExtension = ref(Obj.magic(1))
    let firstContribute = ref(Obj.magic(1))
    let c1 = ref(Obj.magic(1))
    let allExtensionNewNames = ref(Obj.magic(1))
    let allContributeNewNames = ref(Obj.magic(1))
    let entryExtensions = ref(Obj.magic(1))
    let entryExtensionProtocolName = ref(Obj.magic(1))
    // let configData = ref(Obj.magic(1))
    // let configDataResult = ref(Obj.magic(1))
    let state = ref(Obj.magic(1))

    _prepare(given)

    // _prepareFlag(given)

    given(
      "generate two extensions",
      () => {
        firstExtension :=
          Main.generateExtension(
            (
              {
                // name: "first-extension",
                protocol: {
                  name: "first-extension-protocol",
                  version: "0.4.1",
                },
                dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                  "second-extension",
                  (
                    {
                      protocolName: "second-extension-protocol",
                      protocolVersion: ">=0.4.1 < 1.0.0",
                    }: ExtensionFileType.dependentData
                  ),
                ),
                dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
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
            // PackageManagerTool.buildEmptyExtensionFileStr()
            PackageManagerTool.buildEmptyExtensionFileStr(),
          )
        secondExtension :=
          Main.generateExtension(
            (
              {
                // name: "second-extension",
                protocol: {
                  name: "second-extension-protocol",
                  version: "0.5.2",
                },
                dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
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
            PackageManagerTool.buildEmptyExtensionFileStr(),
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
                // name: "first-contribute",
                protocol: {
                  name: "first-contribute-protocol",
                  version: "0.5.3",
                },
                dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              }: ExtensionFileType.contributePackageData
            ),
            PackageManagerTool.buildEmptyContributeFileStr(),
          )
      },
    )

    \"and"(
      "prepare new names and mark the second extension as entry",
      () => {
        allExtensionNewNames := ["first-extension", "second-new-extension"]
        allContributeNewNames := ["first-new-contribute"]

        entryExtensions := ["second-new-extension"]
      },
    )

    \"and"(
      "load them and convert as c1",
      () => {
        let firstExtensionFileData = Main.loadExtension(firstExtension.contents)
        let secondExtensionFileData = Main.loadExtension(secondExtension.contents)
        let firstContributeFileData = Main.loadContribute(firstContribute.contents)

        c1 :=
          Main.convertAllFileDataForPackage(
            [firstExtensionFileData, secondExtensionFileData],
            [firstContributeFileData],
            (
              allExtensionNewNames.contents,
              entryExtensions.contents,
              allContributeNewNames.contents,
            ),
          )
      },
    )

    \"when"(
      "generate package with c1 and load it",
      () => {
        let (s, allExtensionDataArr, entryExtensionProtocolName_) =
          Main.generatePackage(c1.contents, [])->Main.loadPackage

        // configDataResult := configDataResult_

        entryExtensionProtocolName := entryExtensionProtocolName_

        state := s

        // Main.startPackage((s, allExtensionDataArr, configDataResult.contents))
      },
    )

    then(
      "the two extensions should be registered",
      () => {
        (
          ExtensionManagerTool.hasExtension(state.contents, "first-extension-protocol"),
          ExtensionManagerTool.hasExtension(state.contents, "second-extension-protocol"),
        )->expect == (true, true)
      },
    )

    \"and"(
      "the one contribute should be registered",
      () => {
        ExtensionManagerTool.hasContribute(state.contents, "first-contribute-protocol")->expect ==
          true
      },
    )

    \"and"(
      "load result should has entry extension name",
      () => {
        // entryExtensionProtocolName.contents->expect == entryExtensions.contents[0]
        entryExtensionProtocolName.contents->expect == "second-extension-protocol"
      },
    )
  })

  let _prepareForLoadAndHandleGeneratedPackage = (
    given,
    \"and",
    (
      prepareFlag,
      buildEmptyExtensionFileStrWithLifeHandleForExtension1,
      buildEmptyExtensionFileStrWithLifeHandleForExtension2,
    ),
  ) => {
    let entryExtensionName = ref(Obj.magic(1))

    given("prepare flag", () => {
      prepareFlag()
    })

    given("generate two extensions", () => {
      firstExtension :=
        Main.generateExtension(
          (
            {
              // name: "first-extension",
              protocol: {
                name: "first-extension-protocol",
                version: "0.4.1",
              },
              dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            }: ExtensionFileType.extensionPackageData
          ),
          buildEmptyExtensionFileStrWithLifeHandleForExtension1(),
        )
      secondExtension :=
        Main.generateExtension(
          (
            {
              // name: "second-extension",
              protocol: {
                name: "second-extension-protocol",
                version: "0.5.2",
              },
              dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            }: ExtensionFileType.extensionPackageData
          ),
          buildEmptyExtensionFileStrWithLifeHandleForExtension2(),
        )
    })

    \"and"("prepare new names and mark the second extension as entry", () => {
      allExtensionNewNames := ["first-extension", "second-new-extension"]
      entryExtensionName := "second-new-extension"
    })

    \"and"("load them and convert as c1", () => {
      let firstExtensionFileData = Main.loadExtension(firstExtension.contents)
      let secondExtensionFileData = Main.loadExtension(secondExtension.contents)

      c1 :=
        Main.convertAllFileDataForPackage(
          [firstExtensionFileData, secondExtensionFileData],
          [],
          (allExtensionNewNames.contents, [entryExtensionName.contents], []),
        )
    })
  }

  test(."load and init generated package", ({given, \"when", \"and", then}) => {
    let state = ref(Obj.magic(1))

    _prepare(given)

    _prepareForLoadAndHandleGeneratedPackage(
      given,
      \"and",
      (
        PackageManagerTool.prepareInitFlag,
        () => PackageManagerTool.buildEmptyExtensionFileStrWithOnInit(1),
        () => PackageManagerTool.buildEmptyExtensionFileStrWithOnInit(2),
      ),
    )

    CucumberAsync.execStep(
      \"when",
      "generate package with c1 and load it and init the entry extension",
      () => {
        let (s, allExtensionDataArr, entryExtensionName) =
          Main.generatePackage(c1.contents, [])->Main.loadPackage

        state := s

        Main.initExtension(s, entryExtensionName, 10->Obj.magic)->Js.Promise.then_(
          s => {
            state := s

            Js.Promise.resolve()
          },
          _,
        )
      },
    )

    then(
      "the second extension should be inited",
      () => {
        PackageManagerTool.getInitFlag()->expect == 12
      },
    )
  })

  test(."load and invoke generated package's entry extension's service", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let state = ref(Obj.magic(1))

    _prepare(given)

    _prepareForLoadAndHandleGeneratedPackage(
      given,
      \"and",
      (
        PackageManagerTool.prepareFlagForSevice,
        () => PackageManagerTool.buildEmptyExtensionFileStr(),
        () => PackageManagerTool.buildEmptyExtensionFileStrWithService(),
      ),
    )

    \"when"(
      "generate package with c1 and load it and invoke the entry extension's service",
      () => {
        let (s, allExtensionDataArr, entryExtensionName) =
          Main.generatePackage(c1.contents, [])->Main.loadPackage

        state := s

        (Main.getExtensionService(s, entryExtensionName)->Obj.magic)["func1"](9)
      },
    )

    then(
      "the second extension's service should be invoked",
      () => {
        PackageManagerTool.getServiceFlag()->expect == 9
      },
    )
  })

  // test(."load and update generated package", ({given, \"when", \"and", then}) => {
  //   let state = ref(Obj.magic(1))

  //   _prepare(given)

  //   _prepareForLoadAndHandleGeneratedPackage(
  //     given,
  //     \"and",
  //     (PackageManagerTool.prepareUpdateFlag, PackageManagerTool.buildEmptyExtensionFileStrWithOnUpdate),
  //   )

  //   CucumberAsync.execStep(
  //     \"when",
  //     "generate package with c1 and load it and update the second extension",
  //     () => {
  //       let (s, allExtensionDataArr, _) =
  //         Main.generatePackage(c1.contents, Js.Nullable.null)->Main.loadPackage

  //       state := s

  //       Main.updateExtension(s, "second-new-extension", 20->Obj.magic)->Js.Promise.then_(
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
  //       PackageManagerTool.getUpdateFlag()->expect == 22
  //     },
  //   )
  // })

  // test(."if two extension need start, error", ({given, \"when", \"and", then}) => {
  //   let firstExtension = ref(Obj.magic(1))
  //   let secondExtension = ref(Obj.magic(1))
  //   // let firstContribute = ref(Obj.magic(1))
  //   let c1 = ref(Obj.magic(1))
  //   let allExtensionNewNames = ref(Obj.magic(1))
  //   // let allContributeNewNames = ref(Obj.magic(1))
  //   let isStartedExtensions = ref(Obj.magic(1))
  //   let loadData = ref(Obj.magic(1))

  //   _prepare(given)

  //   _prepareFlag(given)

  //   \"and"(
  //     "generate two extensions",
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
  //               dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  //               dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  //             }: ExtensionFileType.extensionPackageData
  //           ),
  //           PackageManagerTool.buildEmptyExtensionFileStr()
  //         )
  //       secondExtension :=
  //         Main.generateExtension(
  //           (
  //             {
  //               name: "second-extension",
  //               protocol: {
  //                 name: "second-extension-protocol",
  //                 version: "0.5.2",
  //               },
  //               dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  //               dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  //             }: ExtensionFileType.extensionPackageData
  //           ),
  //           PackageManagerTool.buildEmptyExtensionFileStr()
  //         )
  //     },
  //   )

  //   \"and"(
  //     "start them",
  //     () => {
  //       allExtensionNewNames := ["first-extension", "second-extension"]
  //       isStartedExtensions := ["first-extension", "second-extension"]
  //     },
  //   )

  //   \"and"(
  //     "load them and convert as c1",
  //     () => {
  //       let firstExtensionFileData = Main.loadExtension(firstExtension.contents)
  //       let secondExtensionFileData = Main.loadExtension(secondExtension.contents)

  //       c1 :=
  //         Main.convertAllFileDataForPackage(
  //           [firstExtensionFileData, secondExtensionFileData],
  //           [],
  //           (allExtensionNewNames.contents, isStartedExtensions.contents, []),
  //         )
  //     },
  //   )

  //   \"when"(
  //     "generate package with c1 and load it",
  //     () => {
  //       loadData := Main.generatePackage(c1.contents, Js.Nullable.null)->Main.loadPackage
  //     },
  //   )

  //   then(
  //     "start it should error",
  //     () => {
  //       expect(
  //         () => {
  //           Main.startPackage(loadData.contents)
  //         },
  //       )->toThrowMessage("should only has one type extension")
  //     },
  //   )
  // })
})
