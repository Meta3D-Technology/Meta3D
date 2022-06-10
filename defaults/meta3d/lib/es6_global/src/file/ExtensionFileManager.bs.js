

import * as LibUtils$Meta3d from "./LibUtils.bs.js";

function compressExtension(extensionFileStr) {
  var encoder = new TextEncoder();
  return encoder.encode(extensionFileStr).buffer;
}

function loadExtension(extensionBinaryFile) {
  var decoder = new TextDecoder("utf-8");
  var lib = LibUtils$Meta3d.serializeLib(decoder.decode(extensionBinaryFile), "Extension");
  return {
          extensionName: LibUtils$Meta3d.getFuncFromLib(lib, "getName"),
          getExtensionServiceFunc: LibUtils$Meta3d.getFuncFromLib(lib, "getExtensionService"),
          createExtensionStateFunc: LibUtils$Meta3d.getFuncFromLib(lib, "createExtensionState"),
          getExtensionLifeFunc: LibUtils$Meta3d.getFuncFromLib(lib, "getExtensionLife")
        };
}

export {
  compressExtension ,
  loadExtension ,
  
}
/* No side effect */
