

import * as Main$Meta3d from "../../../../../node_modules/meta3d/lib/es6_global/src/Main.bs.js";
import * as Main$Meta3dEngineCore from "../../../../../node_modules/meta3d-engine-core/lib/es6_global/src/Main.bs.js";

function init(param) {
  var state = Main$Meta3d.prepare(undefined);
  Main$Meta3d.registerExtension(state, "meta3d-engine-core", Main$Meta3dEngineCore.getService, {
        meta3dBsMostExtensionName: "meta3d-bs-most"
      }, Main$Meta3dEngineCore.createState(undefined));
  
}

export {
  init ,
  
}
/* No side effect */
