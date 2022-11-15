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
        configLib: configLib,
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
          ~getSkinProtocolData=Meta3d.Main.getSkinProtocolData->Obj.magic,
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
    let elementStateFields = ref(list{})

    _prepare(given, \"and")

    given("generate ui control button b1, b2", () => {
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
    })

    \"and"("select b1, b2", () => {
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
    })

    \"and"("prepare element inspector data", () => {
      elementStateFields :=
        list{
          ElementInspectorTool.buildElementStateFieldData(
            ~name="a1",
            ~type_=#int,
            ~defaultValue="10",
            (),
          ),
          ElementInspectorTool.buildElementStateFieldData(
            ~name="a2",
            ~type_=#string,
            ~defaultValue="zzz",
            (),
          ),
          ElementInspectorTool.buildElementStateFieldData(
            ~name="a3",
            ~type_=#bool,
            ~defaultValue=false,
            (),
          ),
        }
    })

    \"and"("prepare b1's, b2's inspector data", () => {
      selectedUIControlInspectorData :=
        list{
          UIControlInspectorTool.buildUIControlInspectorData(
            ~id="b1",
            ~x=1->FrontendUtils.ElementAssembleStoreType.IntForRectField,
            ~isDraw="a3"->FrontendUtils.ElementAssembleStoreType.ElementStateFieldForIsDraw,
            ~skin=UIControlInspectorTool.buildSkin("skin1"),
            (),
          ),
          UIControlInspectorTool.buildUIControlInspectorData(
            ~id="b2",
            ~x="a2"->FrontendUtils.ElementAssembleStoreType.ElementStateFieldForRectField,
            ~isDraw=false->FrontendUtils.ElementAssembleStoreType.BoolForIsDraw,
            ~skin=UIControlInspectorTool.buildSkin("skin2"),
            (),
          ),
        }
    })

    \"when"("build element middle represent with b1, b2 and inspector data", () => {
      mr :=
        ElementVisualTool.buildElementMR(
          service.contents,
          elementName,
          selectedUIControls.contents->Meta3dCommonlib.ListSt.toArray,
          selectedUIControlInspectorData.contents->Meta3dCommonlib.ListSt.toArray,
          (elementStateFields.contents, ReducerTool.buildReducers()),
        )
    })

    \"and"("generate element contribute string", () => {
      str := ElementVisualTool.generateElementContributeFileStr(service.contents, mr.contents)
    })

    then("should build correct result", () => {
      let configLib = Obj.magic(1)
      mr := _setFakeConfigLib(mr.contents, configLib)

      mr.contents->expect ==
        (
          {
            element: {
              elementName: elementName,
              execOrder: 0,
              elementStateFields: elementStateFields.contents->Meta3dCommonlib.ListSt.toArray,
              reducers: ReducerTool.buildReducers(),
            },
            uiControls: [
              {
                name: b1Name,
                protocol: {
                  name: "meta3d-ui-control-button-protocol",
                  version: "0.6.0",
                  configLib: configLib,
                },
                data: selectedUIControlInspectorData.contents
                ->Meta3dCommonlib.ListSt.head
                ->Meta3dCommonlib.OptionSt.getExn,
                children: [],
              },
              {
                name: b2Name,
                protocol: {
                  name: "meta3d-ui-control-button-protocol",
                  version: "0.6.0",
                  configLib: configLib,
                },
                data: selectedUIControlInspectorData.contents
                ->Meta3dCommonlib.ListSt.getLast
                ->Meta3dCommonlib.OptionSt.getExn,
                children: [],
              },
            ],
          }: ElementMRUtils.elementMR
        )
    })

    \"and"("generate correct result", () => {
      str.contents->expect == "\nwindow.Contribute = {\n    getContribute: (api, [dependentExtensionNameMap, _]) => {\n        let { meta3dUIExtensionName, meta3dEventExtensionName } = dependentExtensionNameMap\n\n        return {\n            elementName:\"ElementAssembleElement\",\n            execOrder: 0,\n            elementState: {\"a1\":10,\"a2\":\"zzz\",\"a3\":false},\n            reducers: null,\n            elementFunc: (meta3dState, elementState) => {\n                let { getSkin, getUIControl } = api.getExtensionService(meta3dState, meta3dUIExtensionName)\n\n                let uiState = api.getExtensionState(meta3dState, meta3dUIExtensionName)\n\n    let Button1 = getUIControl(uiState,\"Button1\")\n    \n    let Button2 = getUIControl(uiState,\"Button2\")\n    \n                let data = null\n  if(elementState.a3){\n                data = Button1(meta3dState,\n                {\n                  ...{rect: {\n    x: 1,\n    y: 0,\n    width: 0,\n    height: 0\n    }, skin:  getSkin(uiState, \"skin1\").skin },\n        ...{},\n      \n                }\n                    )\n                meta3dState = data[0]\n    }if(false){\n                data = Button2(meta3dState,\n                {\n                  ...{rect: {\n    x: elementState.a2,\n    y: 0,\n    width: 0,\n    height: 0\n    }, skin:  getSkin(uiState, \"skin2\").skin },\n        ...{},\n      \n                }\n                    )\n                meta3dState = data[0]\n    }\n  return new Promise((resolve) => {\n                    resolve(meta3dState)\n                })\n  \n            }\n        }\n    }\n}\n  "
    })
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

    given("generate ui control button b1", () => {
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
    })

    \"and"("select b1", () => {
      selectedUIControls :=
        list{
          SelectedUIControlsTool.buildSelectedUIControl(
            ~id="b1",
            ~protocolConfigStr=UIControlProtocolConfigTool.buildButtonContributeProtocolConfigStr(),
            ~data=b1.contents,
            (),
          ),
        }
    })

    \"and"("prepare b1's inspector data", () => {
      selectedUIControlInspectorData :=
        list{
          UIControlInspectorTool.buildUIControlInspectorData(
            ~id="b1",
            ~x=1->FrontendUtils.ElementAssembleStoreType.IntForRectField,
            ~skin=UIControlInspectorTool.buildSkin("skin1"),
            ~event=[UIControlInspectorTool.buildEventData(#click, "a1")],
            (),
          ),
        }
    })

    \"when"("build element middle represent with b1 and inspector data", () => {
      mr :=
        ElementVisualTool.buildElementMR(
          service.contents,
          elementName,
          selectedUIControls.contents->Meta3dCommonlib.ListSt.toArray,
          selectedUIControlInspectorData.contents->Meta3dCommonlib.ListSt.toArray,
          (list{}, ReducerTool.buildReducers()),
        )
    })

    \"and"("generate element contribute string", () => {
      str := ElementVisualTool.generateElementContributeFileStr(service.contents, mr.contents)
    })

    then("should build correct result", () => {
      let configLib = Obj.magic(1)
      mr := _setFakeConfigLib(mr.contents, configLib)

      mr.contents->expect ==
        (
          {
            element: {
              elementName: elementName,
              execOrder: 0,
              elementStateFields: [],
              reducers: ReducerTool.buildReducers(),
            },
            uiControls: [
              {
                name: b1Name,
                protocol: {
                  name: "meta3d-ui-control-button-protocol",
                  version: "0.6.0",
                  configLib: configLib,
                },
                data: selectedUIControlInspectorData.contents
                ->Meta3dCommonlib.ListSt.head
                ->Meta3dCommonlib.OptionSt.getExn,
                children: [],
              },
            ],
          }: ElementMRUtils.elementMR
        )
    })

    \"and"("generate correct result", () => {
      str.contents->expect == "\nwindow.Contribute = {\n    getContribute: (api, [dependentExtensionNameMap, _]) => {\n        let { meta3dUIExtensionName, meta3dEventExtensionName } = dependentExtensionNameMap\n\n        return {\n            elementName:\"ElementAssembleElement\",\n            execOrder: 0,\n            elementState: {},\n            reducers: null,\n            elementFunc: (meta3dState, elementState) => {\n                let { getSkin, getUIControl } = api.getExtensionService(meta3dState, meta3dUIExtensionName)\n\n                let uiState = api.getExtensionState(meta3dState, meta3dUIExtensionName)\n\n    let Button1 = getUIControl(uiState,\"Button1\")\n    \n                let data = null\n  if(true){\n                data = Button1(meta3dState,\n                {\n                  ...{rect: {\n    x: 1,\n    y: 0,\n    width: 0,\n    height: 0\n    }, skin:  getSkin(uiState, \"skin1\").skin },\n        ...{},\n      \n                }\n                    )\n                meta3dState = data[0]\n    handle click event code...}\n  return new Promise((resolve) => {\n                    resolve(meta3dState)\n                })\n  \n            }\n        }\n    }\n}\n  "
    })
  })

  test(."build element middle represent with reducer and generate element contribute string", ({
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
    let reducers = ref(Obj.magic(1))

    _prepare(given, \"and")

    given("prepare reducers", () => {
      reducers :=
        ReducerTool.buildReducers(
          ~role="role1"->Some,
          ~handlers=list{ReducerTool.buildHandler("action1", "x")},
          (),
        )
    })

    \"when"("build element middle represent with reducers", () => {
      mr :=
        ElementVisualTool.buildElementMR(
          service.contents,
          elementName,
          [],
          [],
          (list{}, reducers.contents),
        )
    })

    \"and"("generate element contribute string", () => {
      str := ElementVisualTool.generateElementContributeFileStr(service.contents, mr.contents)
    })

    then("should build correct result", () => {
      mr.contents.element.reducers->expect == reducers.contents
    })

    \"and"("generate correct result", () => {
      str.contents->expect == "\nwindow.Contribute = {\n    getContribute: (api, [dependentExtensionNameMap, _]) => {\n        let { meta3dUIExtensionName, meta3dEventExtensionName } = dependentExtensionNameMap\n\n        return {\n            elementName:\"ElementAssembleElement\",\n            execOrder: 0,\n            elementState: {},\n            reducers: {\"role\":\"role1\",\"handlers\":[{\"actionName\":\"action1\",\"updatedElementStateFieldName\":\"x\"}]},\n            elementFunc: (meta3dState, elementState) => {\n                let { getSkin, getUIControl } = api.getExtensionService(meta3dState, meta3dUIExtensionName)\n\n                let uiState = api.getExtensionState(meta3dState, meta3dUIExtensionName)\n\n                let data = null\n  \n  return new Promise((resolve) => {\n                    resolve(meta3dState)\n                })\n  \n            }\n        }\n    }\n}\n  "
    })
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
      let elementStateFields = ref(list{})

      _prepare(given, \"and")

      given("generate ui control window w1, w2", () => {
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
      })

      \"and"("select w1", () => {
        selectedUIControls :=
          list{
            SelectedUIControlsTool.buildSelectedUIControl(
              ~id="w1",
              ~protocolConfigStr=UIControlProtocolConfigTool.buildWindowContributeProtocolConfigStr(),
              ~data=w1.contents,
              (),
            ),
          }
      })

      \"and"("select selected w1", () => {
        ()
      })

      \"and"("select w2", () => {
        selectedUIControls :=
          selectedUIControls.contents->Meta3dCommonlib.ListSt.push(
            SelectedUIControlsTool.buildSelectedUIControl(
              ~id="w2",
              ~parentId="w1"->Some,
              ~protocolConfigStr=UIControlProtocolConfigTool.buildWindowContributeProtocolConfigStr(),
              ~data=w2.contents,
              (),
            ),
          )
      })

      \"and"("prepare element inspector data", () => {
        elementStateFields :=
          list{
            ElementInspectorTool.buildElementStateFieldData(
              ~name="a1",
              ~type_=#int,
              ~defaultValue="10",
              (),
            ),
            ElementInspectorTool.buildElementStateFieldData(
              ~name="a2",
              ~type_=#string,
              ~defaultValue="zzz",
              (),
            ),
            ElementInspectorTool.buildElementStateFieldData(
              ~name="a3",
              ~type_=#bool,
              ~defaultValue=false,
              (),
            ),
          }
      })

      \"and"("prepare w1's, w2's inspector data", () => {
        selectedUIControlInspectorData :=
          list{
            UIControlInspectorTool.buildUIControlInspectorData(
              ~id="w1",
              ~x=1->FrontendUtils.ElementAssembleStoreType.IntForRectField,
              ~isDraw="a3"->FrontendUtils.ElementAssembleStoreType.ElementStateFieldForIsDraw,
              ~skin=UIControlInspectorTool.buildSkin("skin1"),
              ~specific=[
                UIControlInspectorTool.buildSpecific(
                  ~name="label",
                  ~type_=#string,
                  ~defaultValue="Window1",
                  (),
                ),
              ],
              (),
            ),
            UIControlInspectorTool.buildUIControlInspectorData(
              ~id="w2",
              ~x="a2"->FrontendUtils.ElementAssembleStoreType.ElementStateFieldForRectField,
              ~isDraw=false->FrontendUtils.ElementAssembleStoreType.BoolForIsDraw,
              ~skin=UIControlInspectorTool.buildSkin("skin2"),
              ~specific=[
                UIControlInspectorTool.buildSpecific(
                  ~name="label",
                  ~type_=#string,
                  ~defaultValue="Window2",
                  (),
                ),
              ],
              (),
            ),
          }
      })

      \"when"("build element middle represent with w1, w2 and inspector data", () => {
        mr :=
          ElementVisualTool.buildElementMR(
            service.contents,
            elementName,
            selectedUIControls.contents->Meta3dCommonlib.ListSt.toArray,
            selectedUIControlInspectorData.contents->Meta3dCommonlib.ListSt.toArray,
            (elementStateFields.contents, ReducerTool.buildReducers()),
          )
      })

      \"and"("generate element contribute string", () => {
        str := ElementVisualTool.generateElementContributeFileStr(service.contents, mr.contents)
      })

      then("should build correct result", () => {
        let configLib = Obj.magic(1)
        mr := _setFakeConfigLib(mr.contents, configLib)

        mr.contents->expect ==
          (
            {
              element: {
                elementName: elementName,
                execOrder: 0,
                elementStateFields: elementStateFields.contents->Meta3dCommonlib.ListSt.toArray,
                reducers: ReducerTool.buildReducers(),
              },
              uiControls: [
                {
                  name: w1Name,
                  protocol: {
                    name: "meta3d-ui-control-window-protocol",
                    version: "0.7.0",
                    configLib: configLib,
                  },
                  data: selectedUIControlInspectorData.contents
                  ->Meta3dCommonlib.ListSt.head
                  ->Meta3dCommonlib.OptionSt.getExn,
                  children: [
                    {
                      name: w2Name,
                      protocol: {
                        name: "meta3d-ui-control-window-protocol",
                        version: "0.7.0",
                        configLib: configLib,
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
      })

      \"and"("generate correct result", () => {
        str.contents->expect == "\nwindow.Contribute = {\n    getContribute: (api, [dependentExtensionNameMap, _]) => {\n        let { meta3dUIExtensionName, meta3dEventExtensionName } = dependentExtensionNameMap\n\n        return {\n            elementName:\"ElementAssembleElement\",\n            execOrder: 0,\n            elementState: {\"a1\":10,\"a2\":\"zzz\",\"a3\":false},\n            reducers: null,\n            elementFunc: (meta3dState, elementState) => {\n                let { getSkin, getUIControl } = api.getExtensionService(meta3dState, meta3dUIExtensionName)\n\n                let uiState = api.getExtensionState(meta3dState, meta3dUIExtensionName)\n\n    let ParentWindow = getUIControl(uiState,\"ParentWindow\")\n    \n                let data = null\n  if(elementState.a3){\n                data = ParentWindow(meta3dState,\n                {\n                  ...{rect: {\n    x: 1,\n    y: 0,\n    width: 0,\n    height: 0\n    }, skin:  getSkin(uiState, \"skin1\").skin },\n        ...{\"label\":\"Window1\"},\n      childrenFunc: (meta3dState) =>{\n    \n    let ChildWindow = getUIControl(uiState,\"ChildWindow\")\n    \n                let data = null\n  if(false){\n                data = ChildWindow(meta3dState,\n                {\n                  ...{rect: {\n    x: elementState.a2,\n    y: 0,\n    width: 0,\n    height: 0\n    }, skin:  getSkin(uiState, \"skin2\").skin },\n        ...{\"label\":\"Window2\"},\n      \n                }\n                    )\n                meta3dState = data[0]\n    }\n        return meta3dState\n        }\n                }\n                    )\n                meta3dState = data[0]\n    }\n  return new Promise((resolve) => {\n                    resolve(meta3dState)\n                })\n  \n            }\n        }\n    }\n}\n  "
      })
    },
  )
})
