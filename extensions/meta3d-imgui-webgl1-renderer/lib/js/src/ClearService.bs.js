'use strict';

var OptionSt$Meta3dCommonlib = require("meta3d-commonlib/lib/js/src/structure/OptionSt.bs.js");

function clear(state, webgl1Service, param) {
  var gl = OptionSt$Meta3dCommonlib.getExn(state.gl);
  webgl1Service.clearColor(param[0], param[1], param[2], param[3], gl);
  webgl1Service.clear(webgl1Service.getColorBufferBit(gl) | webgl1Service.getDepthBufferBit(gl) | webgl1Service.getStencilBufferBit(gl), gl);
  
}

exports.clear = clear;
/* No side effect */
