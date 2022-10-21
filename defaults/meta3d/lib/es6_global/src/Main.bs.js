

import * as AppManager$Meta3d from "./app/AppManager.bs.js";
import * as ExtensionManager$Meta3d from "./ExtensionManager.bs.js";
import * as ActionProtocolConfig$Meta3d from "./contribute_protocol_config/ActionProtocolConfig.bs.js";
import * as ExtensionFileManager$Meta3d from "./file/ExtensionFileManager.bs.js";
import * as UIControlProtocolConfig$Meta3d from "./contribute_protocol_config/UIControlProtocolConfig.bs.js";
import * as StartExtensionProtocolConfig$Meta3d from "./extension_protocol_config/StartExtensionProtocolConfig.bs.js";

var registerExtension = ExtensionManager$Meta3d.registerExtension;

var initExtension = ExtensionManager$Meta3d.initExtension;

var updateExtension = ExtensionManager$Meta3d.updateExtension;

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

var execGetContributeFunc = AppManager$Meta3d.execGetContributeFunc;

var serializeUIControlProtocolConfigLib = UIControlProtocolConfig$Meta3d.serializeLib;

var getSkinProtocolData = UIControlProtocolConfig$Meta3d.getSkinProtocolData;

var generateUIControlDataStr = UIControlProtocolConfig$Meta3d.generateUIControlDataStr;

var getUIControlSupportedEventNames = UIControlProtocolConfig$Meta3d.getUIControlSupportedEventNames;

var generateHandleUIControlEventStr = UIControlProtocolConfig$Meta3d.generateHandleUIControlEventStr;

var serializeActionProtocolConfigLib = ActionProtocolConfig$Meta3d.serializeLib;

var getActions = ActionProtocolConfig$Meta3d.getActions;

var serializeStartExtensionProtocolConfigLib = StartExtensionProtocolConfig$Meta3d.serializeLib;

var getNeedConfigData = StartExtensionProtocolConfig$Meta3d.getNeedConfigData;

var buildAPI = ExtensionManager$Meta3d.buildAPI;

export {
  registerExtension ,
  initExtension ,
  updateExtension ,
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
  execGetContributeFunc ,
  serializeUIControlProtocolConfigLib ,
  getSkinProtocolData ,
  generateUIControlDataStr ,
  getUIControlSupportedEventNames ,
  generateHandleUIControlEventStr ,
  serializeActionProtocolConfigLib ,
  getActions ,
  serializeStartExtensionProtocolConfigLib ,
  getNeedConfigData ,
  buildAPI ,
  
}
/* AppManager-Meta3d Not a pure module */
