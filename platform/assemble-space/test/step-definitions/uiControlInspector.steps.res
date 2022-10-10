open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/uiControlInspector.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  let _getButtonSupportedEventNames = () => {
    [#click]
  }

  let _prepare = given => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()
    })
  }

  test(."show nothing", ({given, \"when", \"and", then}) => {
    _prepare(given)

    \"when"("render", () => {
      ()
    })

    then("should show nothing", () => {
      UIControlInspectorTool.buildUI(
        ~sandbox,
        ~service=ServiceTool.build(
          ~sandbox,
          ~useSelector=createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
            (None, list{}),
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

  test(."show default data", ({given, \"when", \"and", then}) => {
    let id = "d1"
    let d1 = ref(Obj.magic(1))
    let useSelectorStub = ref(Obj.magic(1))

    _prepare(given)

    given("select ui control button d1", () => {
      d1 :=
        SelectedUIControlsTool.buildSelectedUIControl(
          ~id,
          ~data=ContributeTool.buildContributeData(
            ~contributePackageData=ContributeTool.buildContributePackageData(
              ~protocol={
                name: "meta3d-ui-control-button-protocol",
                version: "0.5.0",
              },
              (),
            ),
            (),
          ),
          (),
        )
    })

    \"and"("set inspector current selected ui control data to d1", () => {
      useSelectorStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
          (
            list{},
            (
              id->Some,
              list{d1.contents},
              list{UIControlInspectorTool.buildSelectedUIControlInspectorData(~id, ~y=10, ())},
            ),
          ),
          _,
        )
    })

    \"when"("render", () => {
      ()
    })

    then("should show default data", () => {
      UIControlInspectorTool.buildUI(
        ~sandbox,
        ~service=ServiceTool.build(
          ~sandbox,
          ~getUIControlSupportedEventNames=createEmptyStub(refJsObjToSandbox(sandbox.contents))
          ->returns(_getButtonSupportedEventNames(), _)
          ->Obj.magic,
          ~useSelector=useSelectorStub.contents,
          (),
        ),
        (),
      )
      ->ReactTestRenderer.create
      ->ReactTestTool.createSnapshotAndMatch
    })
  })

  test(."set rect", ({given, \"when", \"and", then}) => {
    let id = "1"
    let rect: FrontendUtils.UIViewStoreType.rect = {
      x: 1,
      y: 2,
      width: 3,
      height: 4,
    }
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given)

    \"when"("set rect", () => {
      dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      UIControlInspectorTool.setRect(dispatchStub.contents->Obj.magic, id, rect)
    })

    then("should dispatch setRect action", () => {
      dispatchStub.contents->SinonTool.getFirstArg(~callIndex=0, ~stub=_, ())->expect ==
        FrontendUtils.UIViewStoreType.SetRect(id, rect)
    })
  })

  test(."show default action and action select", ({given, \"when", \"and", then}) => {
    let id = "d1"
    let d1 = ref(Obj.magic(1))
    let a1 = ref(Obj.magic(1))
    let a2 = ref(Obj.magic(1))
    let d1ConfigLib = Obj.magic(11)
    let a1ConfigLib = Obj.magic(12)
    let a2ConfigLib = Obj.magic(13)
    let action1Name = "a1"
    let action2Name = "a2"
    let useSelectorStub = ref(Obj.magic(1))
    let serializeUIControlProtocolConfigLibStub = ref(Obj.magic(1))
    let getUIControlSupportedEventNamesStub = ref(Obj.magic(1))
    let serializeActionProtocolConfigLibStub = ref(Obj.magic(1))
    let getActionNameStub = ref(Obj.magic(1))

    _prepare(given)

    given("select ui control button d1", () => {
      d1 :=
        SelectedUIControlsTool.buildSelectedUIControl(
          ~id,
          ~data=ContributeTool.buildContributeData(
            ~contributePackageData=ContributeTool.buildContributePackageData(
              ~protocol={
                name: "meta3d-ui-control-button-protocol",
                version: "0.5.0",
              },
              (),
            ),
            (),
          ),
          (),
        )

      serializeUIControlProtocolConfigLibStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(d1ConfigLib, _)
      getUIControlSupportedEventNamesStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))
        ->withOneArg(d1ConfigLib, _)
        ->returns(_getButtonSupportedEventNames(), _)
    })

    \"and"("select action a1 and a2", () => {
      a1 :=
        SelectedContributesTool.buildSelectedContribute(
          ~id="a1",
          ~protocolConfigStr=Some(""),
          ~data=ContributeTool.buildContributeData(
            ~contributePackageData=ContributeTool.buildContributePackageData(
              ~name="a1",
              ~protocol={
                name: "meta3d-action-a1-protocol",
                version: "0.5.0",
              },
              (),
            ),
            (),
          ),
          (),
        )

      a2 :=
        SelectedContributesTool.buildSelectedContribute(
          ~id="a2",
          ~protocolConfigStr=Some(""),
          ~data=ContributeTool.buildContributeData(
            ~contributePackageData=ContributeTool.buildContributePackageData(
              ~name="a2",
              ~protocol={
                name: "meta3d-action-a2-protocol",
                version: "0.5.0",
              },
              (),
            ),
            (),
          ),
          (),
        )

      serializeActionProtocolConfigLibStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
      serializeActionProtocolConfigLibStub.contents
      ->onCall(0, _)
      ->returns(a1ConfigLib, _)
      ->onCall(1, _)
      ->returns(a2ConfigLib, _)
      ->ignore

      getActionNameStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
      getActionNameStub.contents
      ->withOneArg(a1ConfigLib, _)
      ->returns(action1Name, _)
      ->withOneArg(a2ConfigLib, _)
      ->returns(action2Name, _)
      ->ignore
    })

    \"and"(
      "set inspector current selected ui control data to d1 whose event's action is a2",
      () => {
        useSelectorStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
            (
              list{a1.contents, a2.contents},
              (
                id->Some,
                list{d1.contents},
                list{
                  UIControlInspectorTool.buildSelectedUIControlInspectorData(
                    ~id,
                    ~event=[UIControlInspectorTool.buildEventData(#click, "a2")],
                    (),
                  ),
                },
              ),
            ),
            _,
          )
      },
    )

    \"when"("render", () => {
      ()
    })

    then("should show a2 as default action and action select with a1, a2", () => {
      UIControlInspectorTool.buildUI(
        ~sandbox,
        ~service=ServiceTool.build(
          ~sandbox,
          ~serializeUIControlProtocolConfigLib=serializeUIControlProtocolConfigLibStub.contents->Obj.magic,
          ~getUIControlSupportedEventNames=getUIControlSupportedEventNamesStub.contents->Obj.magic,
          ~serializeActionProtocolConfigLib=serializeActionProtocolConfigLibStub.contents->Obj.magic,
          ~getActionName=getActionNameStub.contents->Obj.magic,
          ~useSelector=useSelectorStub.contents,
          (),
        ),
        (),
      )
      ->ReactTestRenderer.create
      ->ReactTestTool.createSnapshotAndMatch
    })
  })

  test(."set action", ({given, \"when", \"and", then}) => {
    let id = "1"
    let eventName = #click
    let actionName = "a10"
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given)

    \"when"("set action", () => {
      dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      UIControlInspectorTool.setAction(dispatchStub.contents->Obj.magic, id, eventName, actionName)
    })

    then("should dispatch setAction action", () => {
      dispatchStub.contents->SinonTool.getFirstArg(~callIndex=0, ~stub=_, ())->expect ==
        FrontendUtils.UIViewStoreType.SetAction(id, (eventName, actionName->Some))
    })
  })

  test(."set action with empty action name", ({given, \"when", \"and", then}) => {
    let id = "1"
    let eventName = #click
    let actionName = UIControlInspectorTool.buildEmptySelectOptionValue()
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given)

    \"when"("set action with empty action name", () => {
      dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      UIControlInspectorTool.setAction(dispatchStub.contents->Obj.magic, id, eventName, actionName)
    })

    then("should dispatch setAction action", () => {
      dispatchStub.contents->SinonTool.getFirstArg(~callIndex=0, ~stub=_, ())->expect ==
        FrontendUtils.UIViewStoreType.SetAction(id, (eventName, None))
    })
  })
})
