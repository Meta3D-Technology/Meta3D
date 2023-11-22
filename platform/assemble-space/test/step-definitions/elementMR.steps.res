open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

@module("sinon") @scope("match")
external matchFunction: 'any = "func"

let feature = loadFeature("./test/features/elementMR.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))
  let service = ref(Obj.magic(1))
  let elementName = "ElementAssembleElement"
  let execGetContributeFuncStub = ref(Obj.magic(1))

  let rec _setUIControlFakeConfigLib = (
    configLib,
    {protocol, children} as uiControl: ElementMRUtils.uiControl,
  ) => {
    {
      ...uiControl,
      protocol: {
        ...protocol,
        configLib,
      },
      children: children->Meta3dCommonlib.ArraySt.map(_setUIControlFakeConfigLib(configLib)),
    }
  }

  let _setFakeConfigLib = (mr: ElementMRUtils.elementMR, configLib) => {
    {
      ...mr,
      uiControls: mr.uiControls->Meta3dCommonlib.ArraySt.map(_setUIControlFakeConfigLib(configLib)),
    }
  }

  let _prepare = (given, \"and") => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()

      execGetContributeFuncStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

      service :=
        ServiceTool.build(
          ~sandbox,
          ~execGetContributeFunc=execGetContributeFuncStub.contents->Obj.magic,
          ~serializeUIControlProtocolConfigLib=Meta3d.Main.serializeUIControlProtocolConfigLib->Obj.magic,
          ~generateUIControlCommonDataStr=Meta3d.Main.generateUIControlCommonDataStr->Obj.magic,
          ~getUIControlSupportedEventNames=Meta3d.Main.getUIControlSupportedEventNames->Obj.magic,
          ~generateHandleUIControlEventStr=Meta3d.Main.generateHandleUIControlEventStr->Obj.magic,
          (),
        )
    })
  }

  test(."build element middle represent with two buttons and generate element contribute string", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let b1 = ref(Obj.magic(1))
    let b2 = ref(Obj.magic(1))
    let b1Name = "Button1"
    let b2Name = "Button2"
    let mr = ref(Obj.magic(1))
    let str = ref(Obj.magic(1))
    let selectedUIControls = ref(list{})
    let selectedUIControlInspectorData = ref(list{})
    // let elementStateFields = ref(list{})

    _prepare(given, \"and")

    given(
      "generate ui control button b1, b2",
      () => {
        execGetContributeFuncStub.contents
        ->onCall(0, _)
        ->returns(
          {
            "uiControlName": b1Name,
          },
          _,
        )
        ->ignore

        execGetContributeFuncStub.contents
        ->onCall(1, _)
        ->returns(
          {
            "uiControlName": b2Name,
          },
          _,
        )
        ->ignore

        let buttonProtocol: Meta3d.ExtensionFileType.contributeProtocolData = {
          name: "meta3d-ui-control-button-protocol",
          version: "0.6.0",
        }

        b1 :=
          ContributeTool.buildContributeData(
            ~contributePackageData=ContributeTool.buildContributePackageData(
              ~protocol=buttonProtocol,
              (),
            ),
            (),
          )
        b2 :=
          ContributeTool.buildContributeData(
            ~contributePackageData=ContributeTool.buildContributePackageData(
              ~protocol=buttonProtocol,
              (),
            ),
            (),
          )
      },
    )

    \"and"(
      "select b1, b2",
      () => {
        selectedUIControls :=
          list{
            SelectedUIControlsTool.buildSelectedUIControl(
              // ~name,
              // ~newName=None,
              ~id="b1",
              ~protocolConfigStr=UIControlProtocolConfigTool.buildButtonContributeProtocolConfigStr(),
              ~data=b1.contents,
              (),
            ),
            SelectedUIControlsTool.buildSelectedUIControl(
              ~id="b2",
              ~protocolConfigStr=UIControlProtocolConfigTool.buildButtonContributeProtocolConfigStr(),
              ~data=b2.contents,
              (),
            ),
          }
      },
    )

    // \"and"(
    //   "prepare element inspector data",
    //   () => {
    //     elementStateFields :=
    //       list{
    //         ElementInspectorTool.buildElementStateFieldData(
    //           ~name="a1",
    //           ~type_=#int,
    //           ~defaultValue="10",
    //           (),
    //         ),
    //         ElementInspectorTool.buildElementStateFieldData(
    //           ~name="a2",
    //           ~type_=#string,
    //           ~defaultValue="zzz",
    //           (),
    //         ),
    //         ElementInspectorTool.buildElementStateFieldData(
    //           ~name="a3",
    //           ~type_=#bool,
    //           ~defaultValue=false,
    //           (),
    //         ),
    //       }
    //   },
    // )

    \"and"(
      "prepare b1's, b2's inspector data",
      () => {
        selectedUIControlInspectorData :=
          list{
            UIControlInspectorTool.buildUIControlInspectorData(
              ~id="b1",
              ~x=1->FrontendUtils.CommonType.IntForRectField,
              // ~isDraw="a3"->FrontendUtils.ElementAssembleStoreType.ElementStateFieldForIsDraw,
              ~isDraw=true->FrontendUtils.CommonType.BoolForIsDraw,
              (),
            ),
            UIControlInspectorTool.buildUIControlInspectorData(
              ~id="b2",
              // ~x="a2"->FrontendUtils.ElementAssembleStoreType.ElementStateFieldForRectField,
              ~x=2->FrontendUtils.CommonType.IntForRectField,
              ~isDraw=false->FrontendUtils.CommonType.BoolForIsDraw,
              (),
            ),
          }
      },
    )

    \"when"(
      "build element middle represent with b1, b2 and inspector data",
      () => {
        mr :=
          ElementVisualTool.buildElementMR(
            service.contents,
            elementName,
            selectedUIControls.contents->Meta3dCommonlib.ListSt.toArray,
            selectedUIControlInspectorData.contents->Meta3dCommonlib.ListSt.toArray,
            // elementStateFields.contents,
          )
      },
    )

    \"and"(
      "generate element contribute string",
      () => {
        str := ElementVisualTool.generateElementContributeFileStr(service.contents, mr.contents)
      },
    )

    then(
      "should build correct result",
      () => {
        let configLib = Obj.magic(1)
        mr := _setFakeConfigLib(mr.contents, configLib)

        mr.contents->expect ==
          (
            {
              element: {
                elementName,
                execOrder: 0,
                // elementStateFields: elementStateFields.contents->Meta3dCommonlib.ListSt.toArray,
              },
              uiControls: [
                {
                  displayName: b1Name,
                  protocol: {
                    name: "meta3d-ui-control-button-protocol",
                    version: "0.6.0",
                    configLib,
                  },
                  data: selectedUIControlInspectorData.contents
                  ->Meta3dCommonlib.ListSt.head
                  ->Meta3dCommonlib.OptionSt.getExn,
                  children: [],
                },
                {
                  displayName: b2Name,
                  protocol: {
                    name: "meta3d-ui-control-button-protocol",
                    version: "0.6.0",
                    configLib,
                  },
                  data: selectedUIControlInspectorData.contents
                  ->Meta3dCommonlib.ListSt.getLast
                  ->Meta3dCommonlib.OptionSt.getExn,
                  children: [],
                },
              ],
            }: ElementMRUtils.elementMR
          )
      },
    )

    \"and"(
      "generate correct result",
      () => {
        str.contents
        ->NewlineTool.unifyNewlineChar
        ->NewlineTool.removeBlankChar
        ->expect == // "\nwindow.Contribute = {\n    getContribute: (api) => {        return {\n            elementName:\"ElementAssembleElement\",\n            execOrder: 0,\n            elementState: {\"a1\":10,\"a2\":\"zzz\",\"a3\":false},\n                        elementFunc: (meta3dState, elementState) => {\n                let { getUIControlFunc } = api.getPackageService(meta3dState, \"meta3d-ui-protocol\")\n\n                let Button1 = getUIControlFunc(meta3dState,\"Button1\")\n    \n    let Button2 = getUIControlFunc(meta3dState,\"Button2\")\n    \n                let data = null\n  if(elementState.a3){\n                 return Button1(meta3dState,\n                {\n                  ...{rect: {\n    x: 1,\n    y: 0,\n    width: 0,\n    height: 0\n    }},\n        ...{},\n      childrenFunc:(meta3dState) => new Promise((resolve, reject) => resolve(meta3dState))\n                }\n                    ).then(data =>{\n                meta3dState = data[0]\nif(false){\n                 return Button2(meta3dState,\n                {\n                  ...{rect: {\n    x: elementState.a2,\n    y: 0,\n    width: 0,\n    height: 0\n    }},\n        ...{},\n      childrenFunc:(meta3dState) => new Promise((resolve, reject) => resolve(meta3dState))\n                }\n                    ).then(data =>{\n                meta3dState = data[0]\n\n  return new Promise((resolve) => {\n                    resolve(meta3dState)\n                })\n                })}})}\n  return new Promise((resolve) => {\n                    resolve(meta3dState)\n                })\n  \n            }\n        }\n    }\n}\n  "->NewlineTool.removeBlankChar
          "window.Contribute={getContribute:(api)=>{return{elementName:\"ElementAssembleElement\",execOrder:0,elementState:{},elementFunc:(meta3dState,elementState)=>{let{ui}=api.getPackageService(meta3dState,\"meta3d-editor-whole-protocol\")let {getUIControlFunc}=uiletButton1=getUIControlFunc(meta3dState,\"Button1\")letButton2=getUIControlFunc(meta3dState,\"Button2\")letdata=nullif(true){returnButton1(meta3dState,{...{rect:{x:1,y:0,width:0,height:0}},...{},childrenFunc:(meta3dState)=>newPromise((resolve,reject)=>resolve(meta3dState))}).then(data=>{meta3dState=data[0]if(false){returnButton2(meta3dState,{...{rect:{x:2,y:0,width:0,height:0}},...{},childrenFunc:(meta3dState)=>newPromise((resolve,reject)=>resolve(meta3dState))}).then(data=>{meta3dState=data[0]returnnewPromise((resolve)=>{resolve(meta3dState)})})}})}returnnewPromise((resolve)=>{resolve(meta3dState)})}}}}"
      },
    )
  })

  test(."build element middle represent with event and generate element contribute string", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let b1 = ref(Obj.magic(1))
    let b1Name = "Button1"
    let mr = ref(Obj.magic(1))
    let str = ref(Obj.magic(1))
    let selectedUIControls = ref(list{})
    let selectedUIControlInspectorData = ref(list{})

    _prepare(given, \"and")

    given(
      "generate ui control button b1",
      () => {
        execGetContributeFuncStub.contents
        ->onCall(0, _)
        ->returns(
          {
            "uiControlName": b1Name,
          },
          _,
        )
        ->ignore

        let buttonProtocol: Meta3d.ExtensionFileType.contributeProtocolData = {
          name: "meta3d-ui-control-button-protocol",
          version: "0.6.0",
        }

        b1 :=
          ContributeTool.buildContributeData(
            ~contributePackageData=ContributeTool.buildContributePackageData(
              ~protocol=buttonProtocol,
              (),
            ),
            (),
          )
      },
    )

    \"and"(
      "select b1",
      () => {
        selectedUIControls :=
          list{
            SelectedUIControlsTool.buildSelectedUIControl(
              ~id="b1",
              ~protocolConfigStr=UIControlProtocolConfigTool.buildButtonContributeProtocolConfigStr(),
              ~data=b1.contents,
              (),
            ),
          }
      },
    )

    \"and"(
      "prepare b1's inspector data",
      () => {
        selectedUIControlInspectorData :=
          list{
            UIControlInspectorTool.buildUIControlInspectorData(
              ~id="b1",
              ~x=1->FrontendUtils.CommonType.IntForRectField,
              ~event=[
                UIControlInspectorTool.buildEventData(
                  ~eventName=#button_click,
                  ~actionName="a1",
                  (),
                ),
              ],
              (),
            ),
          }
      },
    )

    \"when"(
      "build element middle represent with b1 and inspector data",
      () => {
        mr :=
          ElementVisualTool.buildElementMR(
            service.contents,
            elementName,
            selectedUIControls.contents->Meta3dCommonlib.ListSt.toArray,
            selectedUIControlInspectorData.contents->Meta3dCommonlib.ListSt.toArray,
            // list{},
          )
      },
    )

    \"and"(
      "generate element contribute string",
      () => {
        str := ElementVisualTool.generateElementContributeFileStr(service.contents, mr.contents)
      },
    )

    then(
      "should build correct result",
      () => {
        let configLib = Obj.magic(1)
        mr := _setFakeConfigLib(mr.contents, configLib)

        mr.contents->expect ==
          (
            {
              element: {
                elementName,
                execOrder: 0,
                // elementStateFields: [],
              },
              uiControls: [
                {
                  displayName: b1Name,
                  protocol: {
                    name: "meta3d-ui-control-button-protocol",
                    version: "0.6.0",
                    configLib,
                  },
                  data: selectedUIControlInspectorData.contents
                  ->Meta3dCommonlib.ListSt.head
                  ->Meta3dCommonlib.OptionSt.getExn,
                  children: [],
                },
              ],
            }: ElementMRUtils.elementMR
          )
      },
    )

    \"and"(
      "generate correct result",
      () => {
        str.contents->NewlineTool.unifyNewlineChar->NewlineTool.removeBlankChar->expect ==
          {
            j`window.Contribute = {
    getContribute: (api) => {
        return {
            elementName:"ElementAssembleElement",
            execOrder: 0,
            elementState: {},
            elementFunc: (meta3dState, elementState) => {
                let { ui  } = api.getPackageService(meta3dState, "meta3d-editor-whole-protocol")

                let { getUIControlFunc } = ui

    let Button1 = getUIControlFunc(meta3dState,"Button1")
    
                let data = null
  if(true){
                  return Button1(meta3dState,
                {
                  ...{rect: {
    x: 1,
    y: 0,
    width: 0,
    height: 0
    }},
        ...{},
      childrenFunc:(meta3dState) => new Promise((resolve, reject) => resolve(meta3dState))
                }
                    ).then(data =>{
                meta3dState = data[0]
handle click event code...
  return new Promise((resolve) => {
                    resolve(meta3dState)
                })
                })}
  return new Promise((resolve) => {
                    resolve(meta3dState)
                })
  
            }
        }
    }
      }`
          }
          ->NewlineTool.unifyNewlineChar
          ->NewlineTool.removeBlankChar
      },
    )
  })

  // test(."build element middle represent with reducer and generate element contribute string", ({
  //   given,
  //   \"when",
  //   \"and",
  //   then,
  // }) => {
  //   let b1 = ref(Obj.magic(1))
  //   let b1Name = "Button1"
  //   let mr = ref(Obj.magic(1))
  //   let str = ref(Obj.magic(1))
  //   let selectedUIControls = ref(list{})
  //   let selectedUIControlInspectorData = ref(list{})

  //   _prepare(given, \"and")

  //   given(
  //     "prepare reducers",
  //     () => {
  //       reducers :=
  //         ReducerTool.buildReducers(
  //           ~role="role1"->Some,
  //           ~handlers=list{ReducerTool.buildHandler("action1", "x")},
  //           (),
  //         )
  //     },
  //   )

  //   \"when"(
  //     "build element middle represent with reducers",
  //     () => {
  //       mr :=
  //         ElementVisualTool.buildElementMR(
  //           service.contents,
  //           elementName,
  //           [],
  //           [],
  //           (list{}, reducers.contents),
  //         )
  //     },
  //   )

  //   \"and"(
  //     "generate element contribute string",
  //     () => {
  //       str := ElementVisualTool.generateElementContributeFileStr(service.contents, mr.contents)
  //     },
  //   )

  //   then(
  //     "should build correct result",
  //     () => {
  //       mr.contents.element.reducers->expect == reducers.contents
  //     },
  //   )

  //   \"and"(
  //     "generate correct result",
  //     () => {
  //       str.contents->NewlineTool.unifyNewlineChar->NewlineTool.removeBlankChar->expect ==
  //         "\nwindow.Contribute = {\n    getContribute: (api) => {        return {\n            elementName:\"ElementAssembleElement\",\n            execOrder: 0,\n            elementState: {},\n            reducers: {\"role\":\"role1\",\"handlers\":[{\"actionName\":\"action1\",\"updatedElementStateFieldName\":\"x\"}]},\n            elementFunc: (meta3dState, elementState) => {\n                let { getUIControlFunc } = api.getPackageService(meta3dState, \"meta3d-ui-protocol\")\n\n                            let data = null\n  \n  return new Promise((resolve) => {\n                    resolve(meta3dState)\n                })\n                \n  return new Promise((resolve) => {\n                    resolve(meta3dState)\n                })\n  \n            }\n        }\n    }\n}\n  "->NewlineTool.removeBlankChar
  //     },
  //   )
  // })

  test(."build element middle represent with window and generate element contribute string", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let w1 = ref(Obj.magic(1))
    let w1Name = "Window1"
    let mr = ref(Obj.magic(1))
    let str = ref(Obj.magic(1))
    let selectedUIControls = ref(list{})
    let selectedUIControlInspectorData = ref(list{})

    _prepare(given, \"and")

    given(
      "generate ui control window w1",
      () => {
        execGetContributeFuncStub.contents
        ->onCall(0, _)
        ->returns(
          {
            "uiControlName": w1Name,
          },
          _,
        )
        ->ignore

        let windowProtocol: Meta3d.ExtensionFileType.contributeProtocolData = {
          name: "meta3d-ui-control-window-protocol",
          version: "0.7.0",
        }

        w1 :=
          ContributeTool.buildContributeData(
            ~contributePackageData=ContributeTool.buildContributePackageData(
              ~protocol=windowProtocol,
              (),
            ),
            (),
          )
      },
    )

    \"and"(
      "select w1",
      () => {
        selectedUIControls :=
          list{
            SelectedUIControlsTool.buildSelectedUIControl(
              ~id="w1",
              ~protocolConfigStr=UIControlProtocolConfigTool.buildWindowContributeProtocolConfigStr(),
              ~data=w1.contents,
              (),
            ),
          }
      },
    )

    \"and"(
      "prepare w1's inspector data",
      () => {
        selectedUIControlInspectorData :=
          list{
            UIControlInspectorTool.buildUIControlInspectorData(
              ~id="w1",
              ~x=1->FrontendUtils.CommonType.IntForRectField,
              ~isDraw=true->FrontendUtils.CommonType.BoolForIsDraw,
              ~input=UIControlInspectorTool.buildInput(~inputName="input1", ())->Some,
              ~specific=[
                UIControlInspectorTool.buildSpecific(
                  ~name="label",
                  ~type_=#string,
                  ~value="Window1"->Obj.magic->FrontendUtils.CommonType.SpecicFieldDataValue,
                  (),
                ),
                UIControlInspectorTool.buildSpecific(
                  ~name="image1",
                  ~type_=#imageBase64,
                  ~value="aaa"->Obj.magic->FrontendUtils.CommonType.SpecicFieldDataValue,
                  (),
                ),
                UIControlInspectorTool.buildSpecific(
                  ~name="image2",
                  ~type_=#imageBase64,
                  ~value=Js.Nullable.null->Obj.magic->FrontendUtils.CommonType.SpecicFieldDataValue,
                  (),
                ),
              ],
              (),
            ),
          }
      },
    )

    \"when"(
      "build element middle represent with w1 and inspector data",
      () => {
        mr :=
          ElementVisualTool.buildElementMR(
            service.contents,
            elementName,
            selectedUIControls.contents->Meta3dCommonlib.ListSt.toArray,
            selectedUIControlInspectorData.contents->Meta3dCommonlib.ListSt.toArray,
            // list{},
          )
      },
    )

    \"and"(
      "generate element contribute string",
      () => {
        str := ElementVisualTool.generateElementContributeFileStr(service.contents, mr.contents)
      },
    )

    then(
      "should build correct result",
      () => {
        let configLib = Obj.magic(1)
        mr := _setFakeConfigLib(mr.contents, configLib)

        mr.contents->expect ==
          (
            {
              element: {
                elementName,
                execOrder: 0,
                // elementStateFields: [],
              },
              uiControls: [
                {
                  displayName: w1Name,
                  protocol: {
                    name: "meta3d-ui-control-window-protocol",
                    version: "0.7.0",
                    configLib,
                  },
                  data: selectedUIControlInspectorData.contents
                  ->Meta3dCommonlib.ListSt.head
                  ->Meta3dCommonlib.OptionSt.getExn,
                  children: [],
                },
              ],
            }: ElementMRUtils.elementMR
          )
      },
    )

    \"and"(
      "generate correct result",
      () => {
        str.contents->NewlineTool.unifyNewlineChar->NewlineTool.removeBlankChar->expect ==
          "\nwindow.Contribute = {\n    getContribute: (api) => {\n        return {\n            elementName:\"ElementAssembleElement\",\n            execOrder: 0,\n            elementState: {},\n            elementFunc: (meta3dState, elementState) => {\n                let ui = api.getPackageService(meta3dState, \"meta3d-editor-whole-protocol\").ui(meta3dState)\n\n                let { getUIControlFunc, getInputFunc } = ui\n\n    let Window1 = getUIControlFunc(meta3dState,\"Window1\")\n    \n    let input1 = getInputFunc(meta3dState,\"input1\")\n    \n                let data = null\n  if(true){\n                 return Window1(meta3dState,\n        input1,\n                {\n                  ...{rect: {\n    x: 1,\n    y: 0,\n    width: 0,\n    height: 0\n    }},\n        ...{label: \"Window1\",image1:\"aaa\",image2:null,},\n      childrenFunc:(meta3dState) => new Promise((resolve, reject) => resolve(meta3dState))\n                }\n                    ).then(data =>{\n                meta3dState = data[0]\n\n  return new Promise((resolve) => {\n                    resolve(meta3dState)\n                })\n                })}\n  return new Promise((resolve) => {\n                    resolve(meta3dState)\n                })\n  \n            }\n        }\n    }\n}\n  "->NewlineTool.removeBlankChar
      },
    )
  })

  test(.
    "build element middle represent with parent window and child window and generate element contribute string",
    ({given, \"when", \"and", then}) => {
      let w1 = ref(Obj.magic(1))
      let w2 = ref(Obj.magic(1))
      let w1Name = "ParentWindow"
      let w2Name = "ChildWindow"
      let mr = ref(Obj.magic(1))
      let str = ref(Obj.magic(1))
      let selectedUIControls = ref(list{})
      let selectedUIControlInspectorData = ref(list{})
      // let elementStateFields = ref(list{})

      _prepare(given, \"and")

      given(
        "generate ui control window w1, w2",
        () => {
          execGetContributeFuncStub.contents
          ->onCall(0, _)
          ->returns(
            {
              "uiControlName": w1Name,
            },
            _,
          )
          ->ignore

          execGetContributeFuncStub.contents
          ->onCall(1, _)
          ->returns(
            {
              "uiControlName": w2Name,
            },
            _,
          )
          ->ignore

          let windowProtocol: Meta3d.ExtensionFileType.contributeProtocolData = {
            name: "meta3d-ui-control-window-protocol",
            version: "0.7.0",
          }

          w1 :=
            ContributeTool.buildContributeData(
              ~contributePackageData=ContributeTool.buildContributePackageData(
                ~protocol=windowProtocol,
                (),
              ),
              (),
            )
          w2 :=
            ContributeTool.buildContributeData(
              ~contributePackageData=ContributeTool.buildContributePackageData(
                ~protocol=windowProtocol,
                (),
              ),
              (),
            )
        },
      )

      \"and"(
        "select w1",
        () => {
          ()
        },
      )

      \"and"(
        "select selected w1",
        () => {
          ()
        },
      )

      \"and"(
        "select w2",
        () => {
          selectedUIControls :=
            list{
              SelectedUIControlsTool.buildSelectedUIControl(
                ~id="w1",
                ~children=list{
                  SelectedUIControlsTool.buildSelectedUIControl(
                    ~id="w2",
                    ~children=list{},
                    ~protocolConfigStr=UIControlProtocolConfigTool.buildWindowContributeProtocolConfigStr(),
                    ~data=w2.contents,
                    (),
                  ),
                },
                ~protocolConfigStr=UIControlProtocolConfigTool.buildWindowContributeProtocolConfigStr(),
                ~data=w1.contents,
                (),
              ),
            }

          // selectedUIControls := selectedUIControls.contents->Meta3dCommonlib.ListSt.push(w2)

          // selectedUIControls :=
          //   selectedUIControls.contents->Meta3dCommonlib.ListSt.mapi((
          //     i,
          //     {children} as selectedUIControl: FrontendUtils.ElementAssembleStoreType.uiControl,
          //   ) => {
          //     i === 0
          //       ? {
          //           ...selectedUIControl,
          //           children: list{w2},
          //         }
          //       : selectedUIControl
          //   })
        },
      )

      // \"and"(
      //   "prepare element inspector data",
      //   () => {
      //     elementStateFields :=
      //       list{
      //         ElementInspectorTool.buildElementStateFieldData(
      //           ~name="a1",
      //           ~type_=#int,
      //           ~defaultValue="10",
      //           (),
      //         ),
      //         ElementInspectorTool.buildElementStateFieldData(
      //           ~name="a2",
      //           ~type_=#string,
      //           ~defaultValue="zzz",
      //           (),
      //         ),
      //         ElementInspectorTool.buildElementStateFieldData(
      //           ~name="a3",
      //           ~type_=#bool,
      //           ~defaultValue=false,
      //           (),
      //         ),
      //         ElementInspectorTool.buildElementStateFieldData(
      //           ~name="label",
      //           ~type_=#string,
      //           ~defaultValue="Window2",
      //           (),
      //         ),
      //       }
      //   },
      // )

      \"and"(
        "prepare w1's, w2's inspector data",
        () => {
          selectedUIControlInspectorData :=
            list{
              UIControlInspectorTool.buildUIControlInspectorData(
                ~id="w1",
                ~x=1->FrontendUtils.CommonType.IntForRectField,
                // ~isDraw="a3"->FrontendUtils.ElementAssembleStoreType.ElementStateFieldForIsDraw,
                ~isDraw=true->FrontendUtils.CommonType.BoolForIsDraw,
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
              UIControlInspectorTool.buildUIControlInspectorData(
                ~id="w2",
                // ~x="a2"->FrontendUtils.ElementAssembleStoreType.ElementStateFieldForRectField,
                ~x=2->FrontendUtils.CommonType.IntForRectField,
                ~isDraw=false->FrontendUtils.CommonType.BoolForIsDraw,
                ~specific=[
                  UIControlInspectorTool.buildSpecific(
                    ~name="label",
                    ~type_=#string,
                    // ~value="label"->FrontendUtils.ElementAssembleStoreType.ElementStateFieldForSpecificDataValue,
                    ~value="Window1"->Obj.magic->FrontendUtils.CommonType.SpecicFieldDataValue,
                    (),
                  ),
                ],
                (),
              ),
            }
        },
      )

      \"when"(
        "build element middle represent with w1, w2 and inspector data",
        () => {
          mr :=
            ElementVisualTool.buildElementMR(
              service.contents,
              elementName,
              selectedUIControls.contents->Meta3dCommonlib.ListSt.toArray,
              selectedUIControlInspectorData.contents->Meta3dCommonlib.ListSt.toArray,
              // elementStateFields.contents,
            )
        },
      )

      \"and"(
        "generate element contribute string",
        () => {
          str := ElementVisualTool.generateElementContributeFileStr(service.contents, mr.contents)
        },
      )

      then(
        "should build correct result",
        () => {
          let configLib = Obj.magic(1)
          mr := _setFakeConfigLib(mr.contents, configLib)

          mr.contents->expect ==
            (
              {
                element: {
                  elementName,
                  execOrder: 0,
                  // elementStateFields: elementStateFields.contents->Meta3dCommonlib.ListSt.toArray,
                },
                uiControls: [
                  {
                    displayName: w1Name,
                    protocol: {
                      name: "meta3d-ui-control-window-protocol",
                      version: "0.7.0",
                      configLib,
                    },
                    data: selectedUIControlInspectorData.contents
                    ->Meta3dCommonlib.ListSt.head
                    ->Meta3dCommonlib.OptionSt.getExn,
                    children: [
                      {
                        displayName: w2Name,
                        protocol: {
                          name: "meta3d-ui-control-window-protocol",
                          version: "0.7.0",
                          configLib,
                        },
                        data: selectedUIControlInspectorData.contents
                        ->Meta3dCommonlib.ListSt.getLast
                        ->Meta3dCommonlib.OptionSt.getExn,
                        children: [],
                      },
                    ],
                  },
                ],
              }: ElementMRUtils.elementMR
            )
        },
      )

      \"and"(
        "generate correct result",
        () => {
          str.contents
          ->NewlineTool.unifyNewlineChar
          ->NewlineTool.removeBlankChar
          ->expect == "window.Contribute={getContribute:(api)=>{return{elementName:\"ElementAssembleElement\",execOrder:0,elementState:{},elementFunc:(meta3dState,elementState)=>{let{ui}=api.getPackageService(meta3dState,\"meta3d-editor-whole-protocol\")let {getUIControlFunc}=uiletParentWindow=getUIControlFunc(meta3dState,\"ParentWindow\")letdata=nullif(true){returnParentWindow(meta3dState,{...{rect:{x:1,y:0,width:0,height:0}},...{label:\"Window1\"},childrenFunc:(meta3dState)=>{letChildWindow=getUIControlFunc(meta3dState,\"ChildWindow\")letdata=nullif(false){returnChildWindow(meta3dState,{...{rect:{x:2,y:0,width:0,height:0}},...{label:\"Window1\"},childrenFunc:(meta3dState)=>newPromise((resolve,reject)=>resolve(meta3dState))}).then(data=>{meta3dState=data[0]returnnewPromise((resolve)=>{resolve(meta3dState)})})}returnnewPromise((resolve,reject)=>resolve(meta3dState))}}).then(data=>{meta3dState=data[0]returnnewPromise((resolve)=>{resolve(meta3dState)})})}returnnewPromise((resolve)=>{resolve(meta3dState)})}}}}"
        },
      )
    },
  )

  test(.
    "build element middle represent with parent window w1 and child window w2 and button b1(child of w2) and generate element contribute string",
    ({given, \"when", \"and", then}) => {
      let w1 = ref(Obj.magic(1))
      let w2 = ref(Obj.magic(1))
      let b1 = ref(Obj.magic(1))
      let w1Name = "ParentWindow"
      let w2Name = "ChildWindow"
      let b1Name = "Button"
      let mr = ref(Obj.magic(1))
      let str = ref(Obj.magic(1))
      let selectedUIControls = ref(list{})
      let selectedUIControlInspectorData = ref(list{})
      // let elementStateFields = ref(list{})

      _prepare(given, \"and")

      given(
        "generate ui control window w1, w2",
        () => {
          execGetContributeFuncStub.contents
          ->onCall(0, _)
          ->returns(
            {
              "uiControlName": w1Name,
            },
            _,
          )
          ->ignore

          execGetContributeFuncStub.contents
          ->onCall(1, _)
          ->returns(
            {
              "uiControlName": w2Name,
            },
            _,
          )
          ->ignore

          let windowProtocol: Meta3d.ExtensionFileType.contributeProtocolData = {
            name: "meta3d-ui-control-window-protocol",
            version: "0.7.0",
          }

          w1 :=
            ContributeTool.buildContributeData(
              ~contributePackageData=ContributeTool.buildContributePackageData(
                ~protocol=windowProtocol,
                (),
              ),
              (),
            )
          w2 :=
            ContributeTool.buildContributeData(
              ~contributePackageData=ContributeTool.buildContributePackageData(
                ~protocol=windowProtocol,
                (),
              ),
              (),
            )
        },
      )

      given(
        "generate ui control button b1",
        () => {
          execGetContributeFuncStub.contents
          ->onCall(2, _)
          ->returns(
            {
              "uiControlName": b1Name,
            },
            _,
          )
          ->ignore

          let buttonProtocol: Meta3d.ExtensionFileType.contributeProtocolData = {
            name: "meta3d-ui-control-button-protocol",
            version: "0.6.0",
          }

          b1 :=
            ContributeTool.buildContributeData(
              ~contributePackageData=ContributeTool.buildContributePackageData(
                ~protocol=buttonProtocol,
                (),
              ),
              (),
            )
        },
      )

      \"and"(
        "select w1",
        () => {
          ()
        },
      )

      \"and"(
        "select selected w1",
        () => {
          ()
        },
      )

      \"and"(
        "select w2",
        () => {
          ()
        },
      )

      \"and"(
        "select selected w2",
        () => {
          ()
        },
      )

      \"and"(
        "select b1",
        () => {
          let b1 = SelectedUIControlsTool.buildSelectedUIControl(
            ~id="b1",
            ~children=list{},
            ~protocolConfigStr=UIControlProtocolConfigTool.buildButtonContributeProtocolConfigStr(),
            ~data=b1.contents,
            (),
          )
          let w2 = SelectedUIControlsTool.buildSelectedUIControl(
            ~id="w2",
            ~children=list{b1},
            ~protocolConfigStr=UIControlProtocolConfigTool.buildWindowContributeProtocolConfigStr(),
            ~data=w2.contents,
            (),
          )

          selectedUIControls :=
            list{
              SelectedUIControlsTool.buildSelectedUIControl(
                ~id="w1",
                ~children=list{w2},
                ~protocolConfigStr=UIControlProtocolConfigTool.buildWindowContributeProtocolConfigStr(),
                ~data=w1.contents,
                (),
              ),
            }
        },
      )

      // \"and"("prepare element inspector data", () => {
      //   elementStateFields :=
      //     list{
      //       ElementInspectorTool.buildElementStateFieldData(
      //         ~name="a1",
      //         ~type_=#int,
      //         ~defaultValue="10",
      //         (),
      //       ),
      //       ElementInspectorTool.buildElementStateFieldData(
      //         ~name="a2",
      //         ~type_=#string,
      //         ~defaultValue="zzz",
      //         (),
      //       ),
      //       ElementInspectorTool.buildElementStateFieldData(
      //         ~name="a3",
      //         ~type_=#bool,
      //         ~defaultValue=false,
      //         (),
      //       ),
      //     }
      // })

      \"and"(
        "prepare w1's, w2's, b1's inspector data",
        () => {
          selectedUIControlInspectorData :=
            list{
              UIControlInspectorTool.buildUIControlInspectorData(
                ~id="w1",
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
              UIControlInspectorTool.buildUIControlInspectorData(
                ~id="w2",
                ~specific=[
                  UIControlInspectorTool.buildSpecific(
                    ~name="label",
                    ~type_=#string,
                    ~value="Window2"->Obj.magic->FrontendUtils.CommonType.SpecicFieldDataValue,
                    (),
                  ),
                ],
                (),
              ),
              UIControlInspectorTool.buildUIControlInspectorData(~id="b1", ()),
            }
        },
      )

      \"when"(
        "build element middle represent",
        () => {
          mr :=
            ElementVisualTool.buildElementMR(
              service.contents,
              elementName,
              selectedUIControls.contents->Meta3dCommonlib.ListSt.toArray,
              selectedUIControlInspectorData.contents->Meta3dCommonlib.ListSt.toArray,
              // list{},
            )
        },
      )

      \"and"(
        "generate element contribute string",
        () => {
          str := ElementVisualTool.generateElementContributeFileStr(service.contents, mr.contents)
        },
      )

      then(
        "should build correct result",
        () => {
          let configLib = Obj.magic(1)
          mr := _setFakeConfigLib(mr.contents, configLib)

          mr.contents->expect ==
            (
              {
                element: {
                  elementName,
                  execOrder: 0,
                  // elementStateFields: [],
                },
                uiControls: [
                  {
                    displayName: w1Name,
                    protocol: {
                      name: "meta3d-ui-control-window-protocol",
                      version: "0.7.0",
                      configLib,
                    },
                    data: selectedUIControlInspectorData.contents
                    ->Meta3dCommonlib.ListSt.head
                    ->Meta3dCommonlib.OptionSt.getExn,
                    children: [
                      {
                        displayName: w2Name,
                        protocol: {
                          name: "meta3d-ui-control-window-protocol",
                          version: "0.7.0",
                          configLib,
                        },
                        data: selectedUIControlInspectorData.contents
                        ->Meta3dCommonlib.ListSt.nth(1)
                        ->Meta3dCommonlib.OptionSt.getExn,
                        children: [
                          {
                            displayName: b1Name,
                            protocol: {
                              name: "meta3d-ui-control-button-protocol",
                              version: "0.6.0",
                              configLib,
                            },
                            data: selectedUIControlInspectorData.contents
                            ->Meta3dCommonlib.ListSt.nth(2)
                            ->Meta3dCommonlib.OptionSt.getExn,
                            children: [],
                          },
                        ],
                      },
                    ],
                  },
                ],
              }: ElementMRUtils.elementMR
            )
        },
      )

      \"and"(
        "generate correct result",
        () => {
          str.contents->NewlineTool.unifyNewlineChar->NewlineTool.removeBlankChar->expect ==
            "\nwindow.Contribute = {\n    getContribute: (api) => {        return {\n            elementName:\"ElementAssembleElement\",\n            execOrder: 0,\n            elementState: {},\n                        elementFunc: (meta3dState, elementState) => {\n                let { getUIControlFunc } = api.getPackageService(meta3dState, \"meta3d-ui-protocol\")\n\n                let ParentWindow = getUIControlFunc(meta3dState,\"ParentWindow\")\n    \n                let data = null\n  if(true){\n                 return ParentWindow(meta3dState,\n                {\n                  ...{rect: {\n    x: 0,\n    y: 0,\n    width: 0,\n    height: 0\n    }},\n        ...{label: \"Window1\"},\n      childrenFunc: (meta3dState) =>{\n                let meta3dState = api.getExtensionState(meta3dState, \"meta3d-ui-protocol\")\n    \n    let ChildWindow = getUIControlFunc(meta3dState,\"ChildWindow\")\n    \n                let data = null\n  if(true){\n                 return ChildWindow(meta3dState,\n                {\n                  ...{rect: {\n    x: 0,\n    y: 0,\n    width: 0,\n    height: 0\n    }},\n        ...{label: \"Window2\"},\n      childrenFunc: (meta3dState) =>{\n                let meta3dState = api.getExtensionState(meta3dState, \"meta3d-ui-protocol\")\n    \n    let Button = getUIControlFunc(meta3dState,\"Button\")\n    \n                let data = null\n  if(true){\n                 return Button(meta3dState,\n                {\n                  ...{rect: {\n    x: 0,\n    y: 0,\n    width: 0,\n    height: 0\n    }},\n        ...{},\n      childrenFunc:(meta3dState) => new Promise((resolve, reject) => resolve(meta3dState))\n                }\n                    ).then(data =>{\n                meta3dState = data[0]\n\n  return new Promise((resolve) => {\n                    resolve(meta3dState)\n                })\n                })}\n        return new Promise((resolve, reject) => resolve(meta3dState))\n        }\n                }\n                    ).then(data =>{\n                meta3dState = data[0]\n\n  return new Promise((resolve) => {\n                    resolve(meta3dState)\n                })\n                })}\n        return new Promise((resolve, reject) => resolve(meta3dState))\n        }\n                }\n                    ).then(data =>{\n                meta3dState = data[0]\n\n  return new Promise((resolve) => {\n                    resolve(meta3dState)\n                })\n                })}\n  return new Promise((resolve) => {\n                    resolve(meta3dState)\n                })\n  \n            }\n        }\n    }\n}\n  "->NewlineTool.removeBlankChar
        },
      )
    },
  )
})
