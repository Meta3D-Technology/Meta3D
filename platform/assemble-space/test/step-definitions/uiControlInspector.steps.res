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
            (
              list{},
              (
                ElementInspectorTool.buildElementInspectorData(list{}, ReducerTool.buildReducers()),
                None,
                list{},
                list{},
              ),
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
                version: "^0.6.0",
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
              ElementInspectorTool.buildElementInspectorData(list{}, ReducerTool.buildReducers()),
              id->Some,
              list{d1.contents},
              list{
                UIControlInspectorTool.buildUIControlInspectorData(
                  ~id,
                  ~y=10->FrontendUtils.ElementAssembleStoreType.IntForRectField,
                  (),
                ),
              },
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

  test(."show rect with element state fields", ({given, \"when", \"and", then}) => {
    let elementStateFields = ref(Obj.magic(1))
    let id = "d1"
    let d1 = ref(Obj.magic(1))
    let useSelectorStub = ref(Obj.magic(1))

    _prepare(given)

    given("element state add fields", () => {
      elementStateFields :=
        list{
          ElementInspectorTool.buildElementStateFieldData(
            ~name="f1",
            ~type_=#string,
            ~defaultValue="v1",
            (),
          ),
          ElementInspectorTool.buildElementStateFieldData(
            ~name="f2",
            ~type_=#int,
            ~defaultValue=1,
            (),
          ),
        }
    })

    \"and"("select ui control button d1", () => {
      d1 :=
        SelectedUIControlsTool.buildSelectedUIControl(
          ~id,
          ~data=ContributeTool.buildContributeData(
            ~contributePackageData=ContributeTool.buildContributePackageData(
              ~protocol={
                name: "meta3d-ui-control-button-protocol",
                version: "^0.6.0",
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
              ElementInspectorTool.buildElementInspectorData(
                elementStateFields.contents,
                ReducerTool.buildReducers(),
              ),
              id->Some,
              list{d1.contents},
              list{
                UIControlInspectorTool.buildUIControlInspectorData(
                  ~id,
                  ~width=10->FrontendUtils.ElementAssembleStoreType.IntForRectField,
                  (),
                ),
              },
            ),
          ),
          _,
        )
    })

    \"when"("render", () => {
      ()
    })

    then("should show element state int field select", () => {
      UIControlInspectorTool.buildUI(
        ~sandbox,
        ~service=ServiceTool.build(~sandbox, ~useSelector=useSelectorStub.contents, ()),
        (),
      )
      ->ReactTestRenderer.create
      ->ReactTestTool.createSnapshotAndMatch
    })
  })

  test(."set rect x", ({given, \"when", \"and", then}) => {
    let id = "1"
    let rect: FrontendUtils.ElementAssembleStoreType.rect = UIControlInspectorTool.buildRect(
      ~x=1->FrontendUtils.ElementAssembleStoreType.IntForRectField,
      ~y=2->FrontendUtils.ElementAssembleStoreType.IntForRectField,
      ~width=3->FrontendUtils.ElementAssembleStoreType.IntForRectField,
      ~height=4->FrontendUtils.ElementAssembleStoreType.IntForRectField,
      (),
    )
    let x = 11->FrontendUtils.ElementAssembleStoreType.IntForRectField
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given)

    \"when"("set rect x", () => {
      dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      UIControlInspectorTool.setRectX(dispatchStub.contents->Obj.magic, id, rect, x)
    })

    then("should dispatch SetRect action with x", () => {
      dispatchStub.contents->SinonTool.getFirstArg(~callIndex=0, ~stub=_, ())->expect ==
        FrontendUtils.ElementAssembleStoreType.SetRect(
          id,
          {
            ...rect,
            x: x,
          },
        )
    })
  })

  test(."show isDraw with element state fields", ({given, \"when", \"and", then}) => {
    let elementStateFields = ref(Obj.magic(1))
    let id = "d1"
    let d1 = ref(Obj.magic(1))
    let useSelectorStub = ref(Obj.magic(1))

    _prepare(given)

    given("element state add fields", () => {
      elementStateFields :=
        list{
          ElementInspectorTool.buildElementStateFieldData(
            ~name="f1",
            ~type_=#string,
            ~defaultValue="true",
            (),
          ),
          ElementInspectorTool.buildElementStateFieldData(
            ~name="f2",
            ~type_=#bool,
            ~defaultValue=false,
            (),
          ),
        }
    })

    \"and"("select ui control button d1", () => {
      d1 :=
        SelectedUIControlsTool.buildSelectedUIControl(
          ~id,
          ~data=ContributeTool.buildContributeData(
            ~contributePackageData=ContributeTool.buildContributePackageData(
              ~protocol={
                name: "meta3d-ui-control-button-protocol",
                version: "^0.6.0",
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
              ElementInspectorTool.buildElementInspectorData(
                elementStateFields.contents,
                ReducerTool.buildReducers(),
              ),
              id->Some,
              list{d1.contents},
              list{
                UIControlInspectorTool.buildUIControlInspectorData(
                  ~id,
                  ~isDraw=false->FrontendUtils.ElementAssembleStoreType.BoolForIsDraw,
                  (),
                ),
              },
            ),
          ),
          _,
        )
    })

    \"when"("render", () => {
      ()
    })

    then("should show element state bool field select", () => {
      UIControlInspectorTool.buildUI(
        ~sandbox,
        ~service=ServiceTool.build(~sandbox, ~useSelector=useSelectorStub.contents, ()),
        (),
      )
      ->ReactTestRenderer.create
      ->ReactTestTool.createSnapshotAndMatch
    })
  })

  test(."set isDraw", ({given, \"when", \"and", then}) => {
    let id = "1"
    let isDraw = false->FrontendUtils.ElementAssembleStoreType.BoolForIsDraw
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given)

    \"when"("set isDraw", () => {
      dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      UIControlInspectorTool.setIsDraw(dispatchStub.contents->Obj.magic, id, isDraw)
    })

    then("should dispatch SetIsDraw action", () => {
      dispatchStub.contents->SinonTool.getFirstArg(~callIndex=0, ~stub=_, ())->expect ==
        FrontendUtils.ElementAssembleStoreType.SetIsDraw(id, isDraw)
    })
  })

  test(."show specific", ({given, \"when", \"and", then}) => {
    let id = "d1"
    let w1 = ref(Obj.magic(1))
    let useSelectorStub = ref(Obj.magic(1))

    _prepare(given)

    given("select ui control window w1", () => {
      w1 :=
        SelectedUIControlsTool.buildSelectedUIControl(
          ~id,
          ~data=ContributeTool.buildContributeData(
            ~contributePackageData=ContributeTool.buildContributePackageData(
              ~protocol={
                name: "meta3d-ui-control-button-protocol",
                version: "^0.7.0",
              },
              (),
            ),
            (),
          ),
          (),
        )
    })

    \"and"("set inspector current selected ui control data to w1", () => {
      useSelectorStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
          (
            list{},
            (
              ElementInspectorTool.buildElementInspectorData(list{}, ReducerTool.buildReducers()),
              id->Some,
              list{w1.contents},
              list{
                UIControlInspectorTool.buildUIControlInspectorData(
                  ~id,
                  ~specific=[
                    UIControlInspectorTool.buildSpecific(
                      ~name="label",
                      ~type_=#string,
                      ~value="Window1",
                      (),
                    ),
                  ],
                  (),
                ),
              },
            ),
          ),
          _,
        )
    })

    \"when"("render", () => {
      ()
    })

    then("should show dom with defalut value", () => {
      UIControlInspectorTool.buildUI(
        ~sandbox,
        ~service=ServiceTool.build(~sandbox, ~useSelector=useSelectorStub.contents, ()),
        (),
      )
      ->ReactTestRenderer.create
      ->ReactTestTool.createSnapshotAndMatch
    })
  })

  test(."set specific data", ({given, \"when", \"and", then}) => {
    let id = "1"
    let e = {
      "target": {
        "value": "Window2",
      },
    }
    let i = 0
    let type_ = #string
    let specific = [
      UIControlInspectorTool.buildSpecific(~name="label", ~type_, ~value="Window1", ()),
    ]
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given)

    \"when"("set specific data", () => {
      dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      UIControlInspectorTool.setSpecificData(
        dispatchStub.contents->Obj.magic,
        specific,
        id,
        i,
        e,
        type_,
      )
    })

    then("should dispatch SetSpecificData action", () => {
      dispatchStub.contents->SinonTool.getFirstArg(~callIndex=0, ~stub=_, ())->expect ==
        FrontendUtils.ElementAssembleStoreType.SetSpecificData(
          id,
          [UIControlInspectorTool.buildSpecific(~name="label", ~type_, ~value="Window2", ())],
        )
    })
  })

  test(."show skin", ({given, \"when", \"and", then}) => {
    let id = "d1"
    let d1 = ref(Obj.magic(1))
    let s1 = ref(Obj.magic(1))
    let s2 = ref(Obj.magic(1))
    let skin1Name = "s1"
    let skin2Name = "s2"
    let useSelectorStub = ref(Obj.magic(1))
    let getSkinProtocolDataStub = ref(Obj.magic(1))
    let execGetContributeFuncStub = ref(Obj.magic(1))

    _prepare(given)

    given("select ui control button d1", () => {
      d1 :=
        SelectedUIControlsTool.buildSelectedUIControl(
          ~id,
          ~data=ContributeTool.buildContributeData(
            ~contributePackageData=ContributeTool.buildContributePackageData(
              ~protocol={
                name: "meta3d-ui-control-button-protocol",
                version: "^0.6.0",
              },
              (),
            ),
            (),
          ),
          (),
        )
    })

    \"and"("select skin s1 and s2", () => {
      let protocolName = "meta3d-skin-s-protocol"

      getSkinProtocolDataStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
          UIControlInspectorTool.buildSkinProtocolData(
            ~protocolName,
            ~protocolVersion="^0.6.0",
            (),
          ),
          _,
        )

      execGetContributeFuncStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      s1 :=
        SelectedContributesTool.buildSelectedContribute(
          ~id=skin1Name,
          ~protocolConfigStr=Some(""),
          ~data=ContributeTool.buildContributeData(
            ~contributePackageData=ContributeTool.buildContributePackageData(
              ~name=skin1Name,
              ~protocol={
                name: protocolName,
                version: "^0.6.0",
              },
              (),
            ),
            (),
          ),
          (),
        )

      execGetContributeFuncStub.contents
      ->onCall(0, _)
      ->returns(
        {
          "skinName": skin1Name,
        },
        _,
      )
      ->ignore

      s2 :=
        SelectedContributesTool.buildSelectedContribute(
          ~id=skin2Name,
          ~protocolConfigStr=Some(""),
          ~data=ContributeTool.buildContributeData(
            ~contributePackageData=ContributeTool.buildContributePackageData(
              ~name=skin2Name,
              ~protocol={
                name: protocolName,
                version: "^0.6.0",
              },
              (),
            ),
            (),
          ),
          (),
        )

      execGetContributeFuncStub.contents
      ->onCall(1, _)
      ->returns(
        {
          "skinName": skin2Name,
        },
        _,
      )
      ->ignore
    })

    \"and"("set inspector current selected ui control data to d1 whose skin is s1", () => {
      useSelectorStub :=
        createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
          (
            list{s1.contents, s2.contents},
            (
              ElementInspectorTool.buildElementInspectorData(list{}, ReducerTool.buildReducers()),
              id->Some,
              list{d1.contents},
              list{
                UIControlInspectorTool.buildUIControlInspectorData(
                  ~id,
                  ~skin=UIControlInspectorTool.buildSkin(skin1Name),
                  (),
                ),
              },
            ),
          ),
          _,
        )
    })

    \"when"("render", () => {
      ()
    })

    then("should show s1 as default skin and select with s1, s2", () => {
      UIControlInspectorTool.buildUI(
        ~sandbox,
        ~service=ServiceTool.build(
          ~sandbox,
          ~execGetContributeFunc=execGetContributeFuncStub.contents->Obj.magic,
          ~getSkinProtocolData=getSkinProtocolDataStub.contents->Obj.magic,
          ~useSelector=useSelectorStub.contents,
          (),
        ),
        (),
      )
      ->ReactTestRenderer.create
      ->ReactTestTool.createSnapshotAndMatch
    })
  })

  test(."set skin", ({given, \"when", \"and", then}) => {
    let id = "1"
    let skinName = "skin1"
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given)

    \"when"("set skin", () => {
      dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      UIControlInspectorTool.setSkin(dispatchStub.contents->Obj.magic, id, skinName)
    })

    then("should dispatch SetSkin action", () => {
      dispatchStub.contents->SinonTool.getFirstArg(~callIndex=0, ~stub=_, ())->expect ==
        FrontendUtils.ElementAssembleStoreType.SetSkin(id, skinName)
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
    let execGetContributeFuncStub = ref(Obj.magic(1))

    _prepare(given)

    given("select ui control button d1", () => {
      d1 :=
        SelectedUIControlsTool.buildSelectedUIControl(
          ~id,
          ~data=ContributeTool.buildContributeData(
            ~contributePackageData=ContributeTool.buildContributePackageData(
              ~protocol={
                name: "meta3d-ui-control-button-protocol",
                version: "^0.6.0",
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
      execGetContributeFuncStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      a1 :=
        SelectedContributesTool.buildSelectedContribute(
          ~id=action1Name,
          ~protocolConfigStr=Some(""),
          ~data=ContributeTool.buildContributeData(
            ~contributePackageData=ContributeTool.buildContributePackageData(
              ~name=action1Name,
              ~protocol={
                name: "meta3d-action-a1-protocol",
                version: "^0.6.0",
              },
              (),
            ),
            (),
          ),
          (),
        )

      execGetContributeFuncStub.contents
      ->onCall(0, _)
      ->returns(
        {
          "actionName": action1Name,
        },
        _,
      )
      ->ignore

      a2 :=
        SelectedContributesTool.buildSelectedContribute(
          ~id=action2Name,
          ~protocolConfigStr=Some(""),
          ~data=ContributeTool.buildContributeData(
            ~contributePackageData=ContributeTool.buildContributePackageData(
              ~name=action2Name,
              ~protocol={
                name: "meta3d-action-a2-protocol",
                version: "^0.6.0",
              },
              (),
            ),
            (),
          ),
          (),
        )

      execGetContributeFuncStub.contents
      ->onCall(1, _)
      ->returns(
        {
          "actionName": action2Name,
        },
        _,
      )
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
                ElementInspectorTool.buildElementInspectorData(list{}, ReducerTool.buildReducers()),
                id->Some,
                list{d1.contents},
                list{
                  UIControlInspectorTool.buildUIControlInspectorData(
                    ~id,
                    ~event=[UIControlInspectorTool.buildEventData(#click, action2Name)],
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

    then("should show a2 as default action and select with a1, a2", () => {
      UIControlInspectorTool.buildUI(
        ~sandbox,
        ~service=ServiceTool.build(
          ~sandbox,
          ~serializeUIControlProtocolConfigLib=serializeUIControlProtocolConfigLibStub.contents->Obj.magic,
          ~getUIControlSupportedEventNames=getUIControlSupportedEventNamesStub.contents->Obj.magic,
          ~execGetContributeFunc=execGetContributeFuncStub.contents->Obj.magic,
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

    then("should dispatch SetAction action", () => {
      dispatchStub.contents->SinonTool.getFirstArg(~callIndex=0, ~stub=_, ())->expect ==
        FrontendUtils.ElementAssembleStoreType.SetAction(id, (eventName, actionName->Some))
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

    then("should dispatch SetAction action", () => {
      dispatchStub.contents->SinonTool.getFirstArg(~callIndex=0, ~stub=_, ())->expect ==
        FrontendUtils.ElementAssembleStoreType.SetAction(id, (eventName, None))
    })
  })
})
