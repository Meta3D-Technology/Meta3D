

import * as Sinon from "../../../../../../node_modules/meta3d-bs-sinon/lib/es6_global/src/sinon.bs.js";

function buildService(sandbox, initOpt, clearOpt, renderOpt, drawBoxOpt, param) {
  var init = initOpt !== undefined ? initOpt : Sinon.createEmptyStub(sandbox.contents);
  var clear = clearOpt !== undefined ? clearOpt : Sinon.createEmptyStub(sandbox.contents);
  var render = renderOpt !== undefined ? renderOpt : Sinon.createEmptyStub(sandbox.contents);
  var drawBox = drawBoxOpt !== undefined ? drawBoxOpt : Sinon.createEmptyStub(sandbox.contents);
  return {
          init: init,
          render: render,
          clear: clear,
          drawBox: drawBox
        };
}

export {
  buildService ,
  
}
/* Sinon Not a pure module */
