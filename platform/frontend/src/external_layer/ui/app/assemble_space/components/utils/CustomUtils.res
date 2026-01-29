let getInputName = inputFileStr => {
  inputFileStr
  ->Js.String.match_(%re("/inputName\:.*\"(.+)\",/im"), _)
  ->Meta3dCommonlib.OptionSt.bind(result => {
    result[1]
  })
}

let getActionName = actionFileStr => {
  (
    actionFileStr->Js.String.includes("actionName: actionName", _)
      ? actionFileStr->StringUtils.matchAll(%re("/actionName\s\=\s\"(.+)\"/g"))
      : actionFileStr->StringUtils.matchAll(%re("/actionName\:\s*\"(.+)\",/g"))
  )->Meta3dCommonlib.OptionSt.bind(result => {
    result[result->Meta3dCommonlib.ArraySt.length - 1][1]
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
