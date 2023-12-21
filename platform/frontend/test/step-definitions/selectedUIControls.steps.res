open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

open Js.Promise

let feature = loadFeature("./test/features/selectedUIControls.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  let _prepare = given => {
    given("prepare", () => {
      sandbox := createSandbox()
    })
  }

  test(."convert to tree data", ({given, \"when", \"and", then}) => {
    let id1 = "i1"
    let id2 = "i2"
    let displayName2 = "d2"
    let label1 = "label1"
    let result = ref(Obj.magic(1))
    let selectedUIControls = ref(Obj.magic(1))
    let selectedUIControlInspectorData = ref(Obj.magic(1))
    let useSelectorStub = ref(Obj.magic(1))

    _prepare(given)

    given(
      "prepare selected ui controls",
      () => {
        selectedUIControls :=
          list{
            SelectedUIControlsTool.buildSelectedUIControl(
              ~children=list{
                SelectedUIControlsTool.buildSelectedUIControl(
                  ~displayName=displayName2,
                  ~children=list{},
                  ~id=id2,
                  (),
                ),
              },
              ~id=id1,
              (),
            ),
          }
      },
    )

    \"and"(
      "prepare selected ui control inspector data",
      () => {
        selectedUIControlInspectorData :=
          list{
            UIControlInspectorTool.buildUIControlInspectorData(
              ~specific=[
                UIControlInspectorTool.buildSpecific(
                  ~name="label",
                  ~type_=#string,
                  ~value=label1->Obj.magic->CommonType.SpecicFieldDataValue,
                  (),
                ),
              ],
              ~id=id1,
              ~children=list{UIControlInspectorTool.buildUIControlInspectorData(~id=id2, ())},
              (),
            ),
          }
      },
    )

    \"when"(
      "convert to tree data",
      () => {
        result :=
          SelectedUIControlsTool.convertToTreeData(
            ServiceTool.build(~sandbox, ()),
            selectedUIControls.contents,
            selectedUIControlInspectorData.contents,
          )
      },
    )

    then(
      "title should show label of selected ui control inspector data first then fallback to displayName of selected ui controls",
      () => {
        (
          result.contents->Meta3dCommonlib.ArraySt.length,
          (result.contents->Meta3dCommonlib.ArraySt.getExn(0): Antd.Tree.treeData).title
          ->Obj.magic
          ->Js.Json.stringify
          ->Js.String.includes(label1, _),
          (
            (
              result.contents->Meta3dCommonlib.ArraySt.getExn(0): Antd.Tree.treeData
            ).children->Meta3dCommonlib.ArraySt.getExn(0): Antd.Tree.treeData
          ).title
          ->Obj.magic
          ->Js.Json.stringify
          ->Js.String.includes(displayName2, _),
        )->expect == (1, true, true)
      },
    )
  })
})
