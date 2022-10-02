open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/uiVisual.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  let _prepare = (given, \"and") => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()

      FileTool.buildFakeTextDecoder(FileTool.convertUint8ArrayToBuffer)
      FileTool.buildFakeTextEncoder(.)
    })
  }

  test(."show the canvas", ({given, \"when", \"and", then}) => {
    let useSelectorStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    given("prepare the canvas", () => {
      ()
    })

    \"and"("set its width, height", () => {
      useSelectorStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
          (CanvasControllerTool.buildCanvasData(~width=10, ~height=20, ()), list{}, list{}),
          _,
        )
    })

    \"when"("render", () => {
      ()
    })

    then("should show the canvas", () => {
      UIVisualTool.buildUI(
        ~sandbox,
        ~service=ServiceTool.build(~sandbox, ~useSelector=useSelectorStub.contents->Obj.magic, ()),
        (),
      )
      ->ReactTestRenderer.create
      ->ReactTestTool.createSnapshotAndMatch
    })
  })

  test(."init once", ({given, \"when", \"and", then}) => {
    let v = ref(Obj.magic(1))
    let e1 = ref(Obj.magic(1))
    let c1 = ref(Obj.magic(1))
    let selectedExtensions = ref(list{})
    let selectedContributes = ref(list{})
    let meta3dStateRef = ref(Obj.magic(1))
    let getAllPublishExtensionsStub = ref(Obj.magic(1))
    let useSelectorStub = ref(Obj.magic(1))
    let setIsLoadedStub = ref(Obj.magic(1))
    let setVisualExtensionDataStub = ref(Obj.magic(1))
    let setMeta3dStateFake = func => {
      meta3dStateRef := func()
    }

    _prepare(given, \"and")

    given("prepare flag", () => {
      UIVisualTool.prepareInitFlag()
      UIVisualTool.prepareUpdateFlag()
    })

    \"and"("generate visual extension v", () => {
      v :=
        Meta3d.Main.generateExtension(
          (
            {
              name: UIVisualTool.getVisualExtensionName(),
              protocol: {
                name: UIVisualTool.getVisualExtensionProtocolName(),
                version: UIVisualTool.getVisualExtensionProtocolVersion(),
              },
              dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            }: Meta3d.ExtensionFileType.extensionPackageData
          ),
          UIVisualTool.buildEmptyExtensionFileStrWithOnInitAndOnUpdate(1, 11),
        )
    })

    \"and"("publish v", () => {
      getAllPublishExtensionsStub.contents =
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
          Meta3dBsMost.Most.just([ExtensionTool.buildExtensionImplement(~file=v.contents, ())]),
          _,
        )
    })

    \"and"("generate extension e1", () => {
      e1 := ExtensionTool.generateExtension(~name="e1", ())->Meta3d.Main.loadExtension
    })
    \"and"("generate contribute c1", () => {
      c1 := ContributeTool.generateContribute(~name="c1", ())->Meta3d.Main.loadContribute
    })

    \"and"("select e1", () => {
      let name = "e1"

      selectedExtensions :=
        list{
          SelectedExtensionsTool.buildSelectedExtension(
            ~name,
            ~newName=None,
            ~id=name,
            ~data=e1.contents,
            (),
          ),
        }
    })

    \"and"("select c1", () => {
      let name = "c1"

      selectedContributes :=
        list{
          SelectedContributesTool.buildSelectedContribute(
            ~name,
            ~newName=None,
            ~id=name,
            ~data=c1.contents,
            (),
          ),
        }
    })

    CucumberAsync.execStep(\"when", "init once", () => {
      setIsLoadedStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
      setVisualExtensionDataStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      let initData = Obj.magic(1)

      UIVisualTool.initOnce(
        ServiceTool.build(
          ~sandbox,
          ~getAllPublishExtensions=getAllPublishExtensionsStub.contents,
          ~generateApp=Meta3d.Main.generateApp->Obj.magic,
          ~convertAllFileData=Meta3d.Main.convertAllFileDataForApp->Obj.magic,
          ~loadApp=Meta3d.Main.loadApp->Obj.magic,
          ~initExtension=(. meta3dState, extensionName, data) =>
            Meta3d.Main.initExtension(meta3dState, extensionName, data),
          ~updateExtension=(. meta3dState, extensionName, data) =>
            Meta3d.Main.updateExtension(meta3dState, extensionName, data),
          (),
        ),
        (
          setIsLoadedStub.contents->Obj.magic,
          setVisualExtensionDataStub.contents->Obj.magic,
          setMeta3dStateFake->Obj.magic,
        ),
        (selectedExtensions.contents, selectedContributes.contents),
        initData,
      )
    })

    // CucumberAsync.execStep(\"and", "init app", () => {
    //   meta3dStateRef.contents
    //   ->UIVisualTool.initApp(
    //     ServiceTool.build(
    //       ~sandbox,
    //       ~initExtension=(. meta3dState, extensionName, data) =>
    //         Meta3d.Main.initExtension(meta3dState, extensionName, data),
    //       (),
    //     ),
    //     Obj.magic(1),
    //   )
    //   ->Js.Promise.then_(meta3dState => {
    //     meta3dStateRef := meta3dState

    //     Js.Promise.resolve()
    //   }, _)
    // })

    // CucumberAsync.execStep(\"and", "update app", () => {
    //   meta3dStateRef.contents->UIVisualTool.updateApp(
    //     ServiceTool.build(
    //       ~sandbox,
    //       ~updateExtension=(. meta3dState, extensionName, data) =>
    //         Meta3d.Main.updateExtension(meta3dState, extensionName, data),
    //       (),
    //     ),
    //     Obj.magic(2),
    //   )
    // })

    then("get and load v as v_1", () => {
      getAllPublishExtensionsStub.contents->getCallCount->expect == 1
    })

    \"and"("build app with e1, v_1 and c1", () => {
      ()
    })

    \"and"("set the v_1", () => {
      let {
        extensionPackageData,
      }: Meta3d.ExtensionFileType.extensionFileData = ReactHookTool.getValue(
        ~setLocalValueStub=setVisualExtensionDataStub.contents,
        (),
      )

      extensionPackageData->expect ==
        ExtensionTool.buildExtensionPackageData(
          ~name=UIVisualTool.getVisualExtensionName(),
          ~protocol={
            name: UIVisualTool.getVisualExtensionProtocolName(),
            version: UIVisualTool.getVisualExtensionProtocolVersion(),
          },
          (),
        )
    })

    \"and"("mark is load", () => {
      (
        setIsLoadedStub.contents->getCallCount,
        ReactHookTool.getValue(~setLocalValueStub=setIsLoadedStub.contents, ()),
      )->expect == (1, true)
    })

    \"and"("v should be inited and updated", () => {
      (UIVisualTool.getInitFlag(), UIVisualTool.getUpdateFlag())->expect == (1, 11)
    })
  })
})
