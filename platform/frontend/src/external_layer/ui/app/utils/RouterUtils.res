let _getUrlPrefix = () => {
  switch EnvUtils.getEnv() {
  | #local => ""
//   | #production => "/meta3d/dist/index.html"
  | #production => ""
  }
}

let pushUrl = url => {
  RescriptReactRouter.push(`${_getUrlPrefix()}${url}`)
}

// let listPath = path => {
//   Meta3dCommonlib.ListSt.fromArray(
//     _getUrlPrefix()->Js.String.split("/", _)->Meta3dCommonlib.ArraySt.push(path),
//   )
// }

let getUrlPath = path => {
  list{Meta3dCommonlib.ListSt.getLast(path) -> Meta3dCommonlib.OptionSt.getWithDefault("")}
}
