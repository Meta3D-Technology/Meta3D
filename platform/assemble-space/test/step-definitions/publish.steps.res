open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/publish.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  let _prepare = (given, \"and") => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()
    })
  }

  test(."show publish button", ({given, \"when", \"and", then}) => {
    _prepare(given, \"and")

    \"when"(
      "render Publish",
      () => {
        ()
      },
    )

    then(
      "should show publish button",
      () => {
        PublishTool.buildUI(
          ~sandbox,
          ~service=ServiceTool.build(
            ~sandbox,
            ~useSelector=createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
              (list{}, list{}, CanvasControllerTool.buildCanvasData()),
              _,
            ),
            (),
          ),
          (),
        )
        ->ReactTestRenderer.create
        ->ReactTestTool.createSnapshotAndMatch
      },
    )
  })

  // test(."show modal after click publish button", ({given, \"when", \"and", then}) => {
  //   _prepare(given, \"and")

  //   \"when"("render Publish", () => {
  //     ()
  //   })

  //   \"and"("click publish button", () => {
  //     ()
  //   })

  //   then("should show modal", () => {
  //     let component =
  //       PublishTool.buildUI(
  //         ~sandbox,
  //         ~service=ServiceTool.build(
  //           ~sandbox,
  //           ~useState=createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
  //             (true, _ => true),
  //             _,
  //           ),
  //           ~useSelector=createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
  //             (list{}, list{}),
  //             _,
  //           ),
  //           (),
  //         ),
  //         (),
  //       )
  //       ->ReactTestRenderer.create
  //       ->ReactTestTool.createSnapshotAndMatch
  //   })
  // })

  test(."publish when select nothing", ({given, \"when", \"and", then}) => {
    let errorStub = ref(Obj.magic(1))
    let selectedExtensions = ref(Obj.magic(1))
    let selectedContributes = ref(Obj.magic(1))

    _prepare(given, \"and")

    CucumberAsync.execStep(
      \"when",
      "publish app",
      () => {
        errorStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        PublishTool.publish(
          ~sandbox,
          ~service=ServiceTool.build(~sandbox, ~error=errorStub.contents, ()),
          ~selectedExtensions=list{},
          ~selectedContributes=list{},
          (),
        )
      },
    )

    then(
      "should error",
      () => {
        errorStub.contents
        ->Obj.magic
        ->SinonTool.calledWithArg2({j`请至少选择一个扩展或者贡献`}, None)
        ->expect == true
      },
    )
  })

  let _prepareSelectedPackagesSelectedExtensionsAndContributes = (
    given,
    \"and",
    (selectedPackages, selectedPackageBinaryFile1),
    (storedPackageIdsInApp, selectedPackageBinaryFile2, p2ProtocolName),
    selectedExtensions,
    selectedContributes,
  ) => {
    given("select extension e1, e2", () => {
      selectedExtensions :=
        list{
          SelectedExtensionsTool.buildSelectedExtension(
            ~name="e1",
            // ~newName=None,
            ~protocolIconBase64="i1",
            (),
          ),
          SelectedExtensionsTool.buildSelectedExtension(
            ~name="e2",
            // ~newName=None,
            ~protocolIconBase64="i2",
            (),
          ),
        }
    })

    \"and"("select contribute c1, c2", () => {
      selectedContributes :=
        list{
          SelectedContributesTool.buildSelectedContribute(
            ~name="c1",
            // ~newName="c1"->Some,
            ~protocolIconBase64="i3",
            (),
          ),
          SelectedContributesTool.buildSelectedContribute(
            ~name="c2",
            // ~newName="c2"->Some,
            ~protocolIconBase64="i4",
            (),
          ),
        }
    })

    \"and"("select package p1 which isn't stored in app, p2 which is stored in app", () => {
      let p2Id = "p2"

      selectedPackages :=
        list{
          SelectedPackagesTool.buildSelectedPackage(
            ~name="p1",
            ~binaryFile=selectedPackageBinaryFile1,
            (),
          ),
          SelectedPackagesTool.buildSelectedPackage(
            ~id=p2Id,
            ~name="p2",
            ~protocolName=p2ProtocolName,
            ~binaryFile=selectedPackageBinaryFile2,
            (),
          ),
        }

      storedPackageIdsInApp := list{p2Id}
    })
  }

  test(."generate correct app without config data", ({given, \"when", \"and", then}) => {
    let errorStub = ref(Obj.magic(1))
    let selectedPackageBinaryFile1 = Js.Typed_array.ArrayBuffer.make(10)
    let selectedPackages = ref(Obj.magic(1))
    let selectedExtensions = ref(Obj.magic(1))
    let selectedContributes = ref(Obj.magic(1))
    let storedPackageIdsInApp = ref(Obj.magic(1))

    _prepare(given, \"and")

    _prepareSelectedPackagesSelectedExtensionsAndContributes(
      given,
      \"and",
      (selectedPackages, selectedPackageBinaryFile1),
      (storedPackageIdsInApp, Obj.magic(1), ""),
      selectedExtensions,
      selectedContributes,
    )

    CucumberAsync.execStep(
      \"when",
      "publish app",
      () => {
        errorStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        PublishTool.publish(
          ~sandbox,
          ~account="u1"->Some,
          ~service=ServiceTool.build(
            ~sandbox,
            ~error=errorStub.contents->Obj.magic,
            ~publishApp=createEmptyStub(refJsObjToSandbox(sandbox.contents))
            ->returns(Meta3dBsMost.Most.empty(), _)
            ->Obj.magic,
            (),
          ),
          ~selectedPackages=selectedPackages.contents,
          ~selectedExtensions=selectedExtensions.contents,
          ~selectedContributes=selectedContributes.contents,
          (),
        )
      },
    )

    then(
      "error for get config data",
      () => {
        errorStub.contents->SinonTool.calledWith({j`找不到启动扩展`})->expect == true
      },
    )
  })

  test(."generate correct app with config data", ({given, \"when", \"and", then}) => {
    let selectedPackageBinaryFile1 = Js.Typed_array.ArrayBuffer.make(10)
    let selectedPackages = ref(Obj.magic(1))
    let selectedExtensions = ref(Obj.magic(1))
    let selectedContributes = ref(Obj.magic(1))
    let canvasData = ref(Obj.magic(1))
    let apInspectorData = ref(Obj.magic(1))
    let values = ref(Obj.magic(1))
    let c1 = false
    let account = "u1"
    let appName = "n1"
    let appDescription = "dp1"
    let appBinaryFile = Js.Typed_array.ArrayBuffer.make(1)
    let generateAppStub = ref(Obj.magic(1))
    let convertAllFileDataStub = ref(Obj.magic(1))
    let publishAppStub = ref(Obj.magic(1))
    let setUploadProgressStub = ref(Obj.magic(1))
    let setIsUploadBeginStub = ref(Obj.magic(1))
    let setVisibleStub = ref(Obj.magic(1))
    let storedPackageIdsInApp = ref(Obj.magic(1))
    let selectedPackageBinaryFile2 = Js.Typed_array.ArrayBuffer.make(11)
    let p2ProtocolName = "p2-protocol"

    _prepare(given, \"and")

    _prepareSelectedPackagesSelectedExtensionsAndContributes(
      given,
      \"and",
      (selectedPackages, selectedPackageBinaryFile1),
      (storedPackageIdsInApp, selectedPackageBinaryFile2, p2ProtocolName),
      selectedExtensions,
      selectedContributes,
    )

    given(
      "prepare canvas data",
      () => {
        canvasData := CanvasControllerTool.buildCanvasData(~width=1, ~height=2, ())
      },
    )

    \"and"(
      "select start extension e3",
      () => {
        selectedExtensions :=
          selectedExtensions.contents->Meta3dCommonlib.ListSt.push(
            SelectedExtensionsTool.buildSelectedExtension(
              ~name="e3",
              // ~newName=None,
              ~id="e3",
              ~isStart=true,
              ~protocolConfigStr=StartExtensionProtocolConfigTool.buildProtocolConfigStr()->Some,
              (),
            ),
          )
      },
    )

    \"and"(
      "prepare config data",
      () => {
        values :=
          {
            "configData_c1": c1,
          }
      },
    )

    \"and"(
      "prepare ap inspector data",
      () => {
        apInspectorData :=
          ApInspectorTool.buildApInspectorData(
            ~isDebug=true,
            ~clearColor=(0.1, 1., 1., 1.),
            ~skinName="s1"->Some,
            (),
          )
      },
    )

    CucumberAsync.execStep(
      \"when",
      "publish app",
      () => {
        (values.contents->Obj.magic)["appName"] = appName
        (values.contents->Obj.magic)["appDescription"] = appDescription

        generateAppStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(appBinaryFile, _)

        convertAllFileDataStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        publishAppStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
            Meta3dBsMost.Most.empty(),
            _,
          )

        setUploadProgressStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
        setIsUploadBeginStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
        setVisibleStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        PublishTool.publish(
          ~sandbox,
          ~setUploadProgress=setUploadProgressStub.contents->Obj.magic,
          ~setIsUploadBegin=setIsUploadBeginStub.contents->Obj.magic,
          ~setVisible=setVisibleStub.contents->Obj.magic,
          ~canvasData=canvasData.contents,
          ~apInspectorData=apInspectorData.contents,
          ~account="u1"->Some,
          ~values=values.contents->Obj.magic,
          ~service=ServiceTool.build(
            ~sandbox,
            ~serializeStartExtensionProtocolConfigLib=Meta3d.Main.serializeStartExtensionProtocolConfigLib->Obj.magic,
            ~getNeedConfigData=Meta3d.Main.getNeedConfigData->Obj.magic,
            ~publishApp=publishAppStub.contents->Obj.magic,
            ~generateApp=generateAppStub.contents->Obj.magic,
            ~convertAllFileDataForApp=convertAllFileDataStub.contents->Obj.magic,
            (),
          ),
          ~selectedPackages=selectedPackages.contents,
          ~selectedExtensions=selectedExtensions.contents,
          ~selectedContributes=selectedContributes.contents,
          ~storedPackageIdsInApp=storedPackageIdsInApp.contents,
          (),
        )
      },
    )

    then(
      "should mark begin upload",
      () => {
        let func = SinonTool.getFirstArg(~callIndex=0, ~stub=setIsUploadBeginStub.contents, ())

        (
          setIsUploadBeginStub.contents
          ->getCall(0, _)
          ->calledBefore(publishAppStub.contents->getCall(0, _)),
          func(),
        )->expect == (true, true)
      },
    )

    \"and"(
      "should generat app with correct extension data and contribute data and start config data",
      () => {
        let {isDebug, clearColor, skinName} = apInspectorData.contents

        (
          generateAppStub.contents
          ->Obj.magic
          ->SinonTool.calledWithArg4(
            matchAny,
            [selectedPackageBinaryFile1],
            [(p2ProtocolName, selectedPackageBinaryFile2)],
            (
              canvasData.contents,
              {
                "c1": c1,
                "isDebug": isDebug,
                "clearColor": clearColor,
                "skinName": skinName->Meta3dCommonlib.OptionSt.getExn,
              },
            ),
          ),
          SinonTool.getAllArgsJson(convertAllFileDataStub.contents, 0),
        )->expect ==
          (
            true,
            "[[{\"extensionPackageData\":{\"name\":\"e1\",\"version\":\"0.0.1\",\"account\":\"meta3d\",\"protocol\":{\"name\":\"p1\",\"version\":\"^0.0.1\"},\"displayName\":\"\",\"repoLink\":\"\",\"description\":\"\",\"dependentBlockProtocolNameMap\":{}},\"extensionFuncData\":{}},{\"extensionPackageData\":{\"name\":\"e2\",\"version\":\"0.0.1\",\"account\":\"meta3d\",\"protocol\":{\"name\":\"p1\",\"version\":\"^0.0.1\"},\"displayName\":\"\",\"repoLink\":\"\",\"description\":\"\",\"dependentBlockProtocolNameMap\":{}},\"extensionFuncData\":{}},{\"extensionPackageData\":{\"name\":\"e3\",\"version\":\"0.0.1\",\"account\":\"meta3d\",\"protocol\":{\"name\":\"p1\",\"version\":\"^0.0.1\"},\"displayName\":\"\",\"repoLink\":\"\",\"description\":\"\",\"dependentBlockProtocolNameMap\":{}},\"extensionFuncData\":{}}],[{\"contributePackageData\":{\"name\":\"c1\",\"version\":\"0.0.1\",\"account\":\"meta3d\",\"protocol\":{\"name\":\"p1\",\"version\":\"^0.0.1\"},\"displayName\":\"d1\",\"repoLink\":\"\",\"description\":\"dp1\",\"dependentBlockProtocolNameMap\":{}},\"contributeFuncData\":{}},{\"contributePackageData\":{\"name\":\"c2\",\"version\":\"0.0.1\",\"account\":\"meta3d\",\"protocol\":{\"name\":\"p1\",\"version\":\"^0.0.1\"},\"displayName\":\"d1\",\"repoLink\":\"\",\"description\":\"dp1\",\"dependentBlockProtocolNameMap\":{}},\"contributeFuncData\":{}}],[\"e3\"]]",
          )
      },
    )

    \"and"(
      "should publish the generated app",
      () => {
        publishAppStub.contents
        ->Obj.magic
        ->SinonTool.calledWithArg5(matchAny, appBinaryFile, appName, account, appDescription)
        ->expect == true
      },
    )

    then(
      "should mark finish upload",
      () => {
        let func = SinonTool.getFirstArg(~callIndex=1, ~stub=setIsUploadBeginStub.contents, ())

        (
          setIsUploadBeginStub.contents
          ->getCall(1, _)
          ->calledAfter(publishAppStub.contents->getCall(0, _)),
          func(),
        )->expect == (true, false)
      },
    )

    \"and"(
      "should close modal",
      () => {
        let func = SinonTool.getFirstArg(~stub=setVisibleStub.contents, ())

        func()->expect == false
      },
    )
  })
})
