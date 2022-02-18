

import * as OptionSt$Meta3dCommonlib from "../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";

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

export {
  _createPOContainer ,
  poContainer ,
  setPO ,
  unsafeGetPO ,
  
}
/* No side effect */
