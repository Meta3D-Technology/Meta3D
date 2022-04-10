

import * as OptionSt$Meta3dCommonlib from "./../../../../../meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";

function _createStateContainer(param) {
  return {
          state: undefined
        };
}

var poContainer = {
  state: undefined
};

function setState(state) {
  poContainer.state = state;
  
}

function unsafeGetState(param) {
  return OptionSt$Meta3dCommonlib.unsafeGet(poContainer.state);
}

export {
  _createStateContainer ,
  poContainer ,
  setState ,
  unsafeGetState ,
  
}
/* No side effect */
