open Meta3dBsJestCucumber
open Cucumber
open Expect
open Operators

open Sinon

let feature = loadFeature("./test/features/bundle.feature")

defineFeature(feature, test => {
  let sandbox = ref(Obj.magic(1))
  let source = ref(Obj.magic(1))
  let result = ref(Obj.magic(1))

  let _prepare = given => {
    given("prepare", () => {
      sandbox := createSandbox()
    })
  }

  test(."bundle source which has protocol value import", ({given, \"when", \"and", then}) => {
    let filePath = "./test/test_files/test1/ImportProtocol.ts"

    _prepare(given)

    given(
      "prepare source",
      () => {
        source := Fs.readFileSync(. filePath, "utf-8")
      },
    )

    \"when"(
      "bundle",
      () => {
        result := Main.bundle(filePath->Main.getLocalModulePath(Js.Nullable.null), source.contents)
      },
    )

    then(
      "should compile and bundle it",
      () => {
        result.contents->NewlineTool.unifyNewlineChar->NewlineTool.removeBlankChar->expect ==
          {
            j`// import { state as meta3dState } from "meta3d-type"
    // import { nullable } from "meta3d-commonlib-ts/src/nullable"
    var runActionName = "Run";
    
    export let getContribute = (api) => {
        return {
            inputName: "RunStopButtonInput",
            func: (meta3dState) => {
                let runState = api.action.getActionState(meta3dState, runActionName);
                if (api.nullable.isNullable(runState)) {
                    return Promise.resolve(false);
                }
                runState = api.nullable.getExn(runState);
                return Promise.resolve(runState.isRun);
            }
        };
    };`
          }
          ->NewlineTool.unifyNewlineChar
          ->NewlineTool.removeBlankChar
      },
    )
  })

  test(."bundle source which has utils import", ({given, \"when", \"and", then}) => {
    let filePath = "./test/test_files/test2/ImportUtils.ts"

    _prepare(given)

    given(
      "prepare source",
      () => {
        source := Fs.readFileSync(. filePath, "utf-8")
      },
    )

    \"when"(
      "bundle",
      () => {
        result := Main.bundle(filePath->Main.getLocalModulePath(Js.Nullable.null), source.contents)
      },
    )

    then(
      "should compile and bundle it",
      () => {
        result.contents
        // ->Meta3dCommonlib.Log.printStringForDebug
        ->NewlineTool.unifyNewlineChar
        ->NewlineTool.removeBlankChar
        ->expect ==
          {
            j`// import { state as meta3dState } from "meta3d-type"
    // import { nullable } from "meta3d-commonlib-ts/src/nullable"
    var runActionName = "Run";
    let func1Utils2 = () => {
        return 1;
    };
    function func2Utils2() {
        return 2;
    }
    
    let func1Utils1 = () => {
        return func1Utils2() + func2Utils2() > 3;
        // return true
    };
    
    export let getContribute = (api) => {
        return {
            inputName: "RunStopButtonInput",
            func: (meta3dState) => {
                let runState = api.action.getActionState(meta3dState, runActionName);
                if (api.nullable.isNullable(runState)) {
                    return Promise.resolve(false);
                }
                // runState = api.nullable.getExn(runState)
                return Promise.resolve(func1Utils1());
            }
        };
    };`
          }
          ->NewlineTool.unifyNewlineChar
          ->NewlineTool.removeBlankChar
      },
    )
  })
})
