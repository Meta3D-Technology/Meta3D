open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/runUIVisualController.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))
  let isDebug = true

  let _prepare = (given, \"and") => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()

      FileTool.buildFakeTextDecoder(FileTool.convertUint8ArrayToBuffer)
      FileTool.buildFakeTextEncoder(.)
    })
  }

  test(."if data not ready, show waiting", ({given, \"when", \"and", then}) => {
    _prepare(given, \"and")

    \"when"("data not ready and render", () => {
      ()
    })

    then("should show waiting", () => {
      let useSelectorStub =
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
          (isDebug, (CanvasControllerTool.buildCanvasData(), list{}, list{}), (None, None)),
          _,
        )

      RunUIVisualControllerTool.buildUI(
        ~sandbox,
        ~service=ServiceTool.build(~sandbox, ~useSelector=useSelectorStub, ()),
        (),
      )
      ->ReactTestRenderer.create
      ->ReactTestTool.createSnapshotAndMatch
    })
  })

  test(."if data ready, show run button", ({given, \"when", \"and", then}) => {
    let useSelectorStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    given("prepare runVisualExtension, elementContribute", () => {
      useSelectorStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
          (
            isDebug,
            (CanvasControllerTool.buildCanvasData(), list{}, list{}),
            (Some(Obj.magic(1)), Some(Obj.magic(1))),
          ),
          _,
        )
    })

    \"when"("render", () => {
      ()
    })

    then("should show run button", () => {
      RunUIVisualControllerTool.buildUI(
        ~sandbox,
        ~service=ServiceTool.build(~sandbox, ~useSelector=useSelectorStub.contents->Obj.magic, ()),
        (),
      )
      ->ReactTestRenderer.create
      ->ReactTestTool.createSnapshotAndMatch
    })
  })

  test(."get and set newest run visual extension", ({given, \"when", \"and", then}) => {
    let name = RunUIVisualControllerTool.getVisualExtensionName()
    let v1 = ref(Obj.magic(1))
    let v2 = ref(Obj.magic(1))
    let getAllPublishNewestExtensionsStub = ref(Obj.magic(1))
    let useSelectorStub = ref(Obj.magic(1))
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    given("generate run visual extension v1 with old version", () => {
      v1 :=
        Meta3d.Main.generateExtension(
          (
            {
              name: name,
              protocol: {
                name: RunUIVisualControllerTool.getVisualExtensionProtocolName(),
                version: "0.4.0",
              },
              dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            }: Meta3d.ExtensionFileType.extensionPackageData
          ),
          "",
        )
    })

    given("generate run visual extension v2 with newest version", () => {
      v2 :=
        Meta3d.Main.generateExtension(
          (
            {
              name: name,
              protocol: {
                name: RunUIVisualControllerTool.getVisualExtensionProtocolName(),
                version: "0.4.1",
              },
              dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            }: Meta3d.ExtensionFileType.extensionPackageData
          ),
          "",
        )
    })

    \"and"("publish v1, v2", () => {
      getAllPublishNewestExtensionsStub.contents =
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
          Meta3dBsMost.Most.just([
            ExtensionTool.buildExtensionImplement(~file=v1.contents, ~version="0.4.0", ()),
            ExtensionTool.buildExtensionImplement(~file=v2.contents, ~version="0.4.1", ()),
          ]),
          _,
        )
    })

    CucumberAsync.execStep(\"when", "get and set newest run visual extension", () => {
      dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      let initData = Obj.magic(1)

      RunUIVisualControllerTool.getAndSetNewestVisualExtension(
        ServiceTool.build(
          ~sandbox,
          ~loadExtension=Meta3d.Main.loadExtension->Obj.magic,
          ~getAllPublishNewestExtensions=getAllPublishNewestExtensionsStub.contents,
          (),
        ),
        dispatchStub.contents,
        isDebug,
      )
    })

    then("should dispatch SetRunVisualExtension action with v2", () => {
      dispatchStub.contents
      ->Obj.magic
      ->SinonTool.calledWith(
        FrontendUtils.UIViewStoreType.SetRunVisualExtension({
          id: "",
          protocolIconBase64: "",
          newName: RunUIVisualControllerTool.getVisualExtensionName()->Some,
          isStart: false,
          data: {
            extensionPackageData: ExtensionTool.buildExtensionPackageData(
              ~name,
              ~protocol={
                name: RunUIVisualControllerTool.getVisualExtensionProtocolName(),
                version: "0.4.1",
              },
              (),
            ),
            extensionFuncData: matchAny,
          },
        }),
      )
      ->expect == true
    })
  })

  test(."run", ({given, \"when", \"and", then}) => {
    let element1 = ref(Obj.magic(1))
    let v = ref(Obj.magic(1))
    let db = Obj.magic(11)
    let selectedExtensions = ref(list{})
    let selectedContributes = ref(list{})
    let canvasData = ref(Obj.magic(1))
    let useSelectorStub = ref(Obj.magic(1))
    let initForUIVisualAppStub = ref(Obj.magic(1))
    let setUIVisualAppStub = ref(Obj.magic(1))
    let openUrlStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    given("generate empty element contribute element1", () => {
      element1 :=
        UIVisualTool.generateElementContribute(
          ServiceTool.build(
            ~sandbox,
            ~generateContribute=Meta3d.Main.generateContribute->Obj.magic,
            ~loadContribute=Meta3d.Main.loadContribute->Obj.magic,
            (),
          ),
          UIVisualTool.buildEmptyContributeFileStr(),
        )
    })

    \"and"("get run visual extension v", () => {
      v :=
        Meta3d.Main.generateExtension(
          (
            {
              name: RunUIVisualControllerTool.getVisualExtensionName(),
              protocol: {
                name: RunUIVisualControllerTool.getVisualExtensionProtocolName(),
                version: "0.4.1",
              },
              dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            }: Meta3d.ExtensionFileType.extensionPackageData
          ),
          UIVisualTool.buildEmptyExtensionFileStr(),
        )->RunUIVisualControllerTool.loadAndBuildVisualExtension(
          ServiceTool.build(~sandbox, ~loadExtension=Meta3d.Main.loadExtension->Obj.magic, ()),
          _,
        )
    })

    \"and"("prepare canvas data", () => {
      canvasData := CanvasControllerTool.buildCanvasData(~width=1, ~height=2, ())
    })

    \"and"("prepare local storage", () => {
      initForUIVisualAppStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(Meta3dBsMost.Most.just(db), _)

      setUIVisualAppStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(Meta3dBsMost.Most.just(db), _)
    })

    \"and"("prepare open", () => {
      openUrlStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
    })

    CucumberAsync.execStep(\"when", "run", () => {
      let initData = Obj.magic(1)

      RunUIVisualControllerTool.run(
        ServiceTool.build(
          ~sandbox,
          ~openUrl=openUrlStub.contents->Obj.magic,
          ~initForUIVisualApp=initForUIVisualAppStub.contents->Obj.magic,
          ~setUIVisualApp=setUIVisualAppStub.contents->Obj.magic,
          ~generateApp=Meta3d.Main.generateApp->Obj.magic,
          (),
        ),
        (
          (canvasData.contents, selectedExtensions.contents, selectedContributes.contents),
          (v.contents, element1.contents),
        ),
      )
    })

    \"and"("generate app", () => {
      ()
    })

    \"and"("save app to local storage", () => {
      setUIVisualAppStub.contents
      ->Obj.magic
      ->SinonTool.calledWithArg2(db->Meta3dBsMost.Most.just, matchAny)
      ->expect == true
    })

    \"and"("open link with canvas data to run", () => {
      openUrlStub.contents
      ->SinonTool.calledWith(
        j`RunUIVisual?canvasData=${canvasData.contents->Obj.magic->Js.Json.stringify}`,
      )
      ->expect == true
    })
  })
})
