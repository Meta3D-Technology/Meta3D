let getInputName = inputFileStr => {
  (
    inputFileStr
    ->Js.String.match_(%re("/inputName\:.*\"(.+)\",/im"), _)
    ->Meta3dCommonlib.OptionSt.getExn
  )[1]->Meta3dCommonlib.OptionSt.getExn
}

let getActionName = actionFileStr => {
  actionFileStr->Js.String.includes("actionName: actionName", _)
    ? (
        actionFileStr
        ->Js.String.match_(%re("/var\sactionName\s\=\s\"(.+)\"/im"), _)
        ->Meta3dCommonlib.OptionSt.getExn
      )[1]->Meta3dCommonlib.OptionSt.getExn
    : (
        actionFileStr
        ->Js.String.match_(%re("/actionName\:\s*\"(.+)\",/im"), _)
        ->Meta3dCommonlib.OptionSt.getExn
      )[1]->Meta3dCommonlib.OptionSt.getExn
}
