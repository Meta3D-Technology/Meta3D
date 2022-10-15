'use strict';

var Sinon = require("meta3d-bs-sinon/lib/js/src/sinon.bs.js");

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

exports.buildService = buildService;
/* Sinon Not a pure module */
