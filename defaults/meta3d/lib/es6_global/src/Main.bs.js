

import * as AppManager$Meta3d from "./app/AppManager.bs.js";
import * as ExtensionManager$Meta3d from "./ExtensionManager.bs.js";
import * as ExtensionFileManager$Meta3d from "./file/ExtensionFileManager.bs.js";

var registerExtension = ExtensionManager$Meta3d.registerExtension;

var getExtensionService = ExtensionManager$Meta3d.getExtensionServiceExn;

var setExtensionState = ExtensionManager$Meta3d.setExtensionState;

var getExtensionState = ExtensionManager$Meta3d.getExtensionStateExn;

var registerContribute = ExtensionManager$Meta3d.registerContribute;

var getContribute = ExtensionManager$Meta3d.getContributeExn;

var startExtension = ExtensionManager$Meta3d.startExtension;

var generateExtension = ExtensionFileManager$Meta3d.generateExtension;

var loadExtension = ExtensionFileManager$Meta3d.loadExtension;

var generateContribute = ExtensionFileManager$Meta3d.generateContribute;

var loadContribute = ExtensionFileManager$Meta3d.loadContribute;

var convertAllFileDataForApp = AppManager$Meta3d.convertAllFileData;

var generateApp = AppManager$Meta3d.generate;

var loadApp = AppManager$Meta3d.load;

var startApp = AppManager$Meta3d.start;

var initApp = AppManager$Meta3d.init;

var updateApp = AppManager$Meta3d.update;

var buildAPI = ExtensionManager$Meta3d.buildAPI;

export {
  registerExtension ,
  getExtensionService ,
  setExtensionState ,
  getExtensionState ,
  registerContribute ,
  getContribute ,
  startExtension ,
  generateExtension ,
  loadExtension ,
  generateContribute ,
  loadContribute ,
  convertAllFileDataForApp ,
  generateApp ,
  loadApp ,
  startApp ,
  initApp ,
  updateApp ,
  buildAPI ,
  
}
/* AppManager-Meta3d Not a pure module */
