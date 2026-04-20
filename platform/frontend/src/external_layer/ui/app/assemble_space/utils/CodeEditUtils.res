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

// let getBeginChangeCountFromGlobal: unit => int = %raw(`
// function (){
// let result = globalThis.elementAssembleStore_beginChangeCountFromGlobal 
// if(result == undefined){
//   return 0
// }
// return result
// }
// `)

// let setBeginChangeCountFromGlobal = %raw(`
// function (beginChangeCount){
// globalThis.elementAssembleStore_beginChangeCountFromGlobal = beginChangeCount
// }
// `)

// let getEndChangeCountFromGlobal: unit => int = %raw(`
// function (){
// let result = globalThis.elementAssembleStore_endChangeCountFromGlobal 
// if(result == undefined){
//   return 0
// }
// return result
// }
// `)

// let setEndChangeCountFromGlobal = %raw(`
// function (endChangeCount){
// globalThis.elementAssembleStore_endChangeCountFromGlobal = endChangeCount
// }
// `)


let getChangeCountFromGlobal: unit => int = %raw(`
function (){
let result = globalThis.elementAssembleStore_changeCountFromGlobal 
if(result == undefined){
  return 0
}
return result
}
`)

let setChangeCountFromGlobal = %raw(`
function (changeCount){
globalThis.elementAssembleStore_changeCountFromGlobal = changeCount
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
        j`export let getContribute = (api:api) => {`
      },
      _,
    )
  }

  ({
    j`import { api } from "meta3d-type"
import { service as editorWholeService } from "meta3d-editor-whole-protocol/src/service/ServiceType"

`
  } ++
  code->_func("export let getContribute = (api) => {"))->CustomCodeUtils.addType
}

let getChangeCodeDataToGlobal = %raw(`
function (){
return globalThis.elementAssembleStore_changeCodeData
}
`)

let setChangeCodeDataToGlobal = %raw(`
function (data){
globalThis.elementAssembleStore_changeCodeData = data
}
`)

let setCurrentCustomNameToGlobal = () => {
  switch getChangeCodeDataToGlobal()->Meta3dCommonlib.OptionSt.fromNullable {
  | Some((customType, oldName, newName, newOriginCode, newTranspiledCode)) =>
    switch customType {
    | CommonType.Action => setCurrentCustomActionNameToGlobal(newName)
    | CommonType.Input => setCurrentCustomInputNameToGlobal(newName)
    }
  | None => ()
  }
}

let addUpdateCustomFileStrTimerToGlobal = %raw(`
function (updateFunc){
  if(globalThis.elementAssembleStore_updateCustomFileStrTimer == undefined || globalThis.elementAssembleStore_updateCustomFileStrTimer === false){
    globalThis.elementAssembleStore_updateCustomFileStrTimer = true

    setTimeout(() =>{
      updateFunc()

      globalThis.elementAssembleStore_updateCustomFileStrTimer = false
    // }, 2000)
    // }, 100)
    }, 16)
  }
}
`)
