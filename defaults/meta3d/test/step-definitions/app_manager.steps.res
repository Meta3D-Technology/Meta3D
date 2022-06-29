open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/app_manager.feature")

defineFeature(feature, test => {
  let _prepare = given => {
    given("prepare", () => {
      FileTool.buildFakeTextDecoder(FileTool.convertUint8ArrayToBuffer)
      FileTool.buildFakeTextEncoder(.)
    })
  }

  test(."version not match case1", ({given, \"when", \"and", then}) => {
    let firstExtension = ref(Obj.magic(1))
    let secondExtension = ref(Obj.magic(1))
    let firstExtensionFileData = ref(Obj.magic(1))
    let secondExtensionFileData = ref(Obj.magic(1))
    let allExtensionNewNames = ref(Obj.magic(1))

    _prepare(given)

    given("generate two extensions that version not match", () => {
      firstExtension :=
        Main.generateExtension(
          (
            {
              name: "first-extension",
              protocol: {
                name: "first-extension-protocol",
                version: "0.3.0",
              },
              dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                "second-extension",
                (
                  {
                    protocolName: "second-extension-protocol",
                    protocolVersion: ">=0.4.0 < 1.0.0",
                  }: ExtensionFileType.dependentData
                ),
              ),
              dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
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
              dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            }: ExtensionFileType.extensionPackageData
          ),
          AppManagerTool.buildEmptyExtensionFileStrWithOnStart(2),
        )
    })

    \"and"("prepare new names", () => {
      allExtensionNewNames := ["first-extension", "second-extension"]
    })

    \"and"("load them as l1", () => {
      firstExtensionFileData := Main.loadExtension(firstExtension.contents)
      secondExtensionFileData := Main.loadExtension(secondExtension.contents)
    })

    \"when"("convert l1", () => {
      ()
    })

    then("error", () => {
      expect(() => {
        Main.convertAllFileDataForApp(
          [firstExtensionFileData.contents, secondExtensionFileData.contents],
          [],
          (allExtensionNewNames.contents, [], []),
        )
      })->toThrowMessage("version not match")
    })
  })

  test(."version not match case2", ({given, \"when", \"and", then}) => {
    let firstExtension = ref(Obj.magic(1))
    let firstContribute = ref(Obj.magic(1))
    let firstExtensionFileData = ref(Obj.magic(1))
    let firstContributeFileData = ref(Obj.magic(1))
    let allExtensionNewNames = ref(Obj.magic(1))
    let allContributeNewNames = ref(Obj.magic(1))

    _prepare(given)

    given("generate one extension", () => {
      firstExtension :=
        Main.generateExtension(
          (
            {
              name: "first-extension",
              protocol: {
                name: "first-extension-protocol",
                version: "0.3.0",
              },
              dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                "first-contribute",
                (
                  {
                    protocolName: "first-contribute-protocol",
                    protocolVersion: ">=0.4.0 < 1.0.0",
                  }: ExtensionFileType.dependentData
                ),
              ),
            }: ExtensionFileType.extensionPackageData
          ),
          AppManagerTool.buildEmptyExtensionFileStrWithOnStart(1),
        )
    })

    \"and"("generate one contribute that version not match", () => {
      firstContribute :=
        Main.generateContribute(
          (
            {
              name: "first-contribute",
              protocol: {
                name: "first-contribute-protocol",
                version: ">=0.1.0 < 0.5.0",
              },
              dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            }: ExtensionFileType.contributePackageData
          ),
          AppManagerTool.buildEmptyContributeFileStr(),
        )
    })

    \"and"("prepare new names", () => {
      allExtensionNewNames := ["first-extension"]
      allContributeNewNames := ["first-contribute"]
    })

    \"and"("load them as l1", () => {
      firstExtensionFileData := Main.loadExtension(firstExtension.contents)
      firstContributeFileData := Main.loadContribute(firstContribute.contents)
    })

    \"when"("convert l1", () => {
      ()
    })

    then("error", () => {
      expect(() => {
        Main.convertAllFileDataForApp(
          [firstExtensionFileData.contents],
          [firstContributeFileData.contents],
          (allExtensionNewNames.contents, [], allContributeNewNames.contents),
        )
      })->toThrowMessage("version not match")
    })
  })

  test(."version match case1", ({given, \"when", \"and", then}) => {
    let firstExtension = ref(Obj.magic(1))
    let firstContribute = ref(Obj.magic(1))
    let firstExtensionFileData = ref(Obj.magic(1))
    let firstContributeFileData = ref(Obj.magic(1))
    let allExtensionNewNames = ref(Obj.magic(1))
    let allContributeNewNames = ref(Obj.magic(1))

    _prepare(given)

    given("generate one extension", () => {
      firstExtension :=
        Main.generateExtension(
          (
            {
              name: "first-extension",
              protocol: {
                name: "first-extension-protocol",
                version: "0.3.0",
              },
              dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                "first-contribute",
                (
                  {
                    protocolName: "first-contribute-protocol",
                    protocolVersion: "^0.3.0",
                  }: ExtensionFileType.dependentData
                ),
              ),
            }: ExtensionFileType.extensionPackageData
          ),
          AppManagerTool.buildEmptyExtensionFileStrWithOnStart(1),
        )
    })

    \"and"("generate one contribute that version match", () => {
      firstContribute :=
        Main.generateContribute(
          (
            {
              name: "first-contribute",
              protocol: {
                name: "first-contribute-protocol",
                version: "^0.3.0",
              },
              dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            }: ExtensionFileType.contributePackageData
          ),
          AppManagerTool.buildEmptyContributeFileStr(),
        )
    })

    \"and"("prepare new names", () => {
      allExtensionNewNames := ["first-extension"]
      allContributeNewNames := ["first-contribute"]
    })

    \"and"("load them as l1", () => {
      firstExtensionFileData := Main.loadExtension(firstExtension.contents)
      firstContributeFileData := Main.loadContribute(firstContribute.contents)
    })

    \"when"("convert l1", () => {
      ()
    })

    then("not error", () => {
      expect(() => {
        Main.convertAllFileDataForApp(
          [firstExtensionFileData.contents],
          [firstContributeFileData.contents],
          (allExtensionNewNames.contents, [], allContributeNewNames.contents),
        )
      })->toNotThrow
    })
  })

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
    let allExtensionNewNames = ref(Obj.magic(1))
    let allContributeNewNames = ref(Obj.magic(1))
    let isStartedExtensions = ref(Obj.magic(1))

    _prepare(given)

    given("generate two extensions that the seond is started", () => {
      firstExtension :=
        Main.generateExtension(
          (
            {
              name: "first-extension",
              protocol: {
                name: "first-extension-protocol",
                version: "0.3.0",
              },
              dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                "second-extension",
                (
                  {
                    protocolName: "second-extension-protocol",
                    protocolVersion: ">=0.4.0 < 1.0.0",
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
          AppManagerTool.buildEmptyExtensionFileStrWithOnStart(2),
        )

      isStartedExtensions := ["second-extension"]
    })

    \"and"("generate one contribute", () => {
      firstContribute :=
        Main.generateContribute(
          (
            {
              name: "first-contribute",
              protocol: {
                name: "first-contribute-protocol",
                version: "0.5.3",
              },
              dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            }: ExtensionFileType.contributePackageData
          ),
          AppManagerTool.buildEmptyContributeFileStr(),
        )
    })

    \"and"("prepare new names", () => {
      allExtensionNewNames := ["first-new-extension", "second-extension"]
      allContributeNewNames := ["first-new-contribute"]
    })

    \"and"("load them as l1", () => {
      firstExtensionFileData := Main.loadExtension(firstExtension.contents)
      secondExtensionFileData := Main.loadExtension(secondExtension.contents)
      firstContributeFileData := Main.loadContribute(firstContribute.contents)
    })

    \"when"("convert l1", () => {
      ()
    })

    then("converted package data is correct", () => {
      let (allExtensionFileData, allContributeFileData) = Main.convertAllFileDataForApp(
        [firstExtensionFileData.contents, secondExtensionFileData.contents],
        [firstContributeFileData.contents],
        (
          allExtensionNewNames.contents,
          isStartedExtensions.contents,
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
                name: "first-new-extension",
                isStart: false,
                dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                  "second-extension",
                  "second-extension",
                ),
                dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                  "first-contribute",
                  "first-new-contribute",
                ),
              }: AppFileType.extensionPackageData
            ),
            (
              {
                name: "second-extension",
                isStart: true,
                dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                  "first-contribute",
                  "first-new-contribute",
                ),
              }: AppFileType.extensionPackageData
            ),
          ],
          [
            (
              {
                name: "first-new-contribute",
                dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
                dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              }: AppFileType.contributePackageData
            ),
          ],
        )
    })
  })

  test(."load generated app", ({given, \"when", \"and", then}) => {
    let firstExtension = ref(Obj.magic(1))
    let secondExtension = ref(Obj.magic(1))
    let firstContribute = ref(Obj.magic(1))
    let c1 = ref(Obj.magic(1))
    let allExtensionNewNames = ref(Obj.magic(1))
    let allContributeNewNames = ref(Obj.magic(1))
    let isStartedExtensions = ref(Obj.magic(1))
    let state = ref(Obj.magic(1))

    _prepare(given)

    given("prepare flag", () => {
      AppManagerTool.prepareFlag()
    })

    \"and"("generate two extensions", () => {
      firstExtension :=
        Main.generateExtension(
          (
            {
              name: "first-extension",
              protocol: {
                name: "first-extension-protocol",
                version: "0.3.0",
              },
              dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
                "second-extension",
                (
                  {
                    protocolName: "second-extension-protocol",
                    protocolVersion: ">=0.4.0 < 1.0.0",
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
          AppManagerTool.buildEmptyExtensionFileStrWithOnStart(2),
        )
    })

    \"and"("generate one contribute", () => {
      firstContribute :=
        Main.generateContribute(
          (
            {
              name: "first-contribute",
              protocol: {
                name: "first-contribute-protocol",
                version: "0.5.3",
              },
              dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            }: ExtensionFileType.contributePackageData
          ),
          AppManagerTool.buildEmptyContributeFileStr(),
        )
    })

    \"and"("prepare new names and start the second extension", () => {
      allExtensionNewNames := ["first-extension", "second-new-extension"]
      allContributeNewNames := ["first-new-contribute"]

      isStartedExtensions := ["second-new-extension"]
    })

    \"and"("load them and convert as c1", () => {
      let firstExtensionFileData = Main.loadExtension(firstExtension.contents)
      let secondExtensionFileData = Main.loadExtension(secondExtension.contents)
      let firstContributeFileData = Main.loadContribute(firstContribute.contents)

      c1 :=
        Main.convertAllFileDataForApp(
          [firstExtensionFileData, secondExtensionFileData],
          [firstContributeFileData],
          (
            allExtensionNewNames.contents,
            isStartedExtensions.contents,
            allContributeNewNames.contents,
          ),
        )
    })

    \"when"("generate app with c1 and load it", () => {
      state := Main.generateApp(c1.contents)->Main.loadApp
    })

    then("the two extensions should be registered", () => {
      (
        ExtensionManagerTool.hasExtension(state.contents, "first-extension"),
        ExtensionManagerTool.hasExtension(state.contents, "second-new-extension"),
      )->expect == (true, true)
    })

    \"and"("the one contribute should be registered", () => {
      ExtensionManagerTool.hasContribute(state.contents, "first-new-contribute")->expect == true
    })

    \"and"("the second extension should be started", () => {
      AppManagerTool.getFlag()->expect == 2
    })
  })
})
