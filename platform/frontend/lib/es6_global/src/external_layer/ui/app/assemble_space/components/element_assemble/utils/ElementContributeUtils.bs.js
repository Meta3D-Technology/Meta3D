

import * as ElementUtils$Frontend from "../../../../utils/utils/ElementUtils.bs.js";
import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as ElementMRUtils$Frontend from "../element_visual/utils/ElementMRUtils.bs.js";

function getElementContributeName(param) {
  return "meta3d-element-assemble-element";
}

function getElementContributeRepoLink(param) {
  return "";
}

function getElementContributeDescription(param) {
  return "element contribute";
}

function buildElementContributeFileStr(service, selectedUIControls, selectedUIControlInspectorData) {
  return ElementMRUtils$Frontend.generateElementContributeFileStr(service, ElementMRUtils$Frontend.buildElementMR(service, "meta3d-element-assemble-element", ListSt$Meta3dCommonlib.toArray(selectedUIControls), ListSt$Meta3dCommonlib.toArray(selectedUIControlInspectorData)));
}

var getElementContributeProtocolName = ElementUtils$Frontend.getElementContributeProtocolName;

export {
  getElementContributeName ,
  getElementContributeProtocolName ,
  getElementContributeRepoLink ,
  getElementContributeDescription ,
  buildElementContributeFileStr ,
}
/* No side effect */
