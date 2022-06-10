

import * as ExtensionManager$Meta3d from "./ExtensionManager.bs.js";
import * as ExtensionFileManager$Meta3d from "./file/ExtensionFileManager.bs.js";

var prepare = ExtensionManager$Meta3d.prepare;

var registerExtension = ExtensionManager$Meta3d.registerExtension;

var getExtensionService = ExtensionManager$Meta3d.getExtensionServiceExn;

var setExtensionState = ExtensionManager$Meta3d.setExtensionState;

var getExtensionState = ExtensionManager$Meta3d.getExtensionStateExn;

var registerContribute = ExtensionManager$Meta3d.registerContribute;

var getContribute = ExtensionManager$Meta3d.getContributeExn;

var startExtensions = ExtensionManager$Meta3d.startExtensions;

var compressExtension = ExtensionFileManager$Meta3d.compressExtension;

var loadExtension = ExtensionFileManager$Meta3d.loadExtension;

var buildAPI = ExtensionManager$Meta3d.buildAPI;

export {
  prepare ,
  registerExtension ,
  getExtensionService ,
  setExtensionState ,
  getExtensionState ,
  registerContribute ,
  getContribute ,
  startExtensions ,
  compressExtension ,
  loadExtension ,
  buildAPI ,
  
}
/* No side effect */
