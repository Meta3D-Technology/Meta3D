'use strict';

var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");

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

exports._createStateContainer = _createStateContainer;
exports.poContainer = poContainer;
exports.setState = setState;
exports.unsafeGetState = unsafeGetState;
/* No side effect */
