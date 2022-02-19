'use strict';

var Main$Meta3d = require("meta3d/lib/js/src/Main.bs.js");
var Main$Meta3dEngineCore = require("meta3d-engine-core/lib/js/src/Main.bs.js");

function init(param) {
  var state = Main$Meta3d.prepare(undefined);
  Main$Meta3d.registerExtension(state, "meta3d-engine-core", Main$Meta3dEngineCore.getService, {
        meta3dBsMostExtensionName: "meta3d-bs-most"
      }, Main$Meta3dEngineCore.createState(undefined));
  
}

exports.init = init;
/* No side effect */
