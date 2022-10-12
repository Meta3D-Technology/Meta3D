open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/publishElement.feature")

defineFeature(feature, test => {
  let username = ref(Obj.magic(1))
  let elementName = ref(Obj.magic(1))
  let elementVersion = ref(Obj.magic(1))
  let elementContributeData = ref(Obj.magic(1))
  let elementInspectorData = ref(Obj.magic(1))
  let selectedUIControlInspectorData = ref(Obj.magic(1))
  let event = ref(Obj.magic(1))

  let sandbox = ref(Obj.magic(1))

  let _prepare = (given, \"and") => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()
    })
  }

  test(."show publish button", ({given, \"when", \"and", then}) => {
    _prepare(given, \"and")

    \"when"("render Publish", () => {
      ()
    })

    then("should show publish button", () => {
      PublishElementTool.buildUI(
        ~sandbox,
        ~service=ServiceTool.build(
          ~sandbox,
          ~useSelector=createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
            (
              None,
              ElementInspectorTool.buildElementInspectorData(list{}, ReducerTool.buildReducers()),
              list{},
            ),
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
  //       PublishElementTool.buildUI(
  //         ~sandbox,
  //         ~service=ServiceTool.build(
  //           ~sandbox,
  //           ~useState=createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
  //             (true, _ => true),
  //             _,
  //           ),
  //           ~useSelector=createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
  //             (
  //               None,
  //               ElementInspectorTool.buildElementInspectorData(list{}, ReducerTool.buildReducers()),
  //               list{},
  //             ),
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

  test(."publish when has no element contribute data", ({given, \"when", \"and", then}) => {
    let errorStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    CucumberAsync.execStep(\"when", "publish", () => {
      errorStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      PublishElementTool.publish(
        ~sandbox,
        ~service=ServiceTool.build(~sandbox, ~error=errorStub.contents, ()),
        ~elementContributeData=None,
        (),
      )
    })

    then("should error", () => {
      errorStub.contents
      ->Obj.magic
      ->SinonTool.calledWithArg2({j`没有找到ElementContribute Data`}, None)
      ->expect == true
    })
  })

  let _prepareElementContributeData = given => {
    given("prepare element contribute data", () => {
      username := "u1"
      elementName := "e1"
      elementVersion := "0.0.1"
      elementContributeData := ("e1-protocol", "^0.0.1", "fileStr content")
      elementInspectorData :=
        ElementInspectorTool.buildElementInspectorData(list{}, ReducerTool.buildReducers())

      event := [UIControlInspectorTool.buildEventData(#click, "a1")]
      selectedUIControlInspectorData :=
        list{
          UIControlInspectorTool.buildUIControlInspectorData(
            ~id="b1",
            ~x=1,
            ~event=event.contents,
            (),
          ),
        }
    })
  }

  test(."generate element contribute", ({given, \"when", \"and", then}) => {
    let generateContributeStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    _prepareElementContributeData(given)

    CucumberAsync.execStep(\"when", "publish", () => {
      generateContributeStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      PublishElementTool.publish(
        ~sandbox,
        ~values={
          "elementName": elementName.contents,
          "elementVersion": elementVersion.contents,
        },
        ~service=ServiceTool.build(
          ~sandbox,
          ~generateContribute=generateContributeStub.contents->Obj.magic,
          (),
        ),
        ~elementContributeData=(elementContributeData.contents, Obj.magic(1))->Some,
        ~username=username.contents->Some,
        (),
      )
    })

    then("should generat element contribute", () => {
      let (protocolName, protocolVersion, fileStr) = elementContributeData.contents

      generateContributeStub.contents
      ->Obj.magic
      ->SinonTool.calledWithArg2(
        (
          {
            name: elementName.contents,
            protocol: {
              name: protocolName,
              version: protocolVersion,
            },
            dependentExtensionNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty()
            ->Meta3dCommonlib.ImmutableHashMap.set(
              "meta3dUIExtensionName",
              (
                {
                  protocolName: "meta3d-ui-protocol",
                  protocolVersion: "^0.5.0",
                }: Meta3d.ExtensionFileType.dependentData
              ),
            )
            ->Meta3dCommonlib.ImmutableHashMap.set(
              "meta3dEventExtensionName",
              (
                {
                  protocolName: "meta3d-event-protocol",
                  protocolVersion: "^0.5.1",
                }: Meta3d.ExtensionFileType.dependentData
              ),
            ),
            dependentContributeNameMap: Meta3dCommonlib.ImmutableHashMap.createEmpty(),
          }: Meta3d.ExtensionFileType.contributePackageData
        ),
        fileStr,
      )
      ->expect == true
    })
  })

  test(."publish element contribute", ({given, \"when", \"and", then}) => {
    let publishElementContributeStub = ref(Obj.magic(1))
    let elementContributeBinaryFile = Js.Typed_array.ArrayBuffer.make(11)

    _prepare(given, \"and")

    _prepareElementContributeData(given)

    CucumberAsync.execStep(\"when", "publish", () => {
      publishElementContributeStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(Meta3dBsMost.Most.empty(), _)

      PublishElementTool.publish(
        ~sandbox,
        ~username=username.contents->Some,
        ~values={
          "elementName": elementName.contents,
          "elementVersion": elementVersion.contents,
        },
        ~service=ServiceTool.build(
          ~sandbox,
          ~publishElementContribute=publishElementContributeStub.contents->Obj.magic,
          ~generateContribute=createEmptyStub(refJsObjToSandbox(sandbox.contents))
          ->returns(elementContributeBinaryFile, _)
          ->Obj.magic,
          (),
        ),
        ~elementContributeData=(elementContributeData.contents, Obj.magic(1))->Some,
        ~elementInspectorData=elementInspectorData.contents,
        ~selectedUIControlInspectorData=selectedUIControlInspectorData.contents,
        (),
      )
    })

    then("should publish generated element contribute", () => {
      let (protocolName, protocolVersion, _) = elementContributeData.contents

      publishElementContributeStub.contents
      ->Obj.magic
      ->SinonTool.calledWithArg3(
        username.contents,
        (elementName.contents, elementVersion.contents, protocolName, protocolVersion),
        elementContributeBinaryFile,
      )
      ->expect == true
    })
  })

  test(."publish element assemble data", ({given, \"when", \"and", then}) => {
    let publishedElementAssembleDataStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    _prepareElementContributeData(given)

    CucumberAsync.execStep(\"when", "publish", () => {
      publishedElementAssembleDataStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(Meta3dBsMost.Most.empty(), _)

      PublishElementTool.publish(
        ~sandbox,
        ~username=username.contents->Some,
        ~values={
          "elementName": elementName.contents,
          "elementVersion": elementVersion.contents,
        },
        ~service=ServiceTool.build(
          ~sandbox,
          ~publishedElementAssembleData=publishedElementAssembleDataStub.contents->Obj.magic,
          (),
        ),
        ~elementContributeData=(elementContributeData.contents, Obj.magic(1))->Some,
        ~elementInspectorData=elementInspectorData.contents,
        ~selectedUIControlInspectorData=selectedUIControlInspectorData.contents,
        (),
      )
    })

    then("should publish element assemble data", () => {
      let (protocolName, protocolVersion, contributeBinaryFile) = elementContributeData.contents

      publishedElementAssembleDataStub.contents
      ->Obj.magic
      ->SinonTool.calledWithArg4(
        username.contents,
        elementName.contents,
        elementVersion.contents,
        (
          {
            element: elementInspectorData.contents,
            uiControls: [
              {
                name: elementName.contents,
                rect: UIControlInspectorTool.buildRect(~x=1, ()),
                event: event.contents,
              },
            ],
          }: FrontendUtils.BackendCloudbaseType.inspectorData
        ),
      )
      ->expect == true
    })
  })

  test(."close modal after publish successfully", ({given, \"when", \"and", then}) => {
    let setVisibleStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    _prepareElementContributeData(given)

    CucumberAsync.execStep(\"when", "publish", () => {
      setVisibleStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      PublishElementTool.publish(
        ~sandbox,
        ~username=username.contents->Some,
        ~setVisible=setVisibleStub.contents->Obj.magic,
        ~elementContributeData=(elementContributeData.contents, Obj.magic(1))->Some,
        ~service=ServiceTool.build(
          ~sandbox,
          ~publishApp=createEmptyStub(refJsObjToSandbox(sandbox.contents))
          ->returns(Meta3dBsMost.Most.empty(), _)
          ->Obj.magic,
          (),
        ),
        // ~selectedExtensions=selectedExtensions.contents,
        // ~selectedContributes=selectedContributes.contents,
        (),
      )
    })

    then("should close modal", () => {
      let func = SinonTool.getFirstArg(~stub=setVisibleStub.contents, ())

      func()->expect == false
    })
  })
})
