

import * as AppManager$Meta3d from "./app/AppManager.bs.js";
import * as ExtensionManager$Meta3d from "./ExtensionManager.bs.js";
import * as ExtensionFileManager$Meta3d from "./file/ExtensionFileManager.bs.js";

var registerExtension = ExtensionManager$Meta3d.registerExtension;

var getExtensionService = ExtensionManager$Meta3d.getExtensionServiceExn;

var setExtensionState = ExtensionManager$Meta3d.setExtensionState;

var getExtensionState = ExtensionManager$Meta3d.getExtensionStateExn;

var registerContribute = ExtensionManager$Meta3d.registerContribute;

var getContribute = ExtensionManager$Meta3d.getContributeExn;

var startExtensions = ExtensionManager$Meta3d.startExtensions;

var generateExtension = ExtensionFileManager$Meta3d.generateExtension;

var loadExtension = ExtensionFileManager$Meta3d.loadExtension;

var generateContribute = ExtensionFileManager$Meta3d.generateContribute;

var loadContribute = ExtensionFileManager$Meta3d.loadContribute;

var generateApp = AppManager$Meta3d.generate;

var loadApp = AppManager$Meta3d.load;

var buildAPI = ExtensionManager$Meta3d.buildAPI;

export {
  registerExtension ,
  getExtensionService ,
  setExtensionState ,
  getExtensionState ,
  registerContribute ,
  getContribute ,
  startExtensions ,
  generateExtension ,
  loadExtension ,
  generateContribute ,
  loadContribute ,
  generateApp ,
  loadApp ,
  buildAPI ,
  
}
/* AppManager-Meta3d Not a pure module */
