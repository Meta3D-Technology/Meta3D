'use strict';

var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");

function _createPOContainer(param) {
  return {
          po: undefined
        };
}

var poContainer = {
  po: undefined
};

function setPO(po) {
  poContainer.po = po;
  
}

function unsafeGetPO(param) {
  return OptionSt$Meta3dCommonlib.unsafeGet(poContainer.po);
}

exports._createPOContainer = _createPOContainer;
exports.poContainer = poContainer;
exports.setPO = setPO;
exports.unsafeGetPO = unsafeGetPO;
/* No side effect */
