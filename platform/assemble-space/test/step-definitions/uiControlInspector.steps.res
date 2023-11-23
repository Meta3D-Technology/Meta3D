open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/uiControlInspector.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  let _getButtonClickEventName = () => {
    // "click"
    #button_click
  }

  let _prepare = given => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()

      TextareaTool.markNotShowTextareaForTest()
    })
  }

  test(."show nothing", ({given, \"when", \"and", then}) => {
    _prepare(given)

    \"when"(
      "render",
      () => {
        ()
      },
    )

    then(
      "should show nothing",
      () => {
        UIControlInspectorTool.buildUI(
          ~sandbox,
          ~service=ServiceTool.build(
            ~sandbox,
            ~useSelector=createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(list{}, _),
            (),
          ),
          (),
        )
        ->ReactTestRenderer.create
        ->ReactTestTool.createSnapshotAndMatch
      },
    )
  })

  test(."show default data", ({given, \"when", \"and", then}) => {
    let id1 = "u1"
    let id2 = "u2"
    let u1 = ref(Obj.magic(1))
    let useSelectorStub = ref(Obj.magic(1))

    _prepare(given)

    given(
      "select uiControl u1, u2 that u2 is child of u1",
      () => {
        u1 :=
          SelectedUIControlsTool.buildSelectedUIControl(
            ~id=id1,
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
            ~children=list{
              SelectedUIControlsTool.buildSelectedUIControl(
                ~id=id2,
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
                ~children=list{},
                (),
              ),
            },
            (),
          )
      },
    )

    \"and"(
      "set inspector current selected ui control data to u2",
      () => {
        useSelectorStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(list{}, _)
      },
    )

    \"when"(
      "render",
      () => {
        ()
      },
    )

    then(
      "should show default data",
      () => {
        UIControlInspectorTool.buildUI(
          ~sandbox,
          ~service=ServiceTool.build(
            ~sandbox,
            ~getUIControlSupportedEventNames=createEmptyStub(refJsObjToSandbox(sandbox.contents))
            ->returns([], _)
            ->Obj.magic,
            ~useSelector=useSelectorStub.contents,
            (),
          ),
          ~currentSelectedUIControl=u1.contents,
          ~currentSelectedUIControlInspectorData=UIControlInspectorTool.buildUIControlInspectorData(
            ~id=id2,
            ~y=10->FrontendUtils.CommonType.IntForRectField,
            (),
          ),
          (),
        )
        ->ReactTestRenderer.create
        ->ReactTestTool.createSnapshotAndMatch
      },
    )
  })

  // test(."show rect with element state fields", ({given, \"when", \"and", then}) => {
  //   let elementStateFields = ref(Obj.magic(1))
  //   let id = "d1"
  //   let d1 = ref(Obj.magic(1))
  //   let useSelectorStub = ref(Obj.magic(1))

  //   _prepare(given)

  //   given(
  //     "element state add fields",
  //     () => {
  //       elementStateFields :=
  //         list{
  //           ElementInspectorTool.buildElementStateFieldData(
  //             ~name="f1",
  //             ~type_=#string,
  //             ~defaultValue="v1",
  //             (),
  //           ),
  //           ElementInspectorTool.buildElementStateFieldData(
  //             ~name="f2",
  //             ~type_=#int,
  //             ~defaultValue=1,
  //             (),
  //           ),
  //         }
  //     },
  //   )

  //   \"and"(
  //     "select ui control button d1",
  //     () => {
  //       d1 :=
  //         SelectedUIControlsTool.buildSelectedUIControl(
  //           ~id,
  //           ~data=ContributeTool.buildContributeData(
  //             ~contributePackageData=ContributeTool.buildContributePackageData(
  //               ~protocol={
  //                 name: "meta3d-ui-control-button-protocol",
  //                 version: "^0.6.0",
  //               },
  //               (),
  //             ),
  //             (),
  //           ),
  //           (),
  //         )
  //     },
  //   )

  //   \"and"(
  //     "set inspector current selected ui control data to d1",
  //     () => {
  //       useSelectorStub :=
  //         createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
  //           (
  //             list{},
  //             (
  //               ElementInspectorTool.buildElementInspectorData(elementStateFields.contents),
  //               id->Some,
  //               list{d1.contents},
  //               list{
  //                 UIControlInspectorTool.buildUIControlInspectorData(
  //                   ~id,
  //                   ~width=10->FrontendUtils.CommonType.IntForRectField,
  //                   (),
  //                 ),
  //               },
  //             ),
  //           ),
  //           _,
  //         )
  //     },
  //   )

  //   \"when"(
  //     "render",
  //     () => {
  //       ()
  //     },
  //   )

  //   then(
  //     "should show element state int field select",
  //     () => {
  //       UIControlInspectorTool.buildUI(
  //         ~sandbox,
  //         ~service=ServiceTool.build(~sandbox, ~useSelector=useSelectorStub.contents, ()),
  //         (),
  //       )
  //       ->ReactTestRenderer.create
  //       ->ReactTestTool.createSnapshotAndMatch
  //     },
  //   )
  // })

  test(."set rect x", ({given, \"when", \"and", then}) => {
    let id = "1"
    let rect: FrontendUtils.ElementAssembleStoreType.rect = UIControlInspectorTool.buildRect(
      ~x=1->FrontendUtils.CommonType.IntForRectField,
      ~y=2->FrontendUtils.CommonType.IntForRectField,
      ~width=3->FrontendUtils.CommonType.IntForRectField,
      ~height=4->FrontendUtils.CommonType.IntForRectField,
      (),
    )
    let x = 11->FrontendUtils.CommonType.IntForRectField
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given)

    \"when"(
      "set rect x",
      () => {
        dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        UIControlInspectorTool.setRectX(dispatchStub.contents->Obj.magic, id, rect, x)
      },
    )

    then(
      "should dispatch SetRect action with x",
      () => {
        dispatchStub.contents->SinonTool.getFirstArg(~callIndex=0, ~stub=_, ())->expect ==
          FrontendUtils.ElementAssembleStoreType.SetRect(
            id,
            {
              ...rect,
              x,
            },
          )
      },
    )
  })

  // test(."show isDraw with element state fields", ({given, \"when", \"and", then}) => {
  //   let elementStateFields = ref(Obj.magic(1))
  //   let id = "d1"
  //   let d1 = ref(Obj.magic(1))
  //   let useSelectorStub = ref(Obj.magic(1))

  //   _prepare(given)

  //   given(
  //     "element state add fields",
  //     () => {
  //       elementStateFields :=
  //         list{
  //           ElementInspectorTool.buildElementStateFieldData(
  //             ~name="f1",
  //             ~type_=#string,
  //             ~defaultValue="true",
  //             (),
  //           ),
  //           ElementInspectorTool.buildElementStateFieldData(
  //             ~name="f2",
  //             ~type_=#bool,
  //             ~defaultValue=false,
  //             (),
  //           ),
  //         }
  //     },
  //   )

  //   \"and"(
  //     "select ui control button d1",
  //     () => {
  //       d1 :=
  //         SelectedUIControlsTool.buildSelectedUIControl(
  //           ~id,
  //           ~data=ContributeTool.buildContributeData(
  //             ~contributePackageData=ContributeTool.buildContributePackageData(
  //               ~protocol={
  //                 name: "meta3d-ui-control-button-protocol",
  //                 version: "^0.6.0",
  //               },
  //               (),
  //             ),
  //             (),
  //           ),
  //           (),
  //         )
  //     },
  //   )

  //   \"and"(
  //     "set inspector current selected ui control data to d1",
  //     () => {
  //       useSelectorStub :=
  //         createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
  //           (
  //             list{},
  //             (
  //               ElementInspectorTool.buildElementInspectorData(elementStateFields.contents),
  //               id->Some,
  //               list{d1.contents},
  //               list{
  //                 UIControlInspectorTool.buildUIControlInspectorData(
  //                   ~id,
  //                   ~isDraw=false->FrontendUtils.CommonType.BoolForIsDraw,
  //                   (),
  //                 ),
  //               },
  //             ),
  //           ),
  //           _,
  //         )
  //     },
  //   )

  //   \"when"(
  //     "render",
  //     () => {
  //       ()
  //     },
  //   )

  //   then(
  //     "should show element state bool field select",
  //     () => {
  //       UIControlInspectorTool.buildUI(
  //         ~sandbox,
  //         ~service=ServiceTool.build(~sandbox, ~useSelector=useSelectorStub.contents, ()),
  //         (),
  //       )
  //       ->ReactTestRenderer.create
  //       ->ReactTestTool.createSnapshotAndMatch
  //     },
  //   )
  // })

  test(."set isDraw", ({given, \"when", \"and", then}) => {
    let id = "1"
    let isDraw = false->FrontendUtils.CommonType.BoolForIsDraw
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given)

    \"when"(
      "set isDraw",
      () => {
        dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        UIControlInspectorTool.setIsDraw(dispatchStub.contents->Obj.magic, id, isDraw)
      },
    )

    then(
      "should dispatch SetIsDraw action",
      () => {
        dispatchStub.contents->SinonTool.getFirstArg(~callIndex=0, ~stub=_, ())->expect ==
          FrontendUtils.ElementAssembleStoreType.SetIsDraw(id, isDraw)
      },
    )
  })

  test(."show input", ({given, \"when", \"and", then}) => {
    let id = "d1"
    let w1 = ref(Obj.magic(1))
    let i1 = ref(Obj.magic(1))
    let i1Name = "input1"
    let useSelectorStub = ref(Obj.magic(1))
    let execGetContributeFuncStub = ref(Obj.magic(1))

    _prepare(given)

    given(
      "select ui control window w1",
      () => {
        w1 :=
          SelectedUIControlsTool.buildSelectedUIControl(
            ~id,
            ~data=ContributeTool.buildContributeData(
              ~contributePackageData=ContributeTool.buildContributePackageData(
                ~protocol={
                  name: "meta3d-ui-control-window-protocol",
                  version: "^0.7.0",
                },
                (),
              ),
              (),
            ),
            (),
          )
      },
    )

    \"and"(
      "select input i1 match w1",
      () => {
        execGetContributeFuncStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        i1 :=
          SelectedContributesTool.buildSelectedContribute(
            ~id=i1Name,
            ~protocolConfigStr=Some(""),
            ~data=ContributeTool.buildContributeData(
              ~contributePackageData=ContributeTool.buildContributePackageData(
                ~name=i1Name,
                ~protocol={
                  name: "meta3d-input-window-protocol",
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
            "inputName": i1Name,
          },
          _,
        )
        ->ignore
      },
    )

    \"and"(
      "set inspector current selected ui control data to w1",
      () => {
        useSelectorStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
            list{i1.contents},
            // (
            //   list{i1.contents},
            //   (
            //     id->Some,
            //     list{w1.contents},
            //     list{
            //       UIControlInspectorTool.buildUIControlInspectorData(
            //         ~id,
            //         ~input=UIControlInspectorTool.buildInput(~inputName=i1Name, ())->Some,
            //         (),
            //       ),
            //     },
            //   ),
            // ),
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
      "should show dom with defalut value",
      () => {
        UIControlInspectorTool.buildUI(
          ~sandbox,
          ~service=ServiceTool.build(
            ~sandbox,
            ~useSelector=useSelectorStub.contents,
            ~execGetContributeFunc=execGetContributeFuncStub.contents->Obj.magic,
            (),
          ),
          ~currentSelectedUIControl=w1.contents,
          ~currentSelectedUIControlInspectorData=UIControlInspectorTool.buildUIControlInspectorData(
            ~id,
            ~input=UIControlInspectorTool.buildInput(~inputName=i1Name, ())->Some,
            (),
          ),
          (),
        )
        ->ReactTestRenderer.create
        ->ReactTestTool.createSnapshotAndMatch
      },
    )
  })

  test(."get input name from input file str", ({given, \"when", \"and", then}) => {
    let id = "123"
    let defaultInputFileStr = ref(Obj.magic(1))

    _prepare(given)

    given(
      "build default input file str",
      () => {
        let randomStub = createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(id, _)

        defaultInputFileStr :=
          UIControlInspectorTool.buildDefaultInputFileStr(
            randomStub->Obj.magic,
            "meta3d-ui-control-switch-button-protocol",
          )
      },
    )

    \"when"(
      "get input name from it",
      () => {
        ()
      },
    )

    then(
      "should get default input name",
      () => {
        UIControlInspectorTool.getInputName(
          defaultInputFileStr.contents->Some,
        )->expect == "meta3d_input_custom_123000000_switch_button"
      },
    )
  })

  test(."show specific", ({given, \"when", \"and", then}) => {
    let id = "d1"
    let w1 = ref(Obj.magic(1))
    let useSelectorStub = ref(Obj.magic(1))

    _prepare(given)

    given(
      "select ui control window w1",
      () => {
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
      },
    )

    \"and"(
      "set inspector current selected ui control data to w1",
      () => {
        useSelectorStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(list{}, _)
      },
    )

    \"when"(
      "render",
      () => {
        ()
      },
    )

    then(
      "should show dom with defalut value",
      () => {
        UIControlInspectorTool.buildUI(
          ~sandbox,
          ~service=ServiceTool.build(~sandbox, ~useSelector=useSelectorStub.contents, ()),
          ~currentSelectedUIControl=w1.contents,
          ~currentSelectedUIControlInspectorData=UIControlInspectorTool.buildUIControlInspectorData(
            ~id,
            ~specific=[
              UIControlInspectorTool.buildSpecific(
                ~name="label",
                ~type_=#string,
                ~value="Window1"->Obj.magic->FrontendUtils.CommonType.SpecicFieldDataValue,
                (),
              ),
            ],
            (),
          ),
          (),
        )
        ->ReactTestRenderer.create
        ->ReactTestTool.createSnapshotAndMatch
      },
    )
  })

  // test(."show specific with element state fields", ({given, \"when", \"and", then}) => {
  //   let elementStateFields = ref(Obj.magic(1))
  //   let id = "d1"
  //   let w1 = ref(Obj.magic(1))
  //   let useSelectorStub = ref(Obj.magic(1))

  //   _prepare(given)

  //   given(
  //     "element state add fields",
  //     () => {
  //       elementStateFields :=
  //         list{
  //           ElementInspectorTool.buildElementStateFieldData(
  //             ~name="label1",
  //             ~type_=#string,
  //             ~defaultValue="window1",
  //             (),
  //           ),
  //         }
  //     },
  //   )

  //   \"and"(
  //     "select ui control window w1",
  //     () => {
  //       w1 :=
  //         SelectedUIControlsTool.buildSelectedUIControl(
  //           ~id,
  //           ~data=ContributeTool.buildContributeData(
  //             ~contributePackageData=ContributeTool.buildContributePackageData(
  //               ~protocol={
  //                 name: "meta3d-ui-control-button-protocol",
  //                 version: "^0.7.0",
  //               },
  //               (),
  //             ),
  //             (),
  //           ),
  //           (),
  //         )
  //     },
  //   )

  //   \"and"(
  //     "set inspector current selected ui control data to w1",
  //     () => {
  //       useSelectorStub :=
  //         createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
  //           (
  //             list{},
  //             (
  //               ElementInspectorTool.buildElementInspectorData(elementStateFields.contents),
  //               id->Some,
  //               list{w1.contents},
  //               list{
  //                 UIControlInspectorTool.buildUIControlInspectorData(
  //                   ~id,
  //                   ~specific=[
  //                     UIControlInspectorTool.buildSpecific(
  //                       ~name="label",
  //                       ~type_=#string,
  //                       ~value="label1"->FrontendUtils.ElementAssembleStoreType.ElementStateFieldForSpecificDataValue,
  //                       (),
  //                     ),
  //                   ],
  //                   (),
  //                 ),
  //               },
  //             ),
  //           ),
  //           _,
  //         )
  //     },
  //   )

  //   \"when"(
  //     "render",
  //     () => {
  //       ()
  //     },
  //   )

  //   then(
  //     "should show element state string field select",
  //     () => {
  //       UIControlInspectorTool.buildUI(
  //         ~sandbox,
  //         ~service=ServiceTool.build(~sandbox, ~useSelector=useSelectorStub.contents, ()),
  //         (),
  //       )
  //       ->ReactTestRenderer.create
  //       ->ReactTestTool.createSnapshotAndMatch
  //     },
  //   )
  // })

  test(."set specific data", ({given, \"when", \"and", then}) => {
    let id = "1"
    let i = 0
    let type_ = #string
    let specific = [
      UIControlInspectorTool.buildSpecific(
        ~name="label",
        ~type_,
        ~value="Window1"->Obj.magic->FrontendUtils.CommonType.SpecicFieldDataValue,
        (),
      ),
    ]
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given)

    \"when"(
      "set specific data",
      () => {
        dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        UIControlInspectorTool.setSpecificData(
          dispatchStub.contents->Obj.magic,
          specific,
          id,
          i,
          "Window2"
          ->SpecificUtils.convertStringToValue(type_)
          ->FrontendUtils.CommonType.SpecicFieldDataValue,
          type_,
        )
      },
    )

    then(
      "should dispatch SetSpecificData action",
      () => {
        dispatchStub.contents->SinonTool.getFirstArg(~callIndex=0, ~stub=_, ())->expect ==
          FrontendUtils.ElementAssembleStoreType.SetSpecificData(
            id,
            [
              UIControlInspectorTool.buildSpecific(
                ~name="label",
                ~type_,
                ~value="Window2"->Obj.magic->FrontendUtils.CommonType.SpecicFieldDataValue,
                (),
              ),
            ],
          )
      },
    )
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

    given(
      "select ui control button d1",
      () => {
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
      },
    )

    \"and"(
      "select action a1 and a2",
      () => {
        let actionProtocol1Name = "meta3d-action-a1-protocol"
        let actionProtocol2Name = "meta3d-action-a2-protocol"

        execGetContributeFuncStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        a1 :=
          SelectedContributesTool.buildSelectedContribute(
            ~id=action1Name,
            ~protocolConfigStr=Some(""),
            ~data=ContributeTool.buildContributeData(
              ~contributePackageData=ContributeTool.buildContributePackageData(
                ~name=action1Name,
                ~protocol={
                  name: actionProtocol1Name,
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
                  name: actionProtocol2Name,
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

        getUIControlSupportedEventNamesStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))
          ->withOneArg(d1ConfigLib, _)
          ->returns([_getButtonClickEventName()], _)
      },
    )

    \"and"(
      "set inspector current selected ui control data to d1 whose event's action is a2",
      () => {
        useSelectorStub :=
          createEmptyStub(refJsObjToSandbox(sandbox.contents))->returns(
            list{a1.contents, a2.contents},
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
      "should show a2 as default action and select with a1, a2",
      () => {
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
          ~currentSelectedUIControl=d1.contents,
          ~currentSelectedUIControlInspectorData=UIControlInspectorTool.buildUIControlInspectorData(
            ~id,
            ~event=[
              UIControlInspectorTool.buildEventData(
                ~eventName=_getButtonClickEventName(),
                ~actionName=action2Name,
                (),
              ),
            ],
            (),
          ),
          (),
        )
        ->ReactTestRenderer.create
        ->ReactTestTool.createSnapshotAndMatch
      },
    )
  })

  test(."set action", ({given, \"when", \"and", then}) => {
    let id = "1"
    let eventName = #button_click
    let actionName = "a10"
    let dispatchStub = ref(Obj.magic(1))
    let setActionFileStrMapStub = ref(Obj.magic(1))

    _prepare(given)

    \"when"(
      "set action",
      () => {
        setActionFileStrMapStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))
        dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        UIControlInspectorTool.setAction(
          dispatchStub.contents->Obj.magic,
          setActionFileStrMapStub.contents->Obj.magic,
          id,
          eventName,
          actionName,
        )
      },
    )

    then(
      "should delete value of the event from actionFileStrMap",
      () => {
        let map =
          Meta3dCommonlib.ImmutableHashMap.createEmpty()->Meta3dCommonlib.ImmutableHashMap.set(
            "aaa",
            "1",
          )

        ReactHookTool.getValueWithArg1(
          ~setLocalValueStub=setActionFileStrMapStub.contents,
          ~arg1=map->Meta3dCommonlib.ImmutableHashMap.set(eventName->Obj.magic, "2"),
          (),
        )->expect == map
      },
    )

    \"and"(
      "should dispatch SetAction action",
      () => {
        dispatchStub.contents->SinonTool.getFirstArg(~callIndex=0, ~stub=_, ())->expect ==
          FrontendUtils.ElementAssembleStoreType.SetAction(id, (eventName, actionName->Some))
      },
    )
  })

  test(."set action with empty action name", ({given, \"when", \"and", then}) => {
    let id = "1"
    let eventName = #button_click
    let actionName = UIControlInspectorTool.buildEmptySelectOptionValue()
    let dispatchStub = ref(Obj.magic(1))

    _prepare(given)

    \"when"(
      "set action with empty action name",
      () => {
        dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        UIControlInspectorTool.setAction(
          dispatchStub.contents->Obj.magic,
          createEmptyStub(refJsObjToSandbox(sandbox.contents)),
          id,
          eventName,
          actionName,
        )
      },
    )

    then(
      "should dispatch SetAction action",
      () => {
        dispatchStub.contents->SinonTool.getFirstArg(~callIndex=0, ~stub=_, ())->expect ==
          FrontendUtils.ElementAssembleStoreType.SetAction(id, (eventName, None))
      },
    )
  })
})
