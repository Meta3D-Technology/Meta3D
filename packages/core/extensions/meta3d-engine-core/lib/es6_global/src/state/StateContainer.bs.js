

import * as OptionSt$Meta3dCommonlib from "../../../../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";

function _createStateContainer(param) {
  return {
          state: undefined,
          meta3dState: undefined
        };
}

var poContainer = {
  state: undefined,
  meta3dState: undefined
};

function setState(state) {
  poContainer.state = state;
}

function unsafeGetState(param) {
  return OptionSt$Meta3dCommonlib.unsafeGet(poContainer.state);
}

function setMeta3dState(meta3dState) {
  poContainer.meta3dState = meta3dState;
}

function unsafeGetMeta3dState(param) {
  return OptionSt$Meta3dCommonlib.unsafeGet(poContainer.meta3dState);
}

export {
  _createStateContainer ,
  poContainer ,
  setState ,
  unsafeGetState ,
  setMeta3dState ,
  unsafeGetMeta3dState ,
}
/* No side effect */
