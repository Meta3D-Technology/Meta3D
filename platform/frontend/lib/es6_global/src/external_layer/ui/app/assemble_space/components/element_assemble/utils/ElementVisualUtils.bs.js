

import * as Curry from "../../../../../../../../../../../../node_modules/rescript/lib/es6/curry.js";
import * as Js_string from "../../../../../../../../../../../../node_modules/rescript/lib/es6/js_string.js";
import * as AppUtils$Frontend from "../../utils/AppUtils.bs.js";
import * as ElementUtils$Frontend from "../../../../utils/utils/ElementUtils.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as ElementContributeUtils$Frontend from "./ElementContributeUtils.bs.js";
import * as ImmutableHashMap$Meta3dCommonlib from "../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/hash_map/ImmutableHashMap.bs.js";

function _removeElementContribute(selectedContributes) {
  return ArraySt$Meta3dCommonlib.filter(selectedContributes, (function (param) {
                return param.data.contributePackageData.protocol.name !== ElementContributeUtils$Frontend.getElementContributeProtocolName(undefined);
              }));
}

function generateApp(service, param, selectedElements, elementContribute) {
  var match = param[0];
  return AppUtils$Frontend.generateApp(service, [
              match[0],
              match[1]
            ], ArraySt$Meta3dCommonlib.push(_removeElementContribute(param[2]), elementContribute), selectedElements, null);
}

function getEditorWholePackageProtocolName(param) {
  return "meta3d-editor-whole-protocol";
}

function generateElementContribute(service, account, fileStr) {
  var __x = service.meta3d.generateContribute({
        name: ElementContributeUtils$Frontend.getElementContributeName(undefined),
        version: ElementUtils$Frontend.getElementContributeVersion(undefined),
        account: account,
        protocol: {
          name: ElementContributeUtils$Frontend.getElementContributeProtocolName(undefined),
          version: ElementUtils$Frontend.getElementContributeProtocolVersion(undefined)
        },
        displayName: ElementContributeUtils$Frontend.getElementContributeName(undefined),
        repoLink: ElementContributeUtils$Frontend.getElementContributeRepoLink(undefined),
        description: ElementContributeUtils$Frontend.getElementContributeDescription(undefined),
        dependentPackageStoredInAppProtocolNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined),
        dependentBlockProtocolNameMap: ImmutableHashMap$Meta3dCommonlib.createEmpty(undefined, undefined)
      }, fileStr);
  var __x$1 = service.meta3d.loadContribute(__x);
  return ElementUtils$Frontend.buildContribute(ElementUtils$Frontend.getElementContributeVersion(undefined), __x$1, undefined, undefined);
}

function cancelAppLoop(service, loopFrameID) {
  var id = loopFrameID.current;
  if (id !== undefined) {
    return Curry._1(service.other.cancelAnimationFrame, id);
  }
  
}

function isCustomInput(inputProtocolName) {
  return Js_string.includes(ElementUtils$Frontend.buildCustomInputProtocolNamePrefix(undefined), inputProtocolName);
}

function buildEmptyAddGeneratedContributeFunc(param, allContributeDataArr, param$1) {
  return allContributeDataArr;
}

function isCustomAction(actionProtocolName) {
  return Js_string.includes("" + ElementUtils$Frontend.buildCustomActionProtocolNamePrefix(undefined) + "", actionProtocolName);
}

function addGeneratedCustoms(service, selectedContributes, account, customInputs, customActions) {
  var __x = ElementUtils$Frontend.addGeneratedInputContributesForElementAssemble([
        service.meta3d.generateContribute,
        service.meta3d.loadContribute
      ], selectedContributes, account, customInputs);
  return ElementUtils$Frontend.addGeneratedActionContributesForElementAssemble([
              service.meta3d.generateContribute,
              service.meta3d.loadContribute
            ], __x, account, customActions);
}

export {
  _removeElementContribute ,
  generateApp ,
  getEditorWholePackageProtocolName ,
  generateElementContribute ,
  cancelAppLoop ,
  isCustomInput ,
  buildEmptyAddGeneratedContributeFunc ,
  isCustomAction ,
  addGeneratedCustoms ,
}
/* No side effect */
