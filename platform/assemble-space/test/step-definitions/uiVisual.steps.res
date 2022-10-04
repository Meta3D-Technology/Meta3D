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

  test(."if not loaded, show loading", ({given, \"when", \"and", then}) => {
    _prepare(given, \"and")

    \"when"("not loaded and render", () => {
      ()
    })

    then("should show loading", () => {
      let useSelectorStub =
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
          (CanvasControllerTool.buildCanvasData(), list{}, list{}, None),
          _,
        )

      UIVisualTool.buildUI(
        ~sandbox,
        ~service=ServiceTool.build(~sandbox, ~useSelector=useSelectorStub, ()),
        (),
      )
      ->ReactTestRenderer.create
      ->ReactTestTool.createSnapshotAndMatch
    })
  })

  test(."if loaded, show the canvas", ({given, \"when", \"and", then}) => {
    let useSelectorStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    given("prepare the canvas", () => {
      ()
    })

    \"and"("set its width, height", () => {
      useSelectorStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
          (
            (CanvasControllerTool.buildCanvasData(~width=10, ~height=20, ()), list{}, list{}),
            (list{}, list{}, Some(Obj.magic(1)), None),
          ),
          _,
        )
    })

    \"when"("loaded and render", () => {
      ()
    })

    then("should show the canvas", () => {
      let useStateStub = createEmptyStub(refJsObjToSandbox(sandbox.contents))
      useStateStub->onCall(0, _)->returns((true, _ => true), _)->ignore

      UIVisualTool.buildUI(
        ~sandbox,
        ~service=ServiceTool.build(
          ~sandbox,
          ~useState=useStateStub->Obj.magic,
          ~useSelector=useSelectorStub.contents->Obj.magic,
          (),
        ),
        (),
      )
      ->ReactTestRenderer.create
      ->ReactTestTool.createSnapshotAndMatch
    })
  })

  test(."get and set visual extension", ({given, \"when", \"and", then}) => {
    let v1 = ref(Obj.magic(1))
    let v2 = ref(Obj.magic(1))
    let getAllPublishExtensionsStub = ref(Obj.magic(1))
    let useSelectorStub = ref(Obj.magic(1))
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    given("generate visual extension v1 with old version", () => {
      v1 :=
        Meta3d.Main.generateExtension(
          (
            {
              name: "v1",
              protocol: {
                name: UIVisualTool.getVisualExtensionProtocolName(),
                version: "0.5.0",
              },
              dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            }: Meta3d.ExtensionFileType.extensionPackageData
          ),
          "",
        )
    })

    given("generate visual extension v2 with newest version", () => {
      v2 :=
        Meta3d.Main.generateExtension(
          (
            {
              name: "v2",
              protocol: {
                name: UIVisualTool.getVisualExtensionProtocolName(),
                version: UIVisualTool.getVisualExtensionProtocolVersion(),
              },
              dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
              dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
            }: Meta3d.ExtensionFileType.extensionPackageData
          ),
          "",
        )
    })

    \"and"("publish v1, v2", () => {
      getAllPublishExtensionsStub.contents =
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
          Meta3dBsMost.Most.just([
            ExtensionTool.buildExtensionImplement(~file=v1.contents, ~version="0.5.0", ()),
            ExtensionTool.buildExtensionImplement(
              ~file=v2.contents,
              ~version=UIVisualTool.getVisualExtensionVersion(),
              (),
            ),
          ]),
          _,
        )
    })

    CucumberAsync.execStep(\"when", "get and set visual extension", () => {
      dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      let initData = Obj.magic(1)

      UIVisualTool.getAndSetVisualExtension(
        ServiceTool.build(
          ~sandbox,
          ~getAllPublishExtensions=getAllPublishExtensionsStub.contents,
          (),
        ),
        dispatchStub.contents,
      )
    })

    then("should dispatch SetVisualExtension action with v2", () => {
      dispatchStub.contents
      ->Obj.magic
      ->SinonTool.calledWith(
        FrontendUtils.UIViewStoreType.SetVisualExtension({
          id: "",
          protocolIconBase64: "",
          newName: UIVisualTool.getVisualExtensionName()->Some,
          isStart: false,
          data: {
            extensionPackageData: ExtensionTool.buildExtensionPackageData(
              ~name="v2",
              ~protocol={
                name: UIVisualTool.getVisualExtensionProtocolName(),
                version: UIVisualTool.getVisualExtensionProtocolVersion(),
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

  test(."render app", ({given, \"when", \"and", then}) => {
    let element1 = ref(Obj.magic(1))
    let v = ref(Obj.magic(1))
    let ui = ref(Obj.magic(1))
    let c1 = ref(Obj.magic(1))
    let selectedExtensions = ref(list{})
    let selectedContributes = ref(list{})
    let useSelectorStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    given("prepare flag", () => {
      UIVisualTool.prepareInitFlag()
      UIVisualTool.prepareUpdateFlag()
    })

    \"and"("generate empty element contribute element1", () => {
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

    \"and"("get visual extension v", () => {
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
        )->UIVisualTool.loadAndBuildVisualExtension
    })

    \"and"("generate extension ui", () => {
      // ui := ExtensionTool.generateExtension(~name="ui", ())->Meta3d.Main.loadExtension
      ui :=
        ExtensionTool.generateExtension(
          ~name="meta3d-ui",
          ~protocolName="meta3d-ui-protocol",
          ~protocolVersion="^0.5.0",
          (),
        )->Meta3d.Main.loadExtension
    })
    \"and"("generate contribute c1", () => {
      c1 := ContributeTool.generateContribute(~name="c1", ())->Meta3d.Main.loadContribute
    })

    \"and"("select ui", () => {
      let name = "meta3d-ui"

      selectedExtensions :=
        list{
          SelectedExtensionsTool.buildSelectedExtension(
            ~name,
            ~newName=None,
            ~id=name,
            ~data=ui.contents,
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

    CucumberAsync.execStep(\"when", "render app with ui, c1, v", () => {
      let initData = Obj.magic(1)

      UIVisualTool.renderApp(
        ServiceTool.build(
          ~sandbox,
          ~generateApp=Meta3d.Main.generateApp->Obj.magic,
          ~convertAllFileData=Meta3d.Main.convertAllFileDataForApp->Obj.magic,
          ~loadApp=Meta3d.Main.loadApp->Obj.magic,
          ~initExtension=(. meta3dState, extensionName, data) =>
            Meta3d.Main.initExtension(meta3dState, extensionName, data),
          ~updateExtension=(. meta3dState, extensionName, data) =>
            Meta3d.Main.updateExtension(meta3dState, extensionName, data),
          (),
        ),
        (selectedExtensions.contents, selectedContributes.contents),
        initData,
        (v.contents, element1.contents),
      )
    })

    \"and"("build app with ui, v and c1", () => {
      ()
    })

    \"and"("v should be inited and updated", () => {
      (UIVisualTool.getInitFlag(), UIVisualTool.getUpdateFlag())->expect == (1, 11)
    })
  })

  test(."build element middle represent with two buttons generate element contribute string", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let b1 = ref(Obj.magic(1))
    let b2 = ref(Obj.magic(1))
    let mr = ref(Obj.magic(1))
    let str = ref(Obj.magic(1))
    let selectedUIControls = ref(list{})
    let selectedUIControlInspectorData = ref(list{})

    _prepare(given, \"and")

    given("generate ui control button b1, b2", () => {
      let buttonProtocol: Meta3d.ExtensionFileType.contributeProtocolData = {
        name: "meta3d-ui-control-button-protocol",
        version: "0.5.0",
      }

      b1 :=
        ContributeTool.buildContributeData(
          ~contributePackageData=ContributeTool.buildContributePackageData(
            ~protocol=buttonProtocol,
            (),
          ),
          (),
        )
      b2 :=
        ContributeTool.buildContributeData(
          ~contributePackageData=ContributeTool.buildContributePackageData(
            ~protocol=buttonProtocol,
            (),
          ),
          (),
        )
    })

    \"and"("select b1, b2", () => {
      selectedUIControls :=
        list{
          SelectedUIControlsTool.buildSelectedUIControl(
            // ~name,
            // ~newName=None,
            ~id="b1",
            ~data=b1.contents,
            (),
          ),
          SelectedUIControlsTool.buildSelectedUIControl(~id="b2", ~data=b2.contents, ()),
        }
    })

    \"and"("prepare b1's, b2's inspector data", () => {
      selectedUIControlInspectorData :=
        list{
          UIControlInspectorTool.buildSelectedUIControlInspectorData(~id="b1", ~x=1, ()),
          UIControlInspectorTool.buildSelectedUIControlInspectorData(~id="b2", ~x=2, ()),
        }
    })

    \"when"("build element middle represent with b1, b2 and their inspector data", () => {
      mr :=
        UIVisualTool.buildElementMR(
          selectedUIControls.contents->Meta3dCommonlib.ListSt.toArray,
          selectedUIControlInspectorData.contents->Meta3dCommonlib.ListSt.toArray,
        )
    })

    \"and"("generate element contribute string", () => {
      str := UIVisualTool.generateElementContributeFileStr(mr.contents)
    })

    then("should build correct result", () => {
      mr.contents->expect ==
        (
          {
            meta: {
              elementName: "UIViewElement",
              execOrder: 0,
            },
            body: [
              {
                protocol: {
                  name: "meta3d-ui-control-button-protocol",
                  version: "0.5.0",
                },
                data: selectedUIControlInspectorData.contents
                ->Meta3dCommonlib.ListSt.head
                ->Meta3dCommonlib.OptionSt.getExn,
              },
              {
                protocol: {
                  name: "meta3d-ui-control-button-protocol",
                  version: "0.5.0",
                },
                data: selectedUIControlInspectorData.contents
                ->Meta3dCommonlib.ListSt.getLast
                ->Meta3dCommonlib.OptionSt.getExn,
              },
            ],
          }: ElementMRUtils.elementMR
        )
    })

    \"and"("generate correct result", () => {
      str.contents->expect == "\nwindow.Contribute = {\n    getContribute: (api, [dependentExtensionNameMap, _]) => {\n        let { meta3dUIExtensionName } = dependentExtensionNameMap\n\n        return {\n            elementName:\"UIViewElement\",\n            execOrder: 0,\n            elementState: null,\n            elementFunc: (meta3dState, elementState) => {\n                let { getUIControl } = api.getExtensionService(meta3dState, meta3dUIExtensionName)\n\n                let uiState = api.getExtensionState(meta3dState, meta3dUIExtensionName)\n\n    let Button = getUIControl(uiState,\"Button\")\n    \n                let data = null\n  \n                data = Button(meta3dState,\n                    \n  {\n    rect: {\"x\":1,\"y\":0,\"width\":0,\"height\":0}\n  }\n  )\n                meta3dState = data[0]\n    \n                data = Button(meta3dState,\n                    \n  {\n    rect: {\"x\":2,\"y\":0,\"width\":0,\"height\":0}\n  }\n  )\n                meta3dState = data[0]\n    \n  return new Promise((resolve) => {\n                    resolve(meta3dState)\n                })\n  \n            }\n        }\n    }\n}\n  "
    })
  })
})
