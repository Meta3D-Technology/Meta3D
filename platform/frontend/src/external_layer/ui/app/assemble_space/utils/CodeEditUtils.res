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
}

let removeSemicolon = code => {
  code->Js.String.replaceByRe(%re("/\};/g"), "}", _)
}

let convertTranspliedCodeToUMDCode = code => {
  code->_convertCodeToUMD->removeSemicolon
}

let convertTranspliedCodeToES6Code = code => {
  let _func = (code, replaceSource) => {
    code->Js.String.replace(
      replaceSource,
      {
        j`import { api } from "meta3d-type"

export let getContribute = (api:api) => {`
      },
      _,
    )
  }

  code->_func("export let getContribute = (api) => {")
}
