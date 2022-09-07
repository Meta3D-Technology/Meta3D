open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/publish.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  let _prepare = (given, \"and") => {
    given("prepare sandbox", () => {
      sandbox := createSandbox()
    })

    \"and"("prepare snapshot", () => {
      ReactTestTool.prepare()
    })
  }

  test(."show publish button", ({given, \"when", \"and", then}) => {
    _prepare(given, \"and")

    \"when"("render Publish", () => {
      ()
    })

    then("should show publish button", () => {
      PublishTool.buildUI(
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
    })
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

  let _prepareSelectedExtensionsAndContributes = (
    given,
    \"and",
    selectedExtensions,
    selectedContributes,
  ) => {
    given("select extension e1, e2", () => {
      selectedExtensions :=
        list{
          SelectedExtensionsTool.buildSelectedExtension(
            ~name="e1",
            ~newName="e1"->Some,
            ~protocolIconBase64="i1",
            (),
          ),
          SelectedExtensionsTool.buildSelectedExtension(
            ~name="e2",
            ~newName="e2"->Some,
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
            ~newName="c1"->Some,
            ~protocolIconBase64="i3",
            (),
          ),
          SelectedContributesTool.buildSelectedContribute(
            ~name="c2",
            ~newName="c2"->Some,
            ~protocolIconBase64="i4",
            (),
          ),
        }
    })
  }

  test(."generate correct app", ({given, \"when", \"and", then}) => {
    let selectedExtensions = ref(Obj.magic(1))
    let selectedContributes = ref(Obj.magic(1))
    let convertAllFileDataStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    _prepareSelectedExtensionsAndContributes(given, \"and", selectedExtensions, selectedContributes)

    CucumberAsync.execStep(\"when", "publish app", () => {
      convertAllFileDataStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      PublishTool.publish(
        ~sandbox,
        ~username="u1"->Some,
        ~service=ServiceTool.build(
          ~sandbox,
          ~publishApp=createEmptyStub(refJsObjToSandbox(sandbox.contents))
          ->returns(Meta3dBsMost.Most.empty(), _)
          ->Obj.magic,
          ~convertAllFileData=convertAllFileDataStub.contents->Obj.magic,
          (),
        ),
        ~selectedExtensions=selectedExtensions.contents,
        ~selectedContributes=selectedContributes.contents,
        (),
      )
    })

    then("should generat app with correct extension data and contribute data", () => {
      SinonTool.getAllArgsJson(
        convertAllFileDataStub.contents,
        0,
      )->expect == "[[{\"extensionPackageData\":{\"name\":\"e1\",\"protocol\":{\"name\":\"p1\",\"version\":\"0.0.1\"},\"dependentExtensionNameMap\":{},\"dependentContributeNameMap\":{}},\"extensionFuncData\":{}},{\"extensionPackageData\":{\"name\":\"e2\",\"protocol\":{\"name\":\"p1\",\"version\":\"0.0.1\"},\"dependentExtensionNameMap\":{},\"dependentContributeNameMap\":{}},\"extensionFuncData\":{}}],[{\"contributePackageData\":{\"name\":\"c1\",\"protocol\":{\"name\":\"p1\",\"version\":\"0.0.1\"},\"dependentExtensionNameMap\":{},\"dependentContributeNameMap\":{}},\"contributeFuncData\":{}},{\"contributePackageData\":{\"name\":\"c2\",\"protocol\":{\"name\":\"p1\",\"version\":\"0.0.1\"},\"dependentExtensionNameMap\":{},\"dependentContributeNameMap\":{}},\"contributeFuncData\":{}}],[[\"e1\",\"e2\"],[],[\"c1\",\"c2\"]]]"
    })
  })

  test(."publish generated app", ({given, \"when", \"and", then}) => {
    let selectedExtensions = ref(Obj.magic(1))
    let selectedContributes = ref(Obj.magic(1))
    let publishAppStub = ref(Obj.magic(1))
    let username = "u1"
    let appName = "n1"
    let appBinaryFile = Js.Typed_array.ArrayBuffer.make(1)

    _prepare(given, \"and")

    _prepareSelectedExtensionsAndContributes(given, \"and", selectedExtensions, selectedContributes)

    CucumberAsync.execStep(\"when", "publish app", () => {
      publishAppStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(Meta3dBsMost.Most.empty(), _)

      PublishTool.publish(
        ~sandbox,
        ~username=username->Some,
        ~values={
          "name": appName,
        },
        ~service=ServiceTool.build(
          ~sandbox,
          ~publishApp=publishAppStub.contents->Obj.magic,
          ~generateApp=createEmptyStub(refJsObjToSandbox(sandbox.contents))
          ->returns(appBinaryFile, _)
          ->Obj.magic,
          (),
        ),
        ~selectedExtensions=selectedExtensions.contents,
        ~selectedContributes=selectedContributes.contents,
        (),
      )
    })

    then("should publish the generated app", () => {
      publishAppStub.contents
      ->Obj.magic
      ->SinonTool.calledWithArg3(appBinaryFile, appName, username)
      ->expect == true
    })
  })

  test(."close modal after publish successfully", ({given, \"when", \"and", then}) => {
    let selectedExtensions = ref(Obj.magic(1))
    let selectedContributes = ref(Obj.magic(1))
    let setVisibleStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    _prepareSelectedExtensionsAndContributes(given, \"and", selectedExtensions, selectedContributes)

    CucumberAsync.execStep(\"when", "publish app", () => {
      setVisibleStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      PublishTool.publish(
        ~sandbox,
        ~username="a"->Some,
        ~setVisible=setVisibleStub.contents->Obj.magic,
        ~service=ServiceTool.build(
          ~sandbox,
          ~publishApp=createEmptyStub(refJsObjToSandbox(sandbox.contents))
          ->returns(Meta3dBsMost.Most.empty(), _)
          ->Obj.magic,
          (),
        ),
        ~selectedExtensions=selectedExtensions.contents,
        ~selectedContributes=selectedContributes.contents,
        (),
      )
    })

    then("should close modal", () => {
      let func = SinonTool.getFirstArg(~stub=setVisibleStub.contents, ())

      func()->expect == false
    })
  })
})
