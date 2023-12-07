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
          "//import{stateasmeta3dState}from\"meta3d-type\"//import{nullable}from\"meta3d-commonlib-ts/src/nullable\"varrunActionName=\"Run\";exportvargetContribute=function(api){return{inputName:\"RunStopButtonInput\",func:function(meta3dState){varrunState=api.action.getActionState(meta3dState,runActionName);if(api.nullable.isNullable(runState)){returnPromise.resolve(false);}runState=api.nullable.getExn(runState);returnPromise.resolve(runState.isRun);}};};"
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
          "//import{stateasmeta3dState}from\"meta3d-type\"//import{nullable}from\"meta3d-commonlib-ts/src/nullable\"varrunActionName=\"Run\";varfunc1Utils2=function(){return1;};functionfunc2(){return2;}varfunc1Utils1=function(){returnfunc1Utils2()+func2()>3;//returntrue};exportvargetContribute=function(api){return{inputName:\"RunStopButtonInput\",func:function(meta3dState){varrunState=api.action.getActionState(meta3dState,runActionName);if(api.nullable.isNullable(runState)){returnPromise.resolve(false);}//runState=api.nullable.getExn(runState)returnPromise.resolve(func1Utils1());}};};"
          ->NewlineTool.unifyNewlineChar
          ->NewlineTool.removeBlankChar
      },
    )
  })
})
