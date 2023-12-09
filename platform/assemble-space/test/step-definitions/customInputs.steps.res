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

    _prepare(given)

    given(
      "build custom inputs",
      () => {
        customInputs := list{CustomTool.buildCustomInput(~name="Input1", ~fileStr="f1", ())}
      },
    )

    \"when"(
      "add custom input",
      () => {
        dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        CustomTool.addCustomInput(dispatchStub.contents, customInputs.contents)
      },
    )

    then(
      "should generate input name and default file str",
      () => {
        dispatchStub.contents
        ->Obj.magic
        ->SinonTool.getFirstArg(~callIndex=0, ~stub=_, ())
        ->expect ==
          FrontendUtils.ElementAssembleStoreType.AddCustomInput(
            (
              {
                name: "Input2",
                fileStr: {
                  j`import { api } from "meta3d-type"
    
export let getContribute = (api:api) => {
    return {
        inputName: "Input2",
        func: (meta3dState) => {
            return Promise.resolve(null)
        }
    }
}`
                },
              }: FrontendUtils.ElementAssembleStoreType.customInput
            ),
          )
      },
    )
  })
})
