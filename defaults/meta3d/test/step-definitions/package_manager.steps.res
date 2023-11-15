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
  // let allExtensionNewNames = ref(Obj.magic(1))

  let _prepare = given => {
    given("prepare", () => {
      FileTool.buildFakeTextDecoder(FileTool.convertUint8ArrayToBuffer)
      FileTool.buildFakeTextEncoder(.)
    })
  }

  //   test(."not check dependent data", ({given, \"when", \"and", then}) => {
  //     let firstExtension = ref(Obj.magic(1))
  //     let secondExtension = ref(Obj.magic(1))
  //     let firstExtensionFileData = ref(Obj.magic(1))
  //     let secondExtensionFileData = ref(Obj.magic(1))
  //     // let allExtensionNewNames = ref(Obj.magic(1))

  //     _prepare(given)

  //     given(
  //       "generate two extensions that version not match",
  //       () => {
  //         firstExtension :=
  //           Main.generateExtension(
  //             (
  //               {
  //                 name: "first-extension",
  //                 protocol: {
  //                   name: "first-extension-protocol",
  //                   version: "0.4.1",
  //                 },
  //                 dependentBlockProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
  //                   "second-extension",
  //                   (
  //                     {
  //                       protocolName: "second-extension-protocol",
  //                       protocolVersion: ">=0.4.1 < 1.0.0",
  //                     }: ExtensionFileType.dependentData
  //                   ),
  //                 ),
  //                 dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  //               }: ExtensionFileType.extensionPackageData
  //             ),
  //             PackageManagerTool.buildEmptyExtensionFileStr(),
  //           )

  //         secondExtension :=
  //           Main.generateExtension(
  //             (
  //               {
  //                 name: "second-extension",
  //                 protocol: {
  //                   name: "second-extension-protocol",
  //                   version: "1.0.2",
  //                 dependentcontributeprotocolnamemap: meta3dcommonlib.immutablehashmap.createempty(),
  //               }: ExtensionFileType.extensionPackageData
  //             ),
  //             PackageManagerTool.buildEmptyExtensionFileStr(),
  //           )
  //       },
  //     )

  //     // \"and"(
  //     //   "prepare new names",
  //     //   () => {
  //     //     allExtensionNewNames := ["first-extension", "second-extension"]
  //     //   },
  //     // )

  //     \"and"(
  //       "load them as l1",
  //       () => {
  //         firstExtensionFileData := Main.loadExtension(firstExtension.contents)
  //         secondExtensionFileData := Main.loadExtension(secondExtension.contents)
  //       },
  //     )

  //     \"when"(
  //       "convert l1",
  //       () => {
  //         ()
  //       },
  //     )

  //     then(
  //       "not error",
  //       () => {
  //         expect(
  //           () => {
  //             Main.convertAllFileDataForPackage(
  //               [firstExtensionFileData.contents, secondExtensionFileData.contents],
  //               [],
  //               [],
  //             )
  //           },
  //         )->toNotThrow
  //       },
  //     )
  //   })

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
    // let allExtensionNewNames = ref(Obj.magic(1))
    // let allContributeNewNames = ref(Obj.magic(1))
    let entryExtensionName = ref(Obj.magic(1))

    _prepare(given)

    given(
      "generate two extensions that the seond is entry",
      () => {
        firstExtension :=
          ExtensionFileManagerTool.generateExtension(
            ~name="first-extension",
            ~version="0.0.1",
            ~account="meta3d",
            ~protocol={
              name: "first-extension-protocol",
              version: "0.4.1",
            },
            ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty()
            ->Meta3dCommonlib.ImmutableHashMap.set("second-extension-protocol", ">=0.4.1 < 1.0.0")
            ->Meta3dCommonlib.ImmutableHashMap.set("first-contribute-protocol", "^0.5.2"),
            (),
          )
        secondExtension :=
          ExtensionFileManagerTool.generateExtension(
            ~name="second-extension",
            ~version="0.0.1",
            ~account="meta3d",
            ~protocol={
              name: "second-extension-protocol",
              version: "0.5.2",
            },
            ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
              "first-contribute-protocol",
              "^0.6.2",
            ),
            (),
          )

        entryExtensionName := "second-extension"
      },
    )

    \"and"(
      "generate one contribute",
      () => {
        firstContribute :=
          ExtensionFileManagerTool.generateContribute(
            ~name="first-contribute",
            ~version="0.0.1",
            ~account="meta3d",
            ~protocol={
              name: "first-contribute-protocol",
              version: "0.5.3",
            },
            ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            (),
          )
      },
    )

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
        let (allExtensionFileData, allContributeFileData) = Main.convertAllFileDataForPackage(
          [firstExtensionFileData.contents, secondExtensionFileData.contents],
          [firstContributeFileData.contents],
          [entryExtensionName.contents],
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
                  version: "0.0.1",
                  account: "meta3d",
                  displayName: "",
                  repoLink: "",
                  description: "",
                  protocol: {
                    name: "first-extension-protocol",
                    version: "0.4.1",
                  },
                  type_: Default,
                  dependentPackageStoredInAppProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                  dependentBlockProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()
                  ->Meta3dCommonlib.ImmutableHashMap.set(
                    "second-extension-protocol",
                    ">=0.4.1 < 1.0.0",
                  )
                  ->Meta3dCommonlib.ImmutableHashMap.set("first-contribute-protocol", "^0.5.2"),
                }: AppAndPackageFileType.extensionPackageData
              ),
              (
                {
                  name: "second-extension",
                  version: "0.0.1",
                  account: "meta3d",
                  displayName: "",
                  repoLink: "",
                  description: "",
                  protocol: {
                    name: "second-extension-protocol",
                    version: "0.5.2",
                  },
                  type_: Entry,
                  dependentPackageStoredInAppProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                  dependentBlockProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                    "first-contribute-protocol",
                    "^0.6.2",
                  ),
                }: AppAndPackageFileType.extensionPackageData
              ),
            ],
            [
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
                    version: "0.5.3",
                  },
                  dependentPackageStoredInAppProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                  dependentBlockProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                }: AppAndPackageFileType.contributePackageData
              ),
            ],
          )
      },
    )
  })

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
    // let allExtensionNewNames = ref(Obj.magic(1))
    // let allContributeNewNames = ref(Obj.magic(1))
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
          ExtensionFileManagerTool.generateExtension(
            ~name="first-extension",
            ~protocol={
              name: "first-extension-protocol",
              version: "0.4.1",
            },
            ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty()
            ->Meta3dCommonlib.ImmutableHashMap.set("second-extension-protocol", ">=0.4.1 < 1.0.0")
            ->Meta3dCommonlib.ImmutableHashMap.set("first-contribute-protocol", "^0.5.2"),
            (),
          )
        secondExtension :=
          ExtensionFileManagerTool.generateExtension(
            ~name="second-extension",
            ~protocol={
              name: "second-extension-protocol",
              version: "0.5.2",
            },
            ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
              "first-contribute-protocol",
              "^0.5.2",
            ),
            (),
          )
      },
    )

    \"and"(
      "generate one contribute",
      () => {
        firstContribute :=
          ExtensionFileManagerTool.generateContribute(
            ~name="first-contribute",
            ~protocol={
              name: "first-contribute-protocol",
              version: "0.5.3",
            },
            (),
          )
      },
    )

    \"and"(
      "mark the second extension as entry",
      () => {
        // allExtensionNewNames := ["first-extension", "second-new-extension"]
        // allContributeNewNames := ["first-new-contribute"]

        entryExtensions := ["second-extension"]
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
            entryExtensions.contents,
          )
      },
    )

    \"when"(
      "generate package with c1 and load it",
      () => {
        let (s, allExtensionDataArr, entryExtensionProtocolName_) =
          Main.generatePackage(c1.contents, [], AppManagerTool.buildPackageData())->Main.loadPackage

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

  test(."load generated package which contains other packages", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let e1 = ref(Obj.magic(1))
    let e2 = ref(Obj.magic(1))
    let e3 = ref(Obj.magic(1))
    let firstContribute = ref(Obj.magic(1))
    let c1 = ref(Obj.magic(1))
    let c2 = ref(Obj.magic(1))
    let entryExtensions = ref(Obj.magic(1))
    let entryExtensionProtocolName = ref(Obj.magic(1))
    let p1 = ref(Obj.magic(1))
    let state = ref(Obj.magic(1))

    _prepare(given)

    given(
      "generate one extension as e1",
      () => {
        e1 :=
          ExtensionFileManagerTool.generateExtension(
            ~name="e1",
            ~protocol={
              name: "e1-protocol",
              version: "0.4.1",
            },
            (),
          )
      },
    )

    \"and"(
      "mark e1 as entry",
      () => {
        entryExtensions := ["e1"]
      },
    )

    \"and"(
      "load e1 and convert as c1",
      () => {
        let e1FileData = Main.loadExtension(e1.contents)

        c1 := Main.convertAllFileDataForPackage([e1FileData], [], entryExtensions.contents)
      },
    )

    \"and"(
      "generate package p1 with c1",
      () => {
        p1 := Main.generatePackage(c1.contents, [], AppManagerTool.buildPackageData())
      },
    )

    \"and"(
      "generate two extensions",
      () => {
        e2 :=
          ExtensionFileManagerTool.generateExtension(
            ~name="e2",
            ~protocol={
              name: "e2-protocol",
              version: "0.4.1",
            },
            ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty()
            ->Meta3dCommonlib.ImmutableHashMap.set("e3-protocol", ">=0.4.1 < 1.0.0")
            ->Meta3dCommonlib.ImmutableHashMap.set("first-contribute-protocol", "^0.5.2"),
            (),
          )
        e3 :=
          ExtensionFileManagerTool.generateExtension(
            ~name="e3",
            ~protocol={
              name: "e3-protocol",
              version: "0.5.2",
            },
            ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
              "first-contribute-protocol",
              "^0.5.2",
            ),
            (),
          )
      },
    )

    \"and"(
      "generate one contribute",
      () => {
        firstContribute :=
          ExtensionFileManagerTool.generateContribute(
            ~name="first-contribute",
            ~protocol={
              name: "first-contribute-protocol",
              version: "0.5.3",
            },
            (),
          )
      },
    )

    \"and"(
      "mark the second extension(e3) as entry",
      () => {
        entryExtensions := ["e3"]
      },
    )

    \"and"(
      "load them and convert as c2",
      () => {
        let e2FileData = Main.loadExtension(e2.contents)
        let e3FileData = Main.loadExtension(e3.contents)
        let firstContributeFileData = Main.loadContribute(firstContribute.contents)

        c2 :=
          Main.convertAllFileDataForPackage(
            [e2FileData, e3FileData],
            [firstContributeFileData],
            entryExtensions.contents,
          )
      },
    )

    \"when"(
      "generate package p2 with c2, p1 and load it",
      () => {
        let (s, allExtensionDataArr, entryExtensionProtocolName_) =
          Main.generatePackage(
            c2.contents,
            [p1.contents],
            AppManagerTool.buildPackageData(),
          )->Main.loadPackage

        entryExtensionProtocolName := entryExtensionProtocolName_

        state := s
      },
    )

    then(
      "the three extensions should be registered",
      () => {
        (
          ExtensionManagerTool.hasExtension(state.contents, "e1-protocol"),
          ExtensionManagerTool.hasExtension(state.contents, "e2-protocol"),
          ExtensionManagerTool.hasExtension(state.contents, "e3-protocol"),
        )->expect == (true, true, true)
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
      "load result should has entry extension name of e3",
      () => {
        entryExtensionProtocolName.contents->expect == "e3-protocol"
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
        ExtensionFileManagerTool.generateExtension(
          ~name="first-extension",
          ~protocol={
            name: "first-extension-protocol",
            version: "0.4.1",
          },
          ~fileStr=buildEmptyExtensionFileStrWithLifeHandleForExtension1(),
          (),
        )
      secondExtension :=
        ExtensionFileManagerTool.generateExtension(
          ~name="second-extension",
          ~protocol={
            name: "second-extension-protocol",
            version: "0.5.2",
          },
          ~fileStr=buildEmptyExtensionFileStrWithLifeHandleForExtension2(),
          (),
        )
    })

    \"and"("mark the second extension as entry", () => {
      // allExtensionNewNames := ["first-extension", "second-new-extension"]
      entryExtensionName := "second-extension"
    })

    \"and"("load them and convert as c1", () => {
      let firstExtensionFileData = Main.loadExtension(firstExtension.contents)
      let secondExtensionFileData = Main.loadExtension(secondExtension.contents)

      c1 :=
        Main.convertAllFileDataForPackage(
          [firstExtensionFileData, secondExtensionFileData],
          [],
          [entryExtensionName.contents],
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
          Main.generatePackage(c1.contents, [], AppManagerTool.buildPackageData())->Main.loadPackage

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
          Main.generatePackage(c1.contents, [], AppManagerTool.buildPackageData())->Main.loadPackage

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

  test(."get all data of package", ({given, \"when", \"and", then}) => {
    let e1 = ref(Obj.magic(1))
    let e1FileStr = PackageManagerTool.buildEmptyExtensionFileStr()
    let e2 = ref(Obj.magic(1))
    let e2FileStr = PackageManagerTool.buildEmptyExtensionFileStr()
    let ct1 = ref(Obj.magic(1))
    let ct1FileStr = PackageManagerTool.buildEmptyContributeFileStr()
    let c1 = ref(Obj.magic(1))
    let c2 = ref(Obj.magic(1))
    let entryExtensions = ref(Obj.magic(1))
    let p1 = ref(Obj.magic(1))
    let p2 = ref(Obj.magic(1))
    let result = ref(Obj.magic(1))

    _prepare(given)

    given(
      "generate one extension as e1",
      () => {
        e1 :=
          ExtensionFileManagerTool.generateExtension(
            ~name="e1",
            ~protocol={
              name: "e1-protocol",
              version: "0.4.1",
            },
            ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            ~fileStr=e1FileStr,
            (),
          )
      },
    )

    \"and"(
      "generate one contribute as ct1",
      () => {
        ct1 :=
          ExtensionFileManagerTool.generateContribute(
            ~name="ct1",
            ~protocol={
              name: "ct1-protocol",
              version: "0.5.3",
            },
            ~fileStr=ct1FileStr,
            (),
          )
      },
    )

    \"and"(
      "mark e1 as entry",
      () => {
        entryExtensions := ["e1"]
      },
    )

    \"and"(
      "load them and convert as c1",
      () => {
        let e1FileData = Main.loadExtension(e1.contents)
        let ct1FileData = Main.loadContribute(ct1.contents)

        c1 :=
          Main.convertAllFileDataForPackage([e1FileData], [ct1FileData], entryExtensions.contents)
      },
    )

    given(
      "generate one extension as e2",
      () => {
        e2 :=
          ExtensionFileManagerTool.generateExtension(
            ~name="e2",
            ~protocol={
              name: "e2-protocol",
              version: "0.4.1",
            },
            ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            ~fileStr=e2FileStr,
            (),
          )
      },
    )

    \"and"(
      "mark e2 as entry",
      () => {
        entryExtensions := ["e2"]
      },
    )

    \"and"(
      "load it and convert as c2",
      () => {
        let e2FileData = Main.loadExtension(e2.contents)

        c2 := Main.convertAllFileDataForPackage([e2FileData], [], entryExtensions.contents)
      },
    )

    \"and"(
      "generate package p1 with c2",
      () => {
        p1 :=
          Main.generatePackage(
            c2.contents,
            [],
            AppManagerTool.buildPackageData(~packageName="p1", ()),
          )
      },
    )

    \"and"(
      "generate package p2 with c1, p1 and pacakge data as d1",
      () => {
        p2 :=
          Main.generatePackage(
            c1.contents,
            [p1.contents],
            AppManagerTool.buildPackageData(~packageName="p2", ()),
          )
      },
    )

    \"when"(
      "get all data of p2",
      () => {
        result := Main.getAllDataOfPackage(p2.contents)
      },
    )

    then(
      "should return e1, ct1, p1, d1 whose func data is binary file",
      () => {
        let (
          allExtensionFileData,
          allContributeFileData,
          allPackageBinaryFiles,
          packageData,
        ) = result.contents

        (
          allExtensionFileData[0]->Meta3dCommonlib.Tuple2.getLast->Main.getExtensionFuncDataStr,
          allContributeFileData[0]->Meta3dCommonlib.Tuple2.getLast->Main.getContributeFuncDataStr,
          allPackageBinaryFiles,
          packageData,
        )->expect ==
          (
            e1FileStr,
            ct1FileStr,
            [p1.contents],
            AppManagerTool.buildPackageData(~packageName="p2", ()),
          )
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
  //               dependentBlockProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  //               dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
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
  //               dependentBlockProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  //               dependentContributeProtocolNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
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
