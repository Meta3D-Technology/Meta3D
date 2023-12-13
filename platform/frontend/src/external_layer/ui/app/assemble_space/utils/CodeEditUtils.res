let getCurrentCustomInputNameFromGlobal: unit => Js.Nullable.t<string> = %raw(`
function (){
return globalThis.elementAssembleStore_currentCustomInputName 
}
`)

let setCurrentCustomInputNameToGlobal = %raw(`
function (currentCustomInputName){
globalThis.elementAssembleStore_currentCustomInputName = currentCustomInputName
}
`)

let getCurrentCustomActionNameFromGlobal: unit => Js.Nullable.t<string> = %raw(`
function (){
return globalThis.elementAssembleStore_currentCustomActionName 
}
`)

let setCurrentCustomActionNameToGlobal = %raw(`
function (currentCustomActionName){
globalThis.elementAssembleStore_currentCustomActionName = currentCustomActionName
}
`)

let _convertCodeToUMD = code => {
  let _func = (code, replaceSource) => {
    code->Js.String.replace(
      replaceSource,
      {
        j`window.Contribute = {
    getContribute: (api) => {
`
      },
      _,
    )
  }

  code->_func("export let getContribute = (api) => {") ++ "}"
  // ->_func("export var getContribute = function (api) {")
}

let _removeSemicolon = code => {
  code->Js.String.replaceByRe(%re("/\};/g"), "}", _)
}

let convertToNewCode = code => {
  code->_convertCodeToUMD->_removeSemicolon
}
