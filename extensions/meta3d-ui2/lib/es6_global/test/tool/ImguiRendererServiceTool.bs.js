

import * as Sinon from "../../../../../../node_modules/meta3d-bs-sinon/lib/es6_global/src/sinon.bs.js";

function buildService(sandbox, initOpt, clearOpt, renderOpt, beforeExecOpt, afterExecOpt, beginWindowOpt, endWindowOpt, setNextWindowRectOpt, param) {
  var init = initOpt !== undefined ? initOpt : Sinon.createEmptyStub(sandbox.contents);
  var clear = clearOpt !== undefined ? clearOpt : Sinon.createEmptyStub(sandbox.contents);
  var render = renderOpt !== undefined ? renderOpt : Sinon.createEmptyStub(sandbox.contents);
  var beforeExec = beforeExecOpt !== undefined ? beforeExecOpt : Sinon.createEmptyStub(sandbox.contents);
  var afterExec = afterExecOpt !== undefined ? afterExecOpt : Sinon.createEmptyStub(sandbox.contents);
  var beginWindow = beginWindowOpt !== undefined ? beginWindowOpt : Sinon.createEmptyStub(sandbox.contents);
  var endWindow = endWindowOpt !== undefined ? endWindowOpt : Sinon.createEmptyStub(sandbox.contents);
  var setNextWindowRect = setNextWindowRectOpt !== undefined ? setNextWindowRectOpt : Sinon.createEmptyStub(sandbox.contents);
  return {
          init: init,
          render: render,
          beforeExec: beforeExec,
          afterExec: afterExec,
          clear: clear,
          beginWindow: beginWindow,
          endWindow: endWindow,
          setNextWindowRect: setNextWindowRect
        };
}

export {
  buildService ,
  
}
/* Sinon Not a pure module */
