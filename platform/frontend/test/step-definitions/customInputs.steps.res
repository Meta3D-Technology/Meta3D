open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/customInputs.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  let _prepare = given => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()

      //   TextareaTool.markNotShowTextareaForTest()
    })
  }

  test(."add custom input", ({given, \"when", \"and", then}) => {
    let dispatchStub = ref(Obj.magic(1))
    let customInputs = ref(Obj.magic(1))
    let originFileStr = ref(Obj.magic(1))
    let transpiledFileStr = ref(Obj.magic(1))

    _prepare(given)

    given(
      "build custom inputs",
      () => {
        customInputs :=
          list{CustomTool.buildCustomInput(~name="Input1", ~originFileStr="f1"->Some, ())}
      },
    )

    \"when"(
      "add custom input",
      () => {
        dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        CustomTool.addCustom(
          dispatchStub.contents,
          {
            customInput => {
              originFileStr := customInput.originFileStr
              transpiledFileStr := customInput.transpiledFileStr
            }
          },
          CustomTool.buildDefaultInputOriginFileStr,
          CustomTool.buildDefaultInputTranspiledFileStr,
          "Input",
          customInputs.contents,
        )
      },
    )

    then(
      "should generate input name and default file str",
      () => {
        (
          originFileStr.contents->Meta3dCommonlib.OptionSt.getExn->NewlineTool.removeBlankChar,
          transpiledFileStr.contents->Meta3dCommonlib.OptionSt.map(NewlineTool.removeBlankChar),
        )->expect ==
          (
            {
              j`import { api } from "meta3d-type"
import { service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"
      
      export let getContribute = (api:api) => {
            return {
              inputName: "Input2",
              func: (meta3dState) =>{
                  return Promise.resolve(null)
              }
            }
          }`
            }->NewlineTool.removeBlankChar,
            {
              j`window.Contribute = {
    getContribute: (api) => {
      return {
        inputName: "Input2",
        func: (meta3dState) =>{
            return Promise.resolve(null)
        }
      }
    }
}`
            }
            ->NewlineTool.removeBlankChar
            ->Some,
          )
      },
    )
  })
})
