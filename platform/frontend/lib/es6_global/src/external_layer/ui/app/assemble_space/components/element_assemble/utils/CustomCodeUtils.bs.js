

import * as Js_string from "../../../../../../../../../../../../node_modules/rescript/lib/es6/js_string.js";

function addType(code) {
  return Js_string.replaceByRe(/api\.getPackageService\(meta3dState,\s"meta3d-editor-whole-protocol"\)/g, "api.getPackageService<editorWholeService>(meta3dState, \"meta3d-editor-whole-protocol\")", code);
}

function convertCodeToES6(code) {
  return addType("import { api } from \"meta3d-type\"\nimport { service as editorWholeService } from \"meta3d-editor-whole-protocol/src/service/ServiceType\"\n" + Js_string.replace("getContribute: (api) => {", "export let getContribute = (api:api) => {", Js_string.replace("window.Contribute = {", "", Js_string.slice(0, code.length - 1 | 0, code))));
}

export {
  addType ,
  convertCodeToES6 ,
}
/* No side effect */
