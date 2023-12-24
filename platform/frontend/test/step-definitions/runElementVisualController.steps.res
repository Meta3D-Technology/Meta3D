open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/runElementVisualController.feature")

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

  test(."if data not ready, show waiting", ({given, \"when", \"and", then}) => {
    _prepare(given, \"and")

    \"when"(
      "data not ready and render",
      () => {
        ()
      },
    )

    then(
      "should show waiting",
      () => {
        let useAllSelectorStub =
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
            (
              (
                (
                  CanvasControllerTool.buildCanvasData(),
                  list{},
                  list{},
                  ApInspectorTool.buildApInspectorData(),
                ),
                (None, None),
              ),
              EventTool.buildEventEmitter(),
            ),
            _,
          )

        RunElementVisualControllerTool.buildUI(
          ~sandbox,
          ~service=ServiceTool.build(~sandbox, ~useAllSelector=useAllSelectorStub, ()),
          (),
        )
        ->ReactTestRenderer.create
        ->ReactTestTool.createSnapshotAndMatch
      },
    )
  })

  test(."if data ready, show run button", ({given, \"when", \"and", then}) => {
    let useAllSelectorStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    given(
      "prepare runVisualExtension, elementContribute",
      () => {
        useAllSelectorStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
            (
              (
                (
                  CanvasControllerTool.buildCanvasData(),
                  list{},
                  list{},
                  ApInspectorTool.buildApInspectorData(),
                ),
                (Some(Obj.magic(1)), Some(Obj.magic(1))),
              ),
              EventTool.buildEventEmitter(),
            ),
            _,
          )
      },
    )

    \"when"(
      "render",
      () => {
        ()
      },
    )

    then(
      "should show run button",
      () => {
        RunElementVisualControllerTool.buildUI(
          ~sandbox,
          ~service=ServiceTool.build(
            ~sandbox,
            ~useAllSelector=useAllSelectorStub.contents->Obj.magic,
            (),
          ),
          (),
        )
        ->ReactTestRenderer.create
        ->ReactTestTool.createSnapshotAndMatch
      },
    )
  })

  //   test(."get and set newest run visual extension", ({given, \"when", \"and", then}) => {
  //     let name = RunElementVisualControllerTool.getVisualExtensionName()
  //     let v1 = ref(Obj.magic(1))
  //     let v2 = ref(Obj.magic(1))
  //     let isDebug = true
  //     let getAllPublishNewestExtensionsStub = ref(Obj.magic(1))
  //     let useAllSelectorStub = ref(Obj.magic(1))
  //     let dispatchStub = ref(Obj.magic(1))

  //     _prepare(given, \"and")

  //     given(
  //       "generate run visual extension v1 with old version",
  //       () => {
  //         v1 :=
  //           Meta3dTool.generateExtension(
  //             ~name,
  //             ~protocol={
  //               name: RunElementVisualControllerTool.getVisualExtensionProtocolName(),
  //               version: "0.4.0",
  //             },
  //             ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  //             (),
  //           )
  //       },
  //     )

  //     given(
  //       "generate run visual extension v2 with newest version",
  //       () => {
  //         v2 :=
  //           Meta3dTool.generateExtension(
  //             ~name,
  //             ~protocol={
  //               name: RunElementVisualControllerTool.getVisualExtensionProtocolName(),
  //               version: "0.4.1",
  //             },
  //             ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  //             (),
  //           )
  //       },
  //     )

  //     \"and"(
  //       "publish v1, v2",
  //       () => {
  //         getAllPublishNewestExtensionsStub.contents =
  //           createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
  //             Meta3dBsMostDefault.Most.just([
  //               ExtensionTool.buildExtensionImplement(~file=v1.contents, ~version="0.4.0", ()),
  //               ExtensionTool.buildExtensionImplement(~file=v2.contents, ~version="0.4.1", ()),
  //             ]),
  //             _,
  //           )
  //       },
  //     )

  //     CucumberAsync.execStep(
  //       \"when",
  //       "get and set newest run visual extension",
  //       () => {
  //         dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

  //         // let initData = Obj.magic(1)

  //         RunElementVisualControllerTool.getAndSetNewestVisualExtension(
  //           ServiceTool.build(
  //             ~sandbox,
  //             ~loadExtension=Meta3d.Main.loadExtension->Obj.magic,
  //             ~getAllPublishNewestExtensions=getAllPublishNewestExtensionsStub.contents,
  //             (),
  //           ),
  //           dispatchStub.contents,
  //           isDebug,
  //         )
  //       },
  //     )

  //     then(
  //       "should dispatch SetRunVisualExtension action with v2",
  //       () => {
  //         dispatchStub.contents
  //         ->Obj.magic
  //         ->SinonTool.calledWith(
  //           ElementAssembleStoreType.SetRunVisualExtension(
  //             SelectedExtensionsTool.buildSelectedExtension(
  //               ~name,
  //               ~protocolIconBase64="",
  //               ~id="",
  //               // ~newName=RunElementVisualControllerTool.getVisualExtensionName()->Some,
  //               ~data={
  //                 extensionPackageData: ExtensionTool.buildExtensionPackageData(
  //                   ~name,
  //                   ~protocol={
  //                     name: RunElementVisualControllerTool.getVisualExtensionProtocolName(),
  //                     version: "0.4.1",
  //                   },
  //                   (),
  //                 ),
  //                 extensionFuncData: matchAny,
  //               },
  //               (),
  //             ),
  //           ),
  //         )
  //         ->expect == true
  //       },
  //     )
  //   })

  test(."run", ({given, \"when", \"and", then}) => {
    let element1 = ref(Obj.magic(1))
    let editorWholeName = "meta3d-editor-whole"
    let p1 = ref(Obj.magic(1))
    let db = Obj.magic(11)
    let selectedPackages = ref(list{})
    let selectedUIControls = ref(list{})
    let canvasData = ref(Obj.magic(1))
    let apInspectorData = ref(Obj.magic(1))
    let useAllSelectorStub = ref(Obj.magic(1))
    let initForElementVisualAppStub = ref(Obj.magic(1))
    let setElementVisualAppStub = ref(Obj.magic(1))
    let openUrlStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    given(
      "generate empty element contribute element1",
      () => {
        element1 :=
          ElementVisualTool.generateElementContribute(
            ~sandbox,
            ~service=ServiceTool.build(
              ~sandbox,
              ~generateContribute=Meta3d.Main.generateContribute->Obj.magic,
              ~loadContribute=Meta3d.Main.loadContribute->Obj.magic,
              (),
            ),
            ~fileStr=ElementVisualTool.buildEmptyContributeFileStr(),
            (),
          )
      },
    )

    // \"and"(
    //   "get run visual extension v",
    //   () => {
    //     v :=
    //       Meta3dTool.generateExtension(
    //         ~name=RunElementVisualControllerTool.getVisualExtensionName(),
    //         ~protocol={
    //           name: RunElementVisualControllerTool.getVisualExtensionProtocolName(),
    //           version: "0.4.1",
    //         },
    //         ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
    //         ~fileStr=ElementVisualTool.buildEmptyExtensionFileStr(),
    //         (),
    //       )->RunElementVisualControllerTool.loadAndBuildVisualExtension(
    //         ServiceTool.build(~sandbox, ~loadExtension=Meta3d.Main.loadExtension->Obj.magic, ()),
    //         _,
    //       )
    //   },
    // )

    \"and"(
      "generate editor whole package with extension e1",
      () => {
        let e1 = ExtensionTool.generateExtension(
          ~name=editorWholeName,
          ~protocolName=ElementVisualTool.getEditorWholePackageProtocolName(),
          ~fileStr=ElementVisualTool.buildEmptyExtensionFileStr(),
          (),
        )
        let e1FileData = Meta3d.Main.loadExtension(e1)

        p1 :=
          PackageSelectedPackagesTool.buildSelectedPackage(
            ~id="p1",
            ~name="p1",
            ~isStart=true,
            ~binaryFile=Meta3d.Main.generatePackage(
              Meta3d.Main.convertAllFileDataForPackage([e1FileData], [], ["e1"]),
              [],
              PackageStoredInAppTool.buildPackageData(),
            ),
            (),
          )
      },
    )

    \"and"(
      "select editor whole",
      () => {
        selectedPackages := list{p1.contents}
      },
    )

    \"and"(
      "prepare selected scene view and game view ui controls",
      () => {
        selectedUIControls :=
          list{
            SelectedUIControlsTool.buildSelectedUIControl(
              ~data=ContributeTool.buildContributeData(
                ~contributePackageData=ContributeTool.buildContributePackageData(
                  ~protocol=(
                    {
                      name: GuideUtils._getSceneViewProtocolName(),
                      version: "^0.0.1",
                    }: Meta3d.ExtensionFileType.contributeProtocolData
                  ),
                  (),
                ),
                (),
              ),
              (),
            ),
            SelectedUIControlsTool.buildSelectedUIControl(
              ~data=ContributeTool.buildContributeData(
                ~contributePackageData=ContributeTool.buildContributePackageData(
                  ~protocol=(
                    {
                      name: GuideUtils._getGameViewProtocolName(),
                      version: "^0.0.1",
                    }: Meta3d.ExtensionFileType.contributeProtocolData
                  ),
                  (),
                ),
                (),
              ),
              (),
            ),
          }
      },
    )

    \"and"(
      "prepare canvas data",
      () => {
        canvasData := CanvasControllerTool.buildCanvasData(~width=1, ~height=2, ())
      },
    )

    \"and"(
      "prepare ap inspector data",
      () => {
        apInspectorData :=
          ApInspectorTool.buildApInspectorData(
            ~isDebug=false,
            ~clearColor=(0.1, 1., 1., 1.),
            ~skinName="s1"->Some,
            (),
          )
      },
    )

    \"and"(
      "prepare local storage",
      () => {
        initForElementVisualAppStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
            Meta3dBsMostDefault.Most.just(db),
            _,
          )

        setElementVisualAppStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
            Meta3dBsMostDefault.Most.just(db),
            _,
          )
      },
    )

    \"and"(
      "prepare open",
      () => {
        openUrlStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
      },
    )

    CucumberAsync.execStep(
      \"when",
      "run",
      () => {
        RunElementVisualControllerTool.run(
          ServiceTool.build(
            ~sandbox,
            ~openUrl=openUrlStub.contents->Obj.magic,
            ~initForElementVisualApp=initForElementVisualAppStub.contents->Obj.magic,
            ~setElementVisualApp=setElementVisualAppStub.contents->Obj.magic,
            ~generateApp=Meta3d.Main.generateApp->Obj.magic,
            (),
          ),
          (canvasData.contents, apInspectorData.contents),
          ((selectedPackages.contents, list{}, list{}, list{}), element1.contents),
          ("", selectedUIControls.contents, list{}),
          (list{}, list{}),
        )
      },
    )

    then(
      "generate app",
      () => {
        ()
      },
    )

    \"and"(
      "save app to local storage",
      () => {
        setElementVisualAppStub.contents
        ->Obj.magic
        ->SinonTool.calledWithArg2(db->Meta3dBsMostDefault.Most.just, matchAny)
        ->expect == true
      },
    )

    \"and"(
      "open link with canvas data and ap inspector data to run",
      () => {
        openUrlStub.contents
        ->SinonTool.calledWith(
          j`RunElementVisual?canvasData=${canvasData.contents
            ->Obj.magic
            ->Js.Json.stringify}&&apInspectorData=${apInspectorData.contents
            ->Obj.magic
            ->Js.Json.stringify}`,
        )
        ->expect == true
      },
    )

    // \"and"(
    //   "jump to run router",
    //   () => {
    //     RescriptReactRouter.dangerouslyGetInitialUrl().path->expect == list{"RunElementVisual"}
    //   },
    // )
  })

  //   test(."run when select element contribute", ({given, \"when", \"and", then}) => {
  //     let element1 = ref(Obj.magic(1))
  //     let c1 = ref(Obj.magic(1))
  //     let v = ref(Obj.magic(1))
  //     let selectedExtensions = ref(list{})
  //     let selectedContributes = ref(list{})
  //     let canvasData = ref(Obj.magic(1))
  //     let apInspectorData = ref(Obj.magic(1))
  //     let useAllSelectorStub = ref(Obj.magic(1))
  //     let convertAllFileDataForAppStub = ref(Obj.magic(1))

  //     _prepare(given, \"and")

  //     given(
  //       "generate empty element contribute element1",
  //       () => {
  //         element1 :=
  //           ElementVisualTool.generateElementContribute(
  //             ~sandbox,
  //             ~service=ServiceTool.build(
  //               ~sandbox,
  //               ~generateContribute=Meta3d.Main.generateContribute->Obj.magic,
  //               ~loadContribute=Meta3d.Main.loadContribute->Obj.magic,
  //               (),
  //             ),
  //             ~fileStr=ElementVisualTool.buildEmptyContributeFileStr(),
  //             (),
  //           )
  //       },
  //     )

  //     \"and"(
  //       "get run visual extension v",
  //       () => {
  //         v :=
  //           Meta3dTool.generateExtension(
  //             ~name=RunElementVisualControllerTool.getVisualExtensionName(),
  //             ~protocol={
  //               name: RunElementVisualControllerTool.getVisualExtensionProtocolName(),
  //               version: "0.4.1",
  //             },
  //             ~dependentBlockProtocolNameMap=Meta3dCommonlib.ImmutableHashMap.createEmpty(),
  //             ~fileStr=ElementVisualTool.buildEmptyExtensionFileStr(),
  //             (),
  //           )->RunElementVisualControllerTool.loadAndBuildVisualExtension(
  //             ServiceTool.build(~sandbox, ~loadExtension=Meta3d.Main.loadExtension->Obj.magic, ()),
  //             _,
  //           )
  //       },
  //     )

  //     \"and"(
  //       "prepare canvas data",
  //       () => {
  //         canvasData := CanvasControllerTool.buildCanvasData()
  //       },
  //     )

  //     \"and"(
  //       "prepare ap inspector data",
  //       () => {
  //         apInspectorData := ApInspectorTool.buildApInspectorData()
  //       },
  //     )

  //     \"and"(
  //       "generate element contribute c1",
  //       () => {
  //         c1 :=
  //           ElementVisualTool.generateElementContribute(
  //             ~sandbox,
  //             ~service=ServiceTool.build(
  //               ~sandbox,
  //               ~generateContribute=Meta3d.Main.generateContribute->Obj.magic,
  //               ~loadContribute=Meta3d.Main.loadContribute->Obj.magic,
  //               (),
  //             ),
  //             ~elementName="c1",
  //             ~fileStr=ElementVisualTool.buildEmptyContributeFileStr(),
  //             (),
  //           )
  //       },
  //     )

  //     \"and"(
  //       "select c1",
  //       () => {
  //         selectedContributes := list{c1.contents, ...selectedContributes.contents}
  //       },
  //     )

  //     CucumberAsync.execStep(
  //       \"when",
  //       "run",
  //       () => {
  //         convertAllFileDataForAppStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

  //         RunElementVisualControllerTool.run(
  //           ServiceTool.build(
  //             ~sandbox,
  //             ~setElementVisualApp=createEmptyStub(refJsObjToSandbox(sandbox.contents))
  //             ->returns(Meta3dBsMostDefault.Most.just(1), _)
  //             ->Obj.magic,
  //             ~convertAllFileDataForApp=convertAllFileDataForAppStub.contents->Obj.magic,
  //             (),
  //           ),
  //           (canvasData.contents, apInspectorData.contents),
  //           (
  //             (list{}, selectedExtensions.contents, selectedContributes.contents, list{}),
  //             (v.contents, element1.contents),
  //           ),
  //         )
  //       },
  //     )

  //     then(
  //       "should only generate app with one element contribute: element1",
  //       () => {
  //         let convertedSelectedContributes =
  //           convertAllFileDataForAppStub.contents
  //           ->Obj.magic
  //           ->SinonTool.getArg(~stub=_, ~callIndex=0, ~argIndex=1, ())

  //         (
  //           convertedSelectedContributes->Meta3dCommonlib.ArraySt.length,
  //           convertedSelectedContributes[0],
  //         )->expect == (1, element1.contents.data)
  //       },
  //     )
  //   })
})
