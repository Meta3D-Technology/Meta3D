open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/elementMR.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  let _prepare = (given, \"and") => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()
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
            ~data=b1.contents,
            (),
          ),
          SelectedUIControlsTool.buildSelectedUIControl(~id="b2", ~data=b2.contents, ()),
        }
    })

    \"and"("prepare b1's, b2's inspector data", () => {
      selectedUIControlInspectorData :=
        list{
          UIControlInspectorTool.buildSelectedUIControlInspectorData(~id="b1", ~x=1, ()),
          UIControlInspectorTool.buildSelectedUIControlInspectorData(~id="b2", ~x=2, ()),
        }
    })

    \"when"("build element middle represent with b1, b2 and their inspector data", () => {
      mr :=
        UIVisualTool.buildElementMR(
          selectedUIControls.contents->Meta3dCommonlib.ListSt.toArray,
          selectedUIControlInspectorData.contents->Meta3dCommonlib.ListSt.toArray,
        )
    })

    \"and"("generate element contribute string", () => {
      str := UIVisualTool.generateElementContributeFileStr(mr.contents)
    })

    then("should build correct result", () => {
      mr.contents->expect ==
        (
          {
            element: {
              elementName: "UIViewElement",
              execOrder: 0,
            },
            uiControls: [
              {
                protocol: {
                  name: "meta3d-ui-control-button-protocol",
                  version: "0.5.0",
                },
                data: selectedUIControlInspectorData.contents
                ->Meta3dCommonlib.ListSt.head
                ->Meta3dCommonlib.OptionSt.getExn,
              },
              {
                protocol: {
                  name: "meta3d-ui-control-button-protocol",
                  version: "0.5.0",
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
      str.contents->expect == "\nwindow.Contribute = {\n    getContribute: (api, [dependentExtensionNameMap, _]) => {\n        let { meta3dUIExtensionName } = dependentExtensionNameMap\n\n        return {\n            elementName:\"UIViewElement\",\n            execOrder: 0,\n            elementState: null,\n            elementFunc: (meta3dState, elementState) => {\n                let { getUIControl } = api.getExtensionService(meta3dState, meta3dUIExtensionName)\n\n                let uiState = api.getExtensionState(meta3dState, meta3dUIExtensionName)\n\n    let Button = getUIControl(uiState,\"Button\")\n    \n                let data = null\n  \n                data = Button(meta3dState,\n                    \n  {\n    rect: {\"x\":1,\"y\":0,\"width\":0,\"height\":0}\n  }\n  )\n                meta3dState = data[0]\n    \n                data = Button(meta3dState,\n                    \n  {\n    rect: {\"x\":2,\"y\":0,\"width\":0,\"height\":0}\n  }\n  )\n                meta3dState = data[0]\n    \n  return new Promise((resolve) => {\n                    resolve(meta3dState)\n                })\n  \n            }\n        }\n    }\n}\n  "
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
        list{SelectedUIControlsTool.buildSelectedUIControl(~id="b1", ~data=b1.contents, ())}
    })

    \"and"("prepare b1's inspector data", () => {
      selectedUIControlInspectorData :=
        list{
          UIControlInspectorTool.buildSelectedUIControlInspectorData(
            ~id="b1",
            ~x=1,
            ~event=[UIControlInspectorTool.buildEventData(#click, "a1")],
            (),
          ),
        }
    })

    \"when"("build element middle represent with b1 and their inspector data", () => {
      mr :=
        UIVisualTool.buildElementMR(
          selectedUIControls.contents->Meta3dCommonlib.ListSt.toArray,
          selectedUIControlInspectorData.contents->Meta3dCommonlib.ListSt.toArray,
        )
    })

    \"and"("generate element contribute string", () => {
      str := UIVisualTool.generateElementContributeFileStr(mr.contents)
    })

    then("should build correct result", () => {
      mr.contents->expect ==
        (
          {
            element: {
              elementName: "UIViewElement",
              execOrder: 0,
            },
            uiControls: [
              {
                protocol: {
                  name: "meta3d-ui-control-button-protocol",
                  version: "0.5.0",
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
      str.contents->expect == "\nwindow.Contribute = {\n    getContribute: (api, [dependentExtensionNameMap, _]) => {\n        let { meta3dUIExtensionName } = dependentExtensionNameMap\n\n        return {\n            elementName:\"UIViewElement\",\n            execOrder: 0,\n            elementState: null,\n            elementFunc: (meta3dState, elementState) => {\n                let { getUIControl } = api.getExtensionService(meta3dState, meta3dUIExtensionName)\n\n                let uiState = api.getExtensionState(meta3dState, meta3dUIExtensionName)\n\n    let Button = getUIControl(uiState,\"Button\")\n    \n                let data = null\n  \n                data = Button(meta3dState,\n                    \n  {\n    rect: {\"x\":1,\"y\":0,\"width\":0,\"height\":0}\n  }\n  )\n                meta3dState = data[0]\n    \n            let isClick = data[1]\n            if (isClick) {\n                let { trigger } = api.getExtensionService(meta3dState, meta3dEventExtensionName)\n\n                return trigger(meta3dState, meta3dEventExtensionName, \"a1\", null)\n            }\n\n  return new Promise((resolve) => {\n                    resolve(meta3dState)\n                })\n  \n            }\n        }\n    }\n}\n  "
    })
  })
})
