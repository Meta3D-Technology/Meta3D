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

  test(."bundle source which has url-loader import", ({given, \"when", \"and", then}) => {
    let filePath = "./test/test_files/test3/ImportUrlLoader.ts"

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
          `var glb = "data:image/png;base64,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"
    console.log(glb);
    `
          ->NewlineTool.unifyNewlineChar
          ->NewlineTool.removeBlankChar
      },
    )
  })
})
