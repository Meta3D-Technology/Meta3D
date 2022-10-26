

import * as OptionSt$Meta3dCommonlib from "../../../../../node_modules/meta3d-commonlib/lib/es6_global/src/structure/OptionSt.bs.js";

function clear(state, webgl1Service, param) {
  var gl = OptionSt$Meta3dCommonlib.getExn(state.gl);
  webgl1Service.clearColor(param[0], param[1], param[2], param[3], gl);
  webgl1Service.clear(webgl1Service.getColorBufferBit(gl) | webgl1Service.getDepthBufferBit(gl) | webgl1Service.getStencilBufferBit(gl), gl);
  
}

export {
  clear ,
  
}
/* No side effect */
