let getInputName = inputFileStr => {
  inputFileStr
  ->Js.String.match_(%re("/inputName\:.*\"(.+)\",/im"), _)
  ->Meta3dCommonlib.OptionSt.bind(result => {
    result[1]
  })
}

let getActionName = actionFileStr => {
  actionFileStr->Js.String.includes("actionName: actionName", _)
    ? actionFileStr
      ->Js.String.match_(%re("/actionName\s\=\s\"(.+)\"/im"), _)
      ->Meta3dCommonlib.OptionSt.bind(result => {
        result[1]
      })
    : actionFileStr
      ->Js.String.match_(%re("/actionName\:\s*\"(.+)\",/im"), _)
      ->Meta3dCommonlib.OptionSt.bind(result => {
        result[1]
      })
}
