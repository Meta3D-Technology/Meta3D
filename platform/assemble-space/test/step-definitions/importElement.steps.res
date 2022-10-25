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
    // let selectedUIControls = ref(list{})
    let ei1 = ref(Obj.magic(1))
    let uiControl1 = ref(Obj.magic(1))
    let id1RandomResult = 0.3
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given, \"and")

    given("generate ui control u1", () => {
      let buttonProtocol: Meta3d.ExtensionFileType.contributeProtocolData = {
        name: "meta3d-ui-control-button-protocol",
        version: "0.5.0",
      }

      u1 :=
        ContributeTool.buildContributeData(
          ~contributePackageData=ContributeTool.buildContributePackageData(
            ~name="u1",
            ~protocol=buttonProtocol,
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

    \"and"("set element assemble data to d1 which has u1 and element inspector data ei1", () => {
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
          ~skin=UIControlInspectorTool.buildSkin("skin1"),
          ~event=[UIControlInspectorTool.buildEventData(#click, "action1")],
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
    })

    \"when"("import d1", () => {
      dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      ImportElementTool.importElement(
        ServiceTool.build(
          ~sandbox,
          ~random=createEmptyStub(refJsObjToSandbox(sandbox.contents))
          ->onCall(0, _)
          ->returns(id1RandomResult, _)
          ->Obj.magic,
          (),
        ),
        dispatchStub.contents,
        elementAssembleData1.contents,
        selectedContributes.contents,
      )
    })

    then("should generate selected u1_1", () => {
      ()
    })

    \"and"("generate selected ui control inspector data i1", () => {
      ()
    })

    \"and"("dispatch Import action with u1_1, i1, ei1", () => {
      let uiControlContribute =
        selectedContributes.contents->Meta3dCommonlib.ListSt.head->Meta3dCommonlib.OptionSt.getExn

      let {protocolIconBase64, protocolConfigStr, newName, data} = uiControlContribute

      let {rect, isDraw, skin, event} = uiControl1.contents

      let id1 = IdTool.generateId(id1RandomResult)

      dispatchStub.contents
      ->Obj.magic
      ->SinonTool.calledWith(
        FrontendUtils.ElementAssembleStoreType.Import(
          list{
            SelectedUIControlsTool.buildSelectedUIControl(
              ~id=id1,
              ~protocolConfigStr=protocolConfigStr->Meta3dCommonlib.OptionSt.getExn,
              ~name="u1",
              ~protocolIconBase64,
              ~data=uiControlContribute.data,
              (),
            ),
          },
          list{
            UIControlInspectorTool.buildUIControlInspectorData(
              ~id=id1,
              ~x=rect.x,
              ~isDraw,
              ~skin,
              ~event,
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
