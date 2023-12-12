
  let getInputName = inputFileStr => {
    (
      inputFileStr
      ->Js.String.match_(%re("/inputName\:.*\"(.+)\",/im"), _)
      ->Meta3dCommonlib.OptionSt.getExn
    )[1]->Meta3dCommonlib.OptionSt.getExn
  }
