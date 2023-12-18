open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/customInputCodeEdit.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))

  let _prepare = given => {
    given("prepare", () => {
      sandbox := createSandbox()
      ReactTestTool.prepare()

      // TextareaTool.markNotShowTextareaForTest()
    })
  }

  test(."get new code", ({given, \"when", \"and", then}) => {
    let dispatchStub = ref(Obj.magic(1))
    let inputName = ref(Obj.magic(1))
    let newInputName = "NewInputName1"
    let newOriginCode = ref(Obj.magic(1))
    let newTranspiledCode = ref(Obj.magic(1))

    _prepare(given)

    given(
      "build input name and new code",
      () => {
        inputName := "InputName1"
        newOriginCode :=
          j`export let getContribute = (api) => {
    return {
        inputName:"${newInputName}",
        func: (meta3dState) => {
            return Promise.resolve(meta3dState)
        }
    }
}`
        newTranspiledCode := newOriginCode.contents
      },
    )

    \"when"(
      "get new code",
      () => {
        dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        CustomInputCodeEditTool.getNewCode(
          dispatchStub.contents,
          CustomUtils.getInputName,
          CodeEditUtils.setCurrentCustomInputNameToGlobal,
          (
            name,
            newName,
            newOriginCode,
            newTranspiledCode,
          ) => ElementAssembleStoreType.UpdateCustomInputFileStr(
            name,
            newName,
            newOriginCode,
            newTranspiledCode,
          ),
          inputName.contents,
          newOriginCode.contents,
          newTranspiledCode.contents,
        )
      },
    )

    then(
      "should convert new code to umd",
      () => {
        ()
      },
    )

    \"and"(
      "get new input name from it",
      () => {
        dispatchStub.contents
        ->Obj.magic
        ->SinonTool.getFirstArg(~callIndex=0, ~stub=_, ())
        ->expect ==
          ElementAssembleStoreType.UpdateCustomInputFileStr(
            inputName.contents,
            newInputName,
            // "window.Contribute = {\n    getContribute: (api) => {\n\n    return {\n        inputName:\"NewInputName1\",\n        func: (meta3dState) => {\n            return Promise.resolve(meta3dState)\n        }\n    }\n}}",
            newOriginCode.contents,
            "window.Contribute = {\n    getContribute: (api) => {\n\n    return {\n        inputName:\"NewInputName1\",\n        func: (meta3dState) => {\n            return Promise.resolve(meta3dState)\n        }\n    }\n}}"->Some,
          )
      },
    )
  })

  test(."get code", ({given, \"when", \"and", then}) => {
    let dispatchStub = ref(Obj.magic(1))
    let inputName = ref(Obj.magic(1))
    let customInputs = ref(Obj.magic(1))
    let originFileStr = ref(Obj.magic(1))
    let result = ref(Obj.magic(1))

    _prepare(given)

    given(
      "build input name and custom inputs",
      () => {
        inputName := "InputName1"

        originFileStr :=
          //                 j`window.Contribute = {
          //     getContribute: (api) => {
          //       return {
          //         inputName: "${inputName.contents}",
          //         func: (meta3dState) =>{
          //             return Promise.resolve(null)
          //         }
          //       }
          //     }
          // }`

          j`import { api } from "meta3d-type"

  export let getContribute = (api:api) => {
      return {
          inputName: "${inputName.contents}",
          func: (meta3dState) => {
              return Promise.resolve(null)
          }
      }
  }`

        customInputs :=
          list{
            CustomTool.buildCustomInput(
              ~name=inputName.contents,
              ~originFileStr=originFileStr.contents->Some,
              (),
            ),
          }
      },
    )

    \"when"(
      "get code",
      () => {
        dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        result := CustomInputCodeEditTool.getCode(inputName.contents, customInputs.contents)
      },
    )

    then(
      "should get corresponding file str",
      () => {
        result.contents->expect == originFileStr.contents
      },
    )
  })
})
