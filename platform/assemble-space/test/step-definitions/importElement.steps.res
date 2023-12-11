open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/importElement.feature")

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

  // test(."if select more than 1 elements, error", ({given, \"when", \"and", then}) => {
  //   let element1 = ref(Obj.magic(1))
  //   let element2 = ref(Obj.magic(1))
  //   let selectedContributes = ref(list{})
  //   let errorStub = ref(Obj.magic(1))

  //   _prepare(given, \"and")

  //   given("generate element contribute element1", () => {
  //     element1 :=
  //       ElementVisualTool.generateElementContribute(
  //         ~sandbox,
  //         ~service=ServiceTool.build(
  //           ~sandbox,
  //           ~generateContribute=Meta3d.Main.generateContribute->Obj.magic,
  //           ~loadContribute=Meta3d.Main.loadContribute->Obj.magic,
  //           (),
  //         ),
  //         ~elementName="element1",
  //         (),
  //       )
  //   })

  //   \"and"("generate element contribute element2", () => {
  //     element2 :=
  //       ElementVisualTool.generateElementContribute(
  //         ~sandbox,
  //         ~service=ServiceTool.build(
  //           ~sandbox,
  //           ~generateContribute=Meta3d.Main.generateContribute->Obj.magic,
  //           ~loadContribute=Meta3d.Main.loadContribute->Obj.magic,
  //           (),
  //         ),
  //         ~elementName="element2",
  //         (),
  //       )
  //   })

  //   \"and"("select element1, element2", () => {
  //     selectedContributes := list{element1.contents, element2.contents}
  //   })

  //   CucumberAsync.execStep(\"when", "get and set element assemble data", () => {
  //     errorStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

  //     ImportElementTool.getAndSetElementAssembleData(
  //       ServiceTool.build(~sandbox, ~error=errorStub.contents->Obj.magic, ()),
  //       Obj.magic(1),
  //       selectedContributes.contents,
  //       None,
  //     )
  //   })

  //   then("should error", () => {
  //     errorStub.contents
  //     ->Obj.magic
  //     ->SinonTool.calledWithArg2({j`should only select 1 element at most`}, None)
  //     ->expect == true
  //   })
  // })

  // test(."else if not select any element, set no element assemble data", ({
  //   given,
  //   \"when",
  //   \"and",
  //   then,
  // }) => {
  //   let setElementAssembleDataStub = ref(Obj.magic(1))

  //   _prepare(given, \"and")

  //   CucumberAsync.execStep(\"when", "get and set element assemble data", () => {
  //     setElementAssembleDataStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

  //     ImportElementTool.getAndSetElementAssembleData(
  //       ServiceTool.build(~sandbox, ()),
  //       setElementAssembleDataStub.contents->Obj.magic,
  //       list{},
  //       None,
  //     )
  //   })

  //   then("should set no element assemble data", () => {
  //     ReactHookTool.getValue(~setLocalValueStub=setElementAssembleDataStub.contents, ())->expect ==
  //       ImportElementTool.buildNo()
  //   })
  // })

  // test(."else, get and set its' element assemble data", ({given, \"when", \"and", then}) => {
  //   let element1 = ref(Obj.magic(1))
  //   let elementName1 = "element1"
  //   let elementVersion1 = "0.0.1"
  //   let selectedContributes = ref(list{})
  //   let account = "u1"
  //   let elementAssembleData1 = ImportElementTool.buildElementAssembleData()
  //   let getElementAssembleDataStub = ref(Obj.magic(1))
  //   let setElementAssembleDataStub = ref(Obj.magic(1))

  //   _prepare(given, \"and")

  //   given("generate element contribute element1", () => {
  //     element1 :=
  //       ElementVisualTool.generateElementContribute(
  //         ~sandbox,
  //         ~service=ServiceTool.build(
  //           ~sandbox,
  //           ~generateContribute=Meta3d.Main.generateContribute->Obj.magic,
  //           ~loadContribute=Meta3d.Main.loadContribute->Obj.magic,
  //           (),
  //         ),
  //         ~elementName=elementName1,
  //         ~elementVersion=elementVersion1,
  //         (),
  //       )
  //   })

  //   \"and"("select element1", () => {
  //     selectedContributes := list{element1.contents}
  //   })

  //   CucumberAsync.execStep(\"when", "get and set element assemble data", () => {
  //     setElementAssembleDataStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
  //     getElementAssembleDataStub :=
  //       createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
  //         elementAssembleData1->Meta3dBsMostDefault.Most.just,
  //         _,
  //       )

  //     ImportElementTool.getAndSetElementAssembleData(
  //       ServiceTool.build(
  //         ~sandbox,
  //         ~getElementAssembleData=getElementAssembleDataStub.contents->Obj.magic,
  //         (),
  //       ),
  //       setElementAssembleDataStub.contents->Obj.magic,
  //       selectedContributes.contents,
  //       account->Some,
  //     )
  //   })

  //   then("should get element1's element assemble data", () => {
  //     (
  //       getElementAssembleDataStub.contents
  //       ->Obj.magic
  //       ->SinonTool.calledWithArg3(account, elementName1, elementVersion1),
  //       ReactHookTool.getValue(~setLocalValueStub=setElementAssembleDataStub.contents, ()),
  //     )->expect == (true, elementAssembleData1->ImportElementTool.buildLoaded)
  //   })
  // })

  test(."import element", ({given, \"when", \"and", then}) => {
    let windowProtocol: Meta3d.ExtensionFileType.contributeProtocolData = {
      name: "meta3d-ui-control-window-protocol",
      version: "^0.7.0",
    }
    let buttonProtocol: Meta3d.ExtensionFileType.contributeProtocolData = {
      name: "meta3d-ui-control-button-protocol",
      version: "^0.7.0",
    }
    // let element1 = ref(Obj.magic(1))
    // let elementName1 = "element1"
    // let elementVersion1 = "0.0.1"
    let selectedContributes = ref(list{})
    // let account = "u1"
    // let elementAssembleData1 = ref(Obj.magic(1))
    // let getElementAssembleDataStub = ref(Obj.magic(1))
    // let setElementAssembleDataStub = ref(Obj.magic(1))
    let u1 = ref(Obj.magic(1))
    let u2 = ref(Obj.magic(1))
    let a1 = ref(Obj.magic(1))
    let i1 = ref(Obj.magic(1))
    let e1 = ref(Obj.magic(1))
    let e2 = ref(Obj.magic(1))
    // let customInput1 = CustomTool.buildCustomInput(~name="Input1", ~fileStr="f1", ())
    // let customInput2 = customInput1
    // let customInput3 = CustomTool.buildCustomInput(~name="Input3", ~fileStr="f3", ())
    // let selectedUIControls = ref(list{})
    // let ei1 = ref(Obj.magic(1))
    let uiControl1 = ref(Obj.magic(1))
    let uiControl2 = ref(Obj.magic(1))
    let id1RandomResult = 0.3
    let id2RandomResult = 0.4
    let a1Name = "action1"
    let i1Name = "input1"
    let dispatchStub = ref(Obj.magic(1))
    let execGetContributeFuncStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    given(
      "generate u1 of window, u2 of button",
      () => {
        u1 :=
          ContributeTool.buildContributeData(
            ~contributePackageData=ContributeTool.buildContributePackageData(
              ~displayName="u1",
              ~protocol=windowProtocol,
              (),
            ),
            (),
          )

        u2 :=
          ContributeTool.buildContributeData(
            ~contributePackageData=ContributeTool.buildContributePackageData(
              ~displayName="u2",
              ~protocol=buttonProtocol,
              (),
            ),
            (),
          )
      },
    )

    \"and"(
      "generate action a1",
      () => {
        execGetContributeFuncStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        let actionProtocol: Meta3d.ExtensionFileType.contributeProtocolData = {
          name: "meta3d-action-a1-protocol",
          version: "^0.7.0",
        }
        a1 :=
          ContributeTool.buildContributeData(
            ~contributePackageData=ContributeTool.buildContributePackageData(
              ~name=a1Name,
              ~protocol=actionProtocol,
              (),
            ),
            (),
          )

        execGetContributeFuncStub.contents
        ->onCall(0, _)
        ->returns(
          {
            "actionName": a1Name,
          },
          _,
        )
        ->ignore
      },
    )

    \"and"(
      "generate input i1",
      () => {
        let inputProtocol: Meta3d.ExtensionFileType.contributeProtocolData = {
          name: "meta3d-input-i1-protocol",
          version: "^0.7.0",
        }
        i1 :=
          ContributeTool.buildContributeData(
            ~contributePackageData=ContributeTool.buildContributePackageData(
              ~name=i1Name,
              ~protocol=inputProtocol,
              (),
            ),
            (),
          )

        execGetContributeFuncStub.contents
        ->onCall(1, _)
        ->returns(
          {
            "inputName": i1Name,
          },
          _,
        )
        ->ignore
      },
    )

    \"and"(
      "select them",
      () => {
        selectedContributes :=
          list{
            SelectedContributesTool.buildSelectedContribute(
              ~protocolConfigStr=""->Some,
              ~data=u1.contents,
              (),
            ),
            SelectedContributesTool.buildSelectedContribute(
              ~protocolConfigStr=""->Some,
              ~data=u2.contents,
              (),
            ),
            SelectedContributesTool.buildSelectedContribute(
              ~id=a1Name,
              ~protocolConfigStr=""->Some,
              ~data=a1.contents,
              (),
            ),
            SelectedContributesTool.buildSelectedContribute(
              ~id=i1Name,
              ~protocolConfigStr=""->Some,
              ~data=i1.contents,
              (),
            ),
          }
      },
    )

    \"and"(
      "select element e1 which has window",
      () => {
        uiControl1 :=
          ImportElementTool.buildUIControl(
            ~protocolName=windowProtocol.name,
            ~protocolVersion="^0.1.0",
            ~displayName="u1",
            ~rect=UIControlInspectorTool.buildRect(
              ~x=1->FrontendUtils.CommonType.IntForRectField,
              (),
            ),
            ~isDraw=false->FrontendUtils.CommonType.BoolForIsDraw,
            ~input=UIControlInspectorTool.buildInput(~inputName=i1Name, ())->Some,
            ~event=[
              UIControlInspectorTool.buildEventData(
                ~eventName=#button_click,
                ~actionName=a1Name,
                (),
              ),
            ],
            ~specific=[Obj.magic(10)],
            ~children=[],
            (),
          )

        e1 :=
          ImportElementTool.buildElementAssembleData(
            ~account="a1",
            ~elementName="d1",
            ~elementVersion="0.0.1",
            ~uiControls=[uiControl1.contents],
            // ~customInputs=[customInput1],
            (),
          )
      },
    )

    \"and"(
      "select element e2 which has button",
      () => {
        uiControl2 :=
          ImportElementTool.buildUIControl(
            ~protocolName=buttonProtocol.name,
            ~protocolVersion="^0.2.0",
            ~displayName="u2",
            ~rect=UIControlInspectorTool.buildRect(
              ~x=2->FrontendUtils.CommonType.IntForRectField,
              (),
            ),
            ~isDraw=false->FrontendUtils.CommonType.BoolForIsDraw,
            // ~input=UIControlInspectorTool.buildInput(~inputName="i2_", ())->Some,
            // ~event=[
            //   UIControlInspectorTool.buildEventData(
            //     ~eventName=#button_click,
            //     ~actionName="a2_",
            //     (),
            //   ),
            // ],
            ~specific=[Obj.magic(10)],
            ~children=[],
            (),
          )

        e2 :=
          ImportElementTool.buildElementAssembleData(
            ~account="a2",
            ~elementName="d2",
            ~elementVersion="0.0.1",
            ~uiControls=[uiControl2.contents],
            // ~customInputs=[customInput2, customInput3],
            (),
          )
      },
    )

    \"when"(
      "import all selected elements",
      () => {
        dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        ImportElementTool.importElement(
          ServiceTool.build(
            ~sandbox,
            ~random=createEmptyStub(refJsObjToSandbox(sandbox.contents))
            ->onCall(0, _)
            ->returns(id1RandomResult, _)
            ->onCall(1, _)
            ->returns(id2RandomResult, _)
            ->Obj.magic,
            ~execGetContributeFunc=execGetContributeFuncStub.contents->Obj.magic,
            (),
          ),
          dispatchStub.contents,
          list{e1.contents, e2.contents},
          selectedContributes.contents->ImportElementTool.convertSelectedContributesFromApAssembleToAssemble,
        )
      },
    )

    then(
      "should generate selected ui controls",
      () => {
        ()
      },
    )

    \"and"(
      "generate selected ui control inspector data",
      () => {
        ()
      },
    )

    \"and"(
      "dispatch Import action with them",
      () => {
        let uiControl1Contribute =
          selectedContributes.contents->Meta3dCommonlib.ListSt.head->Meta3dCommonlib.OptionSt.getExn

        let uiControl2Contribute =
          selectedContributes.contents
          ->Meta3dCommonlib.ListSt.nth(1)
          ->Meta3dCommonlib.OptionSt.getExn

        let {rect, isDraw, input, event, specific} = uiControl1.contents

        let id1 = IdTool.generateId(id1RandomResult)
        let id2 = IdTool.generateId(id2RandomResult)

        dispatchStub.contents
        ->Obj.magic
        ->SinonTool.calledWith(
          FrontendUtils.ElementAssembleStoreType.Import(
            list{
              SelectedUIControlsTool.buildSelectedUIControl(
                ~id=id1,
                ~protocolConfigStr=uiControl1Contribute.protocolConfigStr->Meta3dCommonlib.OptionSt.getExn,
                ~displayName="u1",
                ~protocolIconBase64=uiControl1Contribute.protocolIconBase64,
                ~data=uiControl1Contribute.data,
                ~parentId=None,
                ~children=list{},
                (),
              ),
              SelectedUIControlsTool.buildSelectedUIControl(
                ~id=id2,
                ~protocolConfigStr=uiControl2Contribute.protocolConfigStr->Meta3dCommonlib.OptionSt.getExn,
                ~displayName="u2",
                ~protocolIconBase64=uiControl2Contribute.protocolIconBase64,
                ~data=uiControl2Contribute.data,
                ~parentId=None,
                ~children=list{},
                (),
              ),
            },
            list{
              UIControlInspectorTool.buildUIControlInspectorData(
                ~id=id1,
                ~x=rect.x,
                ~isDraw,
                ~input=input->ImportElementTool.inConvertInput,
                ~event=event->ImportElementTool.inConvertEvent,
                ~specific,
                ~children=list{},
                (),
              ),
              UIControlInspectorTool.buildUIControlInspectorData(
                ~id=id2,
                ~x=uiControl2.contents.rect.x,
                ~isDraw=uiControl2.contents.isDraw,
                ~input=None,
                ~event=[],
                ~specific=uiControl2.contents.specific,
                ~children=list{},
                (),
              ),
            },
            // list{customInput1, customInput3},
          ),
        )
        ->expect == true
      },
    )
  })
})
