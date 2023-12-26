

import * as ListSt$Meta3dCommonlib from "../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ListSt.bs.js";
import * as ArraySt$Meta3dCommonlib from "../../../../../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/ArraySt.bs.js";
import * as ContributeTypeUtils$Frontend from "../../../../utils/utils/ContributeTypeUtils.bs.js";

function _getContributes(selectedContributes, contributeType) {
  return ListSt$Meta3dCommonlib.filter(selectedContributes, (function (param) {
                return ContributeTypeUtils$Frontend.decideContributeType(param.data.contributePackageData.protocol.name) === contributeType;
              }));
}

function getUIControls(__x) {
  return _getContributes(__x, /* UIControl */0);
}

function getActions(__x) {
  return _getContributes(__x, /* Action */3);
}

function getElements(__x) {
  return _getContributes(__x, /* Element */2);
}

function getSkins(__x) {
  return _getContributes(__x, /* Skin */1);
}

function getInputs(__x) {
  return _getContributes(__x, /* Input */7);
}

function hasUIControl(selectedContributes) {
  return ArraySt$Meta3dCommonlib.includesByFunc(selectedContributes, (function (param) {
                return ContributeTypeUtils$Frontend.decideContributeType(param.data.contributePackageData.protocol.name) === /* UIControl */0;
              }));
}

function hasAction(selectedContributes) {
  return ArraySt$Meta3dCommonlib.includesByFunc(selectedContributes, (function (param) {
                return ContributeTypeUtils$Frontend.decideContributeType(param.data.contributePackageData.protocol.name) === /* Action */3;
              }));
}

export {
  _getContributes ,
  getUIControls ,
  getActions ,
  getElements ,
  getSkins ,
  getInputs ,
  hasUIControl ,
  hasAction ,
}
/* No side effect */
