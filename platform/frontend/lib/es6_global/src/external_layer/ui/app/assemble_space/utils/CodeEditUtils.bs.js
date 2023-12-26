

import * as Js_string from "../../../../../../../../../../node_modules/rescript/lib/es6/js_string.js";
import * as CustomCodeUtils$Frontend from "../components/element_assemble/utils/CustomCodeUtils.bs.js";

var getCurrentCustomInputNameFromGlobal = (function (){
return globalThis.elementAssembleStore_currentCustomInputName 
});

var setCurrentCustomInputNameToGlobal = (function (currentCustomInputName){
globalThis.elementAssembleStore_currentCustomInputName = currentCustomInputName
});

var getCurrentCustomActionNameFromGlobal = (function (){
return globalThis.elementAssembleStore_currentCustomActionName 
});

var setCurrentCustomActionNameToGlobal = (function (currentCustomActionName){
globalThis.elementAssembleStore_currentCustomActionName = currentCustomActionName
});

function _convertCodeToUMD(code) {
  return Js_string.replace("export let getContribute = (api) => {", "window.Contribute = {\n    getContribute: (api) => {\n", code) + "}";
}

function removeSemicolon(code) {
  return Js_string.replaceByRe(/\};/g, "}", code);
}

function convertTranspliedCodeToUMDCode(code) {
  return removeSemicolon(_convertCodeToUMD(code));
}

function convertTranspliedCodeToES6Code(code) {
  return CustomCodeUtils$Frontend.addType("import { api } from \"meta3d-type\"\nimport { service as editorWholeService } from \"meta3d-editor-whole-protocol/src/service/ServiceType\"\n\n" + Js_string.replace("export let getContribute = (api) => {", "export let getContribute = (api:api) => {", code));
}

export {
  getCurrentCustomInputNameFromGlobal ,
  setCurrentCustomInputNameToGlobal ,
  getCurrentCustomActionNameFromGlobal ,
  setCurrentCustomActionNameToGlobal ,
  _convertCodeToUMD ,
  removeSemicolon ,
  convertTranspliedCodeToUMDCode ,
  convertTranspliedCodeToES6Code ,
}
/* No side effect */
