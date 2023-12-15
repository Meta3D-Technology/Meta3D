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

// let _buildSplitor = () => "-meta3d-custom-fileStr-split-"

// let buildContributeFileStr = (originFileStr, transpiledFileStr) => {
//   j`${originFileStr}${_buildSplitor()}${transpiledFileStr}`
// }

// let getFileStrDataFromContributeFileStr = contributeFileStr => {
//   let result = contributeFileStr->Js.String.split(_buildSplitor(), _)

//   (result->Meta3dCommonlib.ArraySt.getExn(0), result->Meta3dCommonlib.ArraySt.getExn(1))
// }
