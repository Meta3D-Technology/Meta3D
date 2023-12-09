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
    let newCode = ref(Obj.magic(1))

    _prepare(given)

    given(
      "build input name and new code",
      () => {
        inputName := "InputName1"
        newCode :=
          j`export var getContribute = (api) => {
    return {
        inputName:"${newInputName}",
        func: (meta3dState) => {
            return Promise.resolve(meta3dState)
        }
    }
}`
      },
    )

    \"when"(
      "get new code",
      () => {
        dispatchStub := createEmptyStub(refJsObjToSandbox(sandbox.contents))

        CustomInputCodeEditTool.getNewCode(
          dispatchStub.contents,
          inputName.contents,
          newCode.contents,
        )
      },
    )

    then(
      "should convert new code",
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
          FrontendUtils.ElementAssembleStoreType.UpdateCustomInputFileStr(
            inputName.contents,
            newInputName,
            "window.Contribute = {\n    getContribute: (api) => {\n\n    return {\n        inputName:\"NewInputName1\",\n        func: (meta3dState) => {\n            return Promise.resolve(meta3dState)\n        }\n    }\n}}",
          )
      },
    )
  })
})
