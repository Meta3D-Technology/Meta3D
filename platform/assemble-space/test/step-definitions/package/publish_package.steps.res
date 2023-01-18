open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/package/publish_package.feature")

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
        PublishPackageTool.buildUI(
          ~sandbox,
          ~service=ServiceTool.build(
            ~sandbox,
            ~useSelector=createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
              (list{}, list{}),
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

  test(."publish when select nothing", ({given, \"when", \"and", then}) => {
    let errorStub = ref(Obj.magic(1))
    let selectedExtensions = ref(Obj.magic(1))
    let selectedContributes = ref(Obj.magic(1))

    _prepare(given, \"and")

    CucumberAsync.execStep(
      \"when",
      "publish package",
      () => {
        errorStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        PublishPackageTool.publish(
          ~sandbox,
          ~service=ServiceTool.build(~sandbox, ~error=errorStub.contents, ()),
          ~selectedPackages=list{},
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
        ->SinonTool.calledWithArg2({j`请至少选择一个包或者扩展或者贡献`}, None)
        ->expect == true
      },
    )
  })

  // let _prepareSelectedExtensionsAndContributes = (
  //   given,
  //   \"and",
  //   selectedPackageBinaryFile1,
  //   selectedPackages,
  //   selectedExtensions,
  //   selectedContributes,
  // ) => {
  // }

  test(."generate correct package", ({given, \"when", \"and", then}) => {
    let selectedPackages = ref(Obj.magic(1))
    let selectedExtensions = ref(Obj.magic(1))
    let selectedContributes = ref(Obj.magic(1))
    let values = ref(Obj.magic(1))
    let c1 = false
    let account = "u1"
    let packageName = "n1"
    let packageVersion = "0.1.0"
    let entryExtensionName = "e3"
    let entryExtensionProtocolName = "ep3"
    let entryExtensionProtocolVersion = "0.0.3"
    let entryExtensionProtocolVersionRange = "^0.0.3"
    let entryExtensionProtocolIconBase64 = "ei3"
    let selectedPackageBinaryFile1 = Js.Typed_array.ArrayBuffer.make(10)
    let packageBinaryFile = Js.Typed_array.ArrayBuffer.make(1)
    let generatePackageStub = ref(Obj.magic(1))
    let convertAllFileDataStub = ref(Obj.magic(1))
    let publishPackageStub = ref(Obj.magic(1))
    let setUploadProgressStub = ref(Obj.magic(1))
    let setIsUploadBeginStub = ref(Obj.magic(1))
    let setVisibleStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    // _prepareSelectedExtensionsAndContributes(
    //   given,
    //   \"and",
    //   selectedPackageBinaryFile1,
    //   selectedPackages,
    //   selectedExtensions,
    //   selectedContributes,
    // )

    given(
      "select extension e1, e2",
      () => {
        selectedExtensions :=
          list{
            PackageSelectedExtensionsTool.buildSelectedExtension(
              ~name="e1",
              // ~newName=None,
              ~protocolIconBase64="i1",
              (),
            ),
            PackageSelectedExtensionsTool.buildSelectedExtension(
              ~name="e2",
              // ~newName=None,
              ~protocolIconBase64="i2",
              (),
            ),
          }
      },
    )

    \"and"(
      "select contribute c1, c2",
      () => {
        selectedContributes :=
          list{
            PackageSelectedContributesTool.buildSelectedContribute(
              ~name="c1",
              // ~newName="c1"->Some,
              ~protocolIconBase64="i3",
              (),
            ),
            PackageSelectedContributesTool.buildSelectedContribute(
              ~name="c2",
              // ~newName="c2"->Some,
              ~protocolIconBase64="i4",
              (),
            ),
          }
      },
    )

    \"and"(
      "select entry extension e3",
      () => {
        selectedExtensions :=
          selectedExtensions.contents->Meta3dCommonlib.ListSt.push(
            PackageSelectedExtensionsTool.buildSelectedExtension(
              ~name=entryExtensionName,
              // ~newName=None,
              ~id="e3",
              ~isEntry=true,
              ~protocolName=entryExtensionProtocolName,
              ~protocolVersion=entryExtensionProtocolVersion,
              ~protocolIconBase64=entryExtensionProtocolIconBase64,
              ~data=ExtensionTool.buildExtensionData(
                ~extensionPackageData=ExtensionTool.buildExtensionPackageData(
                  ~name=entryExtensionName,
                  ~protocol=(
                    {
                      name: entryExtensionProtocolName,
                      version: entryExtensionProtocolVersionRange,
                    }: Meta3d.ExtensionFileType.extensionProtocolData
                  ),
                  (),
                ),
                (),
              ),
              (),
            ),
          )
      },
    )

    \"and"(
      "select package p1",
      () => {
        selectedPackages :=
          list{
            PackageSelectedPackagesTool.buildSelectedPackage(
              ~name="p1",
              ~protocolName=entryExtensionProtocolName,
              ~protocolVersion=entryExtensionProtocolVersionRange,
              ~protocolIconBase64=entryExtensionProtocolIconBase64,
              ~entryExtensionName,
              ~binaryFile=selectedPackageBinaryFile1,
              (),
            ),
          }
      },
    )

    CucumberAsync.execStep(
      \"when",
      "publish package",
      () => {
        values :=
          {
            "packageName": packageName,
            "packageVersion": packageVersion,
          }

        generatePackageStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(packageBinaryFile, _)

        convertAllFileDataStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        publishPackageStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
            Meta3dBsMost.Most.empty(),
            _,
          )

        setUploadProgressStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
        setIsUploadBeginStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
        setVisibleStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        PublishPackageTool.publish(
          ~sandbox,
          ~setUploadProgress=setUploadProgressStub.contents->Obj.magic,
          ~setIsUploadBegin=setIsUploadBeginStub.contents->Obj.magic,
          ~setVisible=setVisibleStub.contents->Obj.magic,
          ~account="u1"->Some,
          ~values=values.contents->Obj.magic,
          ~service=ServiceTool.build(
            ~sandbox,
            ~serializeStartExtensionProtocolConfigLib=Meta3d.Main.serializeStartExtensionProtocolConfigLib->Obj.magic,
            ~publishPackage=publishPackageStub.contents->Obj.magic,
            ~generatePackage=generatePackageStub.contents->Obj.magic,
            ~convertAllFileDataForPackage=convertAllFileDataStub.contents->Obj.magic,
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
      "should mark begin upload",
      () => {
        let func = SinonTool.getFirstArg(~callIndex=0, ~stub=setIsUploadBeginStub.contents, ())

        (
          setIsUploadBeginStub.contents
          ->getCall(0, _)
          ->calledBefore(publishPackageStub.contents->getCall(0, _)),
          func(),
        )->expect == (true, true)
      },
    )

    \"and"(
      "should generat package with correct extension data and contribute data",
      () => {
        (
          generatePackageStub.contents->Obj.magic->getCallCount,
          SinonTool.getAllArgsJson(convertAllFileDataStub.contents, 0),
          generatePackageStub.contents->SinonTool.getArg(~callIndex=0, ~argIndex=1, ~stub=_, ()),
        )->expect ==
          (
            1,
            "[[{\"extensionPackageData\":{\"name\":\"e1\",\"protocol\":{\"name\":\"p1\",\"version\":\"^0.0.1\"},\"dependentExtensionProtocolNameMap\":{},\"dependentContributeProtocolNameMap\":{}},\"extensionFuncData\":{}},{\"extensionPackageData\":{\"name\":\"e2\",\"protocol\":{\"name\":\"p1\",\"version\":\"^0.0.1\"},\"dependentExtensionProtocolNameMap\":{},\"dependentContributeProtocolNameMap\":{}},\"extensionFuncData\":{}},{\"extensionPackageData\":{\"name\":\"e3\",\"protocol\":{\"name\":\"ep3\",\"version\":\"^0.0.3\"},\"dependentExtensionProtocolNameMap\":{},\"dependentContributeProtocolNameMap\":{}},\"extensionFuncData\":{}}],[{\"contributePackageData\":{\"name\":\"c1\",\"protocol\":{\"name\":\"p1\",\"version\":\"^0.0.1\"},\"dependentExtensionProtocolNameMap\":{},\"dependentContributeProtocolNameMap\":{}},\"contributeFuncData\":{}},{\"contributePackageData\":{\"name\":\"c2\",\"protocol\":{\"name\":\"p1\",\"version\":\"^0.0.1\"},\"dependentExtensionProtocolNameMap\":{},\"dependentContributeProtocolNameMap\":{}},\"contributeFuncData\":{}}],[\"e3\"]]",
            [selectedPackageBinaryFile1],
          )
      },
    )

    \"and"(
      "should publish the generated package",
      () => {
        publishPackageStub.contents
        ->Obj.magic
        ->SinonTool.calledWithArg5(
          matchAny,
          packageBinaryFile,
          [
            entryExtensionProtocolName,
            entryExtensionProtocolVersion,
            entryExtensionProtocolVersionRange,
            entryExtensionProtocolIconBase64,
            entryExtensionName,
          ],
          [packageName, packageVersion],
          account,
        )
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
          ->calledAfter(publishPackageStub.contents->getCall(0, _)),
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
