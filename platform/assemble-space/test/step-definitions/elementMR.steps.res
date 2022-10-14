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

  let _setFakeConfigLib = (mr: ElementMRUtils.elementMR, configLib) => {
    {
      ...mr,
      uiControls: mr.uiControls->Meta3dCommonlib.ArraySt.map(({protocol} as uiControl) => {
        {
          ...uiControl,
          protocol: {
            ...protocol,
            configLib: configLib,
          },
        }
      }),
    }
  }

  let _prepare = (given, \"and") => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()

      service :=
        ServiceTool.build(
          ~sandbox,
          ~serializeUIControlProtocolConfigLib=Meta3d.Main.serializeUIControlProtocolConfigLib->Obj.magic,
          ~generateUIControlName=Meta3d.Main.generateUIControlName->Obj.magic,
          ~generateUIControlDataStr=Meta3d.Main.generateUIControlDataStr->Obj.magic,
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
    let mr = ref(Obj.magic(1))
    let str = ref(Obj.magic(1))
    let selectedUIControls = ref(list{})
    let selectedUIControlInspectorData = ref(list{})
    let elementStateFields = ref(list{})

    _prepare(given, \"and")

    given("generate ui control button b1, b2", () => {
      let buttonProtocol: Meta3d.ExtensionFileType.contributeProtocolData = {
        name: "meta3d-ui-control-button-protocol",
        version: "0.5.0",
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
        }
    })

    \"and"("prepare b1's, b2's inspector data", () => {
      selectedUIControlInspectorData :=
        list{
          UIControlInspectorTool.buildUIControlInspectorData(
            ~id="b1",
            ~x=1->FrontendUtils.ElementAssembleStoreType.Int,
            (),
          ),
          UIControlInspectorTool.buildUIControlInspectorData(
            ~id="b2",
            ~x="a2"->FrontendUtils.ElementAssembleStoreType.ElementStateField,
            (),
          ),
        }
    })

    \"when"("build element middle represent with b1, b2 and inspector data", () => {
      mr :=
        ElementVisualTool.buildElementMR(
          service.contents,
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
              elementName: "ElementAssembleElement",
              execOrder: 0,
              elementStateFields: elementStateFields.contents->Meta3dCommonlib.ListSt.toArray,
              reducers: ReducerTool.buildReducers(),
            },
            uiControls: [
              {
                protocol: {
                  name: "meta3d-ui-control-button-protocol",
                  version: "0.5.0",
                  configLib: configLib,
                },
                data: selectedUIControlInspectorData.contents
                ->Meta3dCommonlib.ListSt.head
                ->Meta3dCommonlib.OptionSt.getExn,
              },
              {
                protocol: {
                  name: "meta3d-ui-control-button-protocol",
                  version: "0.5.0",
                  configLib: configLib,
                },
                data: selectedUIControlInspectorData.contents
                ->Meta3dCommonlib.ListSt.getLast
                ->Meta3dCommonlib.OptionSt.getExn,
              },
            ],
          }: ElementMRUtils.elementMR
        )
    })

    \"and"("generate correct result", () => {
      str.contents->expect == "\nwindow.Contribute = {\n    getContribute: (api, [dependentExtensionNameMap, _]) => {\n        let { meta3dUIExtensionName, meta3dEventExtensionName } = dependentExtensionNameMap\n\n        return {\n            elementName:\"ElementAssembleElement\",\n            execOrder: 0,\n            elementState: {\"a1\":10,\"a2\":\"zzz\"},\n            reducers: null,\n            elementFunc: (meta3dState, elementState) => {\n                let { getUIControl } = api.getExtensionService(meta3dState, meta3dUIExtensionName)\n\n                let uiState = api.getExtensionState(meta3dState, meta3dUIExtensionName)\n\n    let Button = getUIControl(uiState,\"Button\")\n    \n                let data = null\n  \n                data = Button(meta3dState,\n                    {    rect: {\n    x: 1,\n    y: 0,\n    width: 0,\n    height: 0\n    }})\n                meta3dState = data[0]\n    \n                data = Button(meta3dState,\n                    {    rect: {\n    x: elementState.a2,\n    y: 0,\n    width: 0,\n    height: 0\n    }})\n                meta3dState = data[0]\n    \n  return new Promise((resolve) => {\n                    resolve(meta3dState)\n                })\n  \n            }\n        }\n    }\n}\n  "
    })
  })

  test(."build element middle represent with event and generate element contribute string", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let b1 = ref(Obj.magic(1))
    let mr = ref(Obj.magic(1))
    let str = ref(Obj.magic(1))
    let selectedUIControls = ref(list{})
    let selectedUIControlInspectorData = ref(list{})

    _prepare(given, \"and")

    given("generate ui control button b1", () => {
      let buttonProtocol: Meta3d.ExtensionFileType.contributeProtocolData = {
        name: "meta3d-ui-control-button-protocol",
        version: "0.5.0",
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
            ~x=1->FrontendUtils.ElementAssembleStoreType.Int,
            ~event=[UIControlInspectorTool.buildEventData(#click, "a1")],
            (),
          ),
        }
    })

    \"when"("build element middle represent with b1 and inspector data", () => {
      mr :=
        ElementVisualTool.buildElementMR(
          service.contents,
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
              elementName: "ElementAssembleElement",
              execOrder: 0,
              elementStateFields: [],
              reducers: ReducerTool.buildReducers(),
            },
            uiControls: [
              {
                protocol: {
                  name: "meta3d-ui-control-button-protocol",
                  version: "0.5.0",
                  configLib: configLib,
                },
                data: selectedUIControlInspectorData.contents
                ->Meta3dCommonlib.ListSt.head
                ->Meta3dCommonlib.OptionSt.getExn,
              },
            ],
          }: ElementMRUtils.elementMR
        )
    })

    \"and"("generate correct result", () => {
      str.contents->expect == "\nwindow.Contribute = {\n    getContribute: (api, [dependentExtensionNameMap, _]) => {\n        let { meta3dUIExtensionName, meta3dEventExtensionName } = dependentExtensionNameMap\n\n        return {\n            elementName:\"ElementAssembleElement\",\n            execOrder: 0,\n            elementState: {},\n            reducers: null,\n            elementFunc: (meta3dState, elementState) => {\n                let { getUIControl } = api.getExtensionService(meta3dState, meta3dUIExtensionName)\n\n                let uiState = api.getExtensionState(meta3dState, meta3dUIExtensionName)\n\n    let Button = getUIControl(uiState,\"Button\")\n    \n                let data = null\n  \n                data = Button(meta3dState,\n                    {    rect: {\n    x: 1,\n    y: 0,\n    width: 0,\n    height: 0\n    }})\n                meta3dState = data[0]\n    handle click event code...\n  return new Promise((resolve) => {\n                    resolve(meta3dState)\n                })\n  \n            }\n        }\n    }\n}\n  "
    })
  })

  test(."build element middle represent with reducer and generate element contribute string", ({
    given,
    \"when",
    \"and",
    then,
  }) => {
    let b1 = ref(Obj.magic(1))
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
      mr := ElementVisualTool.buildElementMR(service.contents, [], [], (list{}, reducers.contents))
    })

    \"and"("generate element contribute string", () => {
      str := ElementVisualTool.generateElementContributeFileStr(service.contents, mr.contents)
    })

    then("should build correct result", () => {
      mr.contents.element.reducers->expect == reducers.contents
    })

    \"and"("generate correct result", () => {
      str.contents->expect == "\nwindow.Contribute = {\n    getContribute: (api, [dependentExtensionNameMap, _]) => {\n        let { meta3dUIExtensionName, meta3dEventExtensionName } = dependentExtensionNameMap\n\n        return {\n            elementName:\"ElementAssembleElement\",\n            execOrder: 0,\n            elementState: {},\n            reducers: {\"role\":\"role1\",\"handlers\":[{\"actionName\":\"action1\",\"updatedElementStateFieldName\":\"x\"}]},\n            elementFunc: (meta3dState, elementState) => {\n                let { getUIControl } = api.getExtensionService(meta3dState, meta3dUIExtensionName)\n\n                let uiState = api.getExtensionState(meta3dState, meta3dUIExtensionName)\n\n                let data = null\n  \n  return new Promise((resolve) => {\n                    resolve(meta3dState)\n                })\n  \n            }\n        }\n    }\n}\n  "
    })
  })
})
