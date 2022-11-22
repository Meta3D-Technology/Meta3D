open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/importElement.feature")

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

  test(."if select more than 1 elements, error", ({given, \"when", \"and", then}) => {
    let element1 = ref(Obj.magic(1))
    let element2 = ref(Obj.magic(1))
    let selectedContributes = ref(list{})
    let errorStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    given("generate element contribute element1", () => {
      element1 :=
        ElementVisualTool.generateElementContribute(
          ~sandbox,
          ~service=ServiceTool.build(
            ~sandbox,
            ~generateContribute=Meta3d.Main.generateContribute->Obj.magic,
            ~loadContribute=Meta3d.Main.loadContribute->Obj.magic,
            (),
          ),
          ~elementName="element1",
          (),
        )
    })

    \"and"("generate element contribute element2", () => {
      element2 :=
        ElementVisualTool.generateElementContribute(
          ~sandbox,
          ~service=ServiceTool.build(
            ~sandbox,
            ~generateContribute=Meta3d.Main.generateContribute->Obj.magic,
            ~loadContribute=Meta3d.Main.loadContribute->Obj.magic,
            (),
          ),
          ~elementName="element2",
          (),
        )
    })

    \"and"("select element1, element2", () => {
      selectedContributes := list{element1.contents, element2.contents}
    })

    CucumberAsync.execStep(\"when", "get and set element assemble data", () => {
      errorStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      ImportElementTool.getAndSetElementAssembleData(
        ServiceTool.build(~sandbox, ~error=errorStub.contents->Obj.magic, ()),
        Obj.magic(1),
        selectedContributes.contents,
        None,
      )
    })

    then("should error", () => {
      errorStub.contents
      ->Obj.magic
      ->SinonTool.calledWithArg2({j`should only select 1 element at most`}, None)
      ->expect == true
    })
  })

  test(."else if not select any element, set no element assemble data", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let setElementAssembleDataStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    CucumberAsync.execStep(\"when", "get and set element assemble data", () => {
      setElementAssembleDataStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      ImportElementTool.getAndSetElementAssembleData(
        ServiceTool.build(~sandbox, ()),
        setElementAssembleDataStub.contents->Obj.magic,
        list{},
        None,
      )
    })

    then("should set no element assemble data", () => {
      ReactHookTool.getValue(~setLocalValueStub=setElementAssembleDataStub.contents, ())->expect ==
        ImportElementTool.buildNo()
    })
  })

  test(."else, get and set its' element assemble data", ({given, \"when", \"and", then}) => {
    let element1 = ref(Obj.magic(1))
    let elementName1 = "element1"
    let elementVersion1 = "0.0.1"
    let selectedContributes = ref(list{})
    let account = "u1"
    let elementAssembleData1 = ImportElementTool.buildElementAssembleData()
    let getElementAssembleDataStub = ref(Obj.magic(1))
    let setElementAssembleDataStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    given("generate element contribute element1", () => {
      element1 :=
        ElementVisualTool.generateElementContribute(
          ~sandbox,
          ~service=ServiceTool.build(
            ~sandbox,
            ~generateContribute=Meta3d.Main.generateContribute->Obj.magic,
            ~loadContribute=Meta3d.Main.loadContribute->Obj.magic,
            (),
          ),
          ~elementName=elementName1,
          ~elementVersion=elementVersion1,
          (),
        )
    })

    \"and"("select element1", () => {
      selectedContributes := list{element1.contents}
    })

    CucumberAsync.execStep(\"when", "get and set element assemble data", () => {
      setElementAssembleDataStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
      getElementAssembleDataStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
          elementAssembleData1->Meta3dBsMost.Most.just,
          _,
        )

      ImportElementTool.getAndSetElementAssembleData(
        ServiceTool.build(
          ~sandbox,
          ~getElementAssembleData=getElementAssembleDataStub.contents->Obj.magic,
          (),
        ),
        setElementAssembleDataStub.contents->Obj.magic,
        selectedContributes.contents,
        account->Some,
      )
    })

    then("should get element1's element assemble data", () => {
      (
        getElementAssembleDataStub.contents
        ->Obj.magic
        ->SinonTool.calledWithArg3(account, elementName1, elementVersion1),
        ReactHookTool.getValue(~setLocalValueStub=setElementAssembleDataStub.contents, ()),
      )->expect == (true, elementAssembleData1->ImportElementTool.buildLoaded)
    })
  })

  test(."import element", ({given, \"when", \"and", then}) => {
    // let element1 = ref(Obj.magic(1))
    // let elementName1 = "element1"
    // let elementVersion1 = "0.0.1"
    let selectedContributes = ref(list{})
    // let account = "u1"
    let elementAssembleData1 = ref(Obj.magic(1))
    // let getElementAssembleDataStub = ref(Obj.magic(1))
    // let setElementAssembleDataStub = ref(Obj.magic(1))
    let u1 = ref(Obj.magic(1))
    let u2 = ref(Obj.magic(1))
    // let selectedUIControls = ref(list{})
    let ei1 = ref(Obj.magic(1))
    let uiControl1 = ref(Obj.magic(1))
    let id1RandomResult = 0.3
    let id2RandomResult = 0.4
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    given("generate ui control u1, u2", () => {
      let windowProtocol: Meta3d.ExtensionFileType.contributeProtocolData = {
        name: "meta3d-ui-control-window-protocol",
        version: "0.7.0",
      }

      u1 :=
        ContributeTool.buildContributeData(
          ~contributePackageData=ContributeTool.buildContributePackageData(
            ~name="u1",
            ~protocol=windowProtocol,
            (),
          ),
          (),
        )

      u2 :=
        ContributeTool.buildContributeData(
          ~contributePackageData=ContributeTool.buildContributePackageData(
            ~name="u2",
            ~protocol=windowProtocol,
            (),
          ),
          (),
        )
    })

    \"and"("select u1", () => {
      selectedContributes :=
        list{
          SelectedContributesTool.buildSelectedContribute(
            ~protocolConfigStr=""->Some,
            ~newName=None,
            ~data=u1.contents,
            (),
          ),
        }
    })

    \"and"("select selected u1", () => {
      ()
    })

    \"and"("select u2", () => {
      selectedContributes :=
        selectedContributes.contents->Meta3dCommonlib.ListSt.push(
          SelectedContributesTool.buildSelectedContribute(
            ~protocolConfigStr=""->Some,
            ~newName=None,
            ~data=u2.contents,
            (),
          ),
        )
    })

    \"and"(
      "set element assemble data to d1 which has u1, u2 and element inspector data ei1",
      () => {
        ei1 :=
          ElementInspectorTool.buildElementInspectorData(
            list{
              ElementInspectorTool.buildElementStateFieldData(
                ~name="x",
                ~defaultValue=0,
                ~type_=#int,
                (),
              ),
            },
            ReducerTool.buildReducers(),
          )

        uiControl1 :=
          ImportElementTool.buildUIControl(
            ~name="u1",
            ~rect=UIControlInspectorTool.buildRect(
              ~x=1->FrontendUtils.ElementAssembleStoreType.IntForRectField,
              (),
            ),
            ~isDraw=false->FrontendUtils.ElementAssembleStoreType.BoolForIsDraw,
            ~event=[UIControlInspectorTool.buildEventData(#click, "action1")],
            ~specific=[Obj.magic(10)],
            ~children=[
              ImportElementTool.buildUIControl(
                ~name="u2",
                ~rect=UIControlInspectorTool.buildRect(
                  ~x=2->FrontendUtils.ElementAssembleStoreType.IntForRectField,
                  (),
                ),
                ~isDraw=false->FrontendUtils.ElementAssembleStoreType.BoolForIsDraw,
                ~event=[UIControlInspectorTool.buildEventData(#click, "action2")],
                ~specific=[Obj.magic(10)],
                ~children=[],
                (),
              ),
            ],
            (),
          )

        elementAssembleData1 :=
          ImportElementTool.buildElementAssembleData(
            ~elementName="d1",
            ~elementVersion="0.0.1",
            ~element=ei1.contents,
            ~uiControls=[uiControl1.contents],
            (),
          )->ImportElementTool.buildLoaded
      },
    )

    \"when"("import d1", () => {
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
          (),
        ),
        dispatchStub.contents,
        elementAssembleData1.contents,
        selectedContributes.contents,
      )
    })

    then("should generate selected u1_1, u2_1", () => {
      ()
    })

    \"and"("generate selected ui control inspector data i1, i2", () => {
      ()
    })

    \"and"("dispatch Import action with u1_1, u2_1, i1, i2, ei1", () => {
      let uiControl1Contribute =
        selectedContributes.contents->Meta3dCommonlib.ListSt.head->Meta3dCommonlib.OptionSt.getExn

      let uiControl2Contribute =
        selectedContributes.contents->Meta3dCommonlib.ListSt.nth(1)->Meta3dCommonlib.OptionSt.getExn

      let {rect, isDraw, event, specific, children} = uiControl1.contents

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
              ~name="u1",
              ~protocolIconBase64=uiControl1Contribute.protocolIconBase64,
              ~data=uiControl1Contribute.data,
              ~parentId=None,
              ~children=list{
                SelectedUIControlsTool.buildSelectedUIControl(
                  ~id=id2,
                  ~protocolConfigStr=uiControl2Contribute.protocolConfigStr->Meta3dCommonlib.OptionSt.getExn,
                  ~name="u2",
                  ~protocolIconBase64=uiControl2Contribute.protocolIconBase64,
                  ~data=uiControl2Contribute.data,
                  ~parentId=id1->Some,
                  ~children=list{},
                  (),
                ),
              },
              (),
            ),
          },
          list{
            UIControlInspectorTool.buildUIControlInspectorData(
              ~id=id1,
              ~x=rect.x,
              ~isDraw,
              ~event,
              ~specific,
              ~children=list{
                UIControlInspectorTool.buildUIControlInspectorData(
                  ~id=id2,
                  ~x=children[0].rect.x,
                  ~isDraw=children[0].isDraw,
                  ~event=children[0].event,
                  ~specific=children[0].specific,
                  ~children=list{},
                  (),
                ),
              },
              (),
            ),
          },
          ei1.contents,
        ),
      )
      ->expect == true
    })
  })
})
