'use strict';

var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");

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

exports._createStateContainer = _createStateContainer;
exports.poContainer = poContainer;
exports.setState = setState;
exports.unsafeGetState = unsafeGetState;
exports.setMeta3dState = setMeta3dState;
exports.unsafeGetMeta3dState = unsafeGetMeta3dState;
/* No side effect */
